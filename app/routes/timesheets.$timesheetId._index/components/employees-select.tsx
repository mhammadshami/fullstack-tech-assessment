import React from "react";

/**
 * Represents an employee object.
 */
interface Employee {
  /** Unique identifier for the employee */
  id: string | number;
  /** Full name of the employee */
  full_name: string;
}

/**
 * Props for the EmployeeSelect component.
 */
interface EmployeeSelectProps {
  /** List of employees to populate the dropdown */
  employees: Employee[];
  /** Default selected employee ID */
  defaultValue?: string | number;
}

/**
 * A hidden select dropdown for employees.
 * @param {EmployeeSelectProps} props - The component props.
 * @returns {JSX.Element} A hidden employee dropdown.
 */
const EmployeeSelect: React.FC<EmployeeSelectProps> = ({ employees, defaultValue }) => {
  return (
    <div style={{ display: "none" }}>
      <label htmlFor="employee_id" className="block text-sm font-medium text-gray-700">
        Employee
      </label>
      <select
        name="employee_id"
        id="employee_id"
        defaultValue={defaultValue}
        required
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="" disabled>
          Select an employee
        </option>
        {employees.map((emp) => (
          <option key={emp.id} value={emp.id}>
            {emp.full_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default EmployeeSelect;
