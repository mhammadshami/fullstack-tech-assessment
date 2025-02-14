import { inputs } from "../common/data/data";
import type { Employee } from "~/common/types/types";

/**
 * Props type for EmployeeFormFields component.
 * @property {Employee} [employee] - Employee object containing existing data (used for editing).
 */
interface EmployeeFormFieldsProps {
  employee?: Employee;
}

/**
 * EmployeeFormFields Component
 * - Dynamically generates form fields for the employee form.
 * - Uses the `inputs` array to map field properties like type, name, and required status.
 * - Populates fields with existing employee data when available (edit mode).
 *
 * @param {EmployeeFormFieldsProps} props - Component props containing optional `employee` data.
 * @returns {JSX.Element} A list of dynamically generated input fields.
 */
const EmployeeFormFields: React.FC<EmployeeFormFieldsProps> = ({ employee }) => {
  return (
    <>
      {inputs.map(({ type, name, required }) => (
        <div key={name}>
          {/* Label for the input field */}
          <label htmlFor={name} className="block text-sm font-medium text-gray-700">
            {name.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
          </label>

          {/* Input field with dynamic attributes */}
          <input
            type={type} // Defines the type of input (text, email, number, etc.)
            name={name} // Sets the field name for form submission
            id={name} // Unique ID for accessibility
            defaultValue={employee?.[name as keyof Employee] as string} // Pre-fills value in edit mode
            required={required} // Marks field as required if applicable
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      ))}
    </>
  );
};

export default EmployeeFormFields;
