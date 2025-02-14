import React from "react";

/** ✅ Define props for `SummaryTextarea` component */
interface SummaryTextareaProps {
  defaultValue?: string;
}

/**
 * ✅ Textarea component for entering a summary
 * @param defaultValue - The initial value of the textarea (optional)
 * @returns A styled textarea for entering a summary
 */
const SummaryTextarea: React.FC<SummaryTextareaProps> = ({ defaultValue }) => {
  return (
    <div>
      <label htmlFor="summary" className="block text-sm font-medium text-gray-700">
        Summary
      </label>
      <textarea
        name="summary"
        defaultValue={defaultValue ?? ""}
        placeholder="Describe work done..."
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
};

export default SummaryTextarea;
