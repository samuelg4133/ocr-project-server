import { inject, injectable } from "tsyringe";
import IListEmployeesDTO from "../dtos/IListEmployeesDTO";

import IEmployeesRepository from "../interfaces/IEmployeesRepository";

@injectable()
export default class ListEmployeesService {
  constructor(
    @inject("EmployeesRepository")
    private employeesRepository: IEmployeesRepository
  ) {}

  public async execute(): Promise<IListEmployeesDTO[]> {
    return await this.employeesRepository.findAll();
  }
}
