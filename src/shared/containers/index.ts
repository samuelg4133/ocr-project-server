import { container } from "tsyringe";

import "./providers";

import EmployeesRepository from "@modules/employees/repositories/EmployeesRepository";
import IEmployeesRepository from "@modules/employees/interfaces/IEmployeesRepository";

import IUsersRepository from "@modules/users/interfaces/IUsersRepository";
import UsersRepository from "@modules/users/repositories/UsersRepository";

container.registerSingleton<IEmployeesRepository>(
  "EmployeesRepository",
  EmployeesRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);
