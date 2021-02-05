import { Database, Statement } from "sqlite3";

export const run = async (db: Database, sql: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    db.run(sql, function (err: Error | null) {
      if (err !== null) {
        reject(err);

        return;
      }

      resolve(this.changes);
    });
  });
};

export const all = async <T>(db: Database, sql: string): Promise<T[]> => {
  return new Promise((resolve, reject) => {
    db.all(sql, (err: Error | null, rows: T[]) => {
      if (err !== null) {
        reject(err);
        return;
      }

      resolve(rows);
    });
  });
};

export const get = async <T>(db: Database, sql: string): Promise<T> => {
  return new Promise((resolve, reject) => {
    db.get(sql, (error: Error | null, result: T) => {
      if (error !== null) {
        reject(error);
        return;
      }

      resolve(result);
    });
  });
};
