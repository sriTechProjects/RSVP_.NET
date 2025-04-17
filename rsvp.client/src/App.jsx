import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from './Pages/AuthForms/LoginPage.jsx';
import ClubRegistrationPage from './Pages/AuthForms/ClubRegistrationPage.jsx';
import GuestRegistrationPage from './Pages/AuthForms/GuestRegistrationPage.jsx';
import VerifyOtpPage from './Pages/AuthForms/VerifyOtpPage.jsx';
import ResetPassword from './Pages/AuthForms/ResetPassword.jsx';
import ForgetPasswordPage from './Pages/AuthForms/ForgetPasswordPage.jsx';
import UserHome from './Pages/UserPages/UserHome.jsx';
import AuthLayout from './Layout/AuthLayout.jsx'
import UserLayout from './Layout/UserLayout.jsx';
import { Toaster } from 'react-hot-toast';
import OrganiserLayout from './Layout/OrganiserLayout.jsx';
import OrganiserDashboard from './Pages/OrganiserPages/OrganiserDashboard.jsx';
import OrganiserEvents from './Pages/OrganiserPages/OrganiserEvents.jsx';


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
                    path: 'register', element: <GuestRegistrationPage />
                },
                {
                    path: 'orgregister', element: <ClubRegistrationPage/>
                },
                {
                    path: 'verifyotp', element: <VerifyOtpPage />
                },
                {
                    path: 'forgetpassword', element: <ForgetPasswordPage />
                },
                {
                    path: 'resetpassword', element: <ResetPassword />
                }

            ]
        },

        {
            path: "/organiser",
            element: <OrganiserLayout />,
            children: [
                {
                    path: '', element: <OrganiserDashboard/>
                },
                {
                    path: 'events', element: <OrganiserEvents/>
                }
            ]
        },
    ])
    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <RouterProvider router={routes} />
        </>
    )
}

export default App
