import { Employee } from "@prisma/client";
import ICreateEmployeesDTO from "../dtos/ICreateEmployeeDTO";
import IListEmployeesDTO from "../dtos/IListEmployeesDTO";
import IUpdateEmployeeStatusDTO from "../dtos/IUpdateEmployeeStatusDTO";

export default interface IEmployeeRepository {
  create(data: ICreateEmployeesDTO): Promise<Employee>;
  findAll(): Promise<IListEmployeesDTO[]>;
  findByCPF(cpf: string): Promise<Employee | null>;
  findById(id: string): Promise<Employee | null>;
  findByIdSelectStatus(id: string): Promise<{ enabled: boolean } | null>;
  updateStatus(data: IUpdateEmployeeStatusDTO): Promise<Employee>;
}
