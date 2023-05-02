import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const Protected = ({ token }) => {
    return (
        token === null ?
        <Navigate to='/login' replace /> :
        <Outlet />
    );
};

export default Protected;