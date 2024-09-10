import React, { useState, useEffect } from "react";
import AdminNavBar from "../Components/AdminNavBar";
import Sidenav from "../Components/Sidenav";
import Box from "@mui/material/Box";
import "./all-form.css";
import '../AdminPages/css/toast.css';
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [user, setUser] = useState({
    fullname: "",
    email: "",
    phoneNo: "",
    gender: "",
    password: "",
    packageDetail: "",
    startedDate: "",
    endedDate: "",
    accountStatus: "",
    address: "",
    profilePhoto: null,
    documentProof: null,
    createdDate: ""
  });

  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value, files } = e.target;
    setUser({ ...user, [name]: files ? files[0] : value });
  };

  const submitUserForm = async (e) => {
    e.preventDefault();
    if (!user.fullname || !user.email || !user.phoneNo || !user.gender || !user.password || !user.packageDetail || !user.startedDate || !user.endedDate || !user.accountStatus || !user.address) {
      toast.error("All  fields are required", { className: "toastmsg" });
      return;
    }
  
    try {
      const formData = new FormData();
      for (const key in user) {
        if (user.hasOwnProperty(key)) {
          if (key === 'profilePhoto' || key === 'documentProof') {
            formData.append(key, user[key]);
          } else if (key === 'startedDate' || key === 'createdDate') {
            formData.append(key, new Date(user[key]).toISOString());
          } else {
            formData.append(key, user[key]);
          }
        }
      }

      const response = await axios.post("http://localhost:8000/api/createUser", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(response.data.message, { className: "toastmsg" });
      navigate('/manage-user');
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 400 && error.response.data.error === "Email already exists") {
        toast.error("Email already exists", { className: "toastmsg" });
      } else {
        toast.error("An error occurred. Please try again.", { className: "toastmsg" });
      }
    }
  };
  
  // Function to get today's date in the format YYYY-MM-DD
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Set initial value for startedDate and createdDate fields
  useEffect(() => {
    setUser(prevState => ({
      ...prevState,
      startedDate: getTodayDate(),
      createdDate: getTodayDate()
    }));
  }, []);


  return (
    <>
      <AdminNavBar />
      <Box sx={{ display: "flex" }}>
        <Sidenav />

        <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
          <Box height={70} />
          <div className="main-container-form">
            <div className="inside-top-container">
              <h1>Create new User Account</h1>
            </div>
            <div className="inside-bottom-container">
              <form onSubmit={submitUserForm} encType="multipart/form-data">
                <div className="form-group1">


                  <div className="label-text-ares">
                    <label htmlFor="fullname">
                      Full Name<span className="required-field-star">*</span>
                    </label>
                    
                    <input 
                    id="fullname"
                    name="fullname"
                    type="text"
                    className="form-control-input"
                        onChange={inputHandler}
                        autoComplete="off"
                     />
                  </div>


                  <div className="label-text-ares">
                    <label htmlFor="email">
                      Email <span className="required-field-star">*</span>
                    </label>
                    <input
                      className="form-control-input"
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="off"
                        onChange={inputHandler}
                        placeholder="Email"
                    />
                  </div>


                  <div className="label-text-ares">
                    <label htmlFor="phoneNo">
                      Phone<span className="required-field-star">*</span>
                    </label>
                    <div className="phone-text-ares">
                      <input
                        className="phone-code-field"
                        type="text"
                        placeholder="+977"
                        disabled
                      />
                      <input
                        type="text"
                        name="phoneNo"
                        id="phoneNo"
                        autoComplete="off"
                        className="form-control-phone"
                        onChange={inputHandler}
                        placeholder="Enter phone no "
                      />
                    </div>
                  </div>


                </div>
                <br />


                <div className="form-group1">
                  <div className="label-text-ares">
                    <label htmlFor="gender">
                      Gender<span className="required-field-star">*</span>
                    </label>
                    <select
                        className="form-control-option"
                        name="gender"
                        id="gender"
                        onChange={inputHandler}
                        autoComplete="off"
                    >
                      <option value="null">Chose your Gender</option>
                      <option value="male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div className="label-text-ares">
                  <label htmlFor="address">
                      Address<span className="required-field-star">*</span>
                    </label>
                    <input
                      id="address"
                      name="address"
                      autoComplete="off"
                      type="text"
                        onChange={inputHandler}
                        className="form-control-date"
                    />
                  </div>
                  <div className="label-text-ares">
                    <label htmlFor="password">
                      Password<span className="required-field-star">*</span>
                    </label>
                    <div className="phone-text-ares">
                      <input
                        name="password"
                        id="password"
                        autoComplete="off"
                        type="password"
                        className="form-control-input"
                        onChange={inputHandler}
                        placeholder="*************"
                      />
                    </div>
                  </div>
                </div>
                <br />
                <div className="form-group1">
                  <div className="label-text-ares">
                    <label htmlFor="packageDetail">
                      Select Package
                      <span className="required-field-star">*</span>
                    </label>
                    <select
                      id="packageDetail"
                      name="packageDetail"
                      type="text"
                      autoComplete="off"
                        onChange={inputHandler}
                        className="form-control-option"
                    >
                      <option value="null">Chose your package</option>
                      <option value="1Mbps-1Month/Rs.300">1Mbps-1Month/Rs.300</option>
                      <option value="1Mbps-3Month/Rs.900" >1Mbps-3Month/Rs.900</option>
                      <option value="Male">1Mbps-1Month/Rs.300</option>
                      <option value="Male">1Mbps-1Month/Rs.300</option>
                      <option value="Male">1Mbps-1Month/Rs.300</option>
                    </select>
                  </div>
                  <div className="label-text-ares">
                    <label htmlFor="startedDate">
                      Started From<span className="required-field-star">*</span>
                    </label>
                    <input
                      id="startedDate"
                        value={user.startedDate}
                        name="startedDate"
                      type="date"
                      autoComplete="off"
                        onChange={inputHandler}
                        className="form-control-date"
                    />
                  </div>

                  <div className="label-text-ares">
                    <label htmlFor="endedDate">
                      Ended To<span className="required-field-star">*</span>
                    </label>
                    <div className="phone-text-ares">
                      <input
                        id="endedDate"
                        name="endedDate"
                        autoComplete="off "
                        type="date"
                        onChange={inputHandler}
                        className="form-control-date"
                      />
                    </div>
                  </div>
                </div>
                <br />
                <div className="form-group1">
                  <div className="label-text-ares">
                    <label htmlFor="accountStatus">
                      Account Status
                      <span className="required-field-star">*</span>
                    </label>
                    <select
                      className="form-control-option"
                      name="accountStatus"
                      type="text"
                      id="accountStatus"
                        onChange={inputHandler}
                        autoComplete="off"
                    >
                      <option value="Active">Chose your Status</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="label-text-ares">
                    <label htmlFor="createdDate">
                      Created Date<span className="required-field-star">*</span>
                    </label>
                    <input
                      id="createdDate"
                      name="createdDate"
                      autoComplete="off"
                      value={user.createdDate}
                      type="date"
                        onChange={inputHandler}
                        className="form-control-date"
                    />
                  </div>
                  <div className="label-text-ares">
                  <label htmlFor="profilePhoto">Profile Photo</label>
                    <div className="phone-text-ares">
                      <input
                        id="profilePhoto"
                        name="profilePhoto"
                        autoComplete="off"
                        onChange={inputHandler}
                        type="file"
                      />
                    </div>
                  </div>
                </div>
                <br />

                <div className="form-group1">
                  
                  <div className="label-text-ares">
                    <label htmlFor="documentProof">citizenship copy</label>
                    <div className="phone-text-ares">
                      <input
                        id="documentProof"
                        name="documentProof"
                        autoComplete="off"
                        type="file"
                        placeholder="chose File"
                        onChange={inputHandler}
                      />
                    </div>
                  </div>
             
                  
                </div>
                <br />
                  <button type="submit" className="btn-form-summit">
                    Create User
                  </button>
                <div>
                </div>
              </form>
            </div>
          </div>
        </Box>
      </Box>
    </>
  );
};
export default AddUser;
