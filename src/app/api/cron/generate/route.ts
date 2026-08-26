import { NextRequest, NextResponse } from 'next/server';
import { generateDrafts } from '@/engine/lib/digest';
import { createRun } from '@/engine/lib/generation-runs';
import { GENERATION_DEEP_READ_DEFAULT } from '@/engine/config/generation';
import { GENERATION_DEEP_READ_ENABLED } from '@/engine/config/feature-flags';

export async function GET(request: NextRequest) {
  const auth = request.headers.get('authorization');
  if (auth !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const deepRead = GENERATION_DEEP_READ_ENABLED && GENERATION_DEEP_READ_DEFAULT;
  const run = await createRun('cron', deepRead);
  const drafts = await generateDrafts(run.id, deepRead);
  return NextResponse.json({ created: drafts.length });
}
