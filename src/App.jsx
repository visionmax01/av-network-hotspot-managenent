// Import necessary modules
import React, { useState, useEffect } from 'react';
import { RouterProvider, createBrowserRouter, useRoutes } from 'react-router-dom';
import './AdminPages/css/toast.css'
import Axios from 'axios'; 
import Home from './HomePage/Home';
import Login from './LoginRegisterPage/Login';
import Dashboard from './AdminPages/Dashboard';
import ManageUser from './AdminPages/Manage-user';
import PaymentDetail from './AdminPages/PaymentDetail';
import NewRequest from './AdminPages/New-joining-req';
import UserComplaint from './AdminPages/UserComplaint';
import AddUser from './FormsPage/AddUser';
import UpdateUser from './FormsPage/UpdateUserDetail';
import UserProfile from './ProfilePage/UserProfile';
import ActivateUser from './FormsPage/activate-user';
import AdminProfile from './ProfilePage/admin-profile';
import ChangePassword from './FormsPage/ChangePassword';
import Register from './LoginRegisterPage/AddAdmin';
import ProtectedRoute from './ProtectedRoute/Protected';
import Payment from './PaymentPage/PaymentPage';
import Services from './ServicePage/ServicesPage';
import Support from './SupportPage/SupportPage';
import ForgetPassword from './LoginRegisterPage/ForgetPassword';
import ResetPassword from './LoginRegisterPage/ResetPassword';
import PaymentForm from './PaymentPage/payment_form';

const authenticate = () => {
  const token = localStorage.getItem('token'); 
  return token ? true : false;
};


function App() {
  const [authenticated, setAuthenticated] = useState(authenticate());
  const route = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/Payment', element: <Payment /> },
    { path: '/Services', element: <Services /> },
    { path: '/support', element: <Support /> },
    { path: '/forget-password', element: <ForgetPassword /> },
    { path: '/reset-password/:token', element: <ResetPassword /> },
    { path: '/login', element: <Login setAuthenticated={setAuthenticated} /> },
    // Protect admin routes using ProtectedRoute
    { path: '/admin-dashboard', element: <ProtectedRoute authenticated={authenticated}><Dashboard /></ProtectedRoute> },
    { path: '/add-user', element: <ProtectedRoute authenticated={authenticated}><AddUser /></ProtectedRoute> },
    { path: '/manage-user', element: <ProtectedRoute authenticated={authenticated}><ManageUser /></ProtectedRoute> },
    { path: '/payment-detail', element: <ProtectedRoute authenticated={authenticated}><PaymentDetail /></ProtectedRoute> },
    { path: '/new-joining-request', element: <ProtectedRoute authenticated={authenticated}><NewRequest /></ProtectedRoute> },
    { path: '/user-complaint', element: <ProtectedRoute authenticated={authenticated}><UserComplaint /></ProtectedRoute> },
    { path: '/create-admin', element: <ProtectedRoute authenticated={authenticated}><Register /></ProtectedRoute> },
    { path: '/update-user-detail/:id', element: <ProtectedRoute authenticated={authenticated}><UpdateUser /></ProtectedRoute> },
    { path: '/activate-user-account/:id', element: <ProtectedRoute authenticated={authenticated}><ActivateUser /></ProtectedRoute> },
    { path: '/user-profile-dashboard/:id', element: <ProtectedRoute authenticated={authenticated}><UserProfile /></ProtectedRoute> },
    { path: '/admin-dashboard', element: <ProtectedRoute authenticated={authenticated}><AdminProfile /></ProtectedRoute> },
    { path: '/admin-dashboard', element: <ProtectedRoute authenticated={authenticated}><ChangePassword /></ProtectedRoute> },
    { path: '/admin-profile', element: <ProtectedRoute authenticated={authenticated}><AdminProfile /></ProtectedRoute> },
    { path: '/user-payment/:id', element: <ProtectedRoute authenticated={authenticated}><PaymentForm /></ProtectedRoute> },
  ]);

  return (
    <div className='App'>
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
