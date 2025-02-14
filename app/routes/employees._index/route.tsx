import { useLoaderData } from "react-router";
import Sidebar from "~/common/components/side-bar";
import { MdGroups, MdOutlineCalendarMonth } from "react-icons/md";
import { useEmployees } from "./common/hooks/use-employees";
import { EmployeeFilters } from "./components/employee-filter";
import { EmployeeTable } from "./components/employee-table";
import { getDB } from "~/db/getDB";
import type { JSX } from "react";

interface Employee {
  id: number;
  full_name: string;
  email: string;
  job_title: string;
  department: string;
}

export async function loader(): Promise<{ employees: Employee[] }> {
  const db = await getDB();
  const employees = await db.all("SELECT * FROM employees;");
  return { employees };
}

export default function EmployeesPage(): JSX.Element {
  const { employees } = useLoaderData() as { employees: Employee[] };
  const { state, setState, filteredEmployees, handleSort } =
    useEmployees(employees);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Navigation */}
      <Sidebar
        sidebarLinks={[
          { label: "New Employee", href: "/employees/new", icon: MdGroups },
          {
            label: "Timesheets",
            href: "/timesheets",
            icon: MdOutlineCalendarMonth,
          },
        ]}
      />

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="bg-white p-8 rounded-lg shadow-md">
          {/* Page Title */}
          <h1 className="text-3xl font-bold mb-8 text-center">
            Employees List
          </h1>

          {employees?.length === 0 ? (
            <p className="text-lg font-bold">No records</p>
          ) : (
            <>
              {" "}
              {/* Search and Filter Section */}
              <EmployeeFilters
                state={state}
                setState={setState}
                employees={employees}
              />
              {/* Employee Table Section */}
              <EmployeeTable
                employees={filteredEmployees}
                handleSort={handleSort}
                sortField={state.sortField}
                sortOrder={state.sortOrder}
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
}
