import "./Navbar.component.style.css";
import { useEffect } from "react";
import { useAccountData } from "../../../context/account/account.context";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export function Navbar({ showNavbar, setShowNavbar }: any) {
  const navigate = useNavigate();
  const [accountData, setAccountData] = useAccountData();

  const handleLogout = () => {
    localStorage.removeItem("recovale_account_data");
    setAccountData({});
    navigate("/*");
  };

  useEffect(() => {
    const storedAccountData = JSON.parse(
      localStorage.getItem("recovale_account_data") || "{}"
    );
    setAccountData(storedAccountData);
  }, []);

  return (
    <div className="navbar-wrapper">
      <nav className={`navbar show-${showNavbar}`}>
        <ul>
          <li>
            <Link to="/your-profile">Meu Perfil</Link>
          </li>
          {accountData &&
            (accountData.type === "ADMIN" || accountData.type === "SENDER") && (
              <>
                <li>
                  <Link to="/search-collection-points">
                    Consultar Pontos de Coleta
                  </Link>
                </li>
                <li>
                  <Link to="/ranking">Consultar Ranking</Link>
                </li>
              </>
            )}
          {accountData && accountData.type === "ADMIN" && (
            <>
              <li>
                <Link to="/register-admin">Cadastrar Funcionário</Link>
              </li>
              <li>
                <Link to="/registrations-management">Consultar Cadastros</Link>
              </li>
              <li>
                <Link to="/rewards-management">Gerenciar Recompensas</Link>
              </li>
              <li>
                <Link to="/collection-points-management">
                  Gerenciar Pontos de Coleta
                </Link>
              </li>
            </>
          )}
          {accountData && accountData.type === "SENDER" && (
            <>
              <li>
                <Link to="/search-rewards">Resgatar Recompensas</Link>
              </li>
            </>
          )}
          {accountData && accountData.type === "RECIPIENT" && (
            <>
              <li>
                <Link to="/schedule-pickup">Agendar Retirada</Link>
              </li>
            </>
          )}
          <li className="last-item" onClick={() => handleLogout()}>
            Sair
          </li>
        </ul>
      </nav>
    </div>
  );
}
