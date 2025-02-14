import React, { useMemo, useState } from "react";

interface Timesheet {
  id: number;
  full_name: string;
  start_time: string;
  end_time: string;
}

interface UseTimesheetsFilterReturn {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  selectedEmployee: string;
  setSelectedEmployee: React.Dispatch<React.SetStateAction<string>>;
  uniqueEmployees: string[];
  filteredTimesheets: Timesheet[];
}

export const useTimesheetsFilter = (
  timesheetsAndEmployees: Timesheet[]
): UseTimesheetsFilterReturn => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");

  const uniqueEmployees = useMemo(
    () => [...new Set(timesheetsAndEmployees.map((item) => item.full_name))],
    [timesheetsAndEmployees]
  );

  const filteredTimesheets = useMemo(
    () =>
      timesheetsAndEmployees.filter((timesheet) => {
        return (
          (searchQuery === "" ||
            timesheet.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            timesheet.start_time.includes(searchQuery) ||
            timesheet.end_time.includes(searchQuery)) &&
          (selectedEmployee === "" || timesheet.full_name === selectedEmployee)
        );
      }),
    [timesheetsAndEmployees, searchQuery, selectedEmployee]
  );

  return {
    searchQuery,
    setSearchQuery,
    selectedEmployee,
    setSelectedEmployee,
    uniqueEmployees,
    filteredTimesheets,
  };
};
