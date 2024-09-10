import React, { useState, useEffect } from "react";
import Sidenav from "../Components/Sidenav";
import Box from "@mui/material/Box";
import AdminNavBar from "../Components/AdminNavBar";
import "./css/manageuser/manage-user.css";
import "./css/btn.css";
import axios from "axios";
import PDFComponent from "../Components/downloadfile/PDFGenerator";
import CSVComponent from "../Components/downloadfile/excellGenerate";
import { Link } from "react-router-dom";
import ConfirmationPopup from "../deleteConformation/DeleteConformation";
import toast from "react-hot-toast";

function ManageUser() {
  const [users, setUsers] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/getAllUserData"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const calculateRemainingDays = (endDate) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const today = new Date();
    const end = new Date(endDate);
    const diffDays = Math.round((end - today) / oneDay);
    return Math.max(diffDays, 0);
  };

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    return dateObject.toLocaleDateString("en-GB");
  };

  const deleteUserAction = (userId) => {
    setUserToDelete(userId);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:8000/api/deleteUser/${userToDelete}`
      );
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== userToDelete)
      );
      toast.success("User Deleted Successfully", { className: "toastmsg" });
    } catch (error) {
      console.log("Error deleting user:", error);
    } finally {
      setShowConfirmation(false);
    }
  };

  const handleCancelDelete = () => {
    setUserToDelete(null);
    setShowConfirmation(false);
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
              <h1>Manage Customer Data</h1>
              <div className="take-action-bar">
                <div className="search-containt">
                  <span className="search-field">
                    <input type="text" placeholder="Search....." />
                  </span>
                  <button className="search-btn-style">Search</button>
                </div>
                <div className="download-section">
                  <div className="btn-action-pdf">
                    <PDFComponent users={users} />
                  </div>
                  <div className="btn-action-pdf">
                    <CSVComponent users={users} />
                  </div>
                </div>
              </div>
            </div>
            <div className="table-data-container">
              <div className="table-container" id="table-data">
                <div className="table-responsive">
                  <table className="table-data-display">
                    <thead>
                      <tr className="table-head">
                        <th>S.N</th>
                        <th>Account No</th>
                        <th>Name</th>
                        <th>Expiry Date</th>
                        <th>Status</th>
                        <th>Remaining Days</th>
                        <th>Take Action*</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <tr
                          key={user._id}
                          id="table-bg-id"
                          className="tabletr-value"
                        >
                          <td>{index + 1}</td>
                          <td>{user.account}</td>
                          <td>{user.fullname}</td>
                          <td>{formatDate(user.endedDate)}</td>
                          <td>
                            {calculateRemainingDays(user.endedDate) === 0
                              ? "Inactive"
                              : user.accountStatus}
                          </td>
                          <td>
                            <span className="daysRemaning">
                              {calculateRemainingDays(user.endedDate)}
                            </span>
                            &nbsp;Day's
                          </td>
                          <td className="howerInfo">
                            <Link
                              to={`/update-user-detail/${user._id}`}
                              className="btn-action-edit"
                              aria-label="Edit User"
                            >
                              <i className="fa-solid fa-pen-to-square"></i>
                            </Link>
                            <Link
                              to={`/user-profile-dashboard/${user._id}`}
                              className="btn-action-view"
                              aria-label="View User Profile"
                            >
                              <i className="fa-solid fa-eye"></i>
                            </Link>
                            <Link
                              to={`/user-payment/${user._id}`}
                              className="btn-action-pay"
                              aria-label="Make Payment"
                            >
                              <i class="fa-brands fa-amazon-pay"></i>
                            </Link>
                            <button
                              type="submit"
                              onClick={() => deleteUserAction(user._id)}
                              className="btn-action-delete"
                              aria-label="Delete User"
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Box>
      {showConfirmation && (
        <ConfirmationPopup
          message="Are you sure  want to delete this user?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </>
  );
}

export default ManageUser;
