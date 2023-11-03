const { Client } = require("whatsapp-web.js");
import express, { Application, Request, Response } from "express";
import cors from "cors";
import { db } from "@/db/index";

const app: Application = express();
const port: Number = Number(process.env.API_PORT) || 3000;
const client: any = new Client();
let Qr: string = "";

app.use(cors());

client.on("qr", (qr: string) => {
  Qr = qr;
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message", (message: any) => {
  console.log(message.body);
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/whatsapp/qr", (req: Request, res: Response) => {
  if (Qr === "") {
    return res.status(500).json({ error: "Qr is not ready" });
  }

  return res.status(200).json({ qr: Qr });
});

app.listen(port, async () => {
  await db.connect();
  client.initialize();
  console.log(`Example app listening on port ${port}`);
});
