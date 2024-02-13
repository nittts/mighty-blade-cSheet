import api from "./api";

export async function login(login: string) {
  const response = await api.post("/api/auth", { login });

  if (response.data.user) {
    localStorage.setItem("@APP:USER", JSON.stringify(response.data.user));
  }

  return response.data;
}
