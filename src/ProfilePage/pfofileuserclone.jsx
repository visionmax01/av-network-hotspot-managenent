

import React, { useState, useEffect  } from "react";
import Sidenav from "../Components/Sidenav";
import Box from "@mui/material/Box";
import AdminNavBar from "../Components/AdminNavBar";
import ProfilePic from "../img/myphoto.jpg";
import { useNavigate, useParams } from "react-router-dom";
import "./profile.css";
import axios from "axios";


function UserProfile() {


const {id} =useParams();
const [user, setUser] = useState([]);
  
  const [activeTab, setActiveTab] = useState("profile");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };



  useEffect (()=>{
    axios.get(`http://localhost:8000/api/getOne/${id}`)
    .then((response)=>{
       setUser(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
  },[id]);


  const calculateRemainingDays = (endDate) => {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const today = new Date();
    const end = new Date(endDate);
    const diffDays = Math.round((end - today) / oneDay);
    return diffDays;
  };

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    return dateObject.toLocaleDateString("en-GB");
    // Use "en-US" if you prefer "mm/dd/yyyy" format
  };
  return (
    <>
      <AdminNavBar />
      <Box sx={{ display: "flex" }}>
        <Sidenav />

        <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
          <Box height={70} />
          <div className="card">
            <div className="card-body">
              <div className="container">
                <div className="row row-cols-2 ">
                  <div className="col-3">
                    <img className="profile-img" src={ProfilePic} alt="" />
                    <button className="btn-change-pic">Change Profile</button>
                  </div>
                  <div className="col-7">
                    <h4>{user.fullname}</h4>
                    <p>Customer</p>
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
                          Change Password
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
                                     <div className="displayData3">{user.email}</div>
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
                                     <div className="displayData1">Account Status</div>
                                     <div className="displayData2">:</div>
                                     <div className="displayData3">{user.accountStatus}</div>
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
                                 <td>
                                     <div className="displayData1"> Expiry Date</div>
                                     <div className="displayData2">:</div>
                                     <div className="displayData3">{formatDate(user.endedDate)}</div>
                                 </td>
                                 <td>
                                     <div className="displayData1">Day's Remaning</div>
                                     <div className="displayData2">:</div>
                                     <div className="displayData3"><span className="daysRemaning">{calculateRemainingDays(user.endedDate)}</span>&nbsp;Day's</div>
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
                                <div className="col-6">
                                  <label className="chlabel">
                                    Current Password
                                  </label>
                                  <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter Current Password"
                                  />
                                </div>

                                <div className="col-6">
                                  <label className="chlabel">
                                    New Password
                                  </label>
                                  <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter Password"
                                  />
                                </div>
                                <div className="col-6">
                                  <label className="chlabel">
                                    Conform New Password
                                  </label>
                                  <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter Password"
                                  />
                                </div>
                              </div>
                              <button
                                type="submit"
                                className="btn-edit-profile"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-2">
                    <div className="form-group-profile">
                      <div className="user-detail">
                         {/* Add some styles here */}
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


