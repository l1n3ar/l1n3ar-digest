"use client";

import { generateAction } from "@/engine/actions/admin";
import { useQueryClient } from "@tanstack/react-query";
import { useTransition } from "react";

export function useGenerateRun() {
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const trigger = (deepRead: boolean) =>
    startTransition(async () => {
      await generateAction(deepRead);
      queryClient.invalidateQueries({ queryKey: ["runs"] });
    });

  return { trigger, isPending };
}
