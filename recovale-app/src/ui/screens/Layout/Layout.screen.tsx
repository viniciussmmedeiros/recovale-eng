import "./Layout.screen.style.css";
import { useState } from "react";
import { Header, Navbar } from "../../components";

export function LayoutScreen({ children }: any) {
  const [showNavbar, setShowNavbar] = useState(true);
  return (
    <div className="home-wrapper">
      <Header setShowNavbar={setShowNavbar} showNavbar={showNavbar} />
      <div className="main-content">
        <Navbar showNavbar={showNavbar} />
        <div className={`content ${showNavbar ? "" : "navbar-hidden"}`}>
          {children}
        </div>
      </div>
    </div>
  );
}
