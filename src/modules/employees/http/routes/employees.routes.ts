import ensureAuthenticated from "@modules/users/http/middlewares/ensureAuthenticated";
import { Router } from "express";
import { EmployeesController } from "../controllers/EmployeesController";

const employeesRouter = Router();

const employeesController = new EmployeesController();

// employeesRouter.use(ensureAuthenticated);
employeesRouter.get("/", employeesController.index);
employeesRouter.patch("/:id", employeesController.update);
employeesRouter.post("/", employeesController.create);

export default employeesRouter;
