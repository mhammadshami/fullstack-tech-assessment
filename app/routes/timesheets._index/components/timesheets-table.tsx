/**
 * TimesheetsTable Component
 * 
 * This component renders a table displaying a list of timesheets with employee names, start and end times.
 * It supports both a tabular view for larger screens and a card-based view for smaller screens.
 * 
 * Props:
 * - timesheets: An array of timesheet objects containing:
 *   - id: number - Unique identifier for the timesheet.
 *   - full_name: string - Employee's full name.
 *   - start_time: string - Start time of the timesheet entry.
 *   - end_time: string - End time of the timesheet entry.
 * 
 * The component utilizes `date-fns` for formatting timestamps to a more readable format.
 */
import React from "react";
import { format } from "date-fns";

interface Timesheet {
  id: number;
  summary: string;
  full_name: string;
  start_time: string;
  end_time: string;
}

interface TimesheetsTableProps {
  timesheets: Timesheet[];
}

export const TimesheetsTable: React.FC<TimesheetsTableProps> = ({ timesheets }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border rounded-lg hidden md:table">
        <thead className="bg-indigo-600 text-white">
          <tr>
            {["ID", "Employee", "Start Time", "End Time", "Actions"].map((header) => (
              <th key={header} className="p-3 text-left">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timesheets.map((timesheet, index) => (
            <tr
              key={timesheet.id}
              className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition-all`}
            >
              <td className="p-3 border">{timesheet.id}</td>
              <td className="p-3 border">{timesheet.full_name}</td>
              <td className="p-3 border">{format(new Date(timesheet.start_time), "PPpp")}</td>
              <td className="p-3 border">{format(new Date(timesheet.end_time), "PPpp")}</td>
              <td className="p-3 border">
                <a
                  href={`/timesheets/${timesheet.id}`}
                  className="text-indigo-500 font-semibold hover:underline"
                >
                  View
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="md:hidden space-y-4">
        {timesheets.map((timesheet) => (
          <div
            key={timesheet.id}
            className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
          >
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between">
                <span className="font-semibold">ID:</span>
                <span>{timesheet.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Employee:</span>
                <span>{timesheet.full_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Start Time:</span>
                <span>{format(new Date(timesheet.start_time), "PPpp")}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">End Time:</span>
                <span>{format(new Date(timesheet.end_time), "PPpp")}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Actions:</span>
                <a
                  href={`/timesheets/${timesheet.id}`}
                  className="text-indigo-500 font-semibold hover:underline"
                >
                  View
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
