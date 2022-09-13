import "./Contact.css";
import { Button } from "@mui/material";

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:showbazi@email.com">
        <Button>Contact: showbazi@email.com</Button>
      </a>
    </div>
  );
};

export default Contact;
