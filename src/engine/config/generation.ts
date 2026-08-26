import { readFileSync } from 'fs';
import { join } from 'path';

export const GENERATION_MODEL = process.env.GENERATION_MODEL || 'claude-sonnet-5';
export const GENERATION_MAX_OUTPUT_TOKENS = Number(process.env.GENERATION_MAX_OUTPUT_TOKENS) || 16000;
export const GENERATION_MAX_SEARCHES = Number(process.env.GENERATION_MAX_SEARCHES) || 8;
export const GENERATION_MAX_FETCHES = Number(process.env.GENERATION_MAX_FETCHES) || 4;
export const GENERATION_DEEP_READ_DEFAULT = process.env.GENERATION_DEEP_READ_DEFAULT === 'true';
export const GENERATION_MIN_ENTRIES = Number(process.env.GENERATION_MIN_ENTRIES) || 2;
export const GENERATION_MAX_ENTRIES = Number(process.env.GENERATION_MAX_ENTRIES) || 4;

const BASE_PROMPT = readFileSync(join(process.cwd(), 'src/engine/config/generation-prompt.md'), 'utf-8');

export const GENERATION_PROMPT = `${BASE_PROMPT} Return ${GENERATION_MIN_ENTRIES} to ${GENERATION_MAX_ENTRIES} entries. `

