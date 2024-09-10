import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import toast from "react-hot-toast";
import LockIcon from "@mui/icons-material/Lock";
import NavBar from "../Components/NavBar";
import "./login.css";
import logo1 from "../img/login.png";
import img2 from "../img/logo2.png";

const Login1 = ({ setAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("please enter email & password!",{ className: "toastmsg" });
    }
    try {
      const response = await Axios.post("http://localhost:8000/auth/login-admin", {
        email,
        password,
      });

      if (response.data.status) {
        localStorage.setItem("token", response.data.token); // Token storage
        setAuthenticated(true);
        navigate("/admin-dashboard");
        toast.success("login Successfully",{ className: "toastmsg" });
      } else {
        if (response.data.message === "Enter valid email and password",{ className: "toastmsg" }) {
          toast.error("Email is incorrect or invalid",{ className: "toastmsg" });
        } else if (response.data.message === "Admin not found") {
          toast.error("Email is incorrect", { className: "toastmsg" });
        } else if (response.data.msg === "Enter Password is Incorrect!", { className: "toastmsg" }) {
          toast.error("Password is incorrect",{ className: "toastmsg" });
        } else {
          toast.error("Login failed",{ className: "toastmsg" });
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Server Not Responding");
    }
  };


// Logout function
const handleLogout = () => {
  axios.post("http://localhost:8000/auth/logout", {}, { withCredentials: true })
    .then((res) => {
      if (res.data.status) {
        // Remove token from local storage
        localStorage.removeItem("token");
        setAuthenticated(false); // Set authenticated state to false
        navigate("/login");
        toast.success(res.data.msg, { className: "toastmsg" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
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
              Welcome Back !
              <div className="underline"></div>
              <p>
                !! Login With your !! <br />! Detail !
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
              <div className="login-field">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                  <label className="Form-label" htmlFor="email">
                    Email:
                  </label>
                  <div className="input-icon-section">
                    <span className="input-icon-user">
                      <PersonIcon />
                    </span>
                    <input
                      className="Form-input"
                      type="email"
                      autoComplete="off"
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                      autoFocus
                    />
                  </div>

                  <label className="Form-label" htmlFor="password">
                    Password:
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
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-btnLFRF btn-primary"
                  >
                    Login
                  </button>
                  <span className="Forget-link">
                    <Link
                      className="link-for-forgertxt"
                      to="/forget-password"
                    >
                      Forget Password ?
                    </Link>
                  </span>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login1;
