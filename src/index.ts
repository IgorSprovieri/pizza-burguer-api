import express, { Application, Request, Response } from "express";
import cors from "cors";
import { db } from "@/db/index";
import { router } from "@/routers";

const app: Application = express();
const port: Number = Number(process.env.API_PORT) || 3333;

app.use(cors());
app.use(router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, async () => {
  await db.connect();
  console.log(`Example app listening on port ${port}`);
});
