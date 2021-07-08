import { PrismaClient, User } from ".prisma/client";
import { inject, injectable } from "tsyringe";

import ICreateUserDTO from "../dtos/ICreateUserDTO";
import IFindOneUserDTO from "../dtos/IFindOneUserDTO";
import IUsersRepository from "../interfaces/IUsersRepository";

@injectable()
export default class UsersRepository implements IUsersRepository {
  constructor(
    @inject("PrismaProvider")
    private repository: PrismaClient
  ) {}

  public async create({
    email,
    password,
    username,
    employee_id,
  }: ICreateUserDTO): Promise<User> {
    const user = await this.repository.user.create({
      data: {
        email,
        password,
        username,
        employee_id,
      },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.repository.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  public async findOne(id: string): Promise<IFindOneUserDTO | null> {
    const user = await this.repository.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        username: true,
        enabled: true,
        created_at: true,
        updated_at: true,
        employee: true,
      },
    });

    return user;
  }

  public async findByUsername(username: string): Promise<User | null> {
    const user = await this.repository.user.findUnique({
      where: {
        username,
      },
    });

    return user;
  }
}
