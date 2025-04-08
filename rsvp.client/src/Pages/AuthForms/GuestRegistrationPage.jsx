import React, { useState } from "react";
import InputFieldComponent from "../../Components/InputFieldComponent";
import FormBtn from "../../Components/FormBtn";
import { useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import PasswordFieldComponent from "../../Components/PasswordFieldComponent";

const GuestRegistrationPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleGuestRegister = () => {};

  return (
    <div className="w-full max-w-lg bg-white rounded-lg p-6 flex flex-col gap-6 shadow-sm">
      <header className="flex flex-col items-center gap-1">
        <div className="h-12 w-12 border border-[#e0e0e0] text-primary-txt rounded-lg flex items-center justify-center mb-5 ">
          <FaUserAlt className="h-5 w-5" />
        </div>
        <h1 className="text-2xl font-semibold mb-2">Register as Guest</h1>
        <p className="text-sm text-center font-light text-secondary-txt">
          Join us to unlock unforgettable experiences — from live shows to
          hidden gems, your next great event starts here!
        </p>
      </header>
      <form className="flex flex-col gap-4">
        <div className="flex gap-x-2 w-full">
          <InputFieldComponent
            label="First Name"
            type="text"
            name="fname"
            id="fname"
            placeholder="Enter Your First Name"
            icon={null}
            value={firstName}
            onChange={setFirstName}
            required={true}
          />

          <InputFieldComponent
            label="Last Name"
            type="text"
            name="lname"
            id="lname"
            placeholder="Enter Your Last Name"
            icon={null}
            value={lastName}
            onChange={setLastName}
            required={false}
          />
        </div>

        <div className="flex gap-x-2 w-full">
          <InputFieldComponent
            label="Age"
            type="number"
            name="age"
            id="age"
            placeholder="Enter your Age"
            icon={null}
            value={age}
            onChange={setAge}
            required={true}
          />

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
        </div>

        <div className="flex gap-x-2 w-full">
          <PasswordFieldComponent
            label="Password"
            name="password"
            id="password"
            placeholder="Set your password"
            icon={RiLockPasswordFill}
            value={password}
            onChange={setPassword}
            required={true}
          />

          <PasswordFieldComponent
            label="Confirm Password"
            name="confirmpassword"
            id="confirmpassword"
            placeholder="Re-enter your password"
            icon={RiLockPasswordFill}
            value={confirmPassword}
            onChange={setConfirmPassword}
            required={true}
          />
        </div>

        <div>
          <a href="/auth/orgregister" className="w-full text-sm text-[#0077b5]">
            Register as Organiser?
          </a>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <FormBtn btnText="Register" onClick={handleGuestRegister} />

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

export default GuestRegistrationPage;
