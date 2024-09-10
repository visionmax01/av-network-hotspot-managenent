import React from "react";
import "../Components/css/bottomFooter.css";
import facbook from "../img/facebook.png";
import Gmail from "../img/gmail.png";
import Twitter from "../img/twitter.png";
import linkdin from "../img/linkedin.png";
import Github from "../img/github.png";

function BottomFooter() {
  return (
    <div className="my-class">
      <div className="Footer_section">
        <div className="about_containt">
          <h1>About AV Network</h1>
          <p>
            At Vision Network, we are on a mission to redefine the way people
            connect to the internet, making it simpler, faster, and more
            accessible than ever before. We understand that in today's
            fast-paced digital world, a reliable and efficient local area
            network (LAN) is the backbone of any successful organization or
            community. That's why we have dedicated ourselves to providing
            seamless wireless LAN solutions through our cutting-edge access
            points, ensuring that everyone can effortlessly connect and enjoy
            the benefits of a robust internet connection.
          </p>
        </div>
        <div className="links-sections">
        <div className="links-section">
          <h2>Support</h2>
          <ul>
            <li>
              <a href="#">Home </a>
            </li>
            <li>
              <a href="#">Home </a>
            </li>
            <li>
              <a href="#">Home </a>
            </li>
          </ul>
        </div>
        </div>
        <div className="contact_containt">
          <h2>+977-9819931223</h2>
          <p>
            Address: Rularmunicaplity: Balan-Bihul_6 | Village: rauthat.
            Saptari, Nepal.
          </p>
          <span>Social Media</span> <br />
          <div className="socalIcon">
          <a href="#">
            <img className="footer-connect-icon" src={Gmail} alt="Icon" />
          </a>
          <a href="#">
            <img className="footer-connect-icon" src={facbook} alt="Icon" />
          </a>
          <a href="#">
            <img className="footer-connect-icon" src={linkdin} alt="Icon" />
          </a>
          <a href="#">
            <img className="footer-connect-icon" src={Github} alt="Icon" />
          </a>
          <a href="#">
            <img className="footer-connect-icon" src={Twitter} alt="Icon" />
          </a>
          </div>
        </div>
      </div>
      <div className="lower-footer">
        <div className="left-field">
          <span className="copy-right">
            Copyright © 2024 <a href="#">AV Network.</a> All rights reserved.
          </span>
        </div>
        <div className="right-field">
          <span className="privacy">
            <span>
              <a href="#">Privacy PolicyFiberHome</a>{" "}
            </span>{" "}
            |{" "}
            <span>
              <a href="#"> Usage Policy</a>{" "}
            </span>{" "}
            |{" "}
            <span>
              <a href="#">Terms and ConditionsFair</a>{" "}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
export default BottomFooter;
