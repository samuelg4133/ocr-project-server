import employeesRouter from "@modules/employees/http/routes/employees.routes";
import { Router } from "express";

const routes = Router();

routes.use("/employees", employeesRouter);

export default routes;
