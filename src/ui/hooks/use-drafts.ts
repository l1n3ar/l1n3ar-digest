"use client";

import type { DigestEntry } from "@/engine/types/digest";
import { useQuery } from "@tanstack/react-query";

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
