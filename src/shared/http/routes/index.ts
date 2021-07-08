import { Router } from "express";

import employeesRouter from "@modules/employees/http/routes/employees.routes";
import usersRouter from "@modules/users/http/routes/users.routes";
import sessionsRouter from "@modules/users/http/routes/sessions.routes";
import uploadFilesRouter from "@modules/uploads/http/routes/upload.routes";

const routes = Router();

routes.use("/employees", employeesRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/uploads", uploadFilesRouter);
routes.use("/users", usersRouter);

export default routes;
