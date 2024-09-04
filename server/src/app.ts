"use strict";
import fastify from "fastify";

export function build(opts = {}) {
  const app = fastify(opts);
  app.get("/", async function (request, reply) {
    return { hello: "world" };
  });

  return app;
}
