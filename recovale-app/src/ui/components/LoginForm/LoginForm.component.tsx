import { useState } from "react";
import "./LoginForm.component.style.css";
import { useAuthApi } from "../../../hooks/auth/use-auth-api.hook";
import { useAccountData } from "../../../context/account/account.context";
import { useNavigate } from "react-router-dom";

const LOGIN_DATA = {
  username: "",
  password: "",
};

export function LoginForm({ switchForm }: any) {
  const authApi = useAuthApi();
  const navigate = useNavigate();
  const [, setAccountData] = useAccountData();
  const [loginData, setLoginData] = useState(LOGIN_DATA);

  const handleSetLoginData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setLoginData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const loginResponse = await authApi.login(loginData);

      setAccountData(loginResponse);

      navigate("/your-profile");
    } catch (error) {
      console.log(error);
    }
  };

  const handleForgotPassword = () => {
    alert("Sinto muito. [Ainda não implementado]");
  };

  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleLogin(e)}
      className="login-form"
    >
      <input
        type="text"
        name="username"
        placeholder="Username"
        onChange={(e) => handleSetLoginData(e)}
      />
      <input
        type="text"
        name="password"
        placeholder="Password"
        onChange={(e) => handleSetLoginData(e)}
      />
      <button
        type="button"
        className="forgot-password-button"
        onClick={() => handleForgotPassword()}
      >
        Esqueceu a senha ?
      </button>
      <button type="submit" className="login-button">
        Login
      </button>
      <button
        type="button"
        className="registration-button"
        onClick={switchForm}
      >
        Criar conta
      </button>
    </form>
  );
}
