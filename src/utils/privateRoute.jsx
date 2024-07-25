// // PrivateRoute.js

// import React, { useState, useEffect } from 'react';
// import { Outlet, Navigate } from 'react-router-dom';
// import { isTokenExpired, removeToken } from '../utils/tokenUtils'; // Import token utils

// const PrivateRoute = ({ element, ...rest }) => {
//     const [expired, setExpired] = useState(false); // State to track session expiry

//     useEffect(() => {
//         const checkTokenExpiration = () => {
//             if (isTokenExpired()) {
//                 removeToken(); // Clear token from cookies manually
//                 setExpired(true);
//             }
//         };

//         checkTokenExpiration(); // Initial check on component mount

//         const interval = setInterval(checkTokenExpiration, 10000); // Check every 10 seconds

//         return () => clearInterval(interval); // Clean up interval on unmount
//     }, []);

//     if (expired) {
//         setTimeout(() => {
//             alert('Your session has expired. Please log in again.');
//         }, 1000);
//         return <Navigate to="/" replace />;
//     }

//     return <Outlet {...rest} />;
// };

// export default PrivateRoute;
