import { http } from "../../../shared/api/http";

export async function deleteUser(id: string): Promise<void> {
  await http.delete(`/users/${id}`);
}
