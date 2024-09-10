import React from "react";
import Button from "@mui/material/Button";
import { CSVLink } from "react-csv";

const CSVComponent = ({ users }) => {
  const generateCSVData = () => {
    const data = [];
    // Adding CSV header
    data.push(["S.N", "Full Name", "Email", "Phone No", "Gender", "Address"]);
    
    // Populating CSV data with user information
    users.forEach((user, index) => {
      const serialNumber = index + 1;
      data.push([serialNumber, user.fullname, user.email, user.phoneNo, user.gender, user.address]);
    });

    return data;
  };

  const csvData = generateCSVData();

  return (
    <CSVLink  data={csvData} filename={"user_details.csv"}>
      <Button><b className="textPDFCSV">CSV</b></Button>
    </CSVLink>
  );
};

export default CSVComponent;
