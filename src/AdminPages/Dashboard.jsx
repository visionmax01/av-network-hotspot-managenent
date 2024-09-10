import React, { useEffect, useState } from "react";
import Sidenav from "../Components/Sidenav";
import AdminNavBar from "../Components/AdminNavBar";
import Box from "@mui/material/Box";
import "./css/dashboard.css";
import WifiPasswordIcon from "@mui/icons-material/WifiPassword";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { alpha, styled } from "@mui/material/styles";
import { pink } from "@mui/material/colors";
import Switch from "@mui/material/Switch";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

const PinkSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: pink[600],
    "&:hover": {
      backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: pink[600],
  },
}));

const label = { inputProps: { "aria-label": "Color switch demo" } };

function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [inactiveUsers, setInactiveUsers] = useState(0);
  const [totalJoiningReq, setTotalNewJoining] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchError, setSearchError] = useState("");
  useEffect(() => {
    fetchUserData();
    fetchnewJoinData();
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/getAllUserData");
      const userData = await response.json();
      const total = userData.length;
      const active = userData.filter(user => user.accountStatus === 'Active').length;
      const inactive = total - active;
      setTotalUsers(total);
      setActiveUsers(active);
      setInactiveUsers(inactive);
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };
  const fetchnewJoinData = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/getAllJoinRequest");
      const userData = await response.json();
      const total = userData.length;
      setTotalNewJoining(total);
     
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };
  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/api/searchByAccountNo/${searchInput}`);
      const searchData = await response.json();
      setSearchResults(searchData ? [searchData] : []);
      setSearchError(searchData ? "" : "User not found with this account number");

    } catch (error) {
      console.error("Error searching user data: ", error);
    }
  };
  const formattedDate = currentTime.toISOString().slice(0, 10);
  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });


  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    return dateObject.toLocaleDateString("en-GB");
  };
  return (
    <div>
      <AdminNavBar/>
      <div className="back-bg-black">
        <Box sx={{ display: "flex" }}>
          <Sidenav/>
          <Box
            component="main"
            sx={{ flexGrow: 1, p: 1, backgroundColor: "#fff" }}
          >
            <div className="Dashboard-main">
              <div className="container-containt">
                <div className="left-side-container">
                  <div className="Dashboard-card">
                    <span className="Icon_color">
                      <VerifiedUserIcon />
                    </span>
                    &nbsp;&nbsp;
                    <span className="Number-Present">{totalUsers}</span>
                    <p className="sub-title">TOTAL USER'S</p>
                  </div>
                  <div className="Dashboard-card">
                    <span className="Icon_color">
                      <WifiPasswordIcon />
                    </span>
                    &nbsp;&nbsp;
                    <span className="Number-Present1">{activeUsers}</span>
                    <p className="sub-title">ACTIVE USER'S</p>
                  </div>
                  <div className="Dashboard-card">
                    <span className="Icon_color">
                      <WifiOffIcon />
                    </span>
                    &nbsp;&nbsp;
                    <span className="Number-Present2">{inactiveUsers}</span>
                    <p className="sub-title">INACTIVE USER'S</p>
                  </div>
                  <div className="Dashboard-card">
                    <span className="Icon_color">
                      <NewReleasesIcon />
                    </span>
                    &nbsp;&nbsp;
                    <span className="Number-Present3">{totalJoiningReq}</span>
                    <p className="sub-title">JOINING REQUEST</p>
                  </div>
                </div>

                <div className="container-bottom-main">
                  <div className="Search-Box-dash">
                    <span className="titel-text">DASHBOARD</span>
                    <form onSubmit={handleSearch}>
                      <span className="search-containt">
                        <span className="search-field">
                          <input type="text" placeholder="Search....." name="search" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                        </span>
                        <button className="search-btn" type="submit">
                          <SearchIcon />
                        </button>
                      </span>
                    </form>
                  </div>
                  {/* Display search results in a table */}
                  <div className="search-resuld-box122">
                    <table className="table-Section">
                      <thead>
                        <tr >
                          <th>Fullname</th>
                          <th>Email</th>
                          <th>Status</th>
                          <th>Action</th>
                          {/* Add more table headers if needed */}
                        </tr>
                      </thead>
                      <tbody>
                        {searchResults.map(user => (
  <tr key={user._id}>
    <td>{user.fullname}</td>
    <td>{user.email}</td>
    <td>{user.accountStatus}</td>
    <td className="howerInfo">
      {searchError ? (
        <div className="search-error">{searchError}</div>
      ) : (
        <>
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
        </>
      )}
    </td>
  </tr>
))}


                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="card_datetime">
                <div className="text-style-date">
                  <div className="date-Label">
                    <div className="Icon_color">
                      <span>
                        <DateRangeIcon />
                      </span>
                    </div>
                    <div className="Icon_color">
                      <span className="date-time1">Date</span>
                    </div>
                  </div>

                  <br />
                  <span className="date">{formattedDate}</span>
                  <hr />
                </div>
                <div className="text-style-time">
                  <div className="date-Label">
                    <div className="Icon_color">
                      <span>
                        <AvTimerIcon />
                      </span>
                    </div>
                    <div className="Icon_color">
                      <span className="date-time1">Time</span>
                    </div>
                  </div>
                  <br />
                  <span className="time">{formattedTime}</span>
                </div>
              </div>
            </div>
          </Box>
        </Box>
      </div>
    </div>
  );
}
export default Dashboard;
