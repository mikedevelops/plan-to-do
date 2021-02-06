import { Database } from "sqlite3";
import getConfig from "~/src/api/Config/ConfigLoader";
import { ConfigValue } from "~/src/api/Config/types";

const config = getConfig();

export default (): Promise<Database> => {
  let db: Database;
  return new Promise((resolve, reject) => {
    db = new Database(
      config.getValue(ConfigValue.DB_LOCATION),
      (error: Error | null) => {
        if (error !== null) {
          reject(error);
          return;
        }

        resolve(db);
      }
    );
  });
};
