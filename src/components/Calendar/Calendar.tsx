import React, { useState } from 'react';
// @ts-ignore
import FullCalendar, { DateClickArg, EventInput } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const Calendar: React.FC = () => {
    const [events, setEvents] = useState<EventInput[]>([]);

    const handleDateClick = (arg: DateClickArg) => {
        const title = window.prompt('Digite o título do compromisso:');
        if (title && title.trim()) {
            const newEvent: EventInput = {
                title: title.trim(),
                start: arg.date,
                allDay: arg.allDay,
            };
            setEvents(prev => [...prev, newEvent]);
        }
    };

    return (
        <div style={{ margin: 20 }}>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                editable
                selectable
                events={events}
                dateClick={handleDateClick}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay',
                }}
                height="auto"
            />
        </div>
    );
};

export default Calendar;
