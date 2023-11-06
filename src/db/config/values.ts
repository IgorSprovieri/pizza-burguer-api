import sections from "./sections.json";
import items from "./items.json";
import advertisings from "./advertisings.json";
import { db } from "..";

const insertValues = async () => {
  try {
    for (const { title, iconUrl, invertIconUrl } of sections) {
      await db.query(
        "INSERT INTO sections (title, iconUrl, invertIconUrl) VALUES ($1, $2, $3)",
        [title, iconUrl, invertIconUrl]
      );
    }

    console.log("Values added to sections");

    for (const { sectionId, name, price, imageUrl, description } of items) {
      await db.query(
        "INSERT INTO items (sectionId, name, price, imageUrl, description) VALUES ($1, $2, $3, $4, $5)",
        [sectionId, name, price, imageUrl, description]
      );
    }

    console.log("Values added to items");

    for (const { src } of advertisings) {
      await db.query("INSERT INTO advertisings (src) VALUES ($1)", [src]);
    }

    console.log("Values added to advertisings");

    return;
  } catch (error) {
    console.log(error);
  }
};

insertValues();
