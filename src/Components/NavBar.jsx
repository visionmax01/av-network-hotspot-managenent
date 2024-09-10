import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import img1 from "../img/Av_network-logo.png";
import "../Components/css/NavBar.css";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <header className="App-header">
        <nav className={`navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white box-shadow mb-3 ${isMenuOpen ? 'menu-open' : ''}`}>
          <div className="container-fluid">
            <div className="logo-navbar">
              <Link className="navbar-brand" to={'/'}>
                <img className="main-logo-nav" src={img1} alt="logo" />
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                onClick={toggleMenu}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
            <div className={`links-navbar ${isMenuOpen ? 'open' : ''}`}>
              <div className="navbar-collapse">
                <ul>
                  <li className={`nav-item ${location.pathname === '/Payment' ? 'active' : ''}`}>
                    <Link to="/Payment">Payment</Link>
                  </li>
                  <li className={`nav-item ${location.pathname === '/Services' ? 'active' : ''}`}>
                    <Link to="/Services">Services</Link>
                  </li>
                  <li className={`nav-item ${location.pathname === '/support' ? 'active' : ''}`}>
                    <Link to="/support">Support</Link>
                  </li>
                  <li className={`nav-item ${location.pathname === '/admin-dashboard' ? 'active' : ''}`}>
                    <Link to="/admin-dashboard">Admin</Link>
                  </li>
                  <li className={`nav-item ${location.pathname === '/login' ? 'active' : ''}`}>
                    <Link className="loginbtn" to="/login">
                      Login
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default NavBar;
