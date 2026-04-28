'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, X, Clock, MapPin, User, Trash2, Edit2, AlertCircle, CheckCircle } from 'lucide-react';

interface Event {
  id: string;
  date: Date;
  title: string;
  description: string;
  time: string;
  location: string;
  type: 'reunion' | 'cita' | 'tarea' | 'tutoría' | 'otro';
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
  const [showTypeSelection, setShowTypeSelection] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

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

  const isDatePassed = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const hasConflict = (date: Date, time: string, excludeId?: string) => {
    return eventos.some(e => {
      if (excludeId && e.id === excludeId) return false;
      return e.date.toDateString() === date.toDateString() && e.time === time;
    });
  };

  const validateForm = () => {
    const errors: string[] = [];
    
    if (!selectedDate) {
      errors.push('Selecciona una fecha');
    } else if (isDatePassed(selectedDate) && !selectedEvent) {
      errors.push('No puedes crear eventos en fechas pasadas');
    }
    
    if (!formData.title.trim()) {
      errors.push('El título es obligatorio');
    }
    
    if (!formData.time) {
      errors.push('La hora es obligatoria');
    } else if (hasConflict(selectedDate!, formData.time, selectedEvent?.id)) {
      errors.push('Ya existe un evento en esa hora');
    }
    
    if (formData.title.trim().length > 100) {
      errors.push('El título no puede exceder 100 caracteres');
    }
    
    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleDateClick = (day: number) => {
    const clicked = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    
    // No permitir seleccionar fechas pasadas para nuevos eventos
    if (isDatePassed(clicked)) {
      setValidationErrors(['No puedes crear eventos en fechas pasadas']);
      return;
    }
    
    setSelectedDate(clicked);
    setSelectedEvent(null);
    setFormData({ title: '', description: '', time: '', location: '', type: 'reunion', attendees: '' });
    setShowTypeSelection(true);
    setValidationErrors([]);
    setShowModal(false);
  };

  const handleEventClick = (event: Event, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedEvent(event);
    setSelectedDate(event.date);
    setFormData({
      title: event.title,
      description: event.description,
      time: event.time,
      location: event.location,
      type: event.type,
      attendees: event.attendees.join(', ')
    });
    setShowTypeSelection(false);
    setShowModal(true);
    setValidationErrors([]);
  };

  const handleSaveEvent = () => {
    if (!validateForm()) return;

    if (selectedEvent) {
      setEventos(eventos.map(e =>
        e.id === selectedEvent.id
          ? {
              ...e,
              date: selectedDate!,
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
        date: selectedDate!,
        title: formData.title,
        description: formData.description,
        time: formData.time,
        location: formData.location,
        type: formData.type,
        attendees: formData.attendees.split(',').map(a => a.trim()).filter(a => a)
      }]);
    }
    setShowModal(false);
    setShowTypeSelection(false);
    setSelectedEvent(null);
    setValidationErrors([]);
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
      case 'tutoría': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'reunion': return 'Reunión';
      case 'cita': return 'Cita';
      case 'tarea': return 'Tarea';
      case 'tutoría': return 'Tutoría';
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
          <h1 className="text-2xl font-bold text-foreground">📅 Mi Calendario</h1>
          <p className="text-xs text-muted-foreground">Gestiona tus eventos, citas y reuniones</p>
        </div>
        <div>
          <button
            onClick={() => {
              setValidationErrors([]);
              setShowTypeSelection(false);
              setSelectedDate(null);
              setSelectedEvent(null);
              setFormData({ title: '', description: '', time: '', location: '', type: 'reunion', attendees: '' });
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg font-semibold whitespace-nowrap text-sm hover:shadow-xl hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            Crear Evento
          </button>
        </div>
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
            {days.map((day, index) => {
              const dateForDay = day ? new Date(currentDate.getFullYear(), currentDate.getMonth(), day) : null;
              const isPassed = dateForDay && isDatePassed(dateForDay);
              const dayEvents = day ? getEventsForDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day)) : [];
              
              return (
                <div
                  key={index}
                  onClick={() => day && !isPassed && handleDateClick(day)}
                  className={`relative p-2 rounded-lg border transition-all group ${
                    day
                      ? isPassed 
                        ? 'border-border/20 bg-muted/20 cursor-not-allowed opacity-50'
                        : 'border-border/50 hover:border-primary/70 cursor-pointer hover:bg-primary/5 hover:shadow-md'
                      : 'border-transparent'
                  } ${
                    selectedDate &&
                    day &&
                    selectedDate.getDate() === day &&
                    selectedDate.getMonth() === currentDate.getMonth() &&
                    selectedDate.getFullYear() === currentDate.getFullYear()
                      ? 'bg-primary/15 border-primary/70 shadow-lg'
                      : 'bg-background/50'
                  }`}
                  title={isPassed && day ? 'Fecha pasada - no editable' : ''}
                >
                  {day && (
                    <>
                      <div className={`font-bold text-xs mb-1 flex items-center gap-1 ${isPassed ? 'text-muted-foreground/50' : 'text-foreground'}`}>
                        {day}
                        {isPassed && <span className="text-xs">✓</span>}
                      </div>
                      <div className="space-y-0.5 max-h-16 overflow-y-auto">
                        {dayEvents.length > 0 ? (
                          dayEvents.map(event => (
                            <button
                              key={event.id}
                              onClick={(e) => handleEventClick(event, e)}
                              className={`w-full text-left text-xs px-1.5 py-0.5 rounded border cursor-pointer hover:opacity-90 transition-opacity truncate font-semibold ${getTypeColor(event.type)}`}
                              title={`${event.time} - ${event.title}`}
                            >
                              <span className="inline-block w-10 font-mono">{event.time}</span>
                            </button>
                          ))
                        ) : (
                          <div className="text-xs text-muted-foreground/40 text-center py-1">-</div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar - Resumen de Reuniones */}
        <div className="w-full md:w-96 bg-gradient-to-br from-blue-50 to-blue-50/50 dark:from-blue-950/30 dark:to-blue-950/20 rounded-2xl border border-blue-200/50 dark:border-blue-800/50 p-5 shadow-lg h-full flex flex-col overflow-hidden">
          <div className="flex items-center gap-2 mb-4 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Clock className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-lg font-bold text-foreground">Resumen de Eventos</h3>
          </div>
          <div className="flex-1 overflow-y-auto space-y-2.5">
            {eventos.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground/60">
                <CheckCircle className="w-12 h-12 mx-auto mb-3 text-blue-400/50" />
                <p className="text-sm font-medium">Sin eventos</p>
                <p className="text-xs mt-1">Selecciona un día para crear uno</p>
              </div>
            ) : (
              eventos.sort((a, b) => a.date.getTime() - b.date.getTime()).map(event => {
                const isEventPassed = isDatePassed(event.date);
                return (
                  <button
                    key={event.id}
                    onClick={(e) => handleEventClick(event, e)}
                    className={`w-full text-left p-3.5 rounded-xl border-2 transition-all hover:shadow-lg group relative overflow-hidden ${
                      getTypeColor(event.type)
                    } ${isEventPassed ? 'opacity-60' : ''}`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/5 group-hover:to-white/10 transition-all pointer-events-none" />
                    <div className="relative flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-white/80 dark:bg-white/10">
                          {getTypeLabel(event.type)}
                        </span>
                        {isEventPassed && <span className="text-xs opacity-70">✓ Pasado</span>}
                      </div>
                      <Edit2 className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    </div>
                    <p className="font-bold text-sm mb-2.5 line-clamp-2 text-foreground">{event.title}</p>
                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="font-medium">{event.date.toLocaleDateString('es-ES', { weekday: 'short', month: 'short', day: 'numeric' })} • {event.time}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                          <span className="truncate">{event.location}</span>
                        </div>
                      )}
                      {event.attendees.length > 0 && (
                        <div className="flex items-center gap-2">
                          <User className="w-3.5 h-3.5 flex-shrink-0" />
                          <span className="truncate text-xs">
                            {event.attendees.slice(0, 2).join(', ')}
                            {event.attendees.length > 2 ? ` +${event.attendees.length - 2}` : ''}
                          </span>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Modal - Selector de Tipo de Evento */}
      {showTypeSelection && selectedDate && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-gradient-to-br from-card to-card/80 rounded-2xl border border-border/50 max-w-md w-full overflow-hidden flex flex-col shadow-2xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border-b border-border/30 px-6 py-4 flex items-center justify-between flex-shrink-0">
              <div>
                <h2 className="font-bold text-lg text-foreground">Tipo de Evento</h2>
                <p className="text-xs text-muted-foreground/70">{selectedDate.toLocaleDateString('es-ES', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
              </div>
              <button
                onClick={() => {
                  setShowTypeSelection(false);
                  setSelectedDate(null);
                }}
                className="p-2 hover:bg-muted/50 rounded-lg transition-all text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Contenido */}
            <div className="flex-1 px-6 py-5 space-y-3">
              <p className="text-sm text-muted-foreground mb-4">Selecciona el tipo de evento que deseas crear:</p>
              {[
                { value: 'reunion', label: 'Reunión', icon: '👥', color: 'from-blue-500/20 to-blue-600/20 hover:from-blue-500/30 hover:to-blue-600/30 border-blue-300/50' },
                { value: 'cita', label: 'Cita', icon: '📅', color: 'from-green-500/20 to-green-600/20 hover:from-green-500/30 hover:to-green-600/30 border-green-300/50' },
                { value: 'tarea', label: 'Tarea', icon: '✓', color: 'from-orange-500/20 to-orange-600/20 hover:from-orange-500/30 hover:to-orange-600/30 border-orange-300/50' },
                { value: 'tutoría', label: 'Tutoría', icon: '🎓', color: 'from-purple-500/20 to-purple-600/20 hover:from-purple-500/30 hover:to-purple-600/30 border-purple-300/50' },
                { value: 'otro', label: 'Otro', icon: '📌', color: 'from-gray-500/20 to-gray-600/20 hover:from-gray-500/30 hover:to-gray-600/30 border-gray-300/50' }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => {
                    setFormData({ ...formData, type: option.value as any });
                    setShowTypeSelection(false);
                    setShowModal(true);
                  }}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left bg-gradient-to-r ${option.color} font-semibold hover:shadow-lg group`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{option.icon}</span>
                    <div className="flex-1">
                      <p className="font-bold text-foreground">{option.label}</p>
                      <p className="text-xs text-muted-foreground/70 mt-0.5">
                        {option.value === 'reunion' && 'Reuniones con padres, docentes o directivos'}
                        {option.value === 'cita' && 'Citas con asesores o especialistas'}
                        {option.value === 'tarea' && 'Entrega de tareas y trabajos académicos'}
                        {option.value === 'tutoría' && 'Sesiones de tutoría o asesoramiento'}
                        {option.value === 'otro' && 'Otros eventos importantes'}
                      </p>
                    </div>
                    <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal - Evento Detallado */}
      {showModal && !showTypeSelection && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-gradient-to-br from-card to-card/80 rounded-2xl border border-border/50 max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-b border-border/30 px-6 py-4 flex items-center justify-between flex-shrink-0">
              <div>
                <h2 className="font-bold text-lg text-foreground">{selectedEvent ? 'Editar' : 'Nuevo'} {getTypeLabel(formData.type)}</h2>
                <p className="text-xs text-muted-foreground/70">Completa los detalles del evento</p>
              </div>
              <button
                onClick={() => {
                  setShowModal(false);
                  setValidationErrors([]);
                }}
                className="p-2 hover:bg-muted/50 rounded-lg transition-all text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Contenido */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {/* Errores de validación */}
              {validationErrors.length > 0 && (
                <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg space-y-1">
                  {validationErrors.map((error, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-destructive">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Fecha seleccionada */}
              {selectedDate && (
                <div className="p-3 bg-primary/5 rounded-lg border border-primary/20 text-sm text-foreground">
                  <strong className="block text-xs text-muted-foreground/70 mb-1">📅 Fecha Seleccionada</strong>
                  <p className="font-semibold">{selectedDate.toLocaleDateString('es-ES', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>
              )}

              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">Título del Evento*</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ej: Reunión con Padres"
                  maxLength={100}
                  className="w-full px-4 py-2 bg-muted/50 border border-border/30 rounded-lg text-sm text-foreground placeholder-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent transition-all"
                />
                <p className="text-xs text-muted-foreground/60 mt-1">{formData.title.length}/100 caracteres</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-foreground block mb-2">Hora*</label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-2 bg-muted/50 border border-border/30 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground block mb-2">Ubicación</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Ej: Aula 101, Virtual"
                    className="w-full px-4 py-2 bg-muted/50 border border-border/30 rounded-lg text-sm text-foreground placeholder-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">Participantes</label>
                <input
                  type="text"
                  value={formData.attendees}
                  onChange={(e) => setFormData({ ...formData, attendees: e.target.value })}
                  placeholder="Ej: Prof. García, Director López (separados por comas)"
                  className="w-full px-4 py-2 bg-muted/50 border border-border/30 rounded-lg text-sm text-foreground placeholder-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">Descripción</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detalles adicionales..."
                  className="w-full px-4 py-2 bg-muted/50 border border-border/30 rounded-lg text-sm text-foreground placeholder-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent transition-all resize-none"
                  rows={3}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-border/30 bg-muted/20 px-6 py-3 flex gap-2 justify-between flex-shrink-0">
              <div>
                {selectedEvent && (
                  <button
                    onClick={() => handleDeleteEvent(selectedEvent.id)}
                    className="flex items-center gap-1.5 px-3 py-2 text-sm border border-destructive/30 text-destructive rounded-lg hover:bg-destructive/10 transition-all font-medium"
                  >
                    <Trash2 className="w-4 h-4" />
                    Eliminar
                  </button>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setValidationErrors([]);
                  }}
                  className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-muted/50 transition-colors font-medium text-foreground"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveEvent}
                  className="px-6 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  {selectedEvent ? '💾 Guardar Cambios' : '✓ Crear Evento'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}
