import { AxiosError } from "axios";

declare module "react-query" {
  interface Register {
    defaultError: AxiosError;
  }
}
