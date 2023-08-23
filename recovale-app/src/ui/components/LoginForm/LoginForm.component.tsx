import "./LoginForm.component.style.css";
import { useState } from "react";
import { useAuthApi } from "../../../hooks/authApi/use-auth-api.hook";
import { useAccountData } from "../../../context/account/account.context";
import { useNavigate } from "react-router-dom";
import { useToastData } from "../../../context/toast/toast.context";
import { AxiosError } from "axios";
const LOGIN_DATA = {
  username: "",
  password: "",
};

export function LoginForm({ switchForm }: any) {
  const [, setToastData] = useToastData();
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
      setToastData({ show: true, customClass: "success", message: "Logado!" });
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

  const handleForgotPassword = () => {
    alert("Não implementado.");
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
