export const GENERATION_MODEL = process.env.GENERATION_MODEL || 'claude-sonnet-5';
export const GENERATION_MAX_OUTPUT_TOKENS = Number(process.env.GENERATION_MAX_OUTPUT_TOKENS) || 16000;
export const GENERATION_MAX_SEARCHES = Number(process.env.GENERATION_MAX_SEARCHES) || 8;
export const GENERATION_MIN_ENTRIES = Number(process.env.GENERATION_MIN_ENTRIES) || 4;
export const GENERATION_MAX_ENTRIES = Number(process.env.GENERATION_MAX_ENTRIES) || 6;
