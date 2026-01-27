import { http } from "../../../shared/api/http";
import { User } from "../model/types";

export type CreateUserDto = {
  name: string;
  avatar: string;
};

export async function createUser(dto: CreateUserDto): Promise<User> {
  const res = await http.post<User>("/users", dto);
  return res.data;
}
