import React, { useState } from 'react'
import "./paymentForm.css"
import axios from 'axios';


const PaymentForm =({ onClose }) => {
    const [formData, setFormData] = useState({
        accountNo: '',
        fullname: '',
        startedDate: '',
        endedDate: '',
        amountPaid: '',
        receiptImage: null,
      });
    
      const [error, setError] = useState('');
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleFileChange = (e) => {
        setFormData({ ...formData, receiptImage: e.target.files[0] });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:8000/api/makePayment', formData);
          console.log(response.data);
          onClose(); // Close the form after successful submission
        } catch (error) {
          console.error('Error submitting payment request:', error);
        }
      };
    
      const handleAccountNoBlur = async () => {
        try {
          const response = await axios.post('/getuserWithPayment', { accountNo: formData.accountNo });
          if (response.data.length > 0) {
            setFormData({ ...formData, fullname: response.data[0].fullname });
          } else {
            setError('Invalid account number. Please enter a valid account number.');
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
          setError('An error occurred while fetching user details. Please try again.');
        }
      };
    const handleClose = () => {
        onClose();
      };
    return (
        <>
            <div className="popup-overlay">
                <div className="popup-container">
                    <form onSubmit={handleSubmit} className='formSectionMain'>
                        <h3>Payment form </h3>
                        <div className="form-fields">
                            <h5>Note : <span>Fill all the details correctly!</span>
                                <p className='fileUploadInfo'> Only Upload screenshot or photo of a successful payment!</p></h5>
    
                            <div className="formSection">
                                <div className="formGroop">
                                    <label htmlFor="accountNo">Account No :</label>
                                    <div className="input-Formgroup">
                                        <i className="fa-solid fa-building-columns"></i>
                                        <input
                                            type="text"
                                            className="formInputField"
                                            placeholder="AV0001"
                                            aria-label="Account No"
                                            aria-describedby="basic-addon1"
                                            name="accountNo"
                                            value={formData.accountNo}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="formGroop">
                                    <label htmlFor="fullname">Customer name :</label>
                                    <div className="input-Formgroup">
                                        <i className="fas fa-user"></i>
                                        <input
                                            type="text"
                                            className="formInputField"
                                            placeholder="Santosh Sah"
                                            aria-label="Full Name"
                                            aria-describedby="basic-addon1"
                                            name="fullname"
                                            value={formData.fullname}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
    
                            <div className="formSection">
                                <div className="formGroop">
                                    <label htmlFor="startFrom">Started From :</label>
                                    <div className="input-Formgroup">
                                        <i className="fa-solid fa-calendar-days"></i>
                                        <input
                                            type="date"
                                            id='startFrom'
                                            name='startedDate'
                                            className="formInputField"
                                            aria-label="Start Date"
                                            aria-describedby="basic-addon1"
                                            value={formData.startedDate}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="formGroop">
                                    <label htmlFor="endedDate">Ended To :</label>
                                    <div className="input-Formgroup">
                                        <i className="fa-solid fa-calendar-days"></i>
                                        <input
                                            type="date"
                                            id='endedDate'
                                            name='endedDate'
                                            className="formInputField"
                                            aria-label="End Date"
                                            aria-describedby="basic-addon1"
                                            value={formData.endedDate}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
    
                            <div className="formSection">
                                <div className="formGroop">
                                    <label htmlFor="amountPaid">Paying Amount :</label>
                                    <div className="input-Formgroup">
                                        <i className="fa-solid fa-indian-rupee-sign"></i>
                                        <input
                                            type="number"
                                            id='amountPaid'
                                            name='amountPaid'
                                            className="formInputField"
                                            placeholder="500.."
                                            aria-label="Amount Paid"
                                            aria-describedby="basic-addon1"
                                            value={formData.amountPaid}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="formGroop">
                                    <label htmlFor="receiptImage">Receipt Image:</label>
                                    <div className="input-Formgroup">
                                        <input
                                            type="file"
                                            className="formInputFile"
                                            aria-label="Receipt Image"
                                            aria-describedby="basic-addon1"
                                            onChange={handleFileChange}
                                        /><br />
    
                                    </div>
                                </div>
    
                            </div>
    
                            <div className="formSection-btn">
                                <button className='btnPayment' type="submit">Make Payment</button>
                            </div>
                        </div>
    
                    </form>
                    <button className="close-btn" onClick={handleClose}>X</button>
                    <br/>
                    {error && <div className="error-message">{error}</div>}
                </div>
            </div>
        </>
    );
    }    
export default PaymentForm