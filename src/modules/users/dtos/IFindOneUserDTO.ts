import { Employee } from "@prisma/client";

export default interface IFindOneUserDTO {
  id: string;
  email: string;
  username: string;
  created_at: Date | null;
  updated_at: Date | null;
  employee: Employee | null;
  enabled: boolean;
}
