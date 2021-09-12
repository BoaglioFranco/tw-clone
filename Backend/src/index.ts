import express from "express";
import authRoutes from "./routes/auth";
import dotenv from "dotenv";
import { PrismaClient } from ".prisma/client";

dotenv.config();
export const prisma = new PrismaClient({
  log: [{ level: "query", emit: "event" }],
});

const main = async () => {
  const app = express();
  const port = 5000;

  app.use(express.json()); //Parses json body types.

  app.use((_req, res, next) => {
    //CORS STUFF
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Token"
    ); //added token for API auth
    res.setHeader(
      "Access-Control-Allow-Methods",
      "DELETE, POST, GET, PUT, OPTIONS"
    );
    next();
  });

  app.get("/", (req, res, next) => {
    res.send("Puto el que lee!");
  });
  app.use(authRoutes);

  app.listen(port, () => {
    console.log(`Server up and running on port ${port}`);
  });
};

main().finally(async () => {
  await prisma.$disconnect();
});
