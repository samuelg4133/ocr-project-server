import { employees } from "@prisma/client";
import ICreateEmployeeDTO from "../dtos/ICreateEmployeeDTO";
import IUpdateEmployeeStatusDTO from "../dtos/IUpdateEmployeeStatusDTO";

export default interface IEmployeesRepository {
  create(data: ICreateEmployeeDTO): Promise<employees>;
  findAll(): Promise<employees[]>;
  findByCPF(cpf: string): Promise<employees | null>;
  findById(id: string): Promise<employees | null>;
  updateStatus(data: IUpdateEmployeeStatusDTO): Promise<employees>;
}
