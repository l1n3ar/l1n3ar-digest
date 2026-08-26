import { NextResponse } from 'next/server';
import { getEntries } from '@/engine/lib/digest';

export const dynamic = 'force-dynamic';

export async function GET() {
  const entries = await getEntries();
  return NextResponse.json({ entries });
}
