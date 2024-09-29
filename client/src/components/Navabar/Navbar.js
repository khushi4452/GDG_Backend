import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg bg-black"
        aria-label="Eleventh navbar example"
      >
        <div className="container-fluid text-white">
          <Link to={`/`} className="navbar-brand text-white">
            Aniwatch
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsExample09"
            aria-controls="navbarsExample09"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon text-white"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarsExample09">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to={`/`} className="nav-link active text-white">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link to={`/dashboard`} className="nav-link text-white text-capitalize">
                  Dashboard
                </Link>
              </li>

              <li className="nav-item">
                <Link to={`/contact`} className="nav-link text-white text-capitalize">
                  Contact
                </Link>
              </li>
            </ul>
            <Link to={`/login`}>
              <button className="btn btn-primary text-capitalize">Sign In</button>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
