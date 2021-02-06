import { createLogger } from "~/src/api/Logger/Logger";
import { LogLevel } from "~/src/api/Logger/types";

export const logInfo = createLogger(LogLevel.INFO, console);
export const logReq = createLogger(LogLevel.REQ, console);
export const logSql = createLogger(LogLevel.SQL, console);
