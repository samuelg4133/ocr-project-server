import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@shared/config/auth";
import IHashProvider from "@shared/containers/providers/HashProvider/models/IHashProvider";
import Error from "@shared/utils/errors";

import IUsersRepository from "../interfaces/IUsersRepository";
import IAuthenticateUserDTO from "../dtos/IAuthenticateUserDTO";
import { users } from "@prisma/client";

@injectable()
export default class AuthenticationUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    email,
    password,
  }: IAuthenticateUserDTO): Promise<string> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error({
        message: "User not found.",
        statusCode: 401,
      });
    }

    const passwordMatched = await this.hashProvider.compare(
      password,
      user.password || ""
    );

    if (!passwordMatched) {
      throw new Error({
        message: "Invalid password.",
        statusCode: 401,
      });
    }

    const token = sign({}, auth.jwt.secret, {
      subject: user.id,
      expiresIn: auth.jwt.expiresIn,
    });

    return token;
  }
}
