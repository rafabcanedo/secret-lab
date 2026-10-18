import { defineConfig } from "drizzle-kit";

const dbUrl = process.env["DATABASE_URL"];
if (!dbUrl) throw new Error("Missing DATABASE_URL");

export default defineConfig({
  schema: "./src/db/schema/index.ts",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: { url: dbUrl },
});
