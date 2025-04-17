import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import {IoFingerPrintSharp} from "react-icons/io5"
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import InputFieldComponent from '../../Components/InputFieldComponent'
import FormBtn from "../../Components/FormBtn";
import axios from "axios";
import toast from "react-hot-toast";

const ForgetPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  
  const handleSendOTP = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('', JSON.stringify(email));
      
      if (response.status === 200) {
       toast.success('OTP Sent!')
        navigate("/auth/verifyotp");
      } else {
        alert("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("An error occurred while sending OTP. Please check your network or try again later.");
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg p-6 flex flex-col gap-6 shadow-sm">
      <header className="flex flex-col items-center gap-1">
        <div className="h-12 w-12 border border-[#e0e0e0] text-primary-txt rounded-lg flex items-center justify-center mb-5 ">
          <IoFingerPrintSharp className="h-5 w-5" />
        </div>
        <h1 className="text-2xl font-semibold mb-2">Forget Password?</h1>
        <p className="text-sm text-center font-light text-secondary-txt">
          Enter the email address associated with your account and we will send
          you a verification code to reset your password.
        </p>
      </header>
      <form className="flex flex-col gap-8">
        <InputFieldComponent
          label="Email"
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          icon={MdEmail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required={true}
        />

        <div className="flex flex-col gap-3 w-full">
          <FormBtn btnText="Send OTP" onClick={handleSendOTP} />

          <button
            className="border border-[#ccc] hover:bg-[#f5f5f5] text-[#333] px-4 py-2 rounded-md flex gap-2 items-center justify-center"
            onClick={() => navigate("/auth/login")}
          >
            <IoMdArrowBack className="h-5 w-5" />
            <span className="text-sm font-medium font-body">Back to Login</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgetPasswordPage;
