export enum ConfigValue {
  DB_LOCATION = "DB_LOCATION",
  API_PORT = "API_PORT",
}

export interface Config {
  getValue: (key: ConfigValue) => string;
  reload: () => void;
}

export interface ConfigValues {
  [ConfigValue.DB_LOCATION]: string;
  [ConfigValue.API_PORT]: string;
}
