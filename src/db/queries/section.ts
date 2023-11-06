import { Section } from "@/types";
import { db } from "..";

class SectionRepository {
  async getSections(): Promise<Array<Section>> {
    const { rows } = await db.query("SELECT * FROM sections");
    return rows;
  }
}

export const sectionRepository = new SectionRepository();
