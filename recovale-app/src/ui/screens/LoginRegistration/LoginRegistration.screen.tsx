import { LoginForm, UserRegistrationForm } from "../../components";
import "./LoginRegistration.screen.style.css";
import { useState } from "react";

const FORMS = {
  LOGIN: "LOGIN",
  REGISTRATION: "REGISTRATION",
};

export function LoginRegistrationScreen() {
  const [currentForm, setCurrentForm] = useState(FORMS.LOGIN);

  return (
    <div className="login-registration-wrapper">
      <h1>RecoVale</h1>
      {currentForm === FORMS.LOGIN ? (
        <LoginForm switchForm={() => setCurrentForm(FORMS.REGISTRATION)} />
      ) : (
        <UserRegistrationForm switchForm={() => setCurrentForm(FORMS.LOGIN)} />
      )}
      <p>Sua solução em descarte e coleta de pilhas e baterias</p>
    </div>
  );
}
