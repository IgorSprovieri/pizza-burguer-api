import { Client } from "pg";

export const db = new Client({
  user: "docker",
  host: "localhost",
  database: "docker",
  password: "docker",
  port: 5432,
});
