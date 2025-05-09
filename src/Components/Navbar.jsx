import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React from "react";

function Navbar() {
  const navigate = useNavigate();

  function aboutClick(e) {
    navigate("/about");
  }

  function balClick(e) {
    navigate("/");
  }

  return (
    <div className="navbar">
      <div className="logo">
        <h1>Bal - The Game for Smart People</h1>
      </div>
      <div className="nav-links">
        <Link onClick={balClick} to="/">
          Play
        </Link>
        <Link onClick={aboutClick} to="/about">
          About
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
