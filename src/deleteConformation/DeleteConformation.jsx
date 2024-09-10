import React from "react";
import './conformation.css';
import deleteGif from'../gif/deleteIcon.gif'
function ConfirmationPopup({ message, onConfirm, onCancel }) {
  return (
    <div className="confirmation-popup-overlay">
      <div className="confirmation-popup">
          <div className="conformationArea">
          <div className="warningSection">
        <img src={deleteGif} alt="deleteIcon"/>
        <p>{message}</p>
        </div>
       <div className="popup-buttons">
          <button className="confirm-button" onClick={onConfirm}>Yes</button>
          <button className="cancel-button" onClick={onCancel}>No</button>
        </div>
          </div>
      </div>
    </div>
  );
}

export default ConfirmationPopup;
