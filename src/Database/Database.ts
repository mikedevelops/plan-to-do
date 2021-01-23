import {Database, Statement} from "sqlite3";
import {ConfigValue, getConfigValue} from "../Config/ConfigLoader";

export const run = async (sql: string): Promise<void> => {
  const db = await getConnection();
  return new Promise((resolve, reject) => {
    db.run(sql, (err: Error|null) => {
      if (err !== null) {
        reject(err);

        return;
      }

      resolve();
    })
  });
};

export const all = async <T>(sql: string): Promise<T[]> => {
  const connection = await getConnection();
  return new Promise((resolve, reject) => {
    connection.all(sql, (err: Error|null, rows: T[]) => {
      if (err !== null) {
        reject(err);
        return;
      }

      resolve(rows);
    });
  });
}

export const get = async <T>(sql: string): Promise<T> => {
  const connection = await getConnection();
  return new Promise((resolve, reject) => {
    connection.get(sql, (error: Error|null, result: T) => {
      if (error !== null) {
        reject(error);
        return;
      }

      resolve(result);
    });
  });
};

export const getConnection = (): Promise<Database> => {
  let db: Database;
  return new Promise(resolve => {
    db = new Database(
      getConfigValue(ConfigValue.DB_LOCATION),
      (error: Error|null) => {
        if (error !== null) {
          console.log(error.message, error)
          process.exit(0);
          return;
        }

        resolve(db);
      }
    );
  });
};

