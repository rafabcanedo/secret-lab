import Fastify from "fastify";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";
import jwt from "@fastify/jwt";
import { ValidationError } from "yup";
import { env } from "./config/env.js";
import { AppError } from "./shared/errors/AppError.js";
import { healthRoutes } from "./routes/health.js";
import { userRoutes } from "./routes/users.js";
import { communityRoutes } from "./routes/communities.js";
import { postRoutes } from "./routes/posts.js";
import { likeRoutes } from "./routes/likes.js";
import { bookmarkRoutes } from "./routes/bookmarks.js";
import { categoryRoutes } from "./routes/categories.js";
import { tagRoutes } from "./routes/tags.js";
import { commentRoutes } from "./routes/comments.js";

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
  if (error instanceof ValidationError) {
    return reply.status(400).send({ message: "Validation error", errors: error.errors });
  }
  app.log.error(error);
  return reply.status(500).send({ message: "Internal server error" });
});

app.register(healthRoutes);
app.register(userRoutes);
app.register(communityRoutes);
app.register(postRoutes);
app.register(likeRoutes);
app.register(bookmarkRoutes);
app.register(categoryRoutes);
app.register(tagRoutes);
app.register(commentRoutes);
