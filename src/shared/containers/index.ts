import { container } from "tsyringe";

import EmployeesRepository from "@modules/employees/repositories/EmployeesRepository";
import IEmployeesRepository from "@modules/employees/interfaces/IEmployeesRepository";

container.registerSingleton<IEmployeesRepository>(
  "EmployeesRepository",
  EmployeesRepository
);
