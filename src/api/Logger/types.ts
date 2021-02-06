export interface LogTransport {
  log: (content: string) => void;
}

export enum LogLevel {
  INFO = "INFO",
  REQ = "REQ",
  SQL = "SQL",
}

export type CreateLog = (content: string) => void;
