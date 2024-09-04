import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
const jwt = require("jsonwebtoken");

type PortfolioType = {
  title: string;
  image_url: string;
};

const portfolioRoutes = async (fastify: FastifyInstance) => {
  fastify.post(
    "/",
    { preHandler: [authenticate] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { title, image_url } = request.body as PortfolioType;

      fastify.mysql.query(
        "INSERT INTO portfolios (email, image_url) VALUES (?, ?)",
        [title, image_url],
        function onResult(err, result) {
          reply.send(
            err
              ? { error: "Error creating Portfolio", msg: err.message }
              : { message: "Portfolio added successfully", data: result }
          );
        }
      );
    }
  );

  // Protected route example
  fastify.get(
    "/",
    { preHandler: [authenticate] },
    async (_req: FastifyRequest, reply: FastifyReply) => {
      fastify.mysql.query(
        "SELECT * FROM portfolios",
        function onResult(err, result) {
          reply.send(
            err
              ? { error: "Error creating Portfolio", msg: err.message }
              : { message: "Fetched Data", data: result }
          );
        }
      );
    }
  );
};

export default portfolioRoutes;

// Authentication middleware
async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  try {
    const token = request.headers.authorization?.split(" ")[1];
    if (!token) {
      reply.code(401).send({ error: "No token provided" });
      return;
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: number;
      email: string;
    };
    (request as any).user = decodedData;
  } catch (error) {
    reply.code(401).send({ error: "Invalid token" });
  }
}
