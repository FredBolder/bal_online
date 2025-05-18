import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  function aboutClick() {
    navigate("/about");
  }

  function balClick() {
    navigate("/");
  }

  return (
    <div className="navbar">
      <div className="logo">
        <h1 className="headerSmall">Bal</h1>
        <h1 className="headerLarge">Bal - The Game for Smart People</h1>
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
