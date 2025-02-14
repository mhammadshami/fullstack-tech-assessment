import "./style.css";
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import "@schedule-x/theme-default/dist/index.css";
import { useEffect, useState } from "react";

interface Event {
  id: number;
  summary: string;
  start_time: string;
  end_time: string;
}

interface CalendarComponentProps {
  events: Event[];
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({ events }) => {
  const eventsService = useState(() => createEventsServicePlugin())[0];

  // Format events to match the expected format in the calendar
  const formattedEvents = events.map(event => ({
    id: event.id,
    title: event.summary,
    start: event.start_time.replace("T", " "),
    end: event.end_time.replace("T", " "),
  }));

  console.log("events", formattedEvents);

  const calendar = useCalendarApp({
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    events: formattedEvents,
    plugins: [eventsService],
  });

  useEffect(() => {
    eventsService.getAll();
  }, [eventsService]);

  return (
    <div className="calendar-container">
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
};

export default CalendarComponent;