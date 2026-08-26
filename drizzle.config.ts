import { defineConfig } from 'drizzle-kit';

process.loadEnvFile('.env.local');

export default defineConfig({

  schema: './src/schemas/db/*.ts',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
