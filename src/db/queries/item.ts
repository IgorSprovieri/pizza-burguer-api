import { Item } from "@/types";
import { db } from "..";

class ItemRepository {
  async getItems(): Promise<Array<Item>> {
    const { rows } = await db.query(
      "SELECT * FROM items JOIN sections ON items.sectionid = sections.sectionid"
    );

    return rows;
  }
}

export const itemRepository = new ItemRepository();
