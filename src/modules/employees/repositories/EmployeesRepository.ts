import { employees, PrismaClient } from ".prisma/client";
import { v4 as uuid } from "uuid";

import ICreateEmployeeDTO from "../dtos/ICreateEmployeeDTO";
import IUpdateEmployeeStatusDTO from "../dtos/IUpdateEmployeeStatusDTO";
import IEmployeesRepository from "../interfaces/IEmployeesRepository";

export default class EmployeesRepository implements IEmployeesRepository {
  private repository: PrismaClient;

  constructor() {
    this.repository = new PrismaClient();
  }

  public async create({
    cpf,
    date_of_birthday,
    firstname,
    surname,
  }: ICreateEmployeeDTO): Promise<employees> {
    const firstnameFormatted = firstname.toUpperCase();
    const surnameFormatted = surname.toUpperCase();
    const employee = await this.repository.employees.create({
      data: {
        id: uuid(),
        cpf,
        date_of_birthday,
        firstname: firstnameFormatted,
        surname: surnameFormatted,
      },
    });

    return employee;
  }

  public async findAll(): Promise<employees[]> {
    let employees: employees[];

    employees = await this.repository.employees.findMany({
      orderBy: {
        firstname: "asc",
      },
    });

    return employees;
  }

  public async findByCPF(cpf: string): Promise<employees | null> {
    const employee = await this.repository.employees.findUnique({
      where: {
        cpf,
      },
    });

    return employee;
  }

  public async findById(id: string): Promise<employees | null> {
    const employee = await this.repository.employees.findUnique({
      where: {
        id,
      },
    });

    return employee;
  }

  public async updateStatus({
    id,
    enabled,
  }: IUpdateEmployeeStatusDTO): Promise<employees> {
    return await this.repository.employees.update({
      where: {
        id,
      },
      data: {
        enabled,
        updated_at: new Date(),
      },
    });
  }
}
