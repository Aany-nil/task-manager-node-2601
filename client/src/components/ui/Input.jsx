import React from "react";

const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
  className = "",
  ...props
}) => {
  return (
    <div className="w-full mb-4">
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 
        ${error 
          ? "border-red-500 focus:ring-red-400" 
          : "border-gray-300 focus:ring-blue-400"} 
        ${className}`}
        {...props}
      />

      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Input;