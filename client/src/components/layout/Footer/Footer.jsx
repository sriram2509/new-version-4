import React from "react";
import "./Footer.css";
import cart from "../../../images/ricey W.png";
import mail from "../../../images/mail.png";
import {
  FaGooglePlay,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import { BsApple } from "react-icons/bs";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <img src={cart} alt="cart" width="100" />
      </div>

      <div className="midFooter">
        <h7>
          High <span className="black"> quality </span> is our{" "}
          <span className="black"> priority </span>{" "}
        </h7>
        <p>
          Copyrights 2022 <span className="black"> &copy; Ricey </span>
        </p>
      </div>

      <div className="rightFooter">
        <div className="pad">
          <h4>Contact Us</h4>
        </div>
        <div className="contact-icon">
          <i class="fa fa-envelope"></i>
          <span>mail@ricey.com</span>
        </div>
        
        <div className="contact-icon">
          <i class="fa fa-phone"></i>
          <span>0776770004</span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
