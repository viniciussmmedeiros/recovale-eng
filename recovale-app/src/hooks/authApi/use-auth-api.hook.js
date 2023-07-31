import { BASE_API_URL } from "../../constants";
import { useHttp } from "../http/use-http.hooks";
import { useMemo } from "react";

export function useAuthApi() {
  const httpInstance = useHttp(BASE_API_URL);

  const login = async (loginData) => {
    const response = await httpInstance.post("/auth/login", loginData);

    return response.data;
  };

  const registerUser = async (registrationData) => {
    const response = await httpInstance.post(
      "/auth/register/user",
      registrationData
    );

    return response.data;
  };

  const registerEmployee = async (employeeData) => {
    await httpInstance.post("/auth/register/employee", employeeData);
  };

  return useMemo(
    () => ({
      login,
      registerUser,
      registerEmployee,
    }),
    //eslint-disable-next-line
    []
  );
}
