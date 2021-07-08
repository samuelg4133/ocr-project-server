import { cpf as cpfValidator } from "cpf-cnpj-validator";
import { isFuture, isValid } from "date-fns";
import { inject, injectable } from "tsyringe";

import Error from "@shared/utils/errors";
import { isOnlyLetters } from "@shared/utils/isOnlyLetters";

import ICreateEmployeeDTO from "../dtos/ICreateEmployeeDTO";
import IEmployeesRepository from "../interfaces/IEmployeesRepository";
import IListEmployeesDTO from "../dtos/IListEmployeesDTO";

@injectable()
export default class CreateEmployeeService {
  constructor(
    @inject("EmployeesRepository")
    private employeesRepository: IEmployeesRepository
  ) {}
  public async execute({
    cpf,
    date_of_birthday,
    firstname,
    surname,
  }: ICreateEmployeeDTO): Promise<IListEmployeesDTO> {
    if (!cpfValidator.isValid(cpf)) {
      throw new Error({ message: "The CPF entered is not valid." });
    }

    if (!isOnlyLetters(firstname) || !isOnlyLetters(surname)) {
      throw new Error({
        message: "The first name and surname must be only letters.",
      });
    }

    if (!isValid(date_of_birthday)) {
      throw new Error({ message: "The date of birth is badly formatted." });
    }

    if (isFuture(date_of_birthday)) {
      throw new Error({ message: "The date of birth is in the future." });
    }

    const findEmployee = await this.employeesRepository.findByCPF(cpf);

    if (findEmployee?.cpf) {
      throw new Error({ message: "This CPF is already entered." });
    }

    const employee: IListEmployeesDTO = await this.employeesRepository.create({
      cpf,
      date_of_birthday,
      firstname,
      surname,
    });

    return employee;
  }
}
