export interface Employee {
    id: number;
    full_name: string;
  }
  
export interface Timesheet {
    id: number;
    employee_id: number;
    start_time: string;
    end_time: string;
    summary: string;
  }