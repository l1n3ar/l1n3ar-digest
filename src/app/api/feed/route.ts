import { getEntries } from "@/engine/lib/digest";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const entries = await getEntries();
  return NextResponse.json({ entries });
}
