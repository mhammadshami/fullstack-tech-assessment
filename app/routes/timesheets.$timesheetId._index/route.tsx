import { useLoaderData, Form, redirect, useParams } from "react-router";
import { getDB } from "~/db/getDB";
import Sidebar from "~/common/components/side-bar";
import { MdGroups, MdOutlineCalendarMonth } from "react-icons/md";
import EmployeeSelect from "./components/employees-select";
import DateTimeInput from "./components/date-time-input";
import SummaryTextarea from "./components/summary-textarea";
import type { JSX } from "react";

// Type definitions
interface Employee {
  id: number;
  full_name: string;
}

interface Timesheet {
  id: number;
  employee_id: number;
  start_time: string;
  end_time: string;
  summary: string;
}

interface LoaderData {
  employees: Employee[];
  timesheet: Timesheet;
}

// Loader function
export async function loader({ params }: { params: { timesheetId: string } }): Promise<LoaderData> {
  const db = await getDB();
  const employees = await db.all("SELECT id, full_name FROM employees");
  const timesheet = await db.get("SELECT * FROM timesheets WHERE id = ?", [params.timesheetId]);

  if (!timesheet) {
    throw new Response("Timesheet not found", { status: 404 });
  }

  return { employees, timesheet };
}

// Action function
export const action = async ({ request, params }: { request: Request; params: { timesheetId: string } }) => {
  const formData = await request.formData();
  const employee_id = formData.get("employee_id") as string;
  const start_time = formData.get("start_time") as string;
  const end_time = formData.get("end_time") as string;
  const summary = formData.get("summary") as string;

  if (new Date(start_time) >= new Date(end_time)) {
    return { error: "Start time must be before end time." };
  }

  const db = await getDB();
  await db.run(
    "UPDATE timesheets SET employee_id = ?, start_time = ?, end_time = ?, summary = ? WHERE id = ?",
    [employee_id, start_time, end_time, summary, params.timesheetId]
  );

  return redirect("/timesheets");
};

// Main Component
export default function UpdateTimesheetPage(): JSX.Element {
  const { employees, timesheet } = useLoaderData() as LoaderData;
  const { timesheetId } = useParams<{ timesheetId: string }>();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar with navigation links */}
      <Sidebar
        sidebarLinks={[
          { label: "Employees", href: "/employees", icon: MdGroups },
          { label: "Timesheets", href: "/timesheets", icon: MdOutlineCalendarMonth },
        ]}
      />

      {/* Main content area */}
      <main className="flex-1 p-6">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">Edit Timesheet</h1>

          <Form method="post" className="space-y-6">
            {/* Employee selection dropdown */}
            <EmployeeSelect employees={employees} defaultValue={timesheet?.employee_id} />

            {/* Start Time input */}
            <DateTimeInput label="Start Time" name="start_time" defaultValue={timesheet?.start_time} />

            {/* End Time input */}
            <DateTimeInput label="End Time" name="end_time" defaultValue={timesheet?.end_time} />

            {/* Summary textarea */}
            <SummaryTextarea defaultValue={timesheet?.summary} />

            {/* Submit button */}
            <div className="flex justify-end gap-4">
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
              >
                Update Timesheet
              </button>
            </div>
          </Form>
        </div>
      </main>
    </div>
  );
}
