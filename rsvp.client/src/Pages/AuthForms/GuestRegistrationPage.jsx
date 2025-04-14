import React, { useState } from "react";
import InputFieldComponent from "../../Components/InputFieldComponent";
import FormBtn from "../../Components/FormBtn";
import { useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaUserAlt, FaPhoneAlt } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaBuilding } from "react-icons/fa6";
import PasswordFieldComponent from "../../Components/PasswordFieldComponent";
import DropdownFieldComponent from "../../Components/DropdownFieldComponent";
import toast from "react-hot-toast";
import axios from "axios";

const GuestRegistrationPage = () => {
  const [name, setName] = useState("");
  const [prn, setPRN] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [division, setDivision] = useState("");
  const [batch, setBatch] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const passwordStrength = [
    /[a-z]/.test(password),
    /[A-Z]/.test(password),
    /\d/.test(password),
    /[^A-Za-z0-9]/.test(password),
    password.length >= 8,
  ].filter(Boolean).length;

  const navigate = useNavigate();

  const handleGuestRegister = async () => {
    if (password !== confirmPassword) {
      toast.error("Both passwords should match!");
      return;
    }

    if (!password || !confirmPassword) {
      toast.error("Password fields cannot be empty!");
      return;
    }

    const student = {
      name,
      prn,
      email,
      department,
      year,
      division,
      batch,
      contact,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:5179/auth/register/student",
        {
          student,
        }
      );

      if (response.status === 200) {
        toast.success("Registration successful!");
        navigate('/auth/login');
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to register!");
    }
  };

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
        {pageNo === 1 && (
          <>
            <div className="flex gap-x-2 w-full">
              <InputFieldComponent
                label="Name"
                type="text"
                name="name"
                id="name"
                placeholder="Enter Your Name"
                icon={null}
                value={name}
                onChange={setName}
                required={true}
              />

              <InputFieldComponent
                label="PRN No."
                type="text"
                name="prn"
                id="prn"
                placeholder="Enter Your PRN"
                icon={null}
                value={prn}
                onChange={setPRN}
                required={true}
              />
            </div>

            <div className="flex gap-x-2 w-full">
              <InputFieldComponent
                label="Contact No."
                type="text"
                name="contact"
                id="contact"
                placeholder="Enter Your Contact No."
                icon={FaPhoneAlt}
                value={contact}
                onChange={setContact}
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
              <DropdownFieldComponent
                label="Department"
                name="department"
                id="department"
                value={department}
                onChange={setDepartment}
                options={[
                  { value: "comp-core", label: "Computer (Core)" },
                  { value: "comp-ds", label: "Computer (Data Science)" },
                  { value: "comp-aiml", label: "Computer (AI & ML)" },
                  { value: "comp-it", label: "Computer (IT)" },
                  { value: "comp-software", label: "Computer (Software)" },
                  { value: "entc", label: "Electrical & Telecom" },
                  { value: "etx", label: "Electronics" },
                  { value: "chem", label: "Chemical" },
                  { value: "mech", label: "Mechanical" },
                  { value: "civil", label: "Civil" },
                ]}
                icon={FaBuilding}
                required={true}
                placeholder="Select Branch"
                width="w-1/2"
              />

              <DropdownFieldComponent
                label="Year"
                name="year"
                id="year"
                value={year}
                onChange={setYear}
                options={[
                  { value: 1, label: "FY" },
                  { value: 2, label: "SY" },
                  { value: 3, label: "TY" },
                  { value: 4, label: "BTech" },
                ]}
                icon={null}
                required={true}
                placeholder="Select Year"
                width="w-1/2"
              />
            </div>

            <div className="flex w-full gap-x-2">
              <DropdownFieldComponent
                label="Division"
                name="division"
                id="division"
                value={division}
                onChange={setDivision}
                options={[
                  { value: "A", label: "A" },
                  { value: "B", label: "B" },
                  { value: "C", label: "C" },
                  { value: "D", label: "D" },
                ]}
                icon={null}
                required={true}
                placeholder="Select Division"
                width="w-1/2"
              />

              <DropdownFieldComponent
                label="Batch"
                name="batch"
                id="batch"
                value={batch}
                onChange={setBatch}
                options={[
                  { value: "1", label: "1" },
                  { value: "2", label: "2" },
                  { value: "3", label: "3" },
                  { value: "4", label: "4" },
                ]}
                icon={null}
                required={true}
                placeholder="Select Batch"
                width="w-1/2"
              />
            </div>
          </>
        )}

        {pageNo === 2 && (
          <div className="flex flex-col gap-4 w-full ">
            {/* Password and Confirm Password Fields */}
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

            {/* Password Strength Meter */}
            {password.length > 0 && (
              <div className="flex flex-col gap-1">
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ease-in-out ${
                      passwordStrength === 5
                        ? "w-full bg-green-500"
                        : passwordStrength >= 3
                        ? "w-2/3 bg-yellow-500"
                        : "w-1/3 bg-red-500"
                    }`}
                  />
                </div>

                {/* Strength Label */}
                <span
                  className={`text-sm font-semibold ${
                    passwordStrength === 5
                      ? "text-green-600"
                      : passwordStrength >= 3
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {passwordStrength === 5
                    ? "Strong"
                    : passwordStrength >= 3
                    ? "Medium"
                    : "Weak"}
                </span>
              </div>
            )}

            {/* Password Criteria Checklist */}
            <div className="grid grid-cols-2 gap-2 text-sm font-medium transition-all duration-300 ease-in-out">
              {[
                {
                  label: "At least one lowercase letter",
                  test: /[a-z]/.test(password),
                },
                {
                  label: "At least one uppercase letter",
                  test: /[A-Z]/.test(password),
                },
                {
                  label: "At least one digit",
                  test: /\d/.test(password),
                },
                {
                  label: "At least one special character",
                  test: /[^A-Za-z0-9]/.test(password),
                },
                {
                  label: "Minimum 8 characters",
                  test: password.length >= 8,
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-2 ${
                    item.test ? "text-green-600" : "text-red-500"
                  }`}
                >
                  <span className="text-sm">{item.test ? "✅" : "❌"}</span>
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <a href="/auth/orgregister" className="w-full text-sm text-[#0077b5]">
            Register as Organiser?
          </a>
        </div>

        <div className="flex flex-col gap-3 w-full">
          {pageNo === 1 ? (
            <FormBtn btnText="Next" onClick={() => setPageNo(pageNo + 1)} />
          ) : (
            <FormBtn btnText="Register" onClick={handleGuestRegister} />
          )}

          {pageNo === 1 ? (
            <button
              className="border border-[#ccc] hover:bg-[#f5f5f5] text-[#333] px-4 py-2 rounded-md flex gap-2 items-center justify-center"
              onClick={() => navigate("/auth/login")}
            >
              <IoMdArrowBack className="h-5 w-5" />
              <span className="text-sm font-medium font-body">
                Back to Login
              </span>
            </button>
          ) : (
            <button
              className="border border-[#ccc] hover:bg-[#f5f5f5] text-[#333] px-4 py-2 rounded-md flex gap-2 items-center justify-center"
              onClick={() => setPageNo(pageNo - 1)}
            >
              <IoMdArrowBack className="h-5 w-5" />
              <span className="text-sm font-medium font-body">Previous</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default GuestRegistrationPage;
