import { listRuns } from "@/engine/lib/generation-runs";
import { NextResponse } from "next/server";

export async function GET() {
  const runs = await listRuns();
  return NextResponse.json({ runs });
}
