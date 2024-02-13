import { AUTH_QUERY_ID } from "@/constants/queryKeys";
import { login } from "@/services/auth";
import { useMutation } from "react-query";

export default function useLogin() {
  const {
    mutate: loginFn,
    status: loginStatus,
    error: loginError,
    data: loginData,
  } = useMutation(AUTH_QUERY_ID, login);

  return { loginFn, loginStatus, loginError, loginData };
}
