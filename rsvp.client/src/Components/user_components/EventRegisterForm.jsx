import React, { useState } from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import InputFieldComponent from "../InputFieldComponent";
import qr from "../../assets/qr.jpg";
import axios from "axios";

const EventRegisterForm = ({ onClose }) => {
  const [transactionId, setTransactionId] = useState("");
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);

  const handleFileChange = (e) => {
    setPaymentScreenshot(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!transactionId || !paymentScreenshot) {
      alert("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("transactionId", transactionId);
    formData.append("paymentScreenshot", paymentScreenshot);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/event/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Registration successful:", res.data);
      alert("Registered successfully!");
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Submission failed.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#000000bd]">
      <div className="relative w-1/2 rounded-md p-8 bg-white flex flex-col gap-y-8">
        <div
          className="absolute top-3 right-6 text-2xl cursor-pointer p-2 bg-white rounded-full"
          onClick={onClose}
        >
          <RiCloseLargeLine />
        </div>
        <h1 className="text-3xl font-semibold text-[#333]">
          Event Registration!
        </h1>

        <div className="w-full flex gap-x-10">
          <div className="h-80 w-80 border border-gray-400 rounded-md p-1 overflow-clip">
            <img
              src={qr}
              alt="QR Code"
              className="h-full w-full object-cover"
            />
          </div>

          <form className="flex flex-col gap-y-6" onSubmit={handleSubmit}>
            <InputFieldComponent
              label="Transaction ID"
              type="text"
              name="transactionid"
              id="transactionid"
              placeholder="Enter Transaction ID"
              icon={null}
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              required={true}
            />

            {/* Upload Screenshot */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="screenshot"
                className="text-sm font-medium text-primary-text mb-1"
              >
                Upload Payment Screenshot{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                id="screenshot"
                accept="image/*"
                onChange={handleFileChange}
                className="border border-gray-300 rounded p-2"
                required
              />
              {paymentScreenshot && (
                <p className="text-sm text-green-600 mt-1">
                  Selected file: {paymentScreenshot.name}
                </p>
              )}
            </div>

            <button className="w-fit px-4 py-2 bg-[#333] text-white font-semibold rounded-md">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventRegisterForm;
