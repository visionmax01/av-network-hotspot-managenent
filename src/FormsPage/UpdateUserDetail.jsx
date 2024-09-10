import React, { useEffect, useState } from "react";
import Sidenav from "../Components/Sidenav";
import Box from "@mui/material/Box";
import AdminNavBar from "../Components/AdminNavBar";
import toast from "react-hot-toast";
import '../AdminPages/css/toast.css';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


function formatDateForInput(dateString) {
  const dateObject = new Date(dateString);
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Adding leading zero if necessary
  const day = String(dateObject.getDate()).padStart(2, '0'); // Adding leading zero if necessary
  return `${year}-${month}-${day}`;
}

function UpdateUser() {
const users ={
  fullname:"",
  email:"",
  phoneNo:"",
  gender:"",
  password:"",
  packageDetail:"",
  startedDate:"",
  endedDate:"",
  createdDate:"",
  address:"",
  profilePhoto:""
}
const {id} =useParams();
const navigate =useNavigate();
const [user, setUser] = useState(users);

const inputChangeHandle =(e)=>{
  const {name, value} = e.target;
  setUser({...user, [name]:value});
  console.log(user);
}

useEffect (()=>{
  axios.get(`http://localhost:8000/api/getOne/${id}`)
  .then((response)=>{
     setUser(response.data);
  })
  .catch((error) => {
    console.log(error);
  })
},[id]);


const userUpdateSubmit = async(e)=>{
  e.preventDefault();
      await axios.put(`http://localhost:8000/api/update/${id}`, user)
     .then((response)=>{
       toast.success(response.data.msg, {className:"toastmsg"})
       navigate('/manage-user')
     })
     .catch(error => console.log(error))

}
// Formatting the endedDate for input field
useEffect(() => {
  if (user.endedDate) {
    const formattedEndDate = formatDateForInput(user.endedDate);
    setUser(prevUser => ({
      ...prevUser,
      endedDate: formattedEndDate
    }));
  }
}, [user.endedDate]);
useEffect(() => {
  if (user.startedDate) {
    const formattedEndDate = formatDateForInput(user.startedDate);
    setUser(prevUser => ({
      ...prevUser,
      startedDate: formattedEndDate
    }));
  }
}, [user.startedDate]);
useEffect(() => {
  if (user.createdDate) {
    const formattedEndDate = formatDateForInput(user.createdDate);
    setUser(prevUser => ({
      ...prevUser,
      createdDate: formattedEndDate
    }));
  }
}, [user.createdDate]);

  return (
    <>
       <AdminNavBar />
       <Box sx={{ display: "flex" }}>
        <Sidenav />

        <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
          <Box height={70} />
          <div className="main-container-form">
            <div className="inside-top-container">
              <h1>Update User Account</h1>
            </div>
            <div className="inside-bottom-container">
              <form onSubmit={userUpdateSubmit}>
                <div className="form-group1">


                  <div className="label-text-ares">
                    <label htmlFor="fullname">
                      Full Name<span className="required-field-star">*</span>
                    </label>
                    
                    <input 
                    id="fullname"
                    name="fullname"
                    value={user.fullname}
                    placeholder="Enter name"
                    type="text"
                    className="form-control-input"
                    onChange={inputChangeHandle}
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
                    value={user.email}
                    id="email"
                      autoComplete="off"
                        onChange={inputChangeHandle}
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
                        value={user.phoneNo}
                        id="phoneNo"
                        autoComplete="off"
                        className="form-control-phone"
                        onChange={inputChangeHandle}
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
                      value={user.gender}
                        onChange={inputChangeHandle}
                        autoComplete="off"
                    >
                      <option value="male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div className="label-text-ares">
                    <label htmlFor="account">
                      Account No <span className="required-field-star">*</span>
                    </label>
                    <input
                      id="account"
                      name="account"
                      type="text"
                        onChange={inputChangeHandle}
                        value={user.account}
                        disabled
                        className="form-control-input"
                    />
                  </div>
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
                      value={user.packageDetail}
                        onChange={inputChangeHandle}
                        className="form-control-option"
                    >
                      <option value="1Mbps-1Month/Rs.300">1Mbps-1Month/Rs.300</option>
                      <option value="1Mbps-3Month/Rs.900" >1Mbps-3Month/Rs.900</option>
                      <option value="Male">1Mbps-1Month/Rs.300</option>
                      <option value="Male">1Mbps-1Month/Rs.300</option>
                      <option value="Male">1Mbps-1Month/Rs.300</option>
                    </select>
                  </div>
                </div>
                <br />
                <div className="form-group1">
                <div className="label-text-ares">
                    <label htmlFor="createdDate">
                      Created Date<span className="required-field-star">*</span>
                    </label>
                    <input
                      id="createdDate"
                      value={user.createdDate}
                      name="createdDate"
                      autoComplete="off"
                      type="date"
                        onChange={inputChangeHandle}
                        className="form-control-date"
                    />
                  </div>
                  <div className="label-text-ares">
                    <label htmlFor="startedDate">
                      Started From<span className="required-field-star">*</span>
                    </label>
                    <input
                      id="startedDate"
                      name="startedDate"
                      value={user.startedDate}
                      type="date"
                      autoComplete="off"
                        onChange={inputChangeHandle}
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
                        value={user.endedDate}
                         name="endedDate"
                          autoComplete="off "
                        type="date"
                        onChange={inputChangeHandle}
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
                      value={user.accountStatus}
                      type="text"
                      id="accountStatus"
                        onChange={inputChangeHandle}
                        autoComplete="off"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                 



                  <div className="label-text-ares">
                    <label htmlFor="address">
                      Address<span className="required-field-star">*</span>
                    </label>
                    <input
                      id="address"
                      value={user.address}
                      name="address"
                      autoComplete="off"
                      type="text"
                        onChange={inputChangeHandle}
                        className="form-control-date"
                    />
                  </div>

                  <div className="label-text-ares">
                    <label htmlFor="address">
                      Address<span className="required-field-star">*</span>
                    </label>
                    <input
                      id="address"
                      value={user.address}
                      name="address"
                      autoComplete="off"
                      type="text"
                        onChange={inputChangeHandle}
                        className="form-control-date"
                    />
                  </div>
                </div>
                <br />

       
                  <div className="label-text-ares">
                    <label htmlFor="profilePhoto">Profile Photo</label>
                    <div className="phone-text-ares">
                      <input
                        id="profilePhoto"
                        name="profilePhoto"
                        autoComplete="off"
                        onChange={inputChangeHandle}
                        type="file"
                      />
                    </div>
                  </div>
                <br />
                  <button type="submit" className="btn-form-summit">
                    Update User
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
}
export default UpdateUser;
