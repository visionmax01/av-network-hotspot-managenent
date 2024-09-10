import React from "react";
import Button from "@mui/material/Button";
import html2pdf from 'html2pdf.js';
import './pdf.css';


const PDFComponent = ({ users }) => {
  const handleDownloadPDF = () => {
    const tableContent = generateTableContent();

    html2pdf().from(tableContent).save("user_details.pdf");
  };

  const generateTableContent = () => {
    // Generate HTML table
    let tableHTML = `
      <div style="text-align:center; margin-top:20px;">
        <h2>AV Network Company pvt. ltd.</h2>
        <img src={"./Av_network-logo.png"} alt="" />
        <h3>Customer Data </h3>
      </div>
      <table border="1" className= "pdf-table">
        <thead className="table-head ">
          <tr>
            <th>S.N</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone No</th>
            <th>Gender</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
    `;
  
    // Populate table rows with user data
    users.forEach((user, index) => {
      const serialNumber = index + 1; // Incrementing serial number
      tableHTML += `
        <tr key=${user._id} id="table-bg-id" >
          <td>${serialNumber}</td>
          <td>${user.fullname}</td>
          <td>${user.email}</td>
          <td>${user.phoneNo}</td>
          <td>${user.gender}</td>
          <td>${user.address}</td>
        </tr>
      `;
    });
  
    // Close HTML table
    tableHTML += `
        </tbody>
      </table>
    `;
  
    return tableHTML;
  };
  

  return (
    <Button  onClick={handleDownloadPDF}>
      <b className="textPDFCSV">PDF</b>
    </Button>
  );
};

export default PDFComponent;
