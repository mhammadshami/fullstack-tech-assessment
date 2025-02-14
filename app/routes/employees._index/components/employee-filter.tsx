import React from "react";

// Define the Employee type
interface Employee {
  id: number;
  full_name: string;
  email: string;
  job_title: string;
  department: string;
}

// Define the Props Interface
interface EmployeeFiltersProps {
  state: {
    searchTerm: string;
    filterDepartment: string;
    sortField: keyof Employee; // FIX: Ensure sortField is keyof Employee
    sortOrder: "asc" | "desc";
  };
  setState: React.Dispatch<React.SetStateAction<{
    searchTerm: string;
    filterDepartment: string;
    sortField: keyof Employee; // FIX: Match the expected type
    sortOrder: "asc" | "desc";
  }>>;
  employees: Employee[];
}

/**
 * EmployeeFilters Component
 * - Allows filtering employees by name and department.
 */
export function EmployeeFilters({ state, setState, employees }: EmployeeFiltersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name..."
        value={state.searchTerm}
        onChange={(e) =>
          setState((prev) => ({
            ...prev,
            searchTerm: e.target.value,
          }))
        }
        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {/* Department Filter Dropdown */}
      <select
        value={state.filterDepartment}
        onChange={(e) =>
          setState((prev) => ({
            ...prev,
            filterDepartment: e.target.value,
          }))
        }
        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="">All Departments</option>
        {[...new Set(employees.map((emp) => emp.department))].map((dept) => (
          <option key={dept} value={dept}>
            {dept}
          </option>
        ))}
      </select>
    </div>
  );
}
