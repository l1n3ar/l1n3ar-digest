"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export function useInvalidateContent() {
  const queryClient = useQueryClient();

  return useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["drafts"] });
    queryClient.invalidateQueries({ queryKey: ["feed"] });
  }, [queryClient]);
}
