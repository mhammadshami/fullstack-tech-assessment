import { useState, useMemo } from "react";

/**
 * Defines the shape of an Employee object.
 */
interface Employee {
  id: number;
  full_name: string;
  email: string;
  job_title: string;
  department: string;
}

/**
 * Defines the state structure used in the hook.
 */
interface EmployeeState {
  searchTerm: string;
  filterDepartment: string;
  sortField: keyof Employee; // FIX: Ensure this is keyof Employee
  sortOrder: "asc" | "desc";
}

/**
 * Custom Hook: `useEmployees`
 * - Manages state for searching, filtering, and sorting employees.
 * - Uses `useMemo` to optimize filtering and sorting performance.
 *
 * @param {Employee[]} employees - The list of employees.
 * @returns {object} The state, filtered employees, and sorting handler.
 */
export function useEmployees(employees: Employee[]) {
  // State for search, filtering, and sorting
  const [state, setState] = useState<EmployeeState>({
    searchTerm: "",
    filterDepartment: "",
    sortField: "id", // Ensure this matches a valid Employee key
    sortOrder: "asc",
  });

  /**
   * Filters and sorts employees based on state values.
   */
  const filteredEmployees = useMemo(() => {
    return employees
      .filter((emp) => emp.full_name.toLowerCase().includes(state.searchTerm.toLowerCase()))
      .filter((emp) => (state.filterDepartment ? emp.department === state.filterDepartment : true))
      .sort((a, b) => {
        if (a[state.sortField] < b[state.sortField]) return state.sortOrder === "asc" ? -1 : 1;
        if (a[state.sortField] > b[state.sortField]) return state.sortOrder === "asc" ? 1 : -1;
        return 0;
      });
  }, [employees, state]);

  /**
   * Handles sorting by updating `sortField` and toggling `sortOrder`.
   */
  const handleSort = (field: keyof Employee) => {
    setState((prev) => ({
      ...prev,
      sortField: field, // Ensure the type is correct
      sortOrder: prev.sortField === field ? (prev.sortOrder === "asc" ? "desc" : "asc") : "asc",
    }));
  };

  return {
    state,
    setState,
    filteredEmployees,
    handleSort,
  };
}
