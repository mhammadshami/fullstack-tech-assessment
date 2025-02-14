import { useEffect } from "react";
import { useActionData } from "react-router-dom";

/**
 * Custom Hook: `useFormErrors`
 * - Listens for validation errors from `useActionData()`.
 * - Displays an alert when errors are present.
 * - Returns the error object for further handling in the component.
 *
 * @returns {Record<string, string> | null} The errors object if errors exist, otherwise null.
 */
export const useFormErrors = (): Record<string, string> | null => {
  const errors = useActionData();

  useEffect(() => {
    if (errors) {
      let errorMessage = "";

      // ✅ Format error messages for alert
      if (errors.date_of_birth) errorMessage += `- ${errors.date_of_birth}\n`;
      if (errors.salary) errorMessage += `- ${errors.salary}\n`;
      if (errors.cv) errorMessage += `- ${errors.cv}\n`;

      // ✅ Display errors in an alert
      if (errorMessage) {
        alert(`Error(s) Found:\n\n${errorMessage}`);
      }
    }
  }, [errors]); // ✅ Re-run effect when errors change

  return errors;
};
