// USD per 1M tokens. Update if Anthropic's pricing changes.
export const MODEL_PRICING: Record<string, { input: number; output: number }> = {
  'claude-sonnet-5': { input: 2.0, output: 10.0 },
  'claude-opus-5': { input: 5.0, output: 25.0 },
};

export function estimateCostUsd(model: string, inputTokens: number, outputTokens: number): number | null {
  const pricing = MODEL_PRICING[model];
  if (!pricing) return null;
  return (inputTokens / 1_000_000) * pricing.input + (outputTokens / 1_000_000) * pricing.output;
}
