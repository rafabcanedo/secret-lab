import { app } from "./app.js";
import { client } from "./db/index.js";
import { env } from "./config/env.js";

const start = async () => {
  try {
    await app.listen({ port: env.PORT, host: "0.0.0.0" });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

process.on("SIGTERM", async () => {
  await app.close();
  await client.end();
  process.exit(0);
});

start();
