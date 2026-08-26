export type RunLogEntry = { message: string; at: string };

export type GenerationRun = {
  id: string;
  status: 'running' | 'done' | 'error';
  log: RunLogEntry[];
  draftsCreated: number;
  model: string | null;
  inputTokens: number;
  outputTokens: number;
  webSearchRequests: number;
  estimatedCostUsd: number | null;
  createdAt: string;
  finishedAt: string | null;
};
