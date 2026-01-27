import axios from "axios";

export type LoginRequest = { login: string; password: string };
export type LoginResponse = { token: string };

function fakeAuth(request: LoginRequest): Promise<LoginResponse> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const ok = request.login === "admin" && request.password === "admin";
      if (ok) resolve({ token: "fake-token-123" });
      else reject(new Error("Неверный логин или пароль"));
    }, 2000);
  });
}

export async function loginApi(request: LoginRequest): Promise<LoginResponse> {
  const data = await fakeAuth(request);

  const response = await axios.post("/login", data).catch(() => ({ data }));
  return response.data as LoginResponse;
}
