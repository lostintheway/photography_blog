import fastify, { FastifyInstance } from "fastify";
import fastifyMySQL from "@fastify/mysql";
import fastifyJWT from "@fastify/jwt";
import userRoutes from "./routes/users";
import { config } from "dotenv";
import portfolioRoutes from "./routes/portfolio";
import { MySQLPool } from "@fastify/mysql";

// if you only pass connectionString
declare module "fastify" {
  interface FastifyInstance {
    mysql: MySQLPool;
  }
}

config();

const server: FastifyInstance = fastify();

// MySQL Plugin
server.register(fastifyMySQL, {
  connectionString: process.env.MYSQL_URI!,
});

// JWT Plugin
server.register(fastifyJWT, {
  secret: process.env.JWT_SECRET,
});

// Auth Middleware
server.decorate("authenticate", async (request, reply) => {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.send(err);
  }
});

// Register routes
server.register(userRoutes, { prefix: "/users" });

server.register(portfolioRoutes, { prefix: "/portfolio" });

// Start the server
const start = async () => {
  try {
    await server.listen({ port: 5000 });
    console.log("Server is running on http://localhost:5000");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
