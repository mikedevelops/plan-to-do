import { RequestHandler } from "express";
import { logReq } from "~/src/api/Logger";

export const loggerMiddleware: RequestHandler = (req, res, next) => {
  logReq(`${req.method} ${req.originalUrl}`);
  next();
};
