import { NextRequest, NextResponse } from 'next/server';
import { generateDrafts } from '@/engine/lib/digest';
import { createRun } from '@/engine/lib/generation-runs';
import { GENERATION_DEEP_READ_DEFAULT } from '@/engine/config/generation';

export async function GET(request: NextRequest) {
  const auth = request.headers.get('authorization');
  if (auth !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const run = await createRun('cron', GENERATION_DEEP_READ_DEFAULT);
  const drafts = await generateDrafts(run.id, GENERATION_DEEP_READ_DEFAULT);
  return NextResponse.json({ created: drafts.length });
}
