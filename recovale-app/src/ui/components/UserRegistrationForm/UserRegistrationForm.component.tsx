import { useNavigate } from "react-router-dom";
import { useAuthApi } from "../../../hooks/auth/use-auth-api.hook";
import "./UserRegistrationForm.component.style.css";
import { useState } from "react";
import { useAccountData } from "../../../context/account/account.context";

const REGISTRATION_DATA = {
  username: "",
  cpf: "",
  email: "",
  password: "",
};

export function UserRegistrationForm({ switchForm }: any) {
  const authApi = useAuthApi();
  const navigate = useNavigate();
  const [, setAccountData] = useAccountData();
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
    const user = await authApi.registerUser(registrationData);

    setAccountData(user);

    navigate("/your-profile");
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
