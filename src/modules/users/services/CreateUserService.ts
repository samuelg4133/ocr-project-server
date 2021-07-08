import { inject, injectable } from "tsyringe";

import IHashProvider from "@shared/containers/providers/HashProvider/models/IHashProvider";
import Error from "@shared/utils/errors";

import IEmployeesRepository from "@modules/employees/interfaces/IEmployeesRepository";

import ICreateUserDTO from "../dtos/ICreateUserDTO";
import IFindOneUserDTO from "../dtos/IFindOneUserDTO";
import IUsersRepository from "../interfaces/IUsersRepository";

@injectable()
export default class CreateUserService {
  constructor(
    @inject("EmployeesRepository")
    private employeesRepository: IEmployeesRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    email,
    password,
    username,
    employee_id,
  }: ICreateUserDTO): Promise<IFindOneUserDTO | null> {
    const employeeStatus = await this.employeesRepository.findByIdSelectStatus(
      employee_id
    );

    if (!employeeStatus) {
      throw new Error({ message: "Employee not found.", statusCode: 404 });
    }

    if (!employeeStatus?.enabled) {
      throw new Error({
        message: "Is not possible to do a new user for a not enabled employee.",
        statusCode: 401,
      });
    }

    const findEmail = await this.usersRepository.findByEmail(email);

    if (findEmail) {
      throw new Error({ message: "Email address already used." });
    }

    const findUsername = await this.usersRepository.findByUsername(username);

    if (findUsername) {
      throw new Error({ message: "Username already used." });
    }

    const hashedPassword = await this.hashProvider.generate(password);

    const { id } = await this.usersRepository.create({
      email,
      password: hashedPassword,
      username,
      employee_id,
    });

    const user = await this.usersRepository.findOne(id);

    return user;
  }
}
