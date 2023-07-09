import "./Header.component.style.css";
import { Link } from "react-router-dom";

export function Header({ setShowNavbar, showNavbar }: any) {
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
      <h1>
        <Link to="/home">RecoVale</Link>
      </h1>
      <p>Sua solução em descarte e coleta de pilhas e baterias</p>
    </header>
  );
}
