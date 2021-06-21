import "reflect-metadata";

import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";

import "express-async-errors";

import routes from "./routes";
import Error from "@shared/utils/errors";
import "@shared/containers";

const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.use(routes);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof Error) {
    return res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
      instance: req.url,
    });
  }

  console.error(err);

  return res.status(500).json({
    status: res.statusCode,
    message: "Internal server error.",
    instance: req.url,
  });
});

app.listen(3333, () => {
  console.log(`Server is running on port 3333`);
});
