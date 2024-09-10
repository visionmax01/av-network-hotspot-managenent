import React, { useState } from "react";
import Axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import NavBar from "../Components/NavBar";
import "./login.css";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import logo1 from "../img/login.png";
import img2 from "../img/logo2.png";
import img1 from "../img/Av_network-logo.png";
import { Toaster, toast } from "react-hot-toast";
import './login.css'
import './forget.css'

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New state for loading

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter an email");
      return;
    }

    setIsLoading(true); // Set loading to true when submitting the form

    try {
      const response = await Axios.post(
        "http://localhost:8000/auth/forget-password",
        {
          email,
        }
      );

      if (response.data.status) {
        setShowSuccessPopup(true);
      } else {
        toast.error("User Not Found. Please enter a valid email.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred");
    } finally {
      setIsLoading(false); // Reset loading state after form submission
    }
  };

  const handlePopupClose = () => {
    setShowSuccessPopup(false);
    navigate("/login");
  };

  return (
     <div className="main-container-one">
      <NavBar />
      <div className="design-container">
        <div className="design-one"> </div>
        <div className="design-two"></div>
      </div>
      <div className="login-container">
        <div className="left-side-section">
          <div className="Design-one"></div>
          <div className="Design-two"></div>
          <div className="Design-three">
            <img src={img2} alt="" />
            <h2>
              Forget Password
              <p>
                !! Login With Correct !! <br />! Email !
              </p>
            </h2>
          </div>
        </div>
        <div className="right-side-container">
          <div className="movement-area">
            <div className="dot1-move"></div>
            <div className="dot2-move"></div>
          </div>

          <div className="login-detail-container">
            <div className="login-containt-container">
              <div className="login-icon">
                <center>
                  <img src={logo1} alt=""></img>
                </center>
              </div>
            </div>
            <div className="login-field">
                    <h1>AV Network</h1>
                    <form onSubmit={handleSubmit}>
                      <label className="Form-label" htmlFor="email">
                        Email:
                      </label>
                      <div className="input-icon-section">
                        <span className="input-icon-user">
                          <MarkEmailReadIcon />
                        </span>
                        <input
                          className="Form-input email-field"
                          type="email"
                          autoComplete="off"
                          placeholder="Email"
                          onChange={(e) => setEmail(e.target.value)}
                          autoFocus
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn-btnLFRF btn-primary"
                        disabled={isLoading}
                      >
                        <div className="btn-container">
                          {isLoading && (
                            <div className="loading-spinner">
                              <div className="spinner"></div>
                            </div>
                          )}
                          <span className="send-text">Send</span>
                        </div>
                      </button>

                      <span className="Forget-link">
                        <Link className="link-for-forgertxt" to="/login">
                          Login ?
                        </Link>
                      </span>
                    </form>
                  </div>
          </div>
        </div>
      </div>
      {showSuccessPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <div className="popup-header">
              <img width={250} src={img1} alt="" />
              <button className="popup-close" onClick={handlePopupClose}>
                X
              </button>
            </div>
            <center><span className="reset-popup-icon"><svg xmlns="http://www.w3.org/2000/svg" height="55" viewBox="0 -960 960 960" width="55"><path d="m344-60-76-128-144-32 14-148-98-112 98-112-14-148 144-32 76-128 136 58 136-58 76 128 144 32-14 148 98 112-98 112 14 148-144 32-76 128-136-58-136 58Zm34-102 102-44 104 44 56-96 110-26-10-112 74-84-74-86 10-112-110-24-58-96-102 44-104-44-56 96-110 24 10 112-74 86 74 84-10 114 110 24 58 96Zm102-318Zm-42 142 226-226-56-58-170 170-86-84-56 56 142 142Z"  fill="green"/></svg></span></center>
            <p>Reset Link Sent successfully!</p>
            <button className="popup-btn" onClick={handlePopupClose}>
              Go to Login
            </button>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default ForgetPassword;
