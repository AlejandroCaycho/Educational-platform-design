'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, X, Clock, MapPin, User, Trash2, Edit2, AlertCircle, CheckCircle, Users, Calendar, FileText, BookOpen } from 'lucide-react';

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

interface Participant {
  id: string;
  name: string;
  role: 'tutor' | 'profesor' | 'directivo' | 'alumno' | 'padre';
}

const participantesData: Participant[] = [
  { id: '1', name: 'Prof. García', role: 'profesor' },
  { id: '2', name: 'Prof. Morales', role: 'profesor' },
  { id: '3', name: 'Prof. López', role: 'profesor' },
  { id: '4', name: 'Tutor Ruiz', role: 'tutor' },
  { id: '5', name: 'Tutor Pérez', role: 'tutor' },
  { id: '6', name: 'Director González', role: 'directivo' },
  { id: '7', name: 'Directora Martínez', role: 'directivo' },
  { id: '8', name: 'Juan Gómez', role: 'alumno' },
  { id: '9', name: 'María Sánchez', role: 'alumno' },
  { id: '10', name: 'Carlos López', role: 'alumno' },
  { id: '11', name: 'Padre Gómez', role: 'padre' },
  { id: '12', name: 'Madre Sánchez', role: 'padre' },
  { id: '13', name: 'Asesor López', role: 'tutor' }
];

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
  const [showDateSelection, setShowDateSelection] = useState(false);
  const [showParticipantSelection, setShowParticipantSelection] = useState(false);
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
  const [participantFilter, setParticipantFilter] = useState<Participant['role'] | 'all'>('all');
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
        attendees: selectedParticipants.length > 0 ? selectedParticipants : formData.attendees.split(',').map(a => a.trim()).filter(a => a)
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'reunion': return <Users className="w-5 h-5" />;
      case 'cita': return <Calendar className="w-5 h-5" />;
      case 'tarea': return <FileText className="w-5 h-5" />;
      case 'tutoría': return <BookOpen className="w-5 h-5" />;
      default: return <Clock className="w-5 h-5" />;
    }
  };

  const getFilteredParticipants = () => {
    if (participantFilter === 'all') return participantesData;
    return participantesData.filter(p => p.role === participantFilter);
  };

  const getRoleName = (role: string) => {
    const roleNames: Record<string, string> = {
      tutor: 'Tutores',
      profesor: 'Profesores',
      directivo: 'Directivos',
      alumno: 'Alumnos',
      padre: 'Padres'
    };
    return roleNames[role] || role;
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
          <p className="text-xs text-muted-foreground">Gestiona tus eventos, citas y reuniones</p>
        </div>
        <button
          onClick={() => {
            setValidationErrors([]);
            setShowTypeSelection(true);
            setShowDateSelection(false);
            setShowModal(false);
            setSelectedDate(null);
            setSelectedEvent(null);
            setSelectedParticipants([]);
            setFormData({ title: '', description: '', time: '', location: '', type: 'reunion', attendees: '' });
          }}
          className="flex items-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all text-sm font-medium shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Nuevo Evento
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
                      <div className={`font-bold text-xs mb-1 ${isPassed ? 'text-muted-foreground/50' : 'text-foreground'}`}>
                        {day}
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

        {/* Sidebar - Resumen de Eventos */}
        <div className="w-full md:w-96 bg-gradient-to-br from-card to-card/80 rounded-2xl border border-border/50 p-6 shadow-sm h-full flex flex-col overflow-hidden">
          <div className="flex items-center gap-3 mb-4 flex-shrink-0">
            <div className="p-2 rounded-lg bg-primary/10">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Próximos Eventos</h3>
          </div>
          <div className="flex-1 overflow-y-auto space-y-2">
            {eventos.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground/60">
                <p className="text-sm">Sin eventos</p>
              </div>
            ) : (
              eventos.sort((a, b) => a.date.getTime() - b.date.getTime()).map(event => {
                const isEventPassed = isDatePassed(event.date);
                return (
                  <button
                    key={event.id}
                    onClick={(e) => handleEventClick(event, e)}
                    className={`w-full text-left p-3 rounded-lg border transition-all hover:shadow-md group ${getTypeColor(event.type)} ${isEventPassed ? 'opacity-60' : ''}`}
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <div className="text-sm flex-shrink-0 mt-0.5">
                        {getTypeIcon(event.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <span className="text-xs font-bold">{getTypeLabel(event.type)}</span>
                          <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                            <Edit2 className="w-3 h-3" />
                          </span>
                        </div>
                        <p className="font-semibold text-sm mb-2 line-clamp-2">{event.title}</p>
                      </div>
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 flex-shrink-0" />
                        <span>{event.date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })} • {event.time}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{event.location}</span>
                        </div>
                      )}
                      {event.attendees.length > 0 && (
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{event.attendees.slice(0, 1).join(', ')}{event.attendees.length > 1 ? `+${event.attendees.length - 1}` : ''}</span>
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
      {showTypeSelection && !selectedDate && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-gradient-to-br from-card to-card/80 rounded-2xl border border-border/50 max-w-md w-full overflow-hidden flex flex-col shadow-2xl">
            {/* Header */}
            <div className="bg-muted/30 border-b border-border/30 px-6 py-4 flex items-center justify-between flex-shrink-0">
              <div>
                <h2 className="font-semibold text-lg text-foreground">Tipo de Evento</h2>
                <p className="text-xs text-muted-foreground">{selectedDate.toLocaleDateString('es-ES', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
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
            <div className="flex-1 px-6 py-4 space-y-2">
              {[
                { value: 'reunion', label: 'Reunión', desc: 'Reuniones con padres o docentes' },
                { value: 'cita', label: 'Cita', desc: 'Citas con asesores o especialistas' },
                { value: 'tarea', label: 'Tarea', desc: 'Entrega de tareas académicas' },
                { value: 'tutoría', label: 'Tutoría', desc: 'Sesiones de tutoría' },
                { value: 'otro', label: 'Otro', desc: 'Otros eventos importantes' }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => {
                    setFormData({ ...formData, type: option.value as any });
                    setShowTypeSelection(false);
                    setShowDateSelection(true);
                  }}
                  className="w-full p-4 rounded-lg border border-border/50 transition-all text-left hover:bg-muted/50 hover:border-primary/50 hover:shadow-md group"
                >
                  <div className="flex items-start gap-3">
                    <div className="text-muted-foreground group-hover:text-primary transition-colors mt-0.5">
                      {option.value === 'reunion' && <Users className="w-5 h-5" />}
                      {option.value === 'cita' && <Calendar className="w-5 h-5" />}
                      {option.value === 'tarea' && <FileText className="w-5 h-5" />}
                      {option.value === 'tutoría' && <BookOpen className="w-5 h-5" />}
                      {option.value === 'otro' && <Clock className="w-5 h-5" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{option.label}</p>
                      <p className="text-xs text-muted-foreground/70">{option.desc}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal - Selector de Fecha */}
      {showDateSelection && !selectedDate && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-gradient-to-br from-card to-card/80 rounded-2xl border border-border/50 max-w-lg w-full overflow-hidden flex flex-col shadow-2xl">
            {/* Header */}
            <div className="bg-muted/30 border-b border-border/30 px-6 py-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg text-foreground">Selecciona una Fecha</h2>
                  <p className="text-xs text-muted-foreground">Elige cuándo ocurrirá el evento</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowDateSelection(false);
                  setShowTypeSelection(true);
                  setFormData({ title: '', description: '', time: '', location: '', type: 'reunion', attendees: '' });
                }}
                className="p-2 hover:bg-muted/50 rounded-lg transition-all text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Contenido - Mini Calendario */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {/* Header del Calendario */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground capitalize">
                  {currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
                </h3>
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
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
                  <div key={day} className="text-center font-semibold text-muted-foreground/70 text-xs py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Días del mes */}
              <div className="grid grid-cols-7 gap-2">
                {days.map((day, index) => {
                  const dateForDay = day ? new Date(currentDate.getFullYear(), currentDate.getMonth(), day) : null;
                  const isPassed = dateForDay && isDatePassed(dateForDay);
                  
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        if (day && !isPassed) {
                          setSelectedDate(dateForDay);
                          setShowDateSelection(false);
                          setShowModal(true);
                        }
                      }}
                      disabled={!day || isPassed}
                      className={`p-2 rounded-lg border transition-all text-center text-sm font-medium ${
                        day && !isPassed
                          ? 'border-border/50 hover:border-primary/70 cursor-pointer hover:bg-primary/5 hover:shadow-md'
                          : 'border-transparent text-muted-foreground/30 cursor-not-allowed'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal - Evento Detallado */}
      {showModal && !showTypeSelection && !showDateSelection && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-gradient-to-br from-card to-card/80 rounded-2xl border border-border/50 max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl">
            {/* Header */}
            <div className="bg-muted/30 border-b border-border/30 px-6 py-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                  {getTypeIcon(formData.type)}
                </div>
                <div>
                  <h2 className="font-semibold text-lg text-foreground">{selectedEvent ? 'Editar' : 'Nuevo'} {getTypeLabel(formData.type)}</h2>
                  <p className="text-xs text-muted-foreground">Completa los detalles del evento</p>
                </div>
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
                <div className="p-3 bg-muted/30 rounded-lg border border-border/50 text-sm text-foreground">
                  <strong className="block text-xs text-muted-foreground/70 mb-1">Fecha Seleccionada</strong>
                  <p className="font-medium">{selectedDate.toLocaleDateString('es-ES', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                </div>
              )}

              <div>
                <label className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  Título del Evento*
                </label>
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
                  <label className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    Hora*
                  </label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-2 bg-muted/50 border border-border/30 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    Ubicación
                  </label>
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
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    Participantes ({selectedParticipants.length})
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowParticipantSelection(true)}
                    className="text-xs px-3 py-1.5 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-all font-medium"
                  >
                    Seleccionar
                  </button>
                </div>
                {selectedParticipants.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {selectedParticipants.map(participant => (
                      <div
                        key={participant}
                        className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-xs font-medium flex items-center gap-2"
                      >
                        <span>{participant}</span>
                        <button
                          type="button"
                          onClick={() => setSelectedParticipants(selectedParticipants.filter(p => p !== participant))}
                          className="hover:text-destructive transition-colors"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs text-muted-foreground/60 mb-2">No hay participantes seleccionados</div>
                )}
                <input
                  type="hidden"
                  value={selectedParticipants.join(', ')}
                  onChange={(e) => setFormData({ ...formData, attendees: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  Descripción
                </label>
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
                  className="px-6 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  {selectedEvent ? 'Guardar Cambios' : 'Crear Evento'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal - Selección de Participantes */}
      {showParticipantSelection && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-gradient-to-br from-card to-card/80 rounded-2xl border border-border/50 max-w-md w-full max-h-[80vh] overflow-hidden flex flex-col shadow-2xl">
            {/* Header */}
            <div className="bg-muted/30 border-b border-border/30 px-6 py-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg text-foreground">Seleccionar Participantes</h2>
                  <p className="text-xs text-muted-foreground">Filtra por tipo de persona</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowParticipantSelection(false);
                  setParticipantFilter('all');
                }}
                className="p-2 hover:bg-muted/50 rounded-lg transition-all text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filtros */}
            <div className="border-b border-border/30 px-6 py-3 flex-shrink-0">
              <div className="flex gap-2 overflow-x-auto pb-2">
                <button
                  onClick={() => setParticipantFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                    participantFilter === 'all'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted/50 text-foreground hover:bg-muted'
                  }`}
                >
                  Todos
                </button>
                {(['tutor', 'profesor', 'directivo', 'alumno', 'padre'] as const).map(role => (
                  <button
                    key={role}
                    onClick={() => setParticipantFilter(role)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                      participantFilter === role
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted/50 text-foreground hover:bg-muted'
                    }`}
                  >
                    {getRoleName(role)}
                  </button>
                ))}
              </div>
            </div>

            {/* Lista de Participantes */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-2">
              {getFilteredParticipants().map(participant => (
                <button
                  key={participant.id}
                  onClick={() => {
                    const isSelected = selectedParticipants.includes(participant.name);
                    if (isSelected) {
                      setSelectedParticipants(selectedParticipants.filter(p => p !== participant.name));
                    } else {
                      setSelectedParticipants([...selectedParticipants, participant.name]);
                    }
                  }}
                  className={`w-full p-3 rounded-lg border transition-all text-left flex items-center gap-3 ${
                    selectedParticipants.includes(participant.name)
                      ? 'bg-primary/10 border-primary/50 text-foreground'
                      : 'bg-muted/30 border-border/50 text-foreground hover:bg-muted/50'
                  }`}
                >
                  <div className={`w-5 h-5 rounded border flex items-center justify-center text-xs font-bold ${
                    selectedParticipants.includes(participant.name)
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'border-border/50'
                  }`}>
                    {selectedParticipants.includes(participant.name) && '✓'}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{participant.name}</p>
                    <p className="text-xs text-muted-foreground/70 capitalize">{getRoleName(participant.role)}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-border/30 bg-muted/20 px-6 py-3 flex gap-2 justify-end flex-shrink-0">
              <button
                onClick={() => {
                  setShowParticipantSelection(false);
                  setParticipantFilter('all');
                }}
                className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-muted/50 transition-colors font-medium text-foreground"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
