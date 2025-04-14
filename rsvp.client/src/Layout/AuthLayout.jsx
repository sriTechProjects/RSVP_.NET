import React from 'react';
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <section className="min-h-screen bg-[#f9f9f9] flex justify-center items-center p-5">
            {<Outlet/>}
        </section>
    );
}

export default AuthLayout;