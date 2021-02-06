import { CreateLog, LogLevel, LogTransport } from "~/src/api/Logger/types";
import getConfig from "~/src/api/Config/ConfigLoader";
import { ConfigValue } from "~/src/api/Config/types";

const config = getConfig();
const format = (log: string, level: LogLevel): string =>
  `[${level}] ${new Date().toISOString()} ${log}`;

const levels = Object.keys(LogLevel);
const LEVEL = levels.indexOf(config.getValue(ConfigValue.LOG_LEVEL));

export const createLogger = (
  level: LogLevel,
  transport: LogTransport
): CreateLog => {
  return (content: string) => {
    if (LEVEL < levels.indexOf(level)) {
      return;
    }

    if (level === LogLevel.SQL) {
      content = content.replace(/\n/g, " ").replace(/(\s)+/g, " ").trim();
    }

    transport.log(format(content, level));
  };
};
