'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { BookOpen, MapPin, Clock, Users, GraduationCap, Plus, MoreVertical, Edit2, Trash2, Search, Filter, ExternalLink, X, AlertCircle, CheckCircle2, ChevronRight, User, ChevronDown } from 'lucide-react';

const MOCK_CLASES = [
  { id: 1, nombre: 'Matemática Avanzada', grado: '5to', seccion: 'A', profesor: 'Roberto Fernández', alumnos: 32, horario: '08:00 - 09:30', aula: 'Laboratorio 1' },
  { id: 2, nombre: 'Comunicación y Lenguaje', grado: '3ro', seccion: 'B', profesor: 'Lucía Méndez', alumnos: 28, horario: '10:00 - 11:30', aula: 'Aula 204' },
  { id: 3, nombre: 'Ciencias y Tecnología', grado: '2do', seccion: 'A', profesor: 'Andrés Gómez', alumnos: 30, horario: '08:00 - 09:30', aula: 'Bio-Lab' },
  { id: 4, nombre: 'Historia del Perú', grado: '4to', seccion: 'B', profesor: 'Diana Silva', alumnos: 25, horario: '11:45 - 13:15', aula: 'Aula 105' },
  { id: 5, nombre: 'Inglés Técnico', grado: '5to', seccion: 'B', profesor: 'Kevin Miller', alumnos: 22, horario: '09:45 - 11:15', aula: 'Aula 301' },
  { id: 6, nombre: 'Educación Física', grado: 'Todos', seccion: 'X', profesor: 'Carlos Ruiz', alumnos: 120, horario: '08:00 - 12:00', aula: 'Campo Deportivo' },
  { id: 7, nombre: 'Arte y Cultura', grado: '1ro', seccion: 'C', profesor: 'Sofía Larco', alumnos: 26, horario: '14:00 - 15:30', aula: 'Taller de Arte' },
  { id: 8, nombre: 'Computación', grado: '3ro', seccion: 'A', profesor: 'Miguel Paz', alumnos: 30, horario: '10:00 - 11:30', aula: 'Sala de Cómputo' },
  { id: 9, nombre: 'Religión', grado: '2do', seccion: 'B', profesor: 'Marta Solís', alumnos: 28, horario: '11:45 - 13:15', aula: 'Aula 102' },
];

const MOCK_GRADOS = [
  { id: 1, nombre: '1ro Secundaria', secciones: ['A', 'B', 'C'], tutor: 'María López', alumnos: 85, nivel: 'Secundaria' },
  { id: 2, nombre: '2do Secundaria', secciones: ['A', 'B'], tutor: 'Juan Perez', alumnos: 60, nivel: 'Secundaria' },
  { id: 3, nombre: '3ro Secundaria', secciones: ['A', 'B', 'C', 'D'], tutor: 'Elena Torres', alumnos: 110, nivel: 'Secundaria' },
  { id: 4, nombre: '4to Secundaria', secciones: ['A', 'B'], tutor: 'Ricardo Díaz', alumnos: 55, nivel: 'Secundaria' },
  { id: 5, nombre: '5to Secundaria', secciones: ['A', 'B'], tutor: 'Roberto Fernández', alumnos: 58, nivel: 'Secundaria' },
  { id: 6, nombre: '6to Primaria', secciones: ['A', 'B', 'C'], tutor: 'Ana Soto', alumnos: 75, nivel: 'Primaria' },
  { id: 7, nombre: '5to Primaria', secciones: ['A', 'B'], tutor: 'Laura Vaca', alumnos: 48, nivel: 'Primaria' },
  { id: 8, nombre: '4to Primaria', secciones: ['A', 'B', 'C'], tutor: 'Pedro Luna', alumnos: 66, nivel: 'Primaria' },
  { id: 9, nombre: '3ro Primaria', secciones: ['A', 'B'], tutor: 'Gaby Sosa', alumnos: 52, nivel: 'Primaria' },
  { id: 10, nombre: '2do Primaria', secciones: ['A', 'B'], tutor: 'Rosa Mar', alumnos: 45, nivel: 'Primaria' },
];

