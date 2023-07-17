import "./Header.component.style.css";
import { useAccountData } from "../../../context/account/account.context";

export function Header({ setShowNavbar, showNavbar }: any) {
  const [accountData] = useAccountData();

  return (
    <header className="header-wrapper">
      <button
        className={`${showNavbar && "active"}`}
        onClick={() => setShowNavbar(!showNavbar)}
      >
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </button>
      <div className="app-name-info">
        <h1>RecoVale</h1>
        <span className="account-type">
          {accountData.type === "ADMIN" && "(admin)"}
          {accountData.type === "COLLECTOR" && "(coletor)"}
          {accountData.type === "SENDER" && "(remetente)"}
          {accountData.type === "RECIPIENT" && "(destinatário)"}
        </span>
      </div>
      <p>Sua solução em descarte e coleta de pilhas e baterias</p>
    </header>
  );
}
