import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    const isLoggedIn = Boolean(localStorage.getItem('token'))

    if (!isLoggedIn) {
        return <Navigate to='/login' replace/>
    } else {
        return children
    }
}

export default ProtectedRoute
