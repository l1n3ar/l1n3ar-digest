import { NextRequest, NextResponse } from 'next/server';
import { generateDrafts } from '@/engine/lib/digest';
import { createRun } from '@/engine/lib/generation-runs';

export async function GET(request: NextRequest) {
  const auth = request.headers.get('authorization');
  if (auth !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const run = await createRun();
  const drafts = await generateDrafts(run.id);
  return NextResponse.json({ created: drafts.length });
}
