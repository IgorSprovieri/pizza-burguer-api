import numeral from "numeral";
import { db } from "@/db";
import { Item, Order } from "@/types";
import { Request, Response } from "express";
import { Client, Message } from "whatsapp-web.js";
import { array, object, string } from "yup";
import { orderRepository } from "@/db/queries";

class WhatsappController {
  #client: Client = new Client({});
  #isReady: boolean = false;
  #Qr: string = "";

  constructor() {
    this.#client.on("qr", (qr: string) => {
      this.#Qr = qr;
    });

    this.#client.on("ready", () => {
      this.#isReady = true;
    });

    this.#client.on("message", async (message: Message) => {
      const rows = await orderRepository.getOrder(message.from);

      const found: Order = rows[0];

      if (!found) {
        if (message.body === "Olá, desejo fazer um pedido") {
          await this.#startOrder(message);
        }
        return;
      }

      if (found.stage === "payMethod") {
        this.#payMethodResponse(message);
      }

      if (found.stage === "adress") {
        this.#adressResponse(message);
      }
    });

    this.#client.initialize();
  }

  connect(req: Request, res: Response) {
    if (this.#Qr === "") {
      return res.status(202).json({ error: "Qr is not ready" });
    }

    return res.status(200).json({ qr: this.#Qr });
  }

  async #startOrder(message: Message) {
    await orderRepository.createOrder(message.from);

    this.#client.sendMessage(message.from, `Olá, aqui é o pizza burguer`);
    this.#client.sendMessage(
      message.from,
      `Escolha os items do seu pedido no link abaixo:`
    );
    this.#client.sendMessage(
      message.from,
      `${process.env.WEBSITE_URL}/${message.from}`
    );
  }

  async putOrder(req: Request, res: Response) {
    try {
      if (this.#isReady === false) {
        return res.status(202).json({ error: "Client is not ready" });
      }

      const schema = object({
        username: string().required(),
        selectedItems: array().required(),
      });

      await schema.validate(req.body);

      type Body = { username: string; selectedItems: Array<Item> };
      const { username, selectedItems: items }: Body = req.body;

      const rows = await orderRepository.getOrder(username);

      const found: Order = rows[0];

      if (!found) {
        return res.status(404).json({ error: "Conversation not found" });
      }

      await orderRepository.updateItems(username, items);

      let message = "Seu pedido\n\n";

      items.forEach(({ name, price, quantity }) => {
        message =
          message +
          `${name}: ${quantity} x R$ ${numeral(price).format(
            "0.00"
          )} = R$ ${numeral((quantity || 1) * Number(price)).format("0.00")}\n`;
      });

      const total = numeral(
        items.reduce((sum, { price, quantity }) => {
          return sum + Number(price) * (quantity || 0);
        }, 0)
      ).format("0.00");

      message = message + `\n\ntotal: R$ ${total}`;

      this.#client.sendMessage(username, message);
      this.#client.sendMessage(username, "Qual será a forma de pagamento?");

      return res.status(200);
    } catch (err: any) {
      return res.status(400).json({ error: err?.message });
    }
  }

  async #payMethodResponse(message: Message) {
    await orderRepository.updateStage(message.from, "adress");

    this.#client.sendMessage(message.from, `E qual é o endereço de entrega?`);
  }

  async #adressResponse(message: Message) {
    await orderRepository.updateStage(message.from, "finish");

    this.#client.sendMessage(
      message.from,
      `Seu pedido está sendo preparado e chegará em torno de 30 minutos`
    );
    this.#client.sendMessage(
      message.from,
      `Estou finalizando nossa conversa, qualquer dúvida pode nos ligar`
    );
  }
}

export const whatsappController = new WhatsappController();
