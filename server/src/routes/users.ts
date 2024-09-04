// src/routes/users.ts
import { MySQLRowDataPacket } from "@fastify/mysql";
import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

interface User {
  id: number;
  email: string;
  password: string;
}

const userRoutes = async (fastify: FastifyInstance) => {
  fastify.post(
    "/signup",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { email, password } = request.body as {
        email: string;
        password: string;
      };
      const hashedPassword = await bcrypt.hash(password, 10);

      try {
        await fastify.mysql.query(
          "INSERT INTO users (email, password) VALUES (?, ?)",
          [email, hashedPassword]
        );
        reply.code(201).send({ message: "User created successfully" });
      } catch (error) {
        reply.code(500).send({ error: "Error creating user" });
      }
    }
  );

  fastify.post(
    "/login",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { email, password } = request.body as {
        email: string;
        password: string;
      };

      fastify.mysql.query<MySQLRowDataPacket[]>(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async function onResult(err, rows) {
          if (err) {
            reply
              .code(500)
              .send({ error: "Error during login", msg: err.message });
          }
          if (rows.length === 0) {
            reply.code(401).send({ error: "Invalid credentials" });
            return;
          }

          const user = rows[0];
          const isValidPassword = await bcrypt.compare(password, user.password);

          if (!isValidPassword) {
            reply.code(401).send({ error: "Invalid credentials" });
            return;
          }

          const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET!,
            { expiresIn: "1h" }
          );
          reply.send({ token });
        }
      );
    }
  );

  // Protected route example
  fastify.get(
    "/profile",
    { preHandler: [authenticate] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const user = (request as any).user;
      reply.send({ message: "Protected route", user });
    }
  );
};

export default userRoutes;

// Authentication middleware
async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  try {
    const token = request.headers.authorization?.split(" ")[1];
    if (!token) {
      reply.code(401).send({ error: "No token provided" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: number;
      email: string;
    };

    if (decoded.email !== "photoadmin@gmail.com") {
      reply.code(401).send({ error: "email not authorized" });
    }

    (request as any).user = decoded;
  } catch (error) {
    reply.code(401).send({ error: "Invalid token" });
  }
}
