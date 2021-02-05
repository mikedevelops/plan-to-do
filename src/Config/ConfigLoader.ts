import fs from "fs";
import path from "path";
import { ConfigValue, Config, ConfigValues } from "./types";

const isField = (key: string): boolean =>
  Object.values(ConfigValue).includes(key as ConfigValue);

let config: ConfigValues | null = null;

const parseConfig = (): ConfigValues => {
  const location = path.resolve(
    __dirname,
    `../../${process.env.ENV_PATH || ".env"}`
  );
  let file: string;

  try {
    file = fs.readFileSync(location, "utf8");
  } catch (error) {
    throw new Error(`Could not locate/read file! "${location}"`);
  }

  return file.split("\n").reduce((config: ConfigValues, line) => {
    if (line === "") {
      return config;
    }

    const [key, val] = line.split("=");

    if (key === undefined || val === undefined) {
      throw new Error(`Unable to read line "${line}" as config`);
    }

    if (!isField(key)) {
      throw new Error(`Invalid config key "${key}"`);
    }

    config[key as ConfigValue] = val;

    return config;
  }, {} as ConfigValues);
};

export default (): Config => {
  const getValue = (key: ConfigValue): string => {
    if (config === null) {
      config = parseConfig();
    }

    const value = config[key];

    if (value === undefined) {
      throw new Error(`No config value found for key "${key}"`);
    }

    return value;
  };

  const reload = () => (config = null);

  return { getValue, reload };
};
