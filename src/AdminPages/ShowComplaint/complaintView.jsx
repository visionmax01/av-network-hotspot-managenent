import React, { useState } from 'react';
import './showcomplaint.css';
import axios from 'axios';

const ComplaintView = ({ onClose }) => {
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
            setError('Failed to submit payment. Please try again.');
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
                        <h3>Payment form</h3>
                        <div className="form-fields">
                            <h5>Note: <span>Fill all the details correctly!</span>
                                <p className='fileUploadInfo'>Only Upload screenshot or photo of a successful payment!</p></h5>

                            <div className="formSection">
                                <div className="formGroup">
                                    <label htmlFor="accountNo">Account No:</label>
                                    <div className="input-FormGroup">
                                        <i className="fa-solid fa-building-columns"></i>
                                        <input
                                            type="text"
                                            className="formInputField"
                                            placeholder="AV0001"
                                            aria-label="Account No"
                                            name="accountNo"
                                            value={formData.accountNo}
                                            onChange={handleChange}
                                            onBlur={handleAccountNoBlur}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="formGroup">
                                    <label htmlFor="fullname">Customer Name:</label>
                                    <div className="input-FormGroup">
                                        <i className="fas fa-user"></i>
                                        <input
                                            type="text"
                                            className="formInputField"
                                            placeholder="Santosh Sah"
                                            aria-label="Full Name"
                                            name="fullname"
                                            value={formData.fullname}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="formSection">
                                <div className="formGroup">
                                    <label htmlFor="startFrom">Started From:</label>
                                    <div className="input-FormGroup">
                                        <i className="fa-solid fa-calendar-days"></i>
                                        <input
                                            type="date"
                                            id='startFrom'
                                            name='startedDate'
                                            className="formInputField"
                                            aria-label="Start Date"
                                            value={formData.startedDate}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="formGroup">
                                    <label htmlFor="endedDate">Ended To:</label>
                                    <div className="input-FormGroup">
                                        <i className="fa-solid fa-calendar-days"></i>
                                        <input
                                            type="date"
                                            id='endedDate'
                                            name='endedDate'
                                            className="formInputField"
                                            aria-label="End Date"
                                            value={formData.endedDate}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="formSection">
                                <div className="formGroup">
                                    <label htmlFor="amountPaid">Paying Amount:</label>
                                    <div className="input-FormGroup">
                                        <i className="fa-solid fa-indian-rupee-sign"></i>
                                        <input
                                            type="number"
                                            id='amountPaid'
                                            name='amountPaid'
                                            className="formInputField"
                                            placeholder="500.."
                                            aria-label="Amount Paid"
                                            value={formData.amountPaid}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="formGroup">
                                    <label htmlFor="receiptImage">Receipt Image:</label>
                                    <div className="input-FormGroup">
                                        <input
                                            type="file"
                                            className="formInputFile"
                                            aria-label="Receipt Image"
                                            onChange={handleFileChange}
                                            required
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
                    <br />
                    {error && <div className="error-message">{error}</div>}
                </div>
            </div>
        </>
    );
}

export default ComplaintView;
