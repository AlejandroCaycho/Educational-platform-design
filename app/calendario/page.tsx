'use client';

import React, { useState } from 'react';
import { Calendar, Plus, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';

const eventosData = [
  { id: 1, date: '2024-04-10', title: 'Evaluación de Matemáticas', type: 'exam', time: '09:00 AM' },
  { id: 2, date: '2024-04-12', title: 'Jornada de Padres', type: 'event', time: '03:00 PM' },
  { id: 3, date: '2024-04-15', title: 'Receso Escolar', type: 'break', time: 'Todo el día' },
  { id: 4, date: '2024-04-20', title: 'Exposición de Proyectos', type: 'event', time: '10:00 AM' },
  { id: 5, date: '2024-04-22', title: 'Evaluación de Lengua', type: 'exam', time: '08:00 AM' },
];

function getEventColor(type: string) {
  switch (type) {
    case 'exam':
      return 'bg-red-100 text-red-700 border-red-300';
    case 'event':
      return 'bg-blue-100 text-blue-700 border-blue-300';
    case 'break':
      return 'bg-green-100 text-green-700 border-green-300';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-300';
  }
}

function getEventLabel(type: string) {
  switch (type) {
    case 'exam':
      return 'Evaluación';
    case 'event':
      return 'Evento';
    case 'break':
      return 'Receso';
    default:
      return 'Otro';
  }
}

export default function Calendario() {
  const [eventos, setEventos] = useState(eventosData);
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 3)); // April 2024
  const [newEvent, setNewEvent] = useState('');

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const monthName = currentMonth.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);

  const handleDeleteEvent = (id: number) => {
    setEventos(eventos.filter(e => e.id !== id));
  };

  const handleAddEvent = () => {
    if (newEvent.trim()) {
      const newEventObj = {
        id: Math.max(...eventos.map(e => e.id), 0) + 1,
        date: new Date().toISOString().split('T')[0],
        title: newEvent,
        type: 'event' as const,
        time: '09:00 AM',
      };
      setEventos([...eventos, newEventObj]);
      setNewEvent('');
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Calendario</h1>
        <p className="text-muted-foreground">Eventos y evaluaciones escolares</p>
      </div>

      {/* Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Grid */}
        <div className="lg:col-span-2 bg-card rounded-lg border border-border p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-foreground capitalize">{monthName}</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                className="p-2 hover:bg-muted rounded transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                className="p-2 hover:bg-muted rounded transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Days of week */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sab'].map(day => (
              <div key={day} className="text-center font-semibold text-foreground py-2 text-sm">
                {day}
              </div>
            ))}
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square"></div>
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dateStr = `2024-04-${String(day).padStart(2, '0')}`;
              const dayEvents = eventos.filter(e => e.date === dateStr);

              return (
                <div
                  key={day}
                  className="aspect-square bg-background rounded-lg p-2 text-center border border-border hover:border-primary transition-colors"
                >
                  <p className="text-sm font-semibold text-foreground">{day}</p>
                  <div className="mt-1 space-y-1">
                    {dayEvents.map(event => (
                      <div
                        key={event.id}
                        className="text-xs px-1 py-0.5 rounded bg-primary/20 text-primary truncate"
                      >
                        {event.title.substring(0, 8)}...
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar - Add Event */}
        <div className="bg-card rounded-lg border border-border p-6 h-fit">
          <h3 className="text-lg font-bold text-foreground mb-4">Agregar Evento</h3>
          <div className="space-y-3 mb-6">
            <input
              type="text"
              placeholder="Título del evento..."
              value={newEvent}
              onChange={(e) => setNewEvent(e.target.value)}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={handleAddEvent}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              <Plus className="w-4 h-4" />
              Agregar
            </button>
          </div>

          <h3 className="text-lg font-bold text-foreground mb-3">Próximos Eventos</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {eventos.map(event => (
              <div key={event.id} className={`p-3 rounded-lg border ${getEventColor(event.type)}`}>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="text-xs font-semibold">{getEventLabel(event.type)}</span>
                  <button
                    onClick={() => handleDeleteEvent(event.id)}
                    className="p-1 hover:opacity-70 transition-opacity"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
                <p className="text-sm font-semibold">{event.title}</p>
                <p className="text-xs mt-1">{event.date}</p>
                <p className="text-xs">{event.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
