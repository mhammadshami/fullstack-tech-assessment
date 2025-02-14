import React from "react";

/**
 * Props for the DateTimeInput component.
 */
interface DateTimeInputProps {
  /** Label text displayed above the input field */
  label: string;
  /** Name attribute for the input field */
  name: string;
  /** Default value for the input field (should be a valid datetime-local string) */
  defaultValue?: string;
}

/**
 * A reusable date-time input component.
 * @param {DateTimeInputProps} props - The component props.
 * @returns {JSX.Element} A date-time input field with a label.
 */
const DateTimeInput: React.FC<DateTimeInputProps> = ({ label, name, defaultValue }) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="datetime-local"
        name={name}
        id={name}
        defaultValue={defaultValue}
        required
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
};

export default DateTimeInput;
