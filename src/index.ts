require("dotenv").config();
import express, { Application, Request, Response } from "express";
import cors from "cors";
import qrcode from "qrcode-terminal";
import { Client, LocalAuth, Message } from "whatsapp-web.js";
import { object, string } from "yup";
import axios from "axios";

const client = new Client({
  authStrategy: new LocalAuth(),
});

const app: Application = express();
const port: Number = Number(process.env.API_PORT) || 3333;

app.use(cors());
app.use(express.json());

app.post("/send", async (req: Request, res: Response) => {
  try {
    console.log(req.body);

    const schema = object({
      username: string().required(),
      message: string().required(),
    });

    await schema.validate(req.body);

    type Body = { username: string; message: string };
    const { username, message }: Body = req.body;

    await client.sendMessage(username, message);

    return res.status(200).json({ success: true });
  } catch (error: any) {
    return res.status(400).json({ error: error?.message });
  }
});

client.on("qr", (qr: string) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message", async (msg: Message) => {
  try {
    if (process.env.WEBHOOK_URL) {
      await axios.post(process.env.WEBHOOK_URL, {
        username: msg.from,
        message: msg.body,
      });
    }

    return;
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, async () => {
  await client.initialize();
  console.log(`Whatsapp API listening on port ${port}`);
});
