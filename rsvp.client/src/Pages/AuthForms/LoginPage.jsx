import React from 'react';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUserLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { RiLockPasswordFill } from "react-icons/ri";

import InputFieldComponent from '../../Components/InputFieldComponent'
import PasswordFieldComponent from '../../Components/PasswordFieldComponent';
import FormBtn from '../../Components/FormBtn';
import axios from "axios";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error(email ? "Password field not filled!" : "Email field not filled!");
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:5179/auth/login',
                { email, password },
                { withCredentials: true }
            );

            if (response.status === 200) {
                toast.success("Login successful!");
                console.log("User Data:", response.data);
                navigate("/");
            }
        } catch (error) {
            console.error("Login Error:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Login failed! Try again.");
        }
    };


    return (
        <div className="w-full max-w-md bg-white rounded-lg p-6 flex flex-col gap-8 shadow-sm">
            <header className="flex flex-col items-center gap-1">
                <div className="h-10 w-10 border border-[#e0e0e0] text-primary-txt rounded-lg flex items-center justify-center mb-5 ">
                    <FaUserLock className="h-5 w-5" />
                </div>
                <h1 className="text-2xl font-semibold mb-2">Hi, Welcome Back</h1>
                <p className="text-center text-sm font-light text-secondary-txt">
                    Enter your credentials to access your account
                </p>
            </header>
            <form className="flex flex-col gap-5" onSubmit={handleLogin}>
                <InputFieldComponent
                    label="Email"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    icon={MdEmail}
                    value={email}
                    onChange={setEmail}
                    required={true}
                />

                <PasswordFieldComponent
                    label="Password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    icon={RiLockPasswordFill}
                    value={password}
                    onChange={setPassword}
                    required={true}
                />

                <div className="flex justify-between items-center gap-3">
                    {/* Remember Me Checkbox */}
                    <label className="flex items-center text-sm text-primary-txt cursor-pointer">
                        <input
                            type="checkbox"
                            className="mr-2 accent-primary-btn cursor-pointer"
                            id="rememberMe"
                        />
                        Remember Me
                    </label>

                    {/* Forgot Password Link */}
                    <div>
                        <a
                            href="/auth/forgetpassword"
                            className="w-full text-sm text-[#0077b5]"
                        >
                            Forgot Password?
                        </a>
                    </div>
                </div>

                <FormBtn btnText="Login" type="submit" />

                <div className="flex gap-3 items-center">
                    <hr className="w-full border-1/2 border-[#ccc]" />{" "}
                    <p className="text-sm text-[#c0c1bf] font-body">OR</p>{" "}
                    <hr className="w-full border-1/2 border-[#ccc]" />
                </div>

                <button className="border border-[#ccc] hover:bg-[#f5f5f5] text-[#333333] px-4 py-2 rounded-md flex gap-2 items-center justify-center cursor-pointer">
                    <FcGoogle className="h-5 w-5" />
                    <span className="text-sm font-medium font-body">
                        Continue with Google
                    </span>
                </button>

                <p className="text-sm text-center text-primary-txt font-light">
                    Don't have an account?{" "}
                    <Link
                        to="/auth/register"
                        className="text-[#0077b5] font-medium"
                    >
                        Register
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default LoginPage;