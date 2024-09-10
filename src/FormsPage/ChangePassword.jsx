import React from "react";
import Sidenav from "../Components/Sidenav";
import Box from "@mui/material/Box";
import AdminNavBar from "../Components/AdminNavBar";
import ProfilePic from "../img/myphoto.jpg";
import "../ProfilePage/profile.css";

function ChangePassword() {
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
                    <h4>Bhishan Prasad Sah</h4>
                    <p>ADMIN</p>
                    <ul className="nav" role="tablist">
                      <li className="nav-item">
                        <a>Change Password</a>
                      </li>
                    </ul>
                    <br />
                    {/* Profile Section */}
                    <div className="tab-content">
                      <div id="chpassword" className={`tab-pane fade `}>
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
                    {/* end of Change Password section */}
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

export default ChangePassword;
