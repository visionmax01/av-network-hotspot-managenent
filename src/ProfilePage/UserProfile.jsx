import React, { useState, useEffect } from "react";
import Sidenav from "../Components/Sidenav";
import Box from "@mui/material/Box";
import AdminNavBar from "../Components/AdminNavBar";
import ProfilePic from "../img/admin-logo.jpg";
import { useParams } from "react-router-dom";
import "./profile.css";
import axios from "axios";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import VerifiedIcon from '@mui/icons-material/Verified';

function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [daysRemaining, setDaysRemaining] = useState(0);
  const [activeTab, setActiveTab] = useState("profile");
  const [profilePhoto, setProfilePhoto] = useState(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    axios.get(`http://localhost:8000/api/getOne/${id}`)
      .then((response) => {
        setUser(response.data);
        calculateRemainingDays(response.data.endedDate); // Calculate days remaining
        fetchProfilePhoto();
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);



  const fetchProfilePhoto = () => {
    axios.get(`http://localhost:8000/api/get-user-profile/${id}`, { responseType: 'arraybuffer' })
      .then((response) => {
        const imageBlob = new Blob([response.data], { type: response.headers['content-type'] });
        const imageUrl = URL.createObjectURL(imageBlob);
        setProfilePhoto(imageUrl);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const calculateRemainingDays = (endedDate) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const today = new Date();
    const end = new Date(endedDate);
    const diffDays = Math.round((end - today) / oneDay);
    setDaysRemaining(Math.max(diffDays, 0));
  };

  const calculateProgress = () => {
    const totalDays = Math.abs(new Date(user.startedDate) - new Date(user.endedDate)) / (1000 * 60 * 60 * 24);
    const remainingDays = Math.abs(new Date(user.endedDate) - new Date()) / (1000 * 60 * 60 * 24);
    return ((totalDays - remainingDays) / totalDays) * 100;
  };

  const daysRemainingColor = () => {
    const totalDays = Math.abs(new Date(user.startedDate) - new Date(user.endedDate)) / (1000 * 60 * 60 * 24);
    const remainingDays = Math.abs(new Date(user.endedDate) - new Date()) / (1000 * 60 * 60 * 24);
    const percent = (remainingDays / totalDays) * 100;
    if (percent <= 25) {
      return "red"; 
    } else {
      return "blue"; 
    }
  };

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    return dateObject.toLocaleDateString("en-GB");
  };

  return (
    <>
      <AdminNavBar />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
          <Box height={70} />
          <b>Customer Detail</b>
          <div className="card">
            <div className="card-body">
              <div className="container">
                <div className="row row-cols-2 ">
                  <div className="col-3 profileSection">
                    <div className="profilePicture">
                      {profilePhoto ? (
                        <img className="profile-img" src={profilePhoto} alt="Profile" />
                      ) : (
                        <div className="image-not-found">
                            <div className="text-info">
                            <img src={ProfilePic} alt="userProfile"/>
                                <p> Profile Photo <br/> Not Found</p>
                            </div>
                        </div>
                      )}
                      <button className="btn-change-pic">Change Profile</button>
                    </div>
                  </div>
                  <div className="col-7  userDetailSection">
                    <div className="namePlate">
                    <h2>{user.fullname}</h2>
                    <p><span className="Designation"><b>Designation &nbsp;:</b>&nbsp;</span >
                    <b>Customer</b> <span className="verified-icon"><VerifiedIcon/> </span></p>
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
                      <li className="nav-item">
                        <a
                          className={`nav-link ${
                            activeTab === "about" ? "active" : ""
                          }`}
                          onClick={() => handleTabClick("about")}
                        >
                          Services
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className={`nav-link ${
                            activeTab === "payment" ? "active" : ""
                          }`}
                          onClick={() => handleTabClick("payment")}
                        >
                          Payment detail
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className={`nav-link ${
                            activeTab === "chpassword" ? "active" : ""
                          }`}
                          onClick={() => handleTabClick("chpassword")}
                        >
                         Document
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
                                <tr key={user._id} className="user-detail">
                                 <td>
                                     <div className="displayData1">Name</div>
                                     <div className="displayData2">:</div>
                                     <div className="displayData3">{user.fullname}</div>
                                 </td>
                                 <td>
                                     <div className="displayData1">Email</div>
                                     <div className="displayData2">:</div>
                                     <div className="displayemail">{user.email}</div>
                                 </td>
                                 <td>
                                     <div className="displayData1">Phone Number</div>
                                     <div className="displayData2">:</div>
                                     <div className="displayData3">{user.phoneNo}</div>
                                 </td>
                                 <td>
                                     <div className="displayData1">Gender</div>
                                     <div className="displayData2">:</div>
                                     <div className="displayData3">{user.gender}</div>
                                 </td>
                                 <td>
                                     <div className="displayData1">Account Number</div>
                                     <div className="displayData2">:</div>
                                     <div className="displayData3">{user.account}</div>
                                 </td>
                               
                                 <td>
                                     <div className="displayData1">Address</div>
                                     <div className="displayData2">:</div>
                                     <div className="displayData3">{user.address}</div>
                                 </td>
                             
                              </tr>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        id="about"
                        className={`tab-pane fade ${
                          activeTab === "about" ? "show active" : ""
                        }`}
                      >
                       
                        {/* { Service Type, Package, Customer Since,  Active Date,  Expiry Date ,Status ,Remaning Days} */}
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group-profile">
                            <tr key={user._id} className="user-detail">
                                 <td>
                                     <div className="displayData1">Service Type</div>
                                     <div className="displayData2">:</div>
                                     <div className="displayData3">Wifi Hotspot  Service</div>
                                 </td>
                                 <td>
                                     <div className="displayData1">Customer Since</div>
                                     <div className="displayData2">:</div>
                                     <div className="displayData3">{formatDate(user.createdDate)}</div>
                                 </td>
                                 <td>
                                     <div className="displayData1">Package Detail</div>
                                     <div className="displayData2">:</div>
                                     <div className="displayData3">{user.packageDetail}</div>
                                 </td>
                               
                                 <td>
                                     <div className="displayData1">Started Date</div>
                                     <div className="displayData2">:</div>
                                     <div className="displayData3">{formatDate(user.startedDate)}</div>
                                 </td>
                                 
                                 <td>
                                     <div className="displayData1">Account Status</div>
                                     <div className="displayData2">:</div>
                                     <div className="displayData3">{user.accountStatus}</div>
                                 </td>
                                
                             
                              </tr>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        id="payment"
                        className={`tab-pane fade ${
                          activeTab === "payment" ? "show active" : ""
                        }`}
                      >
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group-profile">
                              Payment Page
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        id="chpassword"
                        className={`tab-pane fade ${
                          activeTab === "chpassword" ? "show active" : ""
                        }`}
                      >
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group-profile">
                              <div className="row">
                                 <label htmlFor="CitizenShip">CitizenShip*</label>
                                 <img src="" alt=""/>
                              </div>
                              
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="form-group-profile">
                      <div className="days-remaning">
                        <div className="circle_Display">
                          <CircularProgressbar
                            className="circle-progressbar-ind"
                            value={calculateProgress()}
                            styles={buildStyles({
                              pathColor: daysRemainingColor(),
                              trailColor: "#49d1d8",
                              textSize: "20px",
                            })}
                          />
                          <div className="display-daysInside-Circle">
                            <h2>{`${daysRemaining} `}</h2>
                            <p>Days Remaining</p>
                          </div>
                          <div className="stock-holder"></div>
                        </div>

                        <div className="date-section02">
                          <span className="label-date">Expire Date:</span><br/>
                          <span className="display-date">{formatDate(user.endedDate)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Box>
    </>
  );
}

export default UserProfile;
