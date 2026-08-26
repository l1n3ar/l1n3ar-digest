"use client";

import { useQuery } from "@tanstack/react-query";
import type { DigestEntry } from "@/engine/types/digest";

export function useFeed() {
  return useQuery({
    queryKey: ["feed"],
    queryFn: async (): Promise<DigestEntry[]> => {
      const res = await fetch("/api/feed");
      const data = await res.json();
      return data.entries;
    },
  });
}