export default function ClasesPage() {
  const [activeTab, setActiveTab] = useState<'clases' | 'grados'>('clases');
  const [mounted, setMounted] = useState(false);
  
  // States para Filtrado
  const [filtroGrado, setFiltroGrado] = useState('Todos');
  const [filtroSeccion, setFiltroSeccion] = useState('Todas');
  const [filtroNivel, setFiltroNivel] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal States
  const [showClassModal, setShowClassModal] = useState(false);
  const [showGradeModal, setShowGradeModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState<any>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const uniqueGrades = useMemo(() => {
    const grades = new Set(MOCK_CLASES.map(c => c.grado));
    const filtered = Array.from(grades).filter(g => g !== 'Todos').sort();
    return ['Todos', ...filtered];
  }, []);

  const uniqueSections = useMemo(() => {
    const sections = new Set(MOCK_CLASES.map(c => c.seccion));
    const filtered = Array.from(sections).filter(s => s !== 'Todas').sort();
    return ['Todas', ...filtered];
  }, []);

  const uniqueNiveles = useMemo(() => {
    const niveles = new Set(MOCK_GRADOS.map(g => g.nivel));
    return ['Todos', ...Array.from(niveles).sort()];
  }, []);

  const filteredClases = useMemo(() => {
    return MOCK_CLASES.filter(clase => {
      const matchGrado = filtroGrado === 'Todos' || clase.grado === filtroGrado;
      const matchSeccion = filtroSeccion === 'Todas' || clase.seccion === filtroSeccion;
      const matchSearch = clase.nombre.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          clase.profesor.toLowerCase().includes(searchQuery.toLowerCase());
      return matchGrado && matchSeccion && matchSearch;
    });
  }, [filtroGrado, filtroSeccion, searchQuery]);

  const filteredGrados = useMemo(() => {
    return MOCK_GRADOS.filter(grado => {
      const matchNivel = filtroNivel === 'Todos' || grado.nivel === filtroNivel;
      const matchSearch = grado.nombre.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          grado.tutor.toLowerCase().includes(searchQuery.toLowerCase());
      return matchNivel && matchSearch;
    });
  }, [filtroNivel, searchQuery]);

  const handleOpenClassModal = (clase: any = null) => {
    setShowClassModal(true);
  };

  const handleOpenGradeModal = (grado: any = null) => {
    setShowGradeModal(true);
  };

  const resetFilters = () => {
    setFiltroGrado('Todos');
    setFiltroSeccion('Todas');
    setFiltroNivel('Todos');
    setSearchQuery('');
  };

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Header Unificado h-16 */}
      <div className="h-16 px-8 border-b border-border/50 flex items-center justify-between bg-background flex-shrink-0 z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground leading-tight">Académico</h1>
              <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Clases y Grados</p>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-full border border-border/50">
            <button 
              onClick={() => { setActiveTab('clases'); resetFilters(); }}
              className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all ${activeTab === 'clases' ? 'bg-background text-primary shadow-md' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Clases
            </button>
            <button 
              onClick={() => { setActiveTab('grados'); resetFilters(); }}
              className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all ${activeTab === 'grados' ? 'bg-background text-primary shadow-md' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Grados
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => activeTab === 'clases' ? handleOpenClassModal() : handleOpenGradeModal()}
            className="flex items-center gap-2 px-5 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all text-xs font-bold uppercase tracking-widest shadow-lg shadow-primary/20"
          >
            <Plus className="w-4 h-4" />
            <span>{activeTab === 'clases' ? 'Nueva Clase' : 'Nuevo Grado'}</span>
          </button>
        </div>
      </div>

      {/* Barra de Filtros Dinámica */}
      <div className="relative z-40 bg-background border-b border-border/50 px-8 py-3 flex items-center justify-between flex-shrink-0 animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
                <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Filtrar por:</span>
                <div className="flex items-center gap-2">
                    {activeTab === 'clases' ? (
                        <>
                            {/* Filtros Clases */}
                            <div className="relative group">
                                <button className="flex items-center gap-2 px-3 py-1.5 bg-muted/40 border border-border rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-muted transition-all">
                                    Grado: {filtroGrado} <ChevronDown className="w-3 h-3 text-primary" />
                                </button>
                                <div className="absolute top-full left-0 pt-2 w-32 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all z-[60]">
                                    <div className="bg-card border border-border rounded-xl shadow-xl py-1">
                                        {uniqueGrades.map(g => (
                                            <button key={g} onClick={() => setFiltroGrado(g)} className={`w-full text-left px-3 py-2 text-[10px] font-bold hover:bg-primary/10 transition-colors ${filtroGrado === g ? 'text-primary' : 'text-foreground'}`}>{g}</button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="relative group">
                                <button className="flex items-center gap-2 px-3 py-1.5 bg-muted/40 border border-border rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-muted transition-all">
                                    Sección: {filtroSeccion} <ChevronDown className="w-3 h-3 text-primary" />
                                </button>
                                <div className="absolute top-full left-0 pt-2 w-32 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all z-[60]">
                                    <div className="bg-card border border-border rounded-xl shadow-xl py-1">
                                        {uniqueSections.map(s => (
                                            <button key={s} onClick={() => setFiltroSeccion(s)} className={`w-full text-left px-3 py-2 text-[10px] font-bold hover:bg-primary/10 transition-colors ${filtroSeccion === s ? 'text-primary' : 'text-foreground'}`}>{s}</button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        /* Filtros Grados */
                        <div className="relative group">
                            <button className="flex items-center gap-2 px-3 py-1.5 bg-muted/40 border border-border rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-muted transition-all">
                                Nivel: {filtroNivel} <ChevronDown className="w-3 h-3 text-primary" />
                            </button>
                            <div className="absolute top-full left-0 pt-2 w-32 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all z-[60]">
                                <div className="bg-card border border-border rounded-xl shadow-xl py-1">
                                    {uniqueNiveles.map(n => (
                                        <button key={n} onClick={() => setFiltroNivel(n)} className={`w-full text-left px-3 py-2 text-[10px] font-bold hover:bg-primary/10 transition-colors ${filtroNivel === n ? 'text-primary' : 'text-foreground'}`}>{n}</button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {(filtroGrado !== 'Todos' || filtroSeccion !== 'Todas' || filtroNivel !== 'Todos' || searchQuery !== '') && (
                <button onClick={resetFilters} className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Limpiar Filtros</button>
            )}
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <input 
                type="text" 
                placeholder={activeTab === 'clases' ? "Buscar materia o profesor..." : "Buscar grado o tutor..."} 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-1.5 bg-muted/40 border border-border rounded-lg text-[10px] font-black uppercase tracking-widest w-64 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 bg-muted/5 scrollbar-thin">
        {activeTab === 'clases' ? (
          <div className="animate-in fade-in duration-300">
            {filteredClases.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredClases.map((clase) => (
                    <div key={clase.id} className="bg-card rounded-xl border border-border p-4 hover:border-primary/40 transition-all group shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-[9px] font-black text-primary bg-primary/5 px-2 py-0.5 rounded border border-primary/10 uppercase tracking-widest">{clase.grado} {clase.seccion}</span>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleOpenClassModal(clase)} className="p-1.5 hover:bg-muted rounded-lg text-muted-foreground"><Edit2 className="w-3.5 h-3.5" /></button>
                                <button onClick={() => setShowDeleteConfirm({ type: 'clase', id: clase.id, name: clase.nombre })} className="p-1.5 hover:bg-muted rounded-lg text-destructive"><Trash2 className="w-3.5 h-3.5" /></button>
                            </div>
                        </div>
                        <h3 className="font-bold text-sm text-foreground mb-4 leading-tight line-clamp-2 group-hover:text-primary transition-colors cursor-pointer" onClick={() => setShowDetailsModal(clase)}>{clase.nombre}</h3>
                        
                        <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-[11px] font-bold text-muted-foreground">
                                <Users className="w-3.5 h-3.5 text-primary/60" />
                                <span>{clase.alumnos} alumnos</span>
                            </div>
                            <div className="flex items-center gap-2 text-[11px] font-bold text-muted-foreground">
                                <Clock className="w-3.5 h-3.5 text-primary/60" />
                                <span>{clase.horario}</span>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-border/60 flex items-center justify-between">
                        <p className="text-[11px] font-black text-foreground/70 truncate">Prof. {clase.profesor.split(' ')[1]}</p>
                        <button onClick={() => setShowDetailsModal(clase)} className="text-primary hover:text-primary/80 transition-all"><ExternalLink className="w-3.5 h-3.5" /></button>
                    </div>
                    </div>
                ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-card rounded-3xl border border-dashed border-border">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4"><Search className="w-8 h-8 text-muted-foreground/30" /></div>
                    <p className="text-sm font-bold text-muted-foreground">No se encontraron clases</p>
                    <button onClick={resetFilters} className="mt-4 text-xs font-black text-primary uppercase tracking-widest hover:underline">Reiniciar búsqueda</button>
                </div>
            )}
          </div>
        ) : (
          <div className="animate-in fade-in duration-300">
            {filteredGrados.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 pb-8">
                {filteredGrados.map((grado) => (
                    <div key={grado.id} className="bg-card rounded-xl border border-border p-4 hover:border-primary/40 transition-all group shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start mb-4">
                            <span className={`text-[9px] font-black px-2 py-0.5 rounded border uppercase tracking-widest ${grado.nivel === 'Secundaria' ? 'bg-primary/5 text-primary border-primary/20' : 'bg-emerald-50 text-emerald-600 border-emerald-200'}`}>
                                {grado.nivel}
                            </span>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleOpenGradeModal(grado)} className="p-1.5 hover:bg-muted rounded-lg text-muted-foreground"><Edit2 className="w-3.5 h-3.5" /></button>
                                <button onClick={() => setShowDeleteConfirm({ type: 'grado', id: grado.id, name: grado.nombre })} className="p-1.5 hover:bg-muted rounded-lg text-destructive"><Trash2 className="w-3.5 h-3.5" /></button>
                            </div>
                        </div>
                        
                        <h3 className="font-bold text-sm text-foreground mb-4 leading-tight group-hover:text-primary transition-colors cursor-pointer">{grado.nombre}</h3>
                        
                        <div className="flex flex-wrap gap-1.5 mb-6">
                        {grado.secciones.map(sec => (
                            <span key={sec} className="w-7 h-7 flex items-center justify-center rounded-lg bg-muted text-[10px] font-black text-muted-foreground border border-border group-hover:border-primary/20 transition-colors">
                            {sec}
                            </span>
                        ))}
                        </div>
                    </div>
                    
                    <div className="pt-4 border-t border-border flex flex-col gap-2">
                        <div className="flex justify-between items-center text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                            <div className="flex items-center gap-1.5">
                                <Users className="w-3.5 h-3.5 text-primary/60" />
                                <span>Alumnos</span>
                            </div>
                            <span className="text-primary">{grado.alumnos}</span>
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                            <div className="flex items-center gap-1.5">
                                <GraduationCap className="w-3.5 h-3.5 text-primary/60" />
                                <span>Tutor</span>
                            </div>
                            <span className="text-foreground truncate ml-1">{grado.tutor.split(' ')[1]}</span>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-card rounded-3xl border border-dashed border-border">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4"><Search className="w-8 h-8 text-muted-foreground/30" /></div>
                    <p className="text-sm font-bold text-muted-foreground">No se encontraron grados</p>
                    <button onClick={resetFilters} className="mt-4 text-xs font-black text-primary uppercase tracking-widest hover:underline">Reiniciar búsqueda</button>
                </div>
            )}
          </div>
        )}
      </div>

      {/* MODALS PORTAL */}
      {mounted && createPortal(
        <>
            {/* Modal Nueva Clase */}
            {showClassModal && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setShowClassModal(false)}></div>
                    <div className="relative bg-card border border-border rounded-3xl max-w-lg w-full p-8 shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-foreground">Configurar Nueva Clase</h2>
                            <button onClick={() => setShowClassModal(false)} className="p-2 hover:bg-muted rounded-full transition-colors"><X className="w-5 h-5" /></button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Nombre de la Materia</label>
                                <input type="text" placeholder="Ej. Matemática Avanzada" className="w-full px-4 py-3 bg-muted/30 border border-border rounded-xl font-bold text-sm outline-none focus:ring-2 focus:ring-primary/20 text-foreground" autoFocus />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Grado y Sección</label>
                                    <select className="w-full px-4 py-3 bg-muted/30 border border-border rounded-xl font-bold text-sm outline-none text-foreground">
                                        <option>5to Secundaria A</option>
                                        <option>4to Secundaria B</option>
                                        <option>3ro Secundaria A</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Profesor Asignado</label>
                                    <select className="w-full px-4 py-3 bg-muted/30 border border-border rounded-xl font-bold text-sm outline-none text-foreground">
                                        <option>Roberto Fernández</option>
                                        <option>Lucía Méndez</option>
                                        <option>Kevin Miller</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Horario</label>
                                    <input type="text" placeholder="08:00 - 09:30" className="w-full px-4 py-3 bg-muted/30 border border-border rounded-xl font-bold text-sm outline-none text-foreground" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Aula / Ambiente</label>
                                    <input type="text" placeholder="Aula 204" className="w-full px-4 py-3 bg-muted/30 border border-border rounded-xl font-bold text-sm outline-none text-foreground" />
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-4 mt-8">
                            <button onClick={() => setShowClassModal(false)} className="flex-1 py-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground bg-muted rounded-xl">Cancelar</button>
                            <button className="flex-1 py-3 text-[10px] font-black uppercase tracking-widest text-white bg-primary rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">Crear Clase</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Nuevo Grado */}
            {showGradeModal && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setShowGradeModal(false)}></div>
                    <div className="relative bg-card border border-border rounded-3xl max-w-md w-full p-8 shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-foreground">Añadir Grado Escolar</h2>
                            <button onClick={() => setShowGradeModal(false)} className="p-2 hover:bg-muted rounded-full transition-colors"><X className="w-5 h-5" /></button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Nombre del Grado</label>
                                <input type="text" placeholder="Ej. 1ro de Primaria" className="w-full px-4 py-3 bg-muted/30 border border-border rounded-xl font-bold text-sm outline-none focus:ring-2 focus:ring-primary/20 text-foreground" autoFocus />
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Nivel Educativo</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {['Inicial', 'Primaria', 'Secundaria'].map(nivel => (
                                        <button key={nivel} className="py-2 px-3 border border-border rounded-lg text-[10px] font-bold hover:bg-primary/5 hover:border-primary/30 transition-all">{nivel}</button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Tutor General</label>
                                <select className="w-full px-4 py-3 bg-muted/30 border border-border rounded-xl font-bold text-sm outline-none text-foreground">
                                    <option>Seleccionar profesor...</option>
                                    <option>María López</option>
                                    <option>Ana Soto</option>
                                </select>
                            </div>
                        </div>
                        <button className="w-full mt-8 py-4 text-[10px] font-black uppercase tracking-widest text-white bg-primary rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">Registrar Grado</button>
                    </div>
                </div>
            )}

            {/* Modal Detalles de Clase */}
            {showDetailsModal && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowDetailsModal(null)}></div>
                    <div className="relative bg-card border border-border rounded-[40px] max-w-2xl w-full overflow-hidden shadow-2xl animate-in slide-in-from-bottom-10 duration-300">
                        <div className="h-32 bg-primary relative">
                            <button onClick={() => setShowDetailsModal(null)} className="absolute top-6 right-6 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white backdrop-blur-md transition-all"><X className="w-5 h-5" /></button>
                            <div className="absolute -bottom-10 left-10 w-20 h-20 rounded-3xl bg-white shadow-xl flex items-center justify-center text-primary">
                                <BookOpen className="w-10 h-10" />
                            </div>
                        </div>
                        <div className="px-10 pt-16 pb-10">
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-2">{showDetailsModal.grado} {showDetailsModal.seccion}</p>
                                    <h2 className="text-3xl font-bold text-foreground">{showDetailsModal.nombre}</h2>
                                </div>
                                <span className="bg-green-500/10 text-green-600 text-[10px] font-black px-4 py-1.5 rounded-full border border-green-500/20 uppercase tracking-widest">Activo</span>
                            </div>

                            <div className="grid grid-cols-2 gap-6 mb-10">
                                <div className="p-4 bg-muted/20 rounded-3xl border border-border/50">
                                    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-3">Información Académica</p>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 text-sm font-bold text-foreground">
                                            <Users className="w-4 h-4 text-primary" />
                                            <span>{showDetailsModal.alumnos} Alumnos Inscritos</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm font-bold text-foreground">
                                            <Clock className="w-4 h-4 text-primary" />
                                            <span>Lunes y Miércoles {showDetailsModal.horario}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm font-bold text-foreground">
                                            <MapPin className="w-4 h-4 text-primary" />
                                            <span>{showDetailsModal.aula}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 bg-muted/20 rounded-3xl border border-border/50">
                                    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-3">Personal Docente</p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold">{showDetailsModal.profesor.split(' ')[0][0]}</div>
                                        <div>
                                            <p className="text-sm font-bold text-foreground">{showDetailsModal.profesor}</p>
                                            <p className="text-[10px] font-bold text-muted-foreground">Titular del curso</p>
                                        </div>
                                    </div>
                                    <button className="w-full mt-4 py-2 text-[9px] font-black uppercase tracking-widest bg-white border border-border rounded-xl hover:bg-muted transition-all">Ver Perfil</button>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button className="flex-1 py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                                    Ir al Aula Virtual <ChevronRight className="w-4 h-4" />
                                </button>
                                <button className="px-6 py-4 bg-muted text-muted-foreground rounded-2xl font-bold hover:bg-muted/80 transition-all">Gestionar Alumnos</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Confirmación Eliminar */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-destructive/20 backdrop-blur-xl" onClick={() => setShowDeleteConfirm(null)}></div>
                    <div className="relative bg-card border border-destructive/20 rounded-[32px] max-w-xs w-full p-8 shadow-2xl text-center animate-in zoom-in-95 duration-200">
                        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
                            <Trash2 className="w-8 h-8 text-destructive" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">¿Eliminar {showDeleteConfirm.type === 'clase' ? 'clase' : 'grado'}?</h3>
                        <p className="text-xs text-muted-foreground mb-8 font-medium leading-relaxed">
                            Estás a punto de eliminar <span className="font-bold text-foreground">"{showDeleteConfirm.name}"</span>. Esta acción es irreversible.
                        </p>
                        <div className="flex flex-col gap-3">
                            <button onClick={() => setShowDeleteConfirm(null)} className="w-full py-3.5 bg-destructive text-white rounded-2xl font-bold shadow-lg shadow-destructive/20 hover:scale-[1.02] active:scale-95 transition-all uppercase text-[10px] tracking-widest">Eliminar permanentemente</button>
                            <button onClick={() => setShowDeleteConfirm(null)} className="w-full py-3.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground">Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </>
      , document.body)}
    </div>
  );
}
