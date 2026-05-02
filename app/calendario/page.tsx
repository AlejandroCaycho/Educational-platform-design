'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 15),
    title: 'Reunión de Padres',
    description: 'Discusión sobre desempeño académico',
    time: '14:00',
    location: 'Aula 101',
    type: 'reunion',
    attendees: ['Prof. García', 'Padres']
  },
  {
    id: '2',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 18),
    title: 'Cita con Asesor',
    description: 'Consulta sobre planes futuros',
    time: '10:30',
    location: 'Oficina de Asesoría',
    type: 'cita',
    attendees: ['Asesor López']
  },
  {
    id: '3',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 20),
    title: 'Entrega de Proyecto',
    description: 'Proyecto final de Matemáticas',
    time: '15:00',
    location: 'Virtual',
    type: 'tarea',
    attendees: ['Prof. Morales']
  }
];

export default function Calendario() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [eventos, setEventos] = useState<Event[]>(eventosData);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    time: '',
    location: '',
    type: 'reunion' as Event['type'],
    attendees: ''
  });
  const [showTypeSelection, setShowTypeSelection] = useState(false);
  const [showDateSelection, setShowDateSelection] = useState(false);
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleGlobalNewEvent = () => {
        setValidationErrors([]);
        setShowTypeSelection(true);
        setShowDateSelection(false);
        setShowModal(false);
        setSelectedDate(null);
        setSelectedEvent(null);
        setSelectedParticipants([]);
        setFormData({ title: '', description: '', time: '', location: '', type: 'reunion', attendees: '' });
    };

    window.addEventListener('EDU_NOVA_OPEN_NEW_EVENT', handleGlobalNewEvent);
    return () => window.removeEventListener('EDU_NOVA_OPEN_NEW_EVENT', handleGlobalNewEvent);
  }, []);

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
      case 'reunion': return 'bg-blue-500/10 text-blue-600 border-blue-500/20 hover:bg-blue-500/20 dark:text-blue-400';
      case 'cita': return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/20 dark:text-emerald-400';
      case 'tarea': return 'bg-orange-500/10 text-orange-600 border-orange-500/20 hover:bg-orange-500/20 dark:text-orange-400';
      case 'tutoría': return 'bg-purple-500/10 text-purple-600 border-purple-500/20 hover:bg-purple-500/20 dark:text-purple-400';
      default: return 'bg-slate-500/10 text-slate-600 border-slate-500/20 hover:bg-slate-500/20 dark:text-slate-400';
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
  const days: (number | null)[] = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const monthName = currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });

  return (
    <div className="h-full flex flex-col bg-background relative overflow-hidden">
      <div className="flex-1 flex gap-6 p-6 min-h-0 overflow-hidden">
        {/* Calendar Panel */}
        <div className="flex-1 bg-card rounded-2xl border border-border p-6 shadow-sm flex flex-col min-h-0 overflow-hidden">
          <div className="flex items-center justify-between mb-6 flex-shrink-0">
            <h3 className="text-lg font-bold text-foreground capitalize">{monthName}</h3>
            <div className="flex gap-2">
              <button onClick={handlePrevMonth} className="p-2 hover:bg-muted/50 rounded-lg transition-colors border border-border/50 text-foreground"><ChevronLeft className="w-5 h-5" /></button>
              <button onClick={handleNextMonth} className="p-2 hover:bg-muted/50 rounded-lg transition-colors border border-border/50 text-foreground"><ChevronRight className="w-5 h-5" /></button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-2 flex-shrink-0">
            {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
              <div key={day} className="text-center font-black text-muted-foreground/50 text-[10px] uppercase tracking-widest py-2">{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2 flex-1 overflow-y-auto pr-1 scrollbar-thin">
            {days.map((day, index) => {
              const dateForDay = day ? new Date(currentDate.getFullYear(), currentDate.getMonth(), day) : null;
              const isPassed = !!(dateForDay && isDatePassed(dateForDay));
              const dayEvents = day ? getEventsForDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day)) : [];
              
              return (
                <div
                  key={index}
                  onClick={() => day && !isPassed && handleDateClick(day)}
                  className={`relative p-2 rounded-xl border transition-all min-h-[100px] flex flex-col ${
                    day
                      ? isPassed 
                        ? 'border-border/10 bg-muted/5 cursor-not-allowed opacity-30'
                        : 'border-border/20 hover:border-primary/40 cursor-pointer hover:bg-muted/20'
                      : 'border-transparent'
                  }`}
                >
                  {day && (
                    <>
                      <span className={`text-xs font-bold ${isPassed ? 'text-muted-foreground/40' : 'text-foreground/60'}`}>{day}</span>
                      <div className="space-y-1 mt-2">
                        {dayEvents.map(event => (
                          <button
                            key={event.id}
                            onClick={(e) => handleEventClick(event, e)}
                            className={`w-full text-left text-[10px] px-2 py-1 rounded-lg border truncate font-bold uppercase tracking-tight transition-all ${getTypeColor(event.type)}`}
                          >
                            {event.title}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-card rounded-2xl border border-border p-6 shadow-sm h-full flex flex-col overflow-hidden flex-shrink-0">
          <div className="flex items-center gap-3 mb-6 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Clock className="w-4 h-4 text-primary" />
            </div>
            <h3 className="text-base font-bold text-foreground">Agenda Próxima</h3>
          </div>
          <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
            {eventos.sort((a, b) => a.date.getTime() - b.date.getTime()).map(event => (
              <button
                key={event.id}
                onClick={(e) => handleEventClick(event, e)}
                className="w-full text-left p-4 rounded-xl border border-border/40 bg-muted/20 hover:border-primary/30 transition-all group"
              >
                <p className="text-[9px] font-black text-primary uppercase tracking-widest mb-1">{getTypeLabel(event.type)}</p>
                <p className="font-bold text-sm text-foreground line-clamp-1 mb-2">{event.title}</p>
                <div className="flex items-center gap-3 text-[10px] font-bold text-muted-foreground/70">
                  <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {event.time}</div>
                  <div className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {event.date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* RENDER DIRECTO DEL PORTAL PARA EVITAR REMOUNTING */}
      {mounted && createPortal(
        <>
            {showTypeSelection && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowTypeSelection(false)}></div>
                    <div className="relative bg-card border border-border rounded-3xl max-w-sm w-full p-8 shadow-2xl animate-in zoom-in-95 duration-200">
                    <h2 className="text-xl font-bold text-foreground mb-6">Nuevo Evento</h2>
                    <div className="space-y-3">
                        {[
                        { value: 'reunion', label: 'Reunión', icon: <Users className="w-5 h-5" /> },
                        { value: 'cita', label: 'Cita Médica/Psic.', icon: <Calendar className="w-5 h-5" /> },
                        { value: 'tarea', label: 'Entrega Académica', icon: <FileText className="w-5 h-5" /> },
                        { value: 'tutoría', label: 'Sesión Tutoría', icon: <BookOpen className="w-5 h-5" /> }
                        ].map(option => (
                        <button
                            key={option.value}
                            onClick={() => {
                            setFormData({ ...formData, type: option.value as any });
                            setShowTypeSelection(false);
                            if (selectedDate) {
                                setShowModal(true);
                            } else {
                                setShowDateSelection(true);
                            }
                            }}
                            className="w-full flex items-center gap-4 p-4 rounded-2xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group text-left"
                        >
                            <div className="p-3 rounded-xl bg-muted group-hover:bg-primary/10 group-hover:text-primary transition-colors">{option.icon}</div>
                            <span className="font-bold text-sm text-foreground">{option.label}</span>
                        </button>
                        ))}
                    </div>
                    <button onClick={() => setShowTypeSelection(false)} className="w-full mt-6 py-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground">Cerrar</button>
                    </div>
                </div>
            )}

            {showDateSelection && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowDateSelection(false)}></div>
                    <div className="relative bg-card border border-border rounded-3xl max-w-md w-full p-8 shadow-2xl animate-in zoom-in-95 duration-200">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-foreground capitalize">{currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}</h3>
                        <div className="flex gap-2">
                            <button onClick={handlePrevMonth} className="p-2 border border-border rounded-lg text-foreground hover:bg-muted/50"><ChevronLeft className="w-4 h-4" /></button>
                            <button onClick={handleNextMonth} className="p-2 border border-border rounded-lg text-foreground hover:bg-muted/50"><ChevronRight className="w-4 h-4" /></button>
                        </div>
                        </div>
                        <div className="grid grid-cols-7 gap-1 mb-4">
                        {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map(d => <div key={d} className="text-center text-[10px] font-black text-muted-foreground">{d}</div>)}
                        {days.map((day, i) => {
                            const dateForDay = day ? new Date(currentDate.getFullYear(), currentDate.getMonth(), day) : null;
                            const isPassed = !!(dateForDay && isDatePassed(dateForDay));
                            return (
                            <button
                                key={i}
                                disabled={!day || isPassed}
                                onClick={() => {
                                if (dateForDay) {
                                    setSelectedDate(dateForDay);
                                    setShowDateSelection(false);
                                    setShowModal(true);
                                }
                                }}
                                className={`p-2 text-xs font-bold rounded-lg transition-colors ${day && !isPassed ? 'hover:bg-primary hover:text-white' : 'text-muted-foreground/30'}`}
                            >
                                {day}
                            </button>
                            );
                        })}
                        </div>
                        <button onClick={() => {setShowDateSelection(false); setShowTypeSelection(true);}} className="w-full mt-4 py-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Volver</button>
                    </div>
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
                    <div className="relative bg-card border border-border rounded-3xl max-w-lg w-full p-8 shadow-2xl animate-in zoom-in-95 duration-200">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-foreground">{selectedEvent ? 'Editar' : 'Nuevo'} {getTypeLabel(formData.type)}</h2>
                        <button onClick={() => setShowModal(false)} className="p-2 hover:bg-muted rounded-full transition-colors"><X className="w-5 h-5 text-foreground" /></button>
                    </div>
                    <div className="space-y-4">
                        {validationErrors.length > 0 && (
                            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-xl mb-4">
                                {validationErrors.map((err, i) => <p key={i} className="text-[10px] font-bold text-destructive uppercase tracking-widest flex items-center gap-2"><AlertCircle className="w-3 h-3" /> {err}</p>)}
                            </div>
                        )}
                        <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Título</label>
                        <input 
                            type="text" 
                            value={formData.title} 
                            onChange={(e) => setFormData({...formData, title: e.target.value})} 
                            className="w-full px-4 py-3 bg-muted/30 border border-border rounded-xl font-bold text-sm outline-none focus:ring-2 focus:ring-primary/20 text-foreground" 
                            autoFocus
                        />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Hora</label>
                            <input type="time" value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} className="w-full px-4 py-2 bg-muted/30 border border-border rounded-xl font-bold text-sm outline-none text-foreground" />
                        </div>
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Lugar</label>
                            <input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="w-full px-4 py-2 bg-muted/30 border border-border rounded-xl font-bold text-sm outline-none text-foreground" />
                        </div>
                        </div>
                        <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Descripción</label>
                        <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-3 bg-muted/30 border border-border rounded-xl font-bold text-sm outline-none h-24 resize-none text-foreground" />
                        </div>
                    </div>
                    <div className="flex gap-4 mt-8">
                        {selectedEvent && (
                            <button onClick={() => handleDeleteEvent(selectedEvent.id)} className="p-3 text-destructive hover:bg-destructive/10 rounded-xl transition-all"><Trash2 className="w-5 h-5" /></button>
                        )}
                        <button onClick={() => setShowModal(false)} className="flex-1 py-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground bg-muted rounded-xl">Cancelar</button>
                        <button onClick={handleSaveEvent} className="flex-1 py-3 text-[10px] font-black uppercase tracking-widest text-white bg-primary rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">Guardar</button>
                    </div>
                    </div>
                </div>
            )}
        </>,
        document.body
      )}
    </div>
  );
}
