import { NextRequest } from 'next/server';
import JSZip from 'jszip';
import { embedWatermark } from '@/lib/stamp-engine';
import { MAX_FILE_SIZE, MAX_FILE_COUNT, SUPPORTED_FORMATS } from '@/lib/constants';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    const watermarkText = (formData.get('watermarkText') as string) || 'HiddenStamp';

    if (files.length === 0) {
      return Response.json({ error: 'No files provided' }, { status: 400 });
    }

    if (files.length > MAX_FILE_COUNT) {
      return Response.json(
        { error: `Maximum ${MAX_FILE_COUNT} files allowed` },
        { status: 400 },
      );
    }

    // Validate all files
    for (const file of files) {
      if (!SUPPORTED_FORMATS.includes(file.type as typeof SUPPORTED_FORMATS[number])) {
        return Response.json(
          { error: `Unsupported format: ${file.name}` },
          { status: 400 },
        );
      }
      if (file.size > MAX_FILE_SIZE) {
        return Response.json(
          { error: `File too large: ${file.name}` },
          { status: 400 },
        );
      }
    }

    // Process files
    const processedFiles: { name: string; buffer: ArrayBuffer }[] = [];

    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const inputBuffer = Buffer.from(arrayBuffer);
      const stampedBuffer = await embedWatermark(inputBuffer, watermarkText);

      const baseName = file.name.replace(/\.[^.]+$/, '');
      processedFiles.push({
        name: `${baseName}_stamped.png`,
        buffer: stampedBuffer.buffer.slice(
          stampedBuffer.byteOffset,
          stampedBuffer.byteOffset + stampedBuffer.byteLength,
        ) as ArrayBuffer,
      });
    }

    // Single file: return PNG directly
    if (processedFiles.length === 1) {
      const encoded = encodeURIComponent(processedFiles[0].name);
      return new Response(processedFiles[0].buffer, {
        headers: {
          'Content-Type': 'image/png',
          'Content-Disposition': `attachment; filename="stamped.png"; filename*=UTF-8''${encoded}`,
        },
      });
    }

    // Multiple files: return ZIP
    const zip = new JSZip();
    for (const pf of processedFiles) {
      zip.file(pf.name, pf.buffer);
    }
    const zipArrayBuffer = await zip.generateAsync({ type: 'arraybuffer' });

    return new Response(zipArrayBuffer, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename="stamped_files.zip"',
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return Response.json({ error: message }, { status: 500 });
  }
}
