// Protected.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Protected = ({ Component, adminData, setAdminData }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    axios.get('http://localhost:3000/auth/verify')
      .then(res => {
        if (res.data.status) {
          setAdminData({ ...adminData, isLoggedIn: res.data.isLoggedIn });
          console.log("Verified");
        } else {
          navigate('/login');
        }
      });
  }, [navigate, setAdminData, adminData]);
  
  return <Component />;
};

export default Protected;
