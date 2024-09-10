import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidenav from "../Components/Sidenav";
import AdminNavBar from "../Components/AdminNavBar";
import ProfilePic from "../img/myphoto.jpg";
import VerifiedIcon from '@mui/icons-material/Verified';
import "./profile.css";

function AdminProfile() {
  const [admin, setAdmin] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAdminProfile();
  }, []);

  const fetchAdminProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      const response = await axios.get("http://localhost:8000/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAdmin(response.data); // Assuming response.data contains admin details
    } catch (error) {
      console.error("Error fetching admin profile:", error);
      // Handle error, e.g., show error message
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <AdminNavBar />
      <div style={{ display: "flex" }}>
        <Sidenav />
        <div style={{ flexGrow: 1, padding: 20 }}>
          <div style={{ height: 70 }} />
          {admin && (
            <>
              <b>Admin Detail</b>
              <div className="card">
                <div className="card-body">
                  <div className="container">
                    <div className="row row-cols-2">
                      <div className="col-3">
                        <div className="profilePicture">
                          <img className="profile-img" src={ProfilePic} alt="Profile" />
                          <button className="btn-change-pic">Change Profile</button>
                        </div>
                      </div>
                      <div className="col-7 userDetailSection">
                        <div className="namePlate">
                          <h2>{admin.name}</h2>
                          <p>
                            <span className="Designation">
                              <b>Designation &nbsp;:</b>&nbsp;Admin
                            </span>
                            <b><span className="verified-icon"><VerifiedIcon /></span></b>
                          </p>
                        </div>
                        <ul className="nav" role="tablist">
                          <li className="nav-item">
                            <a
                              className={`nav-link ${
                                activeTab === "profile" ? "active" : ""
                              }`}
                              onClick={() => handleTabClick("profile")}
                            >
                              Profile
                            </a>
                          </li>
                        </ul>
                        <br />
                        <div className="tab-content">
                          <div
                            id="profile"
                            className={`tab-pane fade ${
                              activeTab === "profile" ? "show active" : ""
                            }`}
                          >
                            <div className="row">
                              <div className="col-md-12">
                                <div className="form-group-profile">
                                  <div className="row">
                                    <div className="col-6">
                                      <div className="displayData1">Name</div>
                                      <div className="displayData2">:</div>
                                      <div className="displayData3">{admin.name}</div>
                                    </div>
                                    <div className="col-6">
                                      <div className="displayData1">Email</div>
                                      <div className="displayData2">:</div>
                                      <div className="displayemail">{admin.email}</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminProfile;
