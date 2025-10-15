import express from "express";

import prisma from "./utils/prismaClient.js";
import { config } from "./config/environment.js";

const app = express();

// MIDDLEWARES
app.use(express.json()); // allow json data

app.use((req, res, next) => {
  res.on("finish", () => {
    console.log(`${req.method} ${req.path} [${res.statusCode}]`);
  });
  next();
});

app.get("/", (req, res) => {
  res.send("Hello from Express");
});

app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).send({ users });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Impossible de récupérer les users" });
  }
});

app.post("/users/create", async (req, res) => {
  try {
    const { name, age } = req.body;
    const createdUser = await prisma.user.create({
      data: { name, age },
    });
    res.status(201).json(createdUser);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Impossible de créer un user" });
  }
});

// PRISMA & RUN SERVER
async function startServer() {
  try {
    await prisma.$connect();

    app.listen(config.PORT, () => {
      console.log(
        `✅ SERVER Connected to DB & listening on ${config.HOST}:${config.PORT}`
      );
    });
  } catch (err) {
    console.error("Failed to connect to DB:", err);
    process.exit(1);
  }
}

startServer();
