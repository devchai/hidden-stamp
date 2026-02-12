import sharp from 'sharp';

/**
 * LSB (Least Significant Bit) Steganography Engine
 *
 * Embeds text data into image pixels by modifying the least significant bit
 * of each color channel. Changes are invisible to the human eye.
 */

const HEADER_BITS = 32; // 32 bits to store message length

function textToBits(text: string): number[] {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(text);
  const bits: number[] = [];
  for (const byte of bytes) {
    for (let i = 7; i >= 0; i--) {
      bits.push((byte >> i) & 1);
    }
  }
  return bits;
}

function lengthToBits(length: number): number[] {
  const bits: number[] = [];
  for (let i = HEADER_BITS - 1; i >= 0; i--) {
    bits.push((length >> i) & 1);
  }
  return bits;
}

export async function embedWatermark(
  inputBuffer: Buffer,
  watermarkText: string,
): Promise<Buffer> {
  const image = sharp(inputBuffer).removeAlpha().png();
  const metadata = await image.metadata();
  const { width, height } = metadata;

  if (!width || !height) {
    throw new Error('Invalid image dimensions');
  }

  const rawBuffer = await image.raw().toBuffer();
  const pixels = new Uint8Array(rawBuffer);

  const messageBits = textToBits(watermarkText);
  const headerBits = lengthToBits(messageBits.length);
  const allBits = [...headerBits, ...messageBits];

  // Each pixel has 3 channels (RGB), each channel can store 1 bit
  const maxCapacity = pixels.length;
  if (allBits.length > maxCapacity) {
    throw new Error('Image too small to embed watermark');
  }

  // Embed bits into LSB of each channel byte
  for (let i = 0; i < allBits.length; i++) {
    pixels[i] = (pixels[i] & 0xfe) | allBits[i];
  }

  const output = await sharp(Buffer.from(pixels), {
    raw: { width, height, channels: 3 },
  })
    .png({ compressionLevel: 6 })
    .toBuffer();

  return output;
}

export async function extractWatermark(
  inputBuffer: Buffer,
): Promise<string> {
  const image = sharp(inputBuffer).removeAlpha();
  const metadata = await image.metadata();
  const { width, height } = metadata;

  if (!width || !height) {
    throw new Error('Invalid image dimensions');
  }

  const rawBuffer = await image.raw().toBuffer();
  const pixels = new Uint8Array(rawBuffer);

  // Read header to get message length
  let messageLength = 0;
  for (let i = 0; i < HEADER_BITS; i++) {
    messageLength = (messageLength << 1) | (pixels[i] & 1);
  }

  if (messageLength <= 0 || messageLength > pixels.length - HEADER_BITS) {
    throw new Error('No watermark found or corrupted data');
  }

  // Read message bits
  const bits: number[] = [];
  for (let i = HEADER_BITS; i < HEADER_BITS + messageLength; i++) {
    bits.push(pixels[i] & 1);
  }

  // Convert bits to bytes
  const bytes: number[] = [];
  for (let i = 0; i < bits.length; i += 8) {
    let byte = 0;
    for (let j = 0; j < 8 && i + j < bits.length; j++) {
      byte = (byte << 1) | bits[i + j];
    }
    bytes.push(byte);
  }

  const decoder = new TextDecoder();
  return decoder.decode(new Uint8Array(bytes));
}
