"use client";

import { useTransition } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { generateAction } from "@/engine/actions/admin";

export function useGenerateRun() {
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const trigger = () =>
    startTransition(async () => {
      await generateAction();
      queryClient.invalidateQueries({ queryKey: ["runs"] });
    });

  return { trigger, isPending };
}
