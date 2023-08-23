import "./AdminRegistration.screen.style.css";
import { useAccountData } from "../../../context/account/account.context";
import { useToastData } from "../../../context/toast/toast.context";
import { useAuthApi } from "../../../hooks/authApi/use-auth-api.hook";
import { useState } from "react";
import { AxiosError } from "axios";

export function AdminRegistrationScreen() {
  const [, setToastData] = useToastData();
  const [accountData] = useAccountData();
  const authApi = useAuthApi();
  const DEFAULT_ADMIN_DATA = {
    username: "",
    password: "",
    type: "ADMIN",
    createdBy: accountData.id,
  };
  const [employeeData, setEmployeeData] = useState(DEFAULT_ADMIN_DATA);

  const handleAdminRegistration = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      await authApi.registerEmployee(employeeData);
      setToastData({
        show: true,
        message: "Funcionário cadastrado com sucesso!",
        customClass: "success",
      });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      setToastData({
        show: true,
        message: err.response?.data.message,
        customClass: "error",
      });
    }
  };

  const handleSetData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployeeData((previousData) => ({ ...previousData, [name]: value }));
  };

  return (
    <section className="page-content register-admin">
      <h2>Cadastrar Funcionário</h2>
      <div className="employee-type-switch">
        <button
          onClick={() =>
            setEmployeeData((previousData) => ({
              ...previousData,
              type: "ADMIN",
            }))
          }
          className={`${employeeData.type === "ADMIN" && "active-type"}`}
        >
          Admin
        </button>
        <button
          onClick={() =>
            setEmployeeData((previousData) => ({
              ...previousData,
              type: "COLLECTOR",
            }))
          }
          className={`${employeeData.type === "COLLECTOR" && "active-type"}`}
        >
          Coletor
        </button>
      </div>
      <form onSubmit={handleAdminRegistration}>
        <label htmlFor="">
          Username:
          <input
            type="text"
            name="username"
            onChange={(e) => handleSetData(e)}
          />
        </label>
        <label htmlFor="">
          Senha:
          <input
            type="text"
            name="password"
            onChange={(e) => handleSetData(e)}
          />
        </label>
        <button type="submit">Cadastrar</button>
      </form>
    </section>
  );
}
