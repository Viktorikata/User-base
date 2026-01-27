import { http } from "../../../shared/api/http";
import { User } from "../model/types";

export async function fetchUsers(): Promise<User[]> {
  const res = await http.get<User[]>("/users");
  return res.data;
}
