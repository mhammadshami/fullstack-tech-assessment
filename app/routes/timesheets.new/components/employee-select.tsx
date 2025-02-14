import React from "react";

/** ✅ Define `Employee` type */
interface Employee {
  id: number;
  full_name: string;
}

/** ✅ Define props for `EmployeeSelect` component */
interface EmployeeSelectProps {
  employees: Employee[];
  selectedEmployee?: number;
}

/**
 * ✅ Employee selection dropdown component
 * @param employees - List of employees to display
 * @param selectedEmployee - Currently selected employee (optional)
 * @returns A select dropdown for choosing an employee
 */
const EmployeeSelect: React.FC<EmployeeSelectProps> = ({ employees, selectedEmployee }) => {
  return (
    <div>
      <label htmlFor="employee_id" className="block text-sm font-medium text-gray-700">
        Select Employee
      </label>
      <select
        name="employee_id"
        id="employee_id"
        required
        defaultValue={selectedEmployee ?? ""}
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
