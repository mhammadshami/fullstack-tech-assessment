import {
  Form,
  redirect,
  useNavigate,
  useLoaderData,
  useParams,
  type ActionFunction,
  type LoaderFunction,
} from "react-router-dom";
import { MdGroups, MdOutlineCalendarMonth } from "react-icons/md";
import Sidebar from "~/common/components/side-bar";
import { getDB } from "~/db/getDB";

/** ✅ Employee Data Type */
interface Employee {
  id: number;
  full_name: string;
  email: string;
  phone_number: string;
  date_of_birth: string;
  job_title: string;
  department: string;
  salary: number;
  start_date: string;
  end_date: string;
}

/** ✅ Fetch employee data for editing */
export const loader: LoaderFunction = async ({ params }) => {
  const db = await getDB();
  const employee = await db.get("SELECT * FROM employees WHERE id = ?", [params.employeeId]);

  if (!employee) throw new Response("Employee Not Found", { status: 404 });

  return employee;
};

/** ✅ Update employee data in the database */
export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const employeeData = Object.fromEntries(formData.entries());

  const db = await getDB();
  await db.run(
    `UPDATE employees SET 
      full_name = ?, email = ?, phone_number = ?, date_of_birth = ?, 
      job_title = ?, department = ?, salary = ?, start_date = ?, end_date = ?
    WHERE id = ?`,
    [
      employeeData.full_name,
      employeeData.email,
      employeeData.phone_number,
      employeeData.date_of_birth,
      employeeData.job_title,
      employeeData.department,
      employeeData.salary,
      employeeData.start_date,
      employeeData.end_date,
      params.employeeId,
    ]
  );

  return redirect(`/employees`);
};

/** ✅ Sidebar Links */
const sidebarLinks = [
  { label: "New Timesheet", href: "/timesheets/new", icon: MdOutlineCalendarMonth },
  { label: "Employees", href: "/employees", icon: MdGroups },
];

/** ✅ Reusable Input Field Component */
interface InputFieldProps {
  label: string;
  name: keyof Employee;
  type?: string;
  defaultValue: string | number;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, type = "text", defaultValue }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      defaultValue={defaultValue}
      required
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
    />
  </div>
);

/** ✅ Employee Edit Page */
const EmployeeEditPage: React.FC = () => {
  const employee = useLoaderData() as Employee;
  const navigate = useNavigate();
  const { employeeId } = useParams();

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar sidebarLinks={sidebarLinks} />

      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-8 text-center">Update Employee</h1>

          <Form method="post" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="Full Name" name="full_name" defaultValue={employee.full_name} />
              <InputField label="Email" name="email" type="email" defaultValue={employee.email} />
              <InputField label="Phone Number" name="phone_number" defaultValue={employee.phone_number} />
              <InputField label="Date of Birth" name="date_of_birth" type="date" defaultValue={employee.date_of_birth} />
              <InputField label="Job Title" name="job_title" defaultValue={employee.job_title} />
              <InputField label="Department" name="department" defaultValue={employee.department} />
              <InputField label="Salary" name="salary" type="number" defaultValue={employee.salary} />
              <InputField label="Start Date" name="start_date" type="date" defaultValue={employee.start_date} />
              <InputField label="End Date" name="end_date" type="date" defaultValue={employee.end_date} />
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                type="button"
                onClick={() => navigate(`/employees/${employeeId}`)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Update Employee
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeEditPage;
