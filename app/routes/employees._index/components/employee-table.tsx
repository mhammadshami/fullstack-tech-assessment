import React, { type JSX } from "react";

// Define the types for the employee object
interface Employee {
  id: number;
  full_name: string;
  email: string;
  job_title: string;
  department: string;
}

// Define the props for the EmployeeTable component
interface EmployeeTableProps {
  employees: Employee[]; // Array of employees
  handleSort: (field: keyof Employee) => void; // Function to handle sorting
  sortField: keyof Employee; // Field used for sorting
  sortOrder: "asc" | "desc"; // Sorting order
}

/**
 * `EmployeeTable` Component
 * - Displays a table of employees with sortable columns.
 * - Allows sorting by clicking on column headers.
 * - Alternates row colors for better readability.
 * - Responsive design: Table for desktop, Cards for mobile.
 *
 * @param {EmployeeTableProps} props - The properties passed to the component.
 * @returns {JSX.Element} A table or cards displaying employee data.
 */
export function EmployeeTable({
  employees,
  handleSort,
  sortField,
  sortOrder,
}: EmployeeTableProps): JSX.Element {
  return (
    <div className="overflow-x-auto">
      {/* Table for Desktop */}
      <table className="min-w-full bg-white border rounded-lg hidden md:table">
        {/* Table Header with Sortable Columns */}
        <thead className="bg-indigo-600 text-white">
          <tr>
            {(
              [
                "id",
                "full_name",
                "email",
                "job_title",
                "department",
              ] as (keyof Employee)[]
            ).map((field) => (
              <th
                key={field}
                className="p-3 text-left cursor-pointer"
                onClick={() => handleSort(field)}
              >
                {field.replace("_", " ").toUpperCase()}{" "}
                {sortField === field && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body - Employee Rows */}
        <tbody>
          {employees.map((emp, index) => (
            <tr
              key={emp.id}
              className={`cursor-pointer ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-gray-100 transition-all`}
              onClick={() =>window.location.href = `/employees/${emp.id}` }
            >
              <td className="p-3 border">
                <a href={`/employees/${emp.id}`} className="underline">{emp.id}</a>
              </td>
              <td className="p-3 border">{emp.full_name}</td>
              <td className="p-3 border">{emp.email}</td>
              <td className="p-3 border">{emp.job_title}</td>
              <td className="p-3 border">{emp.department}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Cards for Mobile */}
      <div className="md:hidden space-y-4">
        {employees.map((emp) => (
          <div
            key={emp.id}
            className="bg-white p-4 rounded-lg shadow-md border border-gray-200 cursor-pointer"
            onClick={() =>window.location.href = `/employees/${emp.id}` }
          >
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between">
                <span className="font-semibold">ID:</span>
                <span>{emp.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Full Name:</span>
                <span>{emp.full_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Email:</span>
                <span>{emp.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Job Title:</span>
                <span>{emp.job_title}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Department:</span>
                <span>{emp.department}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
