import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import auth from "@shared/config/auth";
import Error from "@shared/utils/errors";
import ITokenPayload from "@modules/users/dtos/ITokenPayload";

const ensureAuthenticated = (
  request: Request,
  _: Response,
  next: NextFunction
): void => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error({
      statusCode: 401,
      message: "Authentication token is missing.",
    });
  }
  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, auth.jwt.secret);

    const { sub } = decoded as ITokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new Error({
      message: "Authentication JWT token is invalid.",
      statusCode: 401,
    });
  }
};

export default ensureAuthenticated;
