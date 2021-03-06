import express from "express";
import getConfig from "~/src/api/Config/ConfigLoader";
import { ConfigValue } from "~/src/api/Config/types";
import { HttpCode } from "./types";
import * as Logger from "~/src/api/Logger";
import { TaskRouter } from "~/src/api/Routers";
import cors from "cors";
import bodyParser from "body-parser";
import { loggerMiddleware } from "~/src/api/Logger/LoggingMiddleware";

const config = getConfig();
const api = express();
const port = parseInt(config.getValue(ConfigValue.API_PORT), 10);

/**
 * Middleware
 */
api.use(
  cors({
    origin: "*",
  })
);
api.use(bodyParser.json());
api.use(loggerMiddleware);

/**
 * API
 */
api.use("/api", TaskRouter);

/**
 * MISC
 */
api.get("/status", (req, res) => {
  res.sendStatus(HttpCode.OK);
});

api.listen(port, () => {
  Logger.logInfo(`API running on ${port}`);
});
