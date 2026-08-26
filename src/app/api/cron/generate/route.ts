import { NextRequest, NextResponse } from 'next/server';
import { generateDrafts } from '@/lib/digest';

export async function GET(request: NextRequest) {
  const auth = request.headers.get('authorization');
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const drafts = await generateDrafts();
  return NextResponse.json({ created: drafts.length });
}
