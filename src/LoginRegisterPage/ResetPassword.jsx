import React, { useState } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../Components/NavBar";
import "./login.css";
import logo1 from "../img/login.png";
import img2 from "../img/logo2.png";
import LockIcon from "@mui/icons-material/Lock";
import  toast  from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";
import img1 from "../img/Av_network-logo.png";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [Cpassword, setCPassword] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password) {
      toast.error("Please enter a password", { className: "toastmsg" });
      return;
    } else if (password !== Cpassword) {
      toast.error("Passwords do not match",{ className: "toastmsg" });
      return;
    }

    setIsLoading(true);

    try {
      const response = await Axios.post(
        `http://localhost:8000/auth/reset-password/${token}`,
        {
          password,
        }
      );

      if (response.data.status) {
        setShowSuccessPopup(true);
      } else {
        toast.error("Link Expired | Reset again...",{ className: "toastmsg" });
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
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
                    Reset Password!{" "}
                    <p>
                      !! Create a new password <br /> For You. !!
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
                      <label className="Form-label" htmlFor="password">
                        New Password:
                      </label>
                      <div className="input-icon-section">
                        <span className="input-icon-user">
                          <LockIcon />
                        </span>
                        <input
                          className="Form-input"
                          type="password"
                          placeholder="********"
                          onChange={(e) => setPassword(e.target.value)}
                          autoFocus
                        />
                      </div>
                      <label className="Form-label" htmlFor="password">
                        Confirm Password:
                      </label>
                      <div className="input-icon-section">
                        <span className="input-icon-user">
                          <LockIcon />
                        </span>
                        <input
                          className="Form-input"
                          type="password"
                          placeholder="********"
                          onChange={(e) => setCPassword(e.target.value)}
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn-btnLFRF btn-primary"
                      >
                        {isLoading ? <LoadingSpinner /> : "Reset"}
                      </button>
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
            <p>Password Reset  successfully!</p>
            <button className="popup-btn" onClick={handlePopupClose}>
              Go to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
