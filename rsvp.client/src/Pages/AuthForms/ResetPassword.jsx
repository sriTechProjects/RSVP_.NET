import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import PasswordFieldComponent from '../../Components/PasswordFieldComponent';
import FormBtn from '../../Components/FormBtn';

import { MdOutlinePassword } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdArrowBack } from "react-icons/io";
import axios from "axios";
import toast from "react-hot-toast";


const ResetPassword = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleResetPassword = async () => {
        if (password !== confirmPassword) {
          toast.error('Both passwords should match!');
          return;
        }
      
        try {      
          const response = await axios.post("", {
            newPassword: password,
          });
      
          if (response.status === 200) {
            toast.success("Password reset successful!");
            navigate("/auth/login");
          } else {
            toast.error("Failed to reset password. Please try again.");
          }
        } catch (error) {
          console.error("Reset password error:", error);
          toast.error("An error occurred. Please try again later.");
        }
      };
      

    return (
        <div className="w-full max-w-md bg-white shadow-sm rounded-lg p-6 flex flex-col gap-6">
            <header className="flex flex-col items-center gap-1">
                <div className="h-12 w-12 border border-[#e0e0e0] text-primary-txt rounded-lg flex items-center justify-center mb-5 ">
                    <MdOutlinePassword className="h-5 w-5" />
                </div>
                <h1 className="text-2xl font-semibold mb-2">Set New Password</h1>
                <p className="text-sm text-center font-light text-secondary-txt">
                    Must be at least 8 characters.
                </p>
            </header>
            <form className="flex flex-col gap-8">
                <PasswordFieldComponent
                    label="Password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    icon={RiLockPasswordFill}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required={true}
                />

                <PasswordFieldComponent
                    label="ConfirmPassword"
                    name="confirmpassword"
                    id="confirmpassword"
                    placeholder="Re-enter your password"
                    icon={RiLockPasswordFill}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required={true}
                />

                <div className="flex flex-col gap-3 w-full">
                    <FormBtn btnText="Reset Password" onClick={handleResetPassword} />

                    <button
                        className="border border-[#ccc] hover:bg-[#f5f5f5] text-[#333] px-4 py-2 rounded-md flex gap-2 items-center justify-center"
                        onClick={() => navigate("/auth/login")}
                    >
                        <IoMdArrowBack className="h-5 w-5" />
                        <span className="text-sm font-medium font-body">
                            Back to Login
                        </span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ResetPassword;
