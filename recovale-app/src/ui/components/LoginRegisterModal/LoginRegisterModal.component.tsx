import { LoginForm, RegistrationForm } from '..'
import './LoginRegisterModal.component.style.css'
import { useState } from 'react'

const FORM_OPTIONS = {
  LOGIN: 'LOGIN',
  REGISTRATION: 'REGISTRATION'
}

export function LoginRegisterModal({...props}) {
  const [optionChosen, setOptionChosen] = useState(FORM_OPTIONS.LOGIN)

  return (
    <div className="login-register-modal-wrapper">
      <div className="options-container">
        <button onClick={() => setOptionChosen(FORM_OPTIONS.LOGIN)}>Login</button>
        <button onClick={() => setOptionChosen(FORM_OPTIONS.REGISTRATION)}>Cadastro</button>
      </div>

      {optionChosen === FORM_OPTIONS.LOGIN ? <LoginForm /> : <RegistrationForm />}
    </div>
  )
}