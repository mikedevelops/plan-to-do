import fs from "fs";
import path from "path";

export enum ConfigValue {
  DB_LOCATION = "DB_LOCATION",
}

interface Config {
  [ConfigValue.DB_LOCATION]: string;
}

const isField = (key: string): boolean =>
  Object.values(ConfigValue).includes(key as ConfigValue);

const CONFIG_FILE: string = path.resolve(__dirname, "../../.env");
let rawConfig: string;

try {
  rawConfig = fs.readFileSync(CONFIG_FILE, "utf8");
} catch (err) {
  console.log(`Unable to read config file ${CONFIG_FILE}`);
  process.exit(0);
}

const config: Config = rawConfig.split("\n").reduce((config: Config, line) => {
  if (line === "") {
    return config;
  }

  const [key, val] = line.split("=");

  if (key === undefined || val === undefined) {
    console.warn(`Unable to read line "${line}" as config`);
    return config;
  }

  if (!isField(key)) {
    console.warn(`Invalid config key "${key}"`);
    return config;
  }

  config[key as ConfigValue] = val;

  return config;
}, {} as Config);

export const getConfigValue = (key: ConfigValue): string => {
  const value = config[key];

  if (value === undefined) {
    console.warn(`No config value found for key "${key}"`);
    return "";
  }

  return value;
};
