import React, { useState, useEffect } from "react";
import Sidenav from "../Components/Sidenav";
import Box from "@mui/material/Box";
import AdminNavBar from "../Components/AdminNavBar";
import "./css/manageuser/manage-user.css";
import "./css/btn.css";
import DeleteIcon from "@mui/icons-material/Delete";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import axios from "axios";
import { Link } from "react-router-dom";
function NewRequest() {
//fatching all new request data form api
const [newUsers, setNewUser] = useState([]);

  useEffect(() => {
    const fetchNewUserData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/getAllJoinRequest");
        setNewUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchNewUserData();
  }, []);
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

        <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
          <Box height={50} />
          <div className="User-detail-view-main">
            <div className="design-container-top"></div>
            <div className="search-container-box">
              <h1>New Customer Joining request</h1>
              <div className="take-action-bar">
                <div className="search-containt">
                  <span className="search-field">
                    <input type="text" placeholder="Search....." />
                  </span>
                  <button className="search-btn-style">Search</button>
                </div>
                
              </div>
            </div>
            <div className="table-data-container">
              <div className="table-container">
                <div class="table-responsive">
                  <table className="table-data-display">
                    <thead className="table-head ">
                      <tr>
                        <th>S.N</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>phone No</th>
                        <th>Date Of joining</th>
                        <th>Package Detail</th>
                        <th>Take Action*</th>
                      </tr>
                    </thead>
                    <tbody>

                      {
                        newUsers.map((newuser, index) => (
                          <tr key={newuser._id} id="table-bg-id" className="tabletr-value">
                          <td>{index + 1}</td>
                          <td>{newuser.fullname}</td>
                          <td>{newuser.email}</td>
                          <td>{newuser.phoneNo}</td>
                          <td>{formatDate(newuser.createdDate)}</td>
                          <td>{newuser.packageDetail}</td>
                          
                          <td>
                            <Link to={`/activate-user-account/${newuser._id}`} className="btn-action-edit" >
                              <ManageHistoryIcon /> 
                            </Link>
                            <button className="btn-action-delete">
                              <DeleteIcon />
                            </button>
                          </td>
                        </tr>
                        ))
                      }
                      
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Box>
    </>
  );
}
export default NewRequest;
