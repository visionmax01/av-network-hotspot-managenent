import React, { useEffect, useState } from "react";
import Sidenav from "../Components/Sidenav";
import Box from "@mui/material/Box";
import AdminNavBar from "../Components/AdminNavBar";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "./css/manageuser/manage-user.css";
import "./ShowComplaint/complaintView";

import ConfirmationPopup from "../deleteConformation/DeleteConformation";
import "../AdminPages/css/btn.css";
function UserComplaint() {
  const [complaints, setComplaints] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [complaintToDelete, setComplaintToDelete] = useState(null);
  const [showPopupForm, setShowPopupForm] = useState(false); 

  const togglePopupForm = () => {
    setShowPopupForm(!showPopupForm);
  };

  const closePopupForm = () => {
    setShowPopupForm(false);
  };


  useEffect(() => {
    const fetchComplaintData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/complaint/get-all-complaint"
        );
        setComplaints(response.data);
      } catch (error) {
        console.error("Error fetching complaint data:", error);
      }
    };
    fetchComplaintData();
  }, []);

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    return dateObject.toLocaleDateString("en-GB");
  };

  const deleteUserAction = (complaintId) => {
    setComplaintToDelete(complaintId);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:8000/complaint/deleteComplaint/${complaintToDelete}`
      );
      setComplaints((prevComplaints) =>
        prevComplaints.filter((complaint) => complaint._id !== complaintToDelete)
      );
      // Assuming you have a toast component for showing messages
      // import toast from "react-hot-toast";
      toast.success("Complaint Deleted Successfully", { className: "toastmsg" });
    } catch (error) {
      console.log("Error deleting complaint:", error);
    } finally {
      setShowConfirmation(false);
    }
  };

  const handleCancelDelete = () => {
    setComplaintToDelete(null);
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
              <h1>Customer Complaint </h1>
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
                      <tr className="table-head">
                        <th>S.N</th>
                        <th>Account No</th>
                        <th>Name</th>
                        <th>Complaint No</th>
                        <th>Date Of Complaint</th>
                        <th>Reason</th>
                        <th>Take Action*</th>
                      </tr>
                    </thead>
                    <tbody>
                    {complaints.map((complaint, index) => (
                        <tr
                          key={complaint._id}
                          id="table-bg-id"
                          className="tabletr-value"
                        >
                          <td>{index + 1}</td>
                          <td>{complaint.accountNo}</td>
                          <td>{complaint.fullname}</td>
                          <td>{complaint.complaintNumber}</td>
                          <td>{formatDate(complaint.timestamp)}</td>
                          <td>{complaint.reason}</td>
                          <td className="howerInfo">
                            <button
                              onClick={() => togglePopupForm(complaint._id)}
                              className="btn-action-view"
                              aria-label="Review Complaint"
                            >
                              <i className="fa-solid fa-edit"></i>
                            </button>
                           
                            <button
                              type="submit"
                              onClick={() => deleteUserAction(complaint._id)}
                              className="btn-action-delete"
                              aria-label="Delete Complaint"
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
export default UserComplaint;
