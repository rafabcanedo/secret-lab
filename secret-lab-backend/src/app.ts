import Fastify from "fastify";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";
import jwt from "@fastify/jwt";
import { env } from "./config/env.js";
import { AppError } from "./shared/errors/AppError.js";
import { healthRoutes } from "./modules/health/routes.js";

export const app = Fastify({ logger: true });

app.register(cors, { origin: env.CORS_ORIGIN });
app.register(cookie);
app.register(jwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "token",
    signed: false,
  },
});

app.setErrorHandler<Error>((error, _request, reply) => {
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({ message: error.message });
  }
  app.log.error(error);
  return reply.status(500).send({ message: "Internal server error" });
});

app.register(healthRoutes);
