'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, X, Clock, MapPin, User, Trash2, Edit2 } from 'lucide-react';

interface Event {
  id: string;
  date: Date;
  title: string;
  description: string;
  time: string;
  location: string;
  type: 'reunion' | 'cita' | 'tarea' | 'otro';
  attendees: string[];
}

const eventosData: Event[] = [
  {
    id: '1',
    date: new Date(2026, 3, 15),
    title: 'Reunión de Padres',
    description: 'Discusión sobre desempeño académico',
    time: '14:00',
    location: 'Aula 101',
    type: 'reunion',
    attendees: ['Prof. García', 'Padres']
  },
  {
    id: '2',
    date: new Date(2026, 3, 18),
    title: 'Cita con Asesor',
    description: 'Consulta sobre planes futuros',
    time: '10:30',
    location: 'Oficina de Asesoría',
    type: 'cita',
    attendees: ['Asesor López']
  },
  {
    id: '3',
    date: new Date(2026, 3, 20),
    title: 'Entrega de Proyecto',
    description: 'Proyecto final de Matemáticas',
    time: '15:00',
    location: 'Virtual',
    type: 'tarea',
    attendees: ['Prof. Morales']
  }
];

export default function Calendario() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 1));
  const [eventos, setEventos] = useState<Event[]>(eventosData);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    time: '',
    location: '',
    type: 'reunion' as const,
    attendees: ''
  });

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDateClick = (day: number) => {
    const clicked = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(clicked);
    setShowModal(true);
    setSelectedEvent(null);
    setFormData({ title: '', description: '', time: '', location: '', type: 'reunion', attendees: '' });
  };

  const handleEventClick = (event: Event, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedEvent(event);
    setSelectedDate(event.date);
    setShowModal(true);
    setFormData({
      title: event.title,
      description: event.description,
      time: event.time,
      location: event.location,
      type: event.type,
      attendees: event.attendees.join(', ')
    });
  };

  const handleSaveEvent = () => {
    if (!selectedDate || !formData.title || !formData.time) return;

    if (selectedEvent) {
      setEventos(eventos.map(e =>
        e.id === selectedEvent.id
          ? {
              ...e,
              date: selectedDate,
              title: formData.title,
              description: formData.description,
              time: formData.time,
              location: formData.location,
              type: formData.type,
              attendees: formData.attendees.split(',').map(a => a.trim()).filter(a => a)
            }
          : e
      ));
    } else {
      setEventos([...eventos, {
        id: Date.now().toString(),
        date: selectedDate,
        title: formData.title,
        description: formData.description,
        time: formData.time,
        location: formData.location,
        type: formData.type,
        attendees: formData.attendees.split(',').map(a => a.trim()).filter(a => a)
      }]);
    }
    setShowModal(false);
    setSelectedEvent(null);
  };

  const handleDeleteEvent = (id: string) => {
    setEventos(eventos.filter(e => e.id !== id));
    setShowModal(false);
    setSelectedEvent(null);
  };

  const getEventsForDate = (date: Date) => {
    return eventos.filter(e =>
      e.date.getDate() === date.getDate() &&
      e.date.getMonth() === date.getMonth() &&
      e.date.getFullYear() === date.getFullYear()
    );
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'reunion': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'cita': return 'bg-green-100 text-green-700 border-green-200';
      case 'tarea': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'reunion': return 'Reunión';
      case 'cita': return 'Cita';
      case 'tarea': return 'Tarea';
      default: return 'Otro';
    }
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const monthName = currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="px-5 md:px-6 py-4 border-b border-border/30 flex items-center justify-between flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Calendario</h1>
          <p className="text-xs text-muted-foreground">Gestiona tus eventos y reuniones</p>
        </div>
        <button
          onClick={() => {
            setSelectedDate(null);
            setSelectedEvent(null);
            setShowModal(true);
            setFormData({ title: '', description: '', time: '', location: '', type: 'reunion', attendees: '' });
          }}
          className="flex items-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all shadow-sm font-medium whitespace-nowrap text-sm"
        >
          <Plus className="w-4 h-4" />
          Nuevo
        </button>
      </div>

      <div className="flex-1 flex gap-4 p-5 md:p-6">
        {/* Calendar Panel */}
        <div className="flex-1 bg-gradient-to-br from-card to-card/80 rounded-2xl border border-border/50 p-6 shadow-sm overflow-hidden flex flex-col">
          {/* Header del Calendario */}
          <div className="flex items-center justify-between mb-6 flex-shrink-0">
            <h2 className="text-xl font-bold text-foreground capitalize">{monthName}</h2>
            <div className="flex gap-2">
              <button
                onClick={handlePrevMonth}
                className="p-2 hover:bg-muted/50 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </button>
              <button
                onClick={handleNextMonth}
                className="p-2 hover:bg-muted/50 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-foreground" />
              </button>
            </div>
          </div>

          {/* Días de semana */}
          <div className="grid grid-cols-7 gap-2 mb-4 flex-shrink-0">
            {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
              <div key={day} className="text-center font-semibold text-muted-foreground/70 text-xs py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Días del mes */}
          <div className="grid grid-cols-7 gap-2 flex-1 overflow-hidden">
            {days.map((day, index) => (
              <div
                key={index}
                onClick={() => day && handleDateClick(day)}
                className={`relative p-2 rounded-lg border transition-all group ${
                  day
                    ? 'border-border/50 hover:border-primary/50 cursor-pointer hover:bg-muted/30'
                    : 'border-transparent'
                } ${
                  selectedDate &&
                  day &&
                  selectedDate.getDate() === day &&
                  selectedDate.getMonth() === currentDate.getMonth() &&
                  selectedDate.getFullYear() === currentDate.getFullYear()
                    ? 'bg-primary/10 border-primary shadow-sm'
                    : 'bg-background/50'
                }`}
              >
                {day && (
                  <>
                    <div className="font-semibold text-foreground text-xs mb-1">{day}</div>
                    <div className="space-y-0.5 max-h-16 overflow-y-auto">
                      {getEventsForDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day)).map(event => (
                        <button
                          key={event.id}
                          onClick={(e) => handleEventClick(event, e)}
                          className={`w-full text-left text-xs px-1.5 py-0.5 rounded border cursor-pointer hover:opacity-90 transition-opacity truncate font-medium ${getTypeColor(event.type)}`}
                          title={`${event.time} - ${event.title}`}
                        >
                          {event.time}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar - Lista de Eventos */}
        <div className="w-full md:w-80 bg-gradient-to-br from-card to-card/80 rounded-2xl border border-border/50 p-4 shadow-sm h-full flex flex-col overflow-hidden">
          <h3 className="text-lg font-bold text-foreground mb-3 flex-shrink-0">Próximos</h3>
          <div className="flex-1 overflow-y-auto space-y-2">
            {eventos.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground/60">
                <p className="text-sm">Sin eventos</p>
              </div>
            ) : (
              eventos.sort((a, b) => a.date.getTime() - b.date.getTime()).map(event => (
                <button
                  key={event.id}
                  onClick={(e) => handleEventClick(event, e)}
                  className={`w-full text-left p-3 rounded-lg border-2 transition-all hover:shadow-md group ${getTypeColor(event.type)}`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="text-xs font-bold">{getTypeLabel(event.type)}</span>
                    <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      <Edit2 className="w-3 h-3" />
                    </span>
                  </div>
                  <p className="font-semibold text-sm mb-2 line-clamp-2">{event.title}</p>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 flex-shrink-0" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </div>
                    {event.attendees.length > 0 && (
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{event.attendees.slice(0, 1).join(', ')}{event.attendees.length > 1 ? `+${event.attendees.length - 1}` : ''}</span>
                      </div>
                    )}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Modal - Evento Detallado */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-gradient-to-br from-card to-card/80 rounded-2xl border border-border/50 max-w-md w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-b border-border/30 px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="font-bold text-lg text-foreground">{selectedEvent ? 'Editar' : 'Nuevo'}</h2>
                <p className="text-xs text-muted-foreground/70">Evento</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-muted/50 rounded-lg transition-all text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Contenido */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">Título*</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ej: Reunión con padres"
                  className="w-full px-3 py-2 bg-muted/50 border border-border/30 rounded-lg text-sm text-foreground placeholder-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">Descripción</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detalles sobre el evento..."
                  className="w-full px-3 py-2 bg-muted/50 border border-border/30 rounded-lg text-sm text-foreground placeholder-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent transition-all resize-none"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-semibold text-foreground block mb-2">Hora*</label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-3 py-2 bg-muted/50 border border-border/30 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground block mb-2">Tipo</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full px-3 py-2 bg-muted/50 border border-border/30 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent transition-all"
                  >
                    <option value="reunion">Reunión</option>
                    <option value="cita">Cita</option>
                    <option value="tarea">Tarea</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">Ubicación</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Ej: Aula 101 o Virtual"
                  className="w-full px-3 py-2 bg-muted/50 border border-border/30 rounded-lg text-sm text-foreground placeholder-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">Participantes</label>
                <input
                  type="text"
                  value={formData.attendees}
                  onChange={(e) => setFormData({ ...formData, attendees: e.target.value })}
                  placeholder="Separados por comas"
                  className="w-full px-3 py-2 bg-muted/50 border border-border/30 rounded-lg text-sm text-foreground placeholder-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent transition-all"
                />
              </div>

              {selectedDate && (
                <div className="p-3 bg-primary/5 rounded-lg border border-primary/20 text-sm text-foreground">
                  <strong className="block text-xs text-muted-foreground/70 mb-1">Fecha</strong>
                  {selectedDate.toLocaleDateString('es-ES', { weekday: 'long', month: 'long', day: 'numeric' })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-border/30 bg-muted/20 px-6 py-3 flex gap-2 justify-between">
              <div>
                {selectedEvent && (
                  <button
                    onClick={() => handleDeleteEvent(selectedEvent.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-destructive/30 text-destructive rounded-lg hover:bg-destructive/10 transition-all font-medium"
                  >
                    <Trash2 className="w-4 h-4" />
                    Eliminar
                  </button>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-1.5 text-sm border border-border rounded-lg hover:bg-muted/50 transition-colors font-medium text-foreground"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveEvent}
                  disabled={!formData.title || !formData.time}
                  className="px-4 py-1.5 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {selectedEvent ? 'Guardar' : 'Crear'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
