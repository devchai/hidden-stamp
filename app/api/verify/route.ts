import { NextRequest } from 'next/server';
import { extractWatermark } from '@/lib/stamp-engine';
import { MAX_FILE_SIZE, SUPPORTED_FORMATS } from '@/lib/constants';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return Response.json({ error: 'No file provided' }, { status: 400 });
    }

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

    const arrayBuffer = await file.arrayBuffer();
    const inputBuffer = Buffer.from(arrayBuffer);

    try {
      const text = await extractWatermark(inputBuffer);
      return Response.json({ found: true, text });
    } catch {
      return Response.json({ found: false });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return Response.json({ error: message }, { status: 500 });
  }
}
