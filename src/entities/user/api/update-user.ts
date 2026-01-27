import { http } from "../../../shared/api/http";
import { User } from "../model/types";

export type UpdateUserDto = {
  id: string;
  name: string;
  avatar: string;
};

export async function updateUser(dto: UpdateUserDto): Promise<User> {
  const { id, ...body } = dto;
  const res = await http.put<User>(`/users/${id}`, body);
  return res.data;
}
