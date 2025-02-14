import path from "path";
import fs from "fs";

/**
 * Saves an uploaded file to a specified folder in the public directory.
 * - Generates a unique filename using the current timestamp.
 * - Ensures the target directory exists.
 * - Converts the file to a buffer and writes it to disk.
 *
 * @param {File | null} file - The file object received from form data.
 * @param {string} folder - The target folder to store the file.
 * @returns {Promise<string | null>} The relative file path if successful, otherwise null.
 */
export const saveFile = async (file: File | null, folder: string): Promise<string | null> => {
  if (!file || !file.name) return null; // Return null if no file is provided

  // ✅ Construct the full directory path
  const dirPath = path.join(process.cwd(), `public/${folder}`);
  
  // ✅ Ensure the directory exists
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });

  // ✅ Generate a unique filename to prevent overwriting
  const fileName = `${Date.now()}-${file.name}`;
  const filePath = path.join(dirPath, fileName);

  // ✅ Convert the file to a buffer and write it to disk
  const stream = fs.createWriteStream(filePath);
  const buffer = await file.arrayBuffer();
  stream.write(Buffer.from(buffer));

  // ✅ Return the relative file path for database storage
  return `/${folder}/${fileName}`;
};


/**
 * Inserts a new employee record into the database.
 * - Uses parameterized queries to prevent SQL injection attacks.
 * - Stores employee details such as name, salary, job title, and uploaded file paths.
 *
 * @param {any} db - The database connection instance.
 * @param {object} employeeData - An object containing employee details.
 * @returns {Promise<void>} Resolves when the employee record is successfully inserted.
 */
export const insertEmployee = async (db: any, employeeData: any): Promise<void> => {
  await db.run(
    `INSERT INTO employees 
        (full_name, email, phone_number, date_of_birth, job_title, department, salary, start_date, end_date, photo_path, cv_path) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
      employeeData.photoPath,
      employeeData.cvPath,
    ]
  );
};

const MIN_SALARY = 500;

/**
 * Validates form data for employee creation or update.
 * - Ensures required fields are present.
 * - Validates that employees are at least 18 years old.
 * - Checks that the salary meets minimum requirements.
 *
 * @param {FormData} formData - The submitted form data.
 * @returns {Record<string, string>} An object containing validation errors (if any).
 */
export const validateFormData = (formData: FormData): Record<string, string> => {
  const errors: Record<string, string> = {};

  /**
   * Extracts a string value safely from form data.
   * - Ensures the retrieved value is not a `File` object.
   *
   * @param {string} key - The form field name.
   * @returns {string | null} The extracted string value or null if invalid.
   */
  const getString = (key: string): string | null => {
    const value = formData.get(key);
    return value instanceof File || value === null ? null : String(value);
  };

  // ✅ Extract and validate values
  const dateOfBirthStr = getString("date_of_birth");
  const salaryStr = getString("salary");

  /**
   * Validates the employee's date of birth.
   * - Ensures the employee is at least 18 years old.
   */
  if (dateOfBirthStr) {
    const birthDate = new Date(dateOfBirthStr);
    if (!isNaN(birthDate.getTime())) { // Ensure the date is valid
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const isOver18 =
        age > 18 ||
        (age === 18 &&
          today >=
            new Date(birthDate.setFullYear(birthDate.getFullYear() + 18)));

      if (!isOver18) {
        errors.date_of_birth = "Employee must be at least 18 years old.";
      }
    } else {
      errors.date_of_birth = "Invalid date format.";
    }
  } else {
    errors.date_of_birth = "Date of birth is required.";
  }

  /**
   * Validates the employee's salary.
   * - Ensures salary meets the minimum threshold.
   */
  const salary = salaryStr ? parseFloat(salaryStr) : 0;
  if (isNaN(salary) || salary < MIN_SALARY) {
    errors.salary = `Salary must be at least $${MIN_SALARY}.`;
  }

  return errors;
};