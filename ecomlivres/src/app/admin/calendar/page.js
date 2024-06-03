'use client'
import events from "./events";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, dateFnsLocalizer , Views} from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

const views =  Object.keys(Views).map((k) => Views[k])
const  defaultDate= new Date(2024, 3, 1)

const CalendarPage = () =>{
                
      return (
        <div style={{ height: 700 }}>
       <Calendar
      events={events}
      step={60}
      localizer={localizer}
    
      defaultDate={new Date(2015, 2, 31)}
      defaultView={"work_week"}
      views={["work_week", "month", "day"]}
    />
      </div>
);
}
export default CalendarPage;