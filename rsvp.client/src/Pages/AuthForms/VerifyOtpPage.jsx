import React from 'react';
import { useNavigate } from "react-router-dom";
import FormBtn from '../../Components/FormBtn';
import { MdOutlineVerifiedUser } from "react-icons/md";
import { IoMdArrowBack } from "react-icons/io";


const VerifyOtpPage = () => {
    const navigate = useNavigate();
    const handleVerifyOtp = () => {
        navigate("/auth/resetpassword");
    }
    return (
        <div className="w-full max-w-md bg-white shadow-sm rounded-lg p-6 flex flex-col gap-6">
            <header className="flex flex-col items-center gap-1">
                <div className="h-12 w-12 border border-[#e0e0e0] text-primary-txt rounded-lg flex items-center justify-center mb-5 ">
                    <MdOutlineVerifiedUser className="h-5 w-5" />
                </div>
                <h1 className="text-2xl font-semibold mb-2">Verify OTP</h1>
                <p className="text-sm text-center font-light text-secondary-txt">
                    We have sent a 5 digitverification code to your email
                </p>
            </header>
            <form className="flex flex-col gap-4">
                <div className="flex justify-between gap-2">
                    {[...Array(5)].map((_, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            className="border border-[#e0e0e0] rounded-md h-16 w-16 text-center text-[#0077b5] text-xl focus:border-primary focus:ring-0 outline-none peer"
                            onInput={(e) => {
                                const input = e.target;
                                input.value = input.value.replace(/[^0-9]/g, ""); 
                                if (input.value.length === 1 && input.nextElementSibling) {
                                    input.nextElementSibling.focus(); 
                                }
                            }}
                            onKeyDown={(e) => {
                                if (
                                    e.key === "Backspace" &&
                                    e.target.previousElementSibling
                                ) {
                                    e.target.previousElementSibling.focus(); 
                                }
                            }}
                        />
                    ))}
                </div>
                <p className="text-sm text-right text-primary-txt font-regular">01:30</p>

                <div className="flex flex-col gap-6 w-full">
                    <FormBtn btnText="Verify OTP" onClick={handleVerifyOtp} />

                    <p className="text-sm text-center text-primary-txt font-light">
                        Didn't receive the OTP?{" "}
                        <button className="text-[#0077b5] font-medium ml-1">Resend OTP</button>
                    </p>

                    <button
                        className="border border-[#ccc] hover:bg-[#f5f5f5] text-[#333333] px-4 py-2 rounded-md flex gap-2 items-center justify-center"
                        onClick={() => { navigate("/auth/login") }}
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
}

export default VerifyOtpPage;