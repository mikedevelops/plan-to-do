import {Database} from "sqlite3";
import {sqlRun} from "../src/Database/Database";

export default async (db: Database): Promise<void> => {
  await sqlRun(db, `
    CREATE TABLE tasks (
      id INTEGER PRIMARY KEY,
      content TEXT,
      archived INTEGER,
      complete INTEGER,
      created TEXT,
      modified TEXT
    )
  `);
}