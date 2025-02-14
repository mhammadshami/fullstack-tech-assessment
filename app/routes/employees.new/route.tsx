import {
  Form,
  redirect,
  useNavigate,
  type ActionFunction,
} from "react-router-dom";
import Sidebar from "~/common/components/side-bar";
import { sidebarLinks } from "./common/data/data";
import { useFormErrors } from "./common/hooks/use-form-errors";
import EmployeeFormFields from "./components/employee-form-fields";
import FileUpload from "~/common/components/file-upload";
import type { Employee } from "~/common/types/types";
import { getDB } from "~/db/getDB";
import {
  insertEmployee,
  saveFile,
  validateFormData,
} from "./common/helpers/helpers";
import type { EmployeeFormProps } from "./common/types/types";

/**
 * Handles form submission for creating or updating an employee.
 * - Validates form data.
 * - Saves uploaded files (CV and photo).
 * - Inserts or updates employee data in the database.
 * - Redirects to the employees list after successful submission.
 */
export const action: ActionFunction = async ({ request }) => {
  // Ensure the request is a POST method
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  // Parse the form data
  const formData = await request.formData();

  // Validate form data and collect errors
  const errors = validateFormData(formData);
  if (Object.keys(errors).length > 0) return errors;

  // Helper function to extract string values safely from form data
  const getString = (key: string): string =>
    formData.get(key) instanceof File ? "" : (formData.get(key) as string) || "";

  // Helper function to extract file values safely from form data
  const getFile = (key: string): File | null =>
    formData.get(key) instanceof File ? (formData.get(key) as File) : null;

  // Extract files
  const cv = getFile("cv");
  const photo = getFile("photo");

  // Save files to appropriate directories
  const cvPath = cv ? await saveFile(cv, "documents") : null;
  const photoPath = photo ? await saveFile(photo, "uploads") : null;

  // Retrieve the database connection
  const db = await getDB();

  // Insert employee data into the database
  await insertEmployee(db, {
    full_name: getString("full_name"),
    email: getString("email"),
    phone_number: getString("phone_number"),
    date_of_birth: getString("date_of_birth"),
    job_title: getString("job_title"),
    department: getString("department"),
    salary: parseFloat(getString("salary")) || 0,
    start_date: getString("start_date"),
    end_date: getString("end_date"),
    photoPath,
    cvPath,
  });

  // Redirect to the employees list page after successful submission
  return redirect("/employees");
};

/**
 * Employee Form Component
 * - Displays a form for adding or editing an employee.
 * - Includes input fields for employee details.
 * - Handles file uploads for photos and CVs.
 */
const EmployeeForm: React.FC<EmployeeFormProps> = ({ employee }) => {
  // Navigation hook to redirect user after form actions
  const navigate = useNavigate();

  // Custom hook to capture form validation errors
  const errors = useFormErrors();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar navigation */}
      <Sidebar sidebarLinks={sidebarLinks} />

      {/* Main content area */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">
          {employee ? "Edit Employee" : "Create New Employee"}
        </h1>

        {/* Employee form */}
        <Form
          method="post"
          encType="multipart/form-data"
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Automatically generated form fields */}
            <EmployeeFormFields employee={employee} />

            {/* File upload for employee photo */}
            <FileUpload
              label="Upload Photo"
              name="photo"
              accept="image/*"
              existingFilePath={employee?.photo_path}
            />

            {/* File upload for employee CV */}
            <FileUpload
              label="Upload CV (Required)"
              name="cv"
              accept=".pdf,.doc,.docx"
              required
              existingFilePath={employee?.cv_path}
            />
          </div>

          {/* Action buttons */}
          <div className="mt-6 flex justify-end gap-4">
            {/* Cancel button: Navigates back to employees list */}
            <button
              type="button"
              onClick={() => navigate("/employees")}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>

            {/* Submit button: Creates or updates employee */}
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              {employee ? "Update" : "Create"} Employee
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EmployeeForm;
