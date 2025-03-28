import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from './Pages/AuthForms/LoginPage.jsx';
import RegistrationPage from './Pages/AuthForms/RegistrationPage.jsx';
import VerifyOtpPage from './Pages/AuthForms/VerifyOtpPage.jsx';
import ResetPassword from './Pages/AuthForms/ResetPassword.jsx';
import UserHome from './Pages/UserPages/UserHome.jsx';
import AuthLayout from './Layout/AuthLayout.jsx'
import UserLayout from './Layout/UserLayout.jsx';

const App = () => {
    const routes = createBrowserRouter([
        {
            path: "/",
            element: <UserLayout />,
            children: [
                {
                    path: '', element: <UserHome/>
                },
            ]
        },

        {
            path: "/auth",
            element: <AuthLayout />,
            children: [
                {
                    path: 'login', element: <LoginPage />
                },
                {
                    path: 'register', element: <RegistrationPage />
                },
                {
                    path: 'verifyotp', element: <VerifyOtpPage />
                },
                {
                    path: 'forgetpassword', element: <RegistrationPage />
                },
                {
                    path: 'resetpassword', element: <ResetPassword />
                }

            ]
        }
    ])
    return (
        <>
            <RouterProvider router={routes} />
        </>
    )
}

export default App
