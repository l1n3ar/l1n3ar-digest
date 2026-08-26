"use client";

import type { GenerationRun } from "@/engine/types/generation-run";
import { useQuery } from "@tanstack/react-query";

export function useRuns() {
  return useQuery({
    queryKey: ["runs"],
    queryFn: async (): Promise<GenerationRun[]> => {
      const res = await fetch("/api/admin/runs");
      const data = await res.json();
      return data.runs;
    },
    refetchInterval: (query) => (query.state.data?.[0]?.status === "running" ? 5000 : false),
  });
}
