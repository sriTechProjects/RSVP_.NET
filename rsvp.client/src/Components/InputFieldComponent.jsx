import React from "react";

const InputFieldComponent = ({
  label,
  type,
  name,
  id,
  placeholder,
  icon: Icon,
  error,
  value,
  onChange,
  required,
  className = "",
  width= "w-full"
}) => {
  return (
    <div className={`flex flex-col gap-2 ${width}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-primary-text">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div
        className={`
        flex items-center border p-2 rounded-md
        ${error ? "border-red-500" : "border-gray-300"}
        ${error ? "focus-within:border-red-500" : "focus-within:border-primary"}
        transition-all duration-200
      `}
      >
        {Icon && <Icon className="h-5 w-5 text-gray-400" />}

        <input
          type={type}
          name={name}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`
            w-full outline-none border-none bg-transparent
            ${Icon ? "pl-3" : "pl-0"}
            transition-all duration-200
            text-md placeholder:text-sm
            ${className}
          `}
        />
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default InputFieldComponent;
