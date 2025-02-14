import {
  useLoaderData,
  Form,
  redirect,
  useNavigate,
  useParams,
  type ActionFunction,
  type LoaderFunction,
} from "react-router";
import { getDB } from "~/db/getDB";
import Sidebar from "~/common/components/side-bar";
import { MdGroups, MdOutlineCalendarMonth } from "react-icons/md";
import EmployeeSelect from "./components/employee-select";
import TimeInput from "./components/time-input";
import SummaryTextarea from "./components/summary-textarea";
import type { Employee, Timesheet } from "./common/types";

export const loader: LoaderFunction = async ({ params }) => {
  const db = await getDB();

  // ✅ Fetch all employees from the database.
  const employees: Employee[] = await db.all(
    "SELECT id, full_name FROM employees"
  );

  // ✅ Fetch the specific timesheet data if it exists.
  let timesheet: Timesheet | null = null;
  timesheet = await db.get("SELECT * FROM timesheets WHERE id = ?", [
    params.id,
  ]);

  return { employees, timesheet };
};

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const employee_id = formData.get("employee_id") as string;
  const start_time = formData.get("start_time") as string;
  const end_time = formData.get("end_time") as string;
  const summary = formData.get("summary") as string;

  // ✅ Validate required fields
  if (!employee_id || !start_time || !end_time || !summary) {
    return { error: "All fields are required." };
  }

  // ✅ Ensure that start time is before end time
  if (new Date(start_time) >= new Date(end_time)) {
    return { error: "Start time must be before end time." };
  }

  const db = await getDB();

  // ✅ Insert new timesheet record
  await db.run(
    "INSERT INTO timesheets (employee_id, start_time, end_time, summary) VALUES (?, ?, ?, ?)",
    [employee_id, start_time, end_time, summary]
  );

  return redirect("/timesheets");
};

/**
 * ✅ Timesheet form page component.
 * - Displays a form to create or edit a timesheet.
 * - Includes dropdowns for selecting employees and input fields for time tracking.
 * @returns A UI for creating or editing timesheets.
 */
const TimesheetFormPage: React.FC = () => {
  // ✅ Fetch employees and timesheet data from the loader.
  const { employees, timesheet } = useLoaderData() as {
    employees: Employee[];
    timesheet: Timesheet | null;
  };
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        sidebarLinks={[
          { label: "Employees", href: "/employees", icon: MdGroups },
          {
            label: "Timesheets",
            href: "/timesheets",
            icon: MdOutlineCalendarMonth,
          },
        ]}
      />

      <main className="flex-1 p-6">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">
            Create New Timesheet
          </h1>

          <Form method="post" className="space-y-4">
            {/* ✅ Employee selection dropdown */}
            <EmployeeSelect
              employees={employees}
              selectedEmployee={timesheet?.employee_id}
            />

            {/* ✅ Start and End Time Inputs */}
            <TimeInput
              label="Start Time"
              name="start_time"
              defaultValue={timesheet?.start_time}
            />
            <TimeInput
              label="End Time"
              name="end_time"
              defaultValue={timesheet?.end_time}
            />

            {/* ✅ Work Summary */}
            <SummaryTextarea defaultValue={timesheet?.summary} />

            {/* ✅ Action Buttons */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => navigate("/timesheets")}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
              >
                Create Timesheet
              </button>
            </div>
          </Form>
        </div>
      </main>
    </div>
  );
};

export default TimesheetFormPage;
