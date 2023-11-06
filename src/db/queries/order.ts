import { Item, Order } from "@/types";
import { db } from "..";

class OrderRepository {
  async getOrder(username: string): Promise<Array<Order>> {
    const { rows } = await db.query(
      `SELECT * FROM orders WHERE username = $1 AND stage != 'finish'`,
      [username]
    );

    return rows;
  }

  async createOrder(username: string): Promise<void> {
    await db.query(
      `INSERT INTO orders (username, stage, "orderlist", checked ) VALUES ($1, 'choosing', '{}', false)`,
      [username]
    );
  }

  async updateItems(username: string, items: Array<Item>): Promise<void> {
    await db.query(
      `UPDATE orders SET "orderlist" = $1, stage = 'payMethod' WHERE username = $2 AND stage != 'finish'`,
      [items, username]
    );
  }

  async updateStage(username: string, stage: string): Promise<void> {
    await db.query(
      `UPDATE orders SET stage = $1 WHERE id = $2 AND stage != 'finish'`,
      [stage, username]
    );
  }
}

export const orderRepository = new OrderRepository();
