import express, { Request, Response, Router } from "express";
import { whatsappController } from "@/controllers";

const { connect, putOrder } = whatsappController;

const router: Router = express.Router();

router.get("/whatsapp/qr", (req: Request, res: Response) => {
  return connect(req, res);
});

router.put("/whatsapp/order", (req: Request, res: Response) => {
  return putOrder(req, res);
});

export { router };
