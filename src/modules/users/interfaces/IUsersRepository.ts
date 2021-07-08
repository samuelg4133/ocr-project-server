import { users } from "@prisma/client";

import ICreateUserDTO from "../dtos/ICreateUserDTO";
import IFindOneUserDTO from "../dtos/IFindOneUserDTO";

export default interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<users>;
  findByEmail(email: string): Promise<users | null>;
  findOne(id: string): Promise<IFindOneUserDTO | null>;
  findByUsername(username: string): Promise<users | null>;
}
