import { NextResponse } from 'next/server';
import { listDrafts } from '@/engine/lib/digest';

export const dynamic = 'force-dynamic';

export async function GET() {
  const drafts = await listDrafts();
  return NextResponse.json({ drafts });
}
