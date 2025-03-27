import React from "react";

const FormBtn = ({ btnText, onClick }) => {
    return (
        <button className="w-full bg-[#333] hover:bg-primary-btn-hover text-white px-4 py-2 rounded-md cursor-pointer" onClick={onClick}>
            {btnText}
        </button>
    );
};

export default FormBtn;
