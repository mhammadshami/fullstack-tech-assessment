/**
 * TimesheetsPage Component
 *
 * This component displays a timesheets page with filtering and view toggling capabilities.
 * Users can switch between a table view and a calendar view.
 *
 * Props:
 * - timesheetsAndEmployees: An array of timesheet objects containing:
 *   - id: number - Unique identifier for the timesheet.
 *   - full_name: string - Employee's full name.
 *   - start_time: string - Start time of the timesheet entry.
 *   - end_time: string - End time of the timesheet entry.
 *
 * The component utilizes `useTimesheetsFilter` for filtering timesheets
 * and `useSidebar` for sidebar state management.
 */
import { useLoaderData } from "react-router";
import { useTimesheetsFilter } from "./common/hooks/use-timesheets-filter";
import { useSidebar } from "./common/hooks/use-sidebar";
import CalendarComponent from "./components/calendar-component";
import Sidebar from "~/common/components/side-bar";
import { MdGroups, MdOutlineCalendarMonth } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";
import { TimesheetsTable } from "./components/timesheets-table";
import { ViewSwitchButtons } from "./components/view-switch-buttons";
import { getDB } from "~/db/getDB";
import { useState } from "react";

interface Timesheet {
  id: number;
  full_name: string;
  start_time: string;
  end_time: string;
}

export async function loader() {
  const db = await getDB();
  const timesheetsAndEmployees: Timesheet[] = await db.all(
    "SELECT timesheets.*, employees.full_name, employees.id AS employee_id FROM timesheets JOIN employees ON timesheets.employee_id = employees.id"
  );
  return { timesheetsAndEmployees };
}

const TimesheetsPage: React.FC = () => {
  const { timesheetsAndEmployees } = useLoaderData() as {
    timesheetsAndEmployees: Timesheet[];
  };
  const [view, setView] = useState<"table" | "calendar">("table");

  const {
    searchQuery,
    setSearchQuery,
    selectedEmployee,
    setSelectedEmployee,
    uniqueEmployees,
    filteredTimesheets,
  } = useTimesheetsFilter(timesheetsAndEmployees);

  const { isSidebarOpen, toggleSidebar } = useSidebar();

  const sidebarLinks = [
    {
      label: "New Timesheet",
      href: "/timesheets/new",
      icon: MdOutlineCalendarMonth,
    },
    { label: "Employees", href: "/employees", icon: MdGroups },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-indigo-600 text-white rounded-lg md:hidden focus:outline-none"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-indigo-900 to-indigo-700 text-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative`}
      >
        <Sidebar sidebarLinks={sidebarLinks} />
      </div>

      <main className="flex-1 p-4 md:p-6">
        {/* if no timesheets*/}
        {timesheetsAndEmployees.length === 0 ? (
          <p>No record</p>
        ) : (
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">
              Timesheets List
            </h1>

            <ViewSwitchButtons view={view} setView={setView} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <input
                type="text"
                placeholder="🔍 Search employee, start date, or end date..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <select
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">All Employees</option>
                {uniqueEmployees.map((emp) => (
                  <option key={emp} value={emp}>
                    {emp}
                  </option>
                ))}
              </select>
            </div>

            {view === "table" ? (
              <TimesheetsTable timesheets={filteredTimesheets} />
            ) : (
              <CalendarComponent events={filteredTimesheets} />
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default TimesheetsPage;
