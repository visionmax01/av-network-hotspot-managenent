// SupportPage.js

import React, { useState } from "react";
import NavBar from "../Components/NavBar";
import BottomFooter from "../Components/BottomFooter";
import "./Support.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function SupportPage() {
  const [newComplaint, setNewComplaint] = useState({
    fullname: "",
    accountNo: "",
    reason: "",
    message: "",
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setNewComplaint({ ...newComplaint, [name]: value });
  };

  const submitSupportform = async (e) => {
    e.preventDefault();
    if (!newComplaint.fullname || !newComplaint.accountNo || !newComplaint.message) {
      toast.error("All fields are required", { className: "toastmsg" });
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8000/complaint/create-complaint",
        newComplaint
      );
      alert(`Complaint registered successfully. \n Complaint Number: ${response.data.complaintNumber}\n `);
      setNewComplaint({
        fullname: "",
        accountNo: "",
        reason: "",
        message: "",
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to register complaint", { className: "toastmsg" });
    }
  };



  const [complaintNumber, setComplaintNumber] = useState("");
  const [complaintData, setComplaintData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8000/complaint/searchComplaint/${complaintNumber}`);
      setComplaintData(response.data);
      setErrorMessage("");
    } catch (error) {
      console.error(error);
      setErrorMessage("Complaint not found");
      setComplaintData(null);
    }
  };
  return (
    <div className="background-imgsc">
      <div className="main-container-support">
        <NavBar />
        <div className="Main-Section-support">
          {/* Left Side */}
          <div className="left-side">
            <div className="check-container">
              <h1>
                "Check Your Complaint
                <br />
                Issue Rise Before"
              </h1>
              <p>Track Your Issue !</p>
              <form onSubmit={handleSearch}>
        <label className="labelSearchfield" htmlFor="complaintNumber">Complaint Number:</label>
        <input
          type="text"
          id="complaintNumber"
          value={complaintNumber}
          onChange={(e) => setComplaintNumber(e.target.value)}
        /><br/>
        <button className="btn  btn-primary" type="submit">Search</button>
      </form>
      
      {errorMessage && <p>{errorMessage}</p>}
      {complaintData && (
        <div className="searchResult">
          <h4>Complaint Details</h4>
           <div className="outputScreen">
           <p className="messageOne"><strong className="titleOutput">Remarks:</strong> {complaintData.remarks}</p>
          <p className="messageOne"><strong className="titleOutput"> Status:</strong> {complaintData.complaintStatus}</p>
           </div>
        </div>
      )}
        </div>
          </div>
          {/* Right Side */}
          <div className="right-side">
            <div className="heading-container">
              <h3>Raise a Support Ticket</h3>
            </div>
            <div className="Form-Box">
              <form className="main-form-section" onSubmit={submitSupportform}>
                <h2>! Submit Your Issue !</h2>
                <div className="form-group">
                  <label htmlFor="fullname" className="form-label">
                    Customer Name:
                  </label>
                  <br />
                  <input
                    type="text"
                    id="fullname"
                    name="fullname"
                    onChange={inputHandler}
                    value={newComplaint.fullname}
                    className="form-control"
                    placeholder="Enter Name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="accountNo" className="form-label">
                    Customer Id:
                  </label>
                  <br />
                  <input
                    type="text"
                    id="accountNo"
                    name="accountNo"
                    value={newComplaint.accountNo}
                    className="form-control"
                    onChange={inputHandler}
                    placeholder="Enter Customer id"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="reason" className="form-label">
                    Reason:
                  </label>
                  <br />
                  <select
                    className="form-control-selection"
                    id="reason"
                    name="reason"
                    value={newComplaint.reason}
                    onChange={inputHandler}
                  >
                    <option value="">Select Reason</option>
                    <option value="Internet Not Working">Internet Not Working</option>
                    <option value="Payment Issue">Payment Issue</option>
                    <option value="Connecting Issue">Connecting Issue</option>
                    <option value="Speed is Slow">Speed is Slow</option>
                    <option value="Unable to Connect">Unable to Connect</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Message:
                  </label>
                  <br />
                  <textarea
                    type="text"
                    className="form-control"
                    rows="3"
                    id="message"
                    name="message"
                    value={newComplaint.message}
                    onChange={inputHandler}
                    placeholder="Explain Your Issue in Detail...."
                  ></textarea>
                </div>
                <div className="form-group">
                  <button type="submit" className="btn-submit btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <BottomFooter />
    </div>
  );
}

export default SupportPage;
