import { MdGroups, MdOutlineCalendarMonth } from "react-icons/md";

export const sidebarLinks = [
  {
    label: "Timesheets",
    href: "/timesheets",
    icon: MdOutlineCalendarMonth,
  },
  {
    label: "Employees",
    href: "/employees",
    icon: MdGroups,
  },
];

export const inputs = [
  { type: "text", name: "full_name", required: true },
  { type: "email", name: "email", required: true },
  { type: "text", name: "phone_number", required: true },
  { type: "date", name: "date_of_birth", required: true },
  { type: "text", name: "job_title" },
  { type: "text", name: "department" },
  { type: "number", name: "salary", required: true },
  { type: "date", name: "start_date", required: true },
  { type: "date", name: "end_date" },
];
