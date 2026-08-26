import { z } from "zod";

export const entriesSchema = z.object({
  entries: z.array(
    z.object({
      title: z.string(),
      summary: z.string(),
      topic: z.string(),
      links: z.array(
        z.object({
          label: z.string(),
          url: z.string(),
          kind: z.enum(["article", "video"]),
        }),
      ),
      buildIdea: z.string().nullable(),
    }),
  ),
});
