import "reflect-metadata";

import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import "express-async-errors";

import routes from "./routes";
import "@shared/containers";
import { error } from "./middlewares/errors";
import { PrismaClient } from "@prisma/client";

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cookieParser());
app.use(morgan("dev"));

app.use(routes);

app.use(error);

app.listen(3333, () => {
  console.log(`Server is running on port 3333`);
});
