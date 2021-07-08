import { Employee, PrismaClient } from ".prisma/client";
import { inject, injectable } from "tsyringe";

import ICreateEmployeeDTO from "../dtos/ICreateEmployeeDTO";
import IListEmployeesDTO from "../dtos/IListEmployeesDTO";
import IUpdateEmployeeStatusDTO from "../dtos/IUpdateEmployeeStatusDTO";
import IEmployeesRepository from "../interfaces/IEmployeesRepository";
@injectable()
export default class EmployeesRepository implements IEmployeesRepository {
  constructor(
    @inject("PrismaProvider")
    private repository: PrismaClient
  ) {}

  public async create({
    cpf,
    date_of_birthday,
    firstname,
    surname,
  }: ICreateEmployeeDTO): Promise<Employee> {
    const firstnameFormatted = firstname.toUpperCase();
    const surnameFormatted = surname.toUpperCase();
    const employee = await this.repository.employee.create({
      data: {
        cpf,
        date_of_birthday,
        firstname: firstnameFormatted,
        surname: surnameFormatted,
      },
    });

    return employee;
  }

  public async findAll(): Promise<IListEmployeesDTO[]> {
    let employees: IListEmployeesDTO[];

    employees = await this.repository.employee.findMany({
      orderBy: {
        firstname: "asc",
      },
      select: {
        id: true,
        firstname: true,
        surname: true,
        date_of_birthday: true,
        enabled: true,
        created_at: true,
        updated_at: true,
      },
    });

    return employees;
  }

  public async findByCPF(cpf: string): Promise<Employee | null> {
    const employee = await this.repository.employee.findUnique({
      where: {
        cpf,
      },
    });

    return employee;
  }

  public async findById(id: string): Promise<Employee | null> {
    const employee = await this.repository.employee.findUnique({
      where: {
        id,
      },
    });

    return employee;
  }

  public async findByIdSelectStatus(
    id: string
  ): Promise<{ enabled: boolean } | null> {
    const employeeStatus = await this.repository.employee.findUnique({
      where: {
        id,
      },
      select: {
        enabled: true,
      },
    });

    return employeeStatus;
  }

  public async updateStatus({
    id,
    enabled,
  }: IUpdateEmployeeStatusDTO): Promise<Employee> {
    return await this.repository.employee.update({
      where: {
        id,
      },
      data: {
        enabled,
      },
    });
  }
}
