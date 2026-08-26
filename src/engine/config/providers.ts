import { createAnthropic } from "@ai-sdk/anthropic";
import { createOpenAI } from "@ai-sdk/openai";

export { gateway } from "ai";
export const openai = createOpenAI();
export const anthropic = createAnthropic();
