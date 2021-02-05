export enum ConfigValue {
  DB_LOCATION = "DB_LOCATION",
}

export interface Config {
  getValue: (key: ConfigValue) => string;
  reload: () => void;
}

export interface ConfigValues {
  [ConfigValue.DB_LOCATION]: string;
}
