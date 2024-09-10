import React, { useState } from "react";
import NavBar from "../Components/NavBar";
import BottomFooter from "../Components/BottomFooter";
import PopupForm from "../PaymentPage/payment_form"; // Import the PopupForm component
import "./paymentpage.css";

/*images */
import Qr1 from "../img/eSewaqr.png";
import Qr2 from "../img/imepayQR.png";
import Qr3 from "../img/khaltiQr.png";

function PaymentPage() {
  const [showPopupForm, setShowPopupForm] = useState(false); 

  const togglePopupForm = () => {
    setShowPopupForm(!showPopupForm);
  };

  const closePopupForm = () => {
    setShowPopupForm(false);
  };
  return (
    <div className="body-container">
      <div className="main-container">
        <NavBar />
        <div className="Heading">
          {" "}
          <h2>“Scan Any Qr To Make Payment”</h2>
        </div>

        <div className="QR-Main-Cobtainer">
          <div className="QR-Container-one" data-aos="fade-right">
            <div className="back_design"></div>
            <img src={Qr1} className="QR-image" alt=""></img>
          </div>
          <div className="QR-Container-one" data-aos="zoom-in">
            <div className="back_design"></div>
            <img src={Qr2} className="QR-image" alt=""></img>
          </div>
          <div className="QR-Container-one" data-aos="fade-left">
            <div className="back_design"></div>
            <img src={Qr3} className="QR-image" alt=""></img>
          </div>
        </div>
        <p className="information">
          <span className="Note-text">Note!</span>
          <br />
          ! After successful Payment please Click Below Payment Form Button !
          <br />
          To Continue Your Service.
        </p>
        <center>
          <button className="paymrntForm-btn" onClick={togglePopupForm}>
            Payment Form
          </button>
        </center>
        {showPopupForm && <PopupForm  onClose={closePopupForm} />}
      </div>
      <BottomFooter />
    </div>
  );
}

export default PaymentPage;
