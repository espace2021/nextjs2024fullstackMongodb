'use client'
import React, {  useState, useCallback, useMemo } from 'react'
import events from "./events";
import { Calendar, momentLocalizer, Views} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("tn-TN");
const localizer = momentLocalizer(moment);

const CalendarPage = () =>{
  
  const [view, setView] = useState(Views.MONTH);
  const [date, setDate] = useState(new Date());

  const [myEvents, setEvents] = useState(events)

  const onNavigate = useCallback(
    (newDate) => {
      return setDate(newDate);
    },
    [setDate],
  );

  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      const title = window.prompt('New Event name')
      if (title) {
        setEvents((prev) => [...prev, { start, end, title }])
      }
    },
    [setEvents]
  )

  const handleSelectEvent = useCallback(
    (event) => window.alert(event.title),
    []
  )

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(2024, 3, 12),
      scrollToTime: new Date(2024, 1, 1, 6),
    }),
    []
  )

      return (
        <div>
           <strong>
          Click an event to see more info, or drag the mouse over the calendar
          to select a date/time range.
        </strong>
        <Calendar
          events={myEvents}
          localizer={localizer}
          views={[Views.MONTH, Views.WEEK, Views.DAY , Views.AGENDA]}
          defaultView={view}
          view={view} 
          date={date} 
          onView={(view) => setView(view)}
          onNavigate={onNavigate}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          scrollToTime={scrollToTime}
          style={{ height: 700, width: 900 }}
          />
      </div>
);
}
export default CalendarPage;