import { db } from "..";

export const createTables = async () => {
  try {
    await db.query(
      "CREATE TABLE sections ( sectionId SERIAL PRIMARY KEY, title TEXT, iconUrl TEXT, invertIconUrl TEXT )",
      []
    );

    console.log("Sections table created");

    await db.query(
      "CREATE TABLE items ( itemId SERIAL PRIMARY KEY, sectionId INT, name TEXT, price TEXT, imageUrl TEXT, description TEXT, CONSTRAINT fk_sections FOREIGN KEY (sectionId) REFERENCES sections (sectionId) ON DELETE SET NULL )",
      []
    );

    console.log("Items table created");

    await db.query(
      "CREATE TABLE advertisings ( advertisingId SERIAL PRIMARY KEY, src TEXT )",
      []
    );

    console.log("Advertisings table created");

    await db.query(
      `CREATE TABLE orders ( orderid SERIAL PRIMARY KEY, username TEXT, stage TEXT, "orderlist" JSONB[], checked BOOLEAN )`,
      []
    );

    console.log("Orders table created");

    return;
  } catch (error) {
    console.log(error);
  }
};

createTables();
