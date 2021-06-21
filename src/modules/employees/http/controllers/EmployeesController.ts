import { Request, Response } from "express";
import { parseISO } from "date-fns";
import { container } from "tsyringe";

import CreateEmployeeService from "@modules/employees/services/CreateEmployeeService";
import ListEmployeesService from "@modules/employees/services/ListEmployeesService";
import UpdateEmployeeStatusService from "@modules/employees/services/UpdateEmployeeStatusService";

export class EmployeesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { cpf, date_of_birthday, firstname, surname } = request.body;

    const createEmployee = container.resolve(CreateEmployeeService);

    const employee = await createEmployee.execute({
      cpf,
      date_of_birthday: parseISO(date_of_birthday),
      firstname,
      surname,
    });

    return response.json(employee);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listEmployees = container.resolve(ListEmployeesService);

    const employees = await listEmployees.execute();

    return response.json(employees);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { enabled } = request.body;

    const updateEmployeeStatus = container.resolve(UpdateEmployeeStatusService);

    await updateEmployeeStatus.execute({
      id,
      enabled,
    });

    return response.sendStatus(204);
  }
}
