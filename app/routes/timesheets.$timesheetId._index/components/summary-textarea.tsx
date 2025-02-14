import React from "react";

/**
 * Props for the SummaryTextarea component.
 */
interface SummaryTextareaProps {
  /** Default text content for the textarea */
  defaultValue?: string;
}

/**
 * A textarea input field for entering a summary.
 * @param {SummaryTextareaProps} props - The component props.
 * @returns {JSX.Element} A styled textarea input field.
 */
const SummaryTextarea: React.FC<SummaryTextareaProps> = ({ defaultValue }) => {
  return (
    <div>
      <label htmlFor="summary" className="block text-sm font-medium text-gray-700">
        Summary
      </label>
      <textarea
        name="summary"
        id="summary"
        defaultValue={defaultValue}
        placeholder="Describe work done..."
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
};

export default SummaryTextarea;
