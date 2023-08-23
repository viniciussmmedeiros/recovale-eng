import "./UserRegistrationForm.component.style.css";
import { useNavigate } from "react-router-dom";
import { useAuthApi } from "../../../hooks/authApi/use-auth-api.hook";
import { useState } from "react";
import { useAccountData } from "../../../context/account/account.context";
import { AxiosError } from "axios";
import { useToastData } from "../../../context/toast/toast.context";

const REGISTRATION_DATA = {
  username: "",
  cpf: "",
  email: "",
  password: "",
};

export function UserRegistrationForm({ switchForm }: any) {
  const [, setToastData] = useToastData();
  const [, setAccountData] = useAccountData();
  const navigate = useNavigate();
  const authApi = useAuthApi();
  const [registrationData, setRegistrationData] = useState(REGISTRATION_DATA);

  const handleSetRegistrationData = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const name = event.target.name;
    const value = event.target.value;

    setRegistrationData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = await authApi.registerUser(registrationData);

      setAccountData(user);
      setToastData({
        show: true,
        customClass: "success",
        message: "Cadastrado com sucesso!",
      });

      navigate("/your-profile");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      setToastData({
        show: true,
        message: err.response?.data.message,
        customClass: "error",
      });
    }
  };

  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleRegistration(e)}
      className="user-registration-form"
    >
      <input
        type="text"
        name="username"
        placeholder="Username"
        onChange={(e) => handleSetRegistrationData(e)}
      />
      <input
        type="text"
        name="cpf"
        placeholder="CPF ou CNPJ"
        onChange={(e) => handleSetRegistrationData(e)}
      />
      <input
        type="text"
        name="email"
        placeholder="Email"
        onChange={(e) => handleSetRegistrationData(e)}
      />
      <input
        type="text"
        name="password"
        placeholder="Senha"
        onChange={(e) => handleSetRegistrationData(e)}
      />
      <button type="submit" className="user-registration-button">
        Cadastrar
      </button>
      <button
        type="button"
        className="login-existing-account-button"
        onClick={switchForm}
      >
        Logar com conta já existente
      </button>
    </form>
  );
}
