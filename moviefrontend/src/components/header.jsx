import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/base/header.scss';
import logoImg from '../assets/images/movieIcon.png';

function Header() {
{/* <img src={logoImg} className="logoImg" alt="competitions" /> */}
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-primary">
        <div className="container">
          <Link className="logo-title" to="/">Movie Application</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <Link className='nav-link' to="/">Pagrindinis</Link>
                  </li>
                  <li className="nav-item">
                    <Link className='nav-link' to="/login">Prisijungti</Link>
                  </li>
                  <li className="nav-item">
                    <Link className='nav-link' to="/register">Registracija</Link>
                  </li>
                </ul>
            </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;