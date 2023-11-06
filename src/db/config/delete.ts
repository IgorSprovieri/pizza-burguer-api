import { db } from "..";

export const deleteTables = async () => {
  try {
    await db.query("DROP TABLE items", []);

    console.log("Items table deleted");

    await db.query("DROP TABLE sections", []);

    console.log("Sections table deleted");

    await db.query("DROP TABLE advertisings", []);

    console.log("Advertisings table deleted");

    return;
  } catch (error) {
    console.log(error);
  }
};

deleteTables();
