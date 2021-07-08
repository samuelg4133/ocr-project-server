import { PrismaClient } from "@prisma/client";
import { container } from "tsyringe";

container.registerInstance("PrismaProvider", new PrismaClient());
