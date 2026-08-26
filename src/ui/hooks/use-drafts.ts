"use client";

import { useQuery } from "@tanstack/react-query";
import type { DigestEntry } from "@/engine/types/digest";

export function useDrafts() {
  return useQuery({
    queryKey: ["drafts"],
    queryFn: async (): Promise<DigestEntry[]> => {
      const res = await fetch("/api/admin/drafts");
      const data = await res.json();
      return data.drafts;
    },
  });
}
