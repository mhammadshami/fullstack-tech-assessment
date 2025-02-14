import React from "react";

interface InputProps {
  id?: string;
  name?: string;
  placeholder?: string;
  type?: string;
  //pattern?: string;
  defaultValue?: string;
  required?: boolean;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  name,
  placeholder = "Enter text...",
  type = "text",
  disabled = false,
}) => {
  return (
    <div className="w-full">
      <div className="relative">
        {/* Input Field */}
        <input
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className={`text-[#555] py-[13px] px-[22px] w-full leading-normal text-[14px] border-[1px] border-gray-300 ]border-solid outline-0
            ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}
          `}
        />
      </div>
    </div>
  );
};

export default Input;
