import {Database} from "sqlite3";
import {ConfigValue, getConfigValue} from "../Config/ConfigLoader";

export const sqlAll = <T>(db: Database, sql: string): Promise<T[]> =>{
  return new Promise((resolve, reject) => {
    db.all(sql, (err: Error|null, result: T[]) => {
      if (err !== null) {
        reject(err);

        return;
      }

      resolve(result as T[]);
    })
  });
};

export const sqlRun = (db: Database, sql: string): Promise<void> => {
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

