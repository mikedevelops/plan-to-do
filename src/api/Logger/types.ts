export interface LogTransport {
  log: (content: string) => void;
}

export enum LogLevel {
  INFO = "INFO",
}

export type CreateLog = (content: string) => void;
