import React from "react";
import Sidenav from "../Components/Sidenav";
import Box from "@mui/material/Box";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import AdminNavBar from "../Components/AdminNavBar";
import "./css/manageuser/manage-user.css";


function PaymentDetail() {
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
              <h1>All Payment Record</h1>
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
                    <thead>
                      <tr>
                        <th>S.N</th>
                        <th>Account No</th>
                        <th>Name</th>
                        <th>Active From</th>
                        <th>Expiry Date</th>
                        <th>Payment Date</th>
                        <th>Take Action*</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr id="table-bg-id" className="tabletr-value">
                        <td>1</td>
                        <td>ACC12345</td>
                        <td>John Doe</td>
                        <td>2024-05-15</td>
                        <td>2024-05-15</td>
                        <td>2024-05-15</td>
                        <td>
                          <button class="btn-view_detail">Print recipt</button>
                          <button className="animation-key btn-join-formActivate">
                            <RemoveRedEyeIcon />
                          </button>
                        </td>
                      </tr>
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
export default PaymentDetail;
