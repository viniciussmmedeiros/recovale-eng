import "./Navbar.component.style.css";
import { useEffect } from "react";
import { useAccountData } from "../../../context/account/account.context";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useToastData } from "../../../context/toast/toast.context";
import { AxiosError } from "axios";

export function Navbar({ showNavbar }: any) {
  const [accountData, setAccountData] = useAccountData();
  const [, setToastData] = useToastData();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      localStorage.removeItem("recovale_account_data");
      setAccountData({});
      navigate("/*");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      setToastData({
        show: true,
        message: err.response?.data.message,
        customClass: "error",
      });
    }
  };

  useEffect(() => {
    const storedAccountData = JSON.parse(
      localStorage.getItem("recovale_account_data") || "{}"
    );
    setAccountData(storedAccountData);
    //eslint-disable-next-line
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
              <li>
                <Link to="/waste-collection-requests">
                  Solicitações de Coleta
                </Link>
              </li>
            </>
          )}
          {accountData && accountData.type === "SENDER" && (
            <>
              <li>
                <Link to="/search-collection-points">Pontos de Coleta</Link>
              </li>
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
          {accountData && accountData.type === "COLLECTOR" && (
            <>
              <li>
                <Link to="/validate-collection">Validar Coletas Pendentes</Link>
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
