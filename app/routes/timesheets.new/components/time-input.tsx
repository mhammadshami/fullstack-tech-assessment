import React from "react";

/** ✅ Define props for `TimeInput` component */
interface TimeInputProps {
  label: string;
  name: string;
  defaultValue?: string;
}

/**
 * ✅ A datetime-local input component
 * @param label - Label text for the input field
 * @param name - Name and ID of the input field
 * @param defaultValue - Default value for the input field (optional)
 * @returns A styled datetime-local input field
 */
const TimeInput: React.FC<TimeInputProps> = ({ label, name, defaultValue }) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="datetime-local"
        name={name}
        id={name}
        defaultValue={defaultValue ?? ""}
        required
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
};

export default TimeInput;
