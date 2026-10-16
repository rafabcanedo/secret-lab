import Fastify from "fastify";
import cors from "@fastify/cors";

const app = Fastify({ logger: true });

app.get("/health", async () => {
  return { status: "ok" };
});

const start = async () => {
  try {
    await app.register(cors, {
      origin: "http://localhost:3000",
    });

    await app.listen({ port: 3333, host: "0.0.0.0" });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
