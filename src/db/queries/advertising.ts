import { Advertising } from "@/types";
import { db } from "..";

class AdvertisingRepository {
  async getAdvertisings(): Promise<Array<Advertising>> {
    const { rows } = await db.query("SELECT * FROM advertisings");
    return rows;
  }
}

export const advertisingRepository = new AdvertisingRepository();
