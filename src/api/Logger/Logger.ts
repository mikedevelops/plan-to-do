import { CreateLog, LogLevel, LogTransport } from "~/src/api/Logger/types";

const format = (log: string, level: LogLevel): string =>
  `[${level}] ${new Date().toISOString()} ${log}`;

export const createLogInfo = (transport: LogTransport): CreateLog => {
  return (content: string) => transport.log(format(content, LogLevel.INFO));
};
