function required(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required env var: ${key}`);
  return value;
}

export const env = {
  DATABASE_URL: required("DATABASE_URL"),
  JWT_SECRET:   required("JWT_SECRET"),
  PORT:         Number(process.env["PORT"] ?? 3333),
  CORS_ORIGIN:  process.env["CORS_ORIGIN"] ?? "http://localhost:3000",
} as const;
