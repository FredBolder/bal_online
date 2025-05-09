import React from "react";
import PrivacyPolicy from "./PrivacyPolicy";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <div className="footerContainer">
        <div className="footerInfo">
          <div>
            <Link to="/policy">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
