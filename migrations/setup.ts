import {Database} from "sqlite3";
import {sqlRun} from "../src/Database/Database";

export default async (db: Database): Promise<void> => {
  await sqlRun(`
    CREATE TABLE tasks (
      id INTEGER PRIMARY KEY,
      content TEXT NOT NULL,
      archived INTEGER NOT NULL DEFAULT 0,
      complete INTEGER NOT NULL DEFAULT 0,
      created TEXT DEFAULT CURRENT_TIMESTAMP,
      modified TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);
}