import { employees } from "@prisma/client";
import { inject, injectable } from "tsyringe";

import IEmployeesRepository from "../interfaces/IEmployeesRepository";

@injectable()
export default class ListEmployeesService {
  constructor(
    @inject("EmployeesRepository")
    private employeesRepository: IEmployeesRepository
  ) {}

  public async execute(): Promise<employees[]> {
    return await this.employeesRepository.findAll();
  }
}
