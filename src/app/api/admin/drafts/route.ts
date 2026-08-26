import { listDrafts } from "@/engine/lib/digest";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const drafts = await listDrafts();
  return NextResponse.json({ drafts });
}
