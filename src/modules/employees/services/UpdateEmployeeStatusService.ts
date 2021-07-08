import { Employee } from "@prisma/client";
import { inject, injectable } from "tsyringe";

import Error from "@shared/utils/errors";

import IUpdateEmployeeStatusDTO from "../dtos/IUpdateEmployeeStatusDTO";
import IEmployeesRepository from "../interfaces/IEmployeesRepository";

@injectable()
export default class UpdateEmployeeStatusService {
  constructor(
    @inject("EmployeesRepository")
    private employeesRepository: IEmployeesRepository
  ) {}

  public async execute({
    id,
    enabled,
  }: IUpdateEmployeeStatusDTO): Promise<Employee> {
    const employeeAlreadyExists = await this.employeesRepository.findById(id);
    if (employeeAlreadyExists?.id) {
      const updateEmployee = await this.employeesRepository.updateStatus({
        id,
        enabled,
      });

      return updateEmployee;
    }

    throw new Error({
      message: "Employee to update not found",
      statusCode: 404,
    });
  }
}
