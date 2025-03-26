import React from 'react';
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <section className="h-screen bg-[#f9f9f9] flex justify-center items-center">
            {<Outlet/>}
        </section>
    );
}

export default AuthLayout;