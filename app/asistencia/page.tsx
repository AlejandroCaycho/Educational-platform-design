'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { 
  CheckSquare, 
  Calendar as CalendarIcon, 
  Users, 
  AlertCircle, 
  Search, 
  ChevronDown, 
  MoreVertical, 
  Clock, 
  Filter, 
  Download, 
  History, 
  Save,
  CheckCircle2,
  XCircle,
  Clock3,
  FileText,
  ChevronRight,
  ChevronLeft,
  User,
  X,
  CalendarDays,
  TrendingUp,
  BarChart3,
  FileSpreadsheet,
  CheckCircle
} from 'lucide-react';

const MOCK_ASISTENCIA = [
  { id: 1, alumno: 'Carlos Ruiz', estado: 'presente', hora: '07:55 AM', avatar: 'CR' },
  { id: 2, alumno: 'Ana Soto', estado: 'presente', hora: '08:00 AM', avatar: 'AS' },
  { id: 3, alumno: 'Luis Medina', estado: 'tarde', hora: '08:15 AM', avatar: 'LM' },
  { id: 4, alumno: 'Sofía Castro', estado: 'ausente', hora: '-', avatar: 'SC' },
  { id: 5, alumno: 'Diego Torres', estado: 'justificado', hora: '-', motivo: 'Cita médica', avatar: 'DT' },
  { id: 6, alumno: 'María García', estado: 'presente', hora: '07:58 AM', avatar: 'MG' },
  { id: 7, alumno: 'Juan Pérez', estado: 'tarde', hora: '08:20 AM', avatar: 'JP' },
  { id: 8, alumno: 'Elena Beltrán', estado: 'presente', hora: '07:50 AM', avatar: 'EB' },
  { id: 9, alumno: 'Roberto Gómez', estado: 'ausente', hora: '-', avatar: 'RG' },
  { id: 10, alumno: 'Lucía Méndez', estado: 'presente', hora: '07:59 AM', avatar: 'LM' },
  { id: 11, alumno: 'Kevin Miller', estado: 'presente', hora: '08:05 AM', avatar: 'KM' },
  { id: 12, alumno: 'Sofía Larco', estado: 'tarde', hora: '08:10 AM', avatar: 'SL' },
  { id: 13, alumno: 'Miguel Paz', estado: 'presente', hora: '07:55 AM', avatar: 'MP' },
  { id: 14, alumno: 'Marta Solís', estado: 'ausente', hora: '-', avatar: 'MS' },
  { id: 15, alumno: 'Carlos Ruiz II', estado: 'presente', hora: '07:55 AM', avatar: 'CR' },
];

const MOCK_HISTORIAL = [
  { id: 1, fecha: '2026-05-01', grado: '5to A - Secundaria', total: 32, presentes: 30, tardanzas: 1, ausencias: 1, porcentaje: '94%' },
  { id: 2, fecha: '2026-04-30', grado: '5to A - Secundaria', total: 32, presentes: 28, tardanzas: 2, ausencias: 2, porcentaje: '88%' },
  { id: 3, fecha: '2026-04-29', grado: '5to A - Secundaria', total: 32, presentes: 32, tardanzas: 0, ausencias: 0, porcentaje: '100%' },
  { id: 4, fecha: '2026-04-28', grado: '5to A - Secundaria', total: 32, presentes: 29, tardanzas: 1, ausencias: 2, porcentaje: '91%' },
  { id: 5, fecha: '2026-04-27', grado: '5to A - Secundaria', total: 32, presentes: 31, tardanzas: 1, ausencias: 0, porcentaje: '97%' },
  { id: 6, fecha: '2026-04-24', grado: '5to A - Secundaria', total: 32, presentes: 30, tardanzas: 2, ausencias: 0, porcentaje: '94%' },
  { id: 7, fecha: '2026-04-23', grado: '5to A - Secundaria', total: 32, presentes: 27, tardanzas: 3, ausencias: 2, porcentaje: '84%' },
  { id: 8, fecha: '2026-04-22', grado: '5to A - Secundaria', total: 32, presentes: 32, tardanzas: 0, ausencias: 0, porcentaje: '100%' },
  { id: 9, fecha: '2026-04-21', grado: '5to A - Secundaria', total: 32, presentes: 31, tardanzas: 0, ausencias: 1, porcentaje: '97%' },
  { id: 10, fecha: '2026-04-20', grado: '5to A - Secundaria', total: 32, presentes: 30, tardanzas: 1, ausencias: 1, porcentaje: '94%' },
];

interface StatCardProps {
    icon: React.ElementType;
    label: string;
    value: string | number;
    color?: 'primary' | 'green' | 'blue' | 'amber' | 'red';
}

function StatCard({ icon: Icon, label, value, color = 'primary' }: StatCardProps) {
    const bgColor: Record<string, string> = {
      primary: 'bg-primary/10 text-primary',
      green: 'bg-green-50 text-green-600',
      blue: 'bg-blue-50 text-blue-600',
      amber: 'bg-amber-50 text-amber-600',
      red: 'bg-red-50 text-red-600',
    };
  
    return (
      <div className="bg-card rounded-2xl border border-border p-5 hover:border-primary/30 transition-all shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-sm mb-1">{label}</p>
            <p className="text-2xl font-bold text-foreground leading-none">{value}</p>
          </div>
          <div className={`w-12 h-12 rounded-xl ${bgColor[color]} flex items-center justify-center`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </div>
    );
}

export default function AsistenciaPage() {
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
  const [activeTab, setActiveTab] = useState<'registro' | 'historial'>('registro');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrado, setSelectedGrado] = useState('5to A - Secundaria');
  const [asistenciaData, setAsistenciaData] = useState(MOCK_ASISTENCIA);
  const [showGradoDropdown, setShowGradoDropdown] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);
  
  // Paginación diferencial para 100vh
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = activeTab === 'registro' ? 10 : 8;
  
  const grados = ['5to A - Secundaria', '5to B - Secundaria', '4to A - Secundaria', '3ro C - Secundaria'];

  const stats = useMemo(() => {
    return {
      total: asistenciaData.length,
      presentes: asistenciaData.filter(a => a.estado === 'presente').length,
      tardes: asistenciaData.filter(a => a.estado === 'tarde').length,
      ausentes: asistenciaData.filter(a => a.estado === 'ausente').length,
    };
  }, [asistenciaData]);

  const filteredAsistencia = asistenciaData.filter(item => 
    item.alumno.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredHistorial = MOCK_HISTORIAL.filter(item => 
    item.fecha.includes(searchQuery) || item.grado.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil((activeTab === 'registro' ? filteredAsistencia.length : filteredHistorial.length) / ITEMS_PER_PAGE);
  
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return activeTab === 'registro' 
      ? filteredAsistencia.slice(startIndex, startIndex + ITEMS_PER_PAGE)
      : filteredHistorial.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAsistencia, filteredHistorial, currentPage, activeTab, ITEMS_PER_PAGE]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeTab]);

  const handleStatusChange = (id: number, newStatus: string) => {
    setAsistenciaData(prev => prev.map(item => 
      item.id === id ? { ...item, estado: newStatus, hora: newStatus === 'presente' ? '07:55 AM' : (newStatus === 'tarde' ? '08:15 AM' : '-') } : item
    ));
  };

  const handleNoteChange = (id: number, note: string) => {
    setAsistenciaData(prev => prev.map(item => 
      item.id === id ? { ...item, motivo: note } : item
    ));
  };

  const handleFinalize = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 1500);
  };

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden text-foreground">
      {/* Header Unificado EduNova */}
      <div className="h-16 px-8 border-b border-border/50 flex items-center justify-between bg-background flex-shrink-0 z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <CheckSquare className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground leading-tight">Asistencias</h1>
              <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Control y Seguimiento</p>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-full border border-border/50">
            <button 
              onClick={() => setActiveTab('registro')}
              className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all ${activeTab === 'registro' ? 'bg-background text-primary shadow-md' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Registro Hoy
            </button>
            <button 
              onClick={() => setActiveTab('historial')}
              className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all ${activeTab === 'historial' ? 'bg-background text-primary shadow-md' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Historial
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-5 py-2 bg-muted text-foreground rounded-full hover:bg-muted/80 transition-all text-xs font-bold uppercase tracking-widest border border-border">
            <Download className="w-4 h-4" />
            <span>Exportar</span>
          </button>
          {activeTab === 'registro' && (
            <button 
              onClick={handleFinalize}
              disabled={isSaving}
              className="flex items-center gap-2 px-5 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all text-xs font-bold uppercase tracking-widest shadow-lg shadow-primary/20 disabled:opacity-50"
            >
              {isSaving ? <Clock className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>{isSaving ? 'Guardando...' : 'Finalizar Registro'}</span>
            </button>
          )}
        </div>
      </div>


      {/* ÁREA DE CONTENIDO: Padding Vertical Máximo 10px (py-2.5) */}
      <div className="flex-1 overflow-hidden px-8 py-2.5 bg-muted/5 flex flex-col gap-4">
        
        {/* Stats Grid - py-2.5 interna */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 flex-shrink-0 animate-in fade-in slide-in-from-top-4 duration-500">
            {activeTab === 'registro' ? (
                <>
                    <StatCard icon={Users} label="Total Alumnos" value={stats.total} color="primary" />
                    <StatCard icon={CheckCircle} label="Presentes" value={stats.presentes} color="green" />
                    <StatCard icon={Clock3} label="Tardanzas" value={stats.tardes} color="amber" />
                    <StatCard icon={XCircle} label="Inasistencias" value={stats.ausentes} color="red" />
                </>
            ) : (
                <>
                    <StatCard icon={CalendarDays} label="Días Registrados" value="45" color="primary" />
                    <StatCard icon={TrendingUp} label="Asistencia Promedio" value="92.4%" color="green" />
                    <StatCard icon={BarChart3} label="Mayor Inasistencia" value="12%" color="red" />
                    <StatCard icon={FileSpreadsheet} label="Reportes Generados" value="12" color="blue" />
                </>
            )}
        </div>

        {/* FILTRADO: py-2.5 */}
        <div className="bg-background border border-border/50 rounded-2xl px-6 py-2.5 flex items-center justify-between shadow-sm flex-shrink-0">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
                <div className="relative">
                    <button 
                        onClick={() => setShowGradoDropdown(!showGradoDropdown)}
                        className={`flex items-center gap-3 px-4 py-2 bg-muted/40 border rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${showGradoDropdown ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:bg-muted'}`}
                    >
                        <Users className="w-4 h-4" />
                        {selectedGrado}
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showGradoDropdown ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {showGradoDropdown && (
                        <div className="absolute top-full left-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-xl z-[60] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                            {grados.map(g => (
                                <button 
                                    key={g}
                                    onClick={() => { setSelectedGrado(g); setShowGradoDropdown(false); }}
                                    className={`w-full px-4 py-2.5 text-left text-[10px] font-bold uppercase tracking-widest hover:bg-primary/10 transition-colors ${selectedGrado === g ? 'text-primary bg-primary/5' : 'text-muted-foreground'}`}
                                >
                                    {g}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                {activeTab === 'registro' && (
                    <div className="flex items-center gap-3 px-3 py-1.5 bg-muted/40 border border-border rounded-xl text-[10px] font-black uppercase tracking-widest">
                        <CalendarIcon className="w-3.5 h-3.5 text-primary" />
                        <input 
                            type="date" 
                            value={fecha} 
                            onChange={(e) => setFecha(e.target.value)}
                            className="bg-transparent outline-none cursor-pointer"
                        />
                    </div>
                )}
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <input 
                type="text" 
                placeholder={activeTab === 'registro' ? "Buscar alumno..." : "Buscar por fecha o grado..."} 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 pr-5 py-1.5 bg-muted/40 border border-border rounded-xl text-xs font-bold w-80 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>

        {/* TABLA: py-2.5 Estricto */}
        <div className="flex-1 min-h-0 bg-card rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col">
            <div className="flex-1 overflow-y-auto scrollbar-thin">
                {activeTab === 'registro' ? (
                    <table className="w-full border-collapse">
                        <thead className="sticky top-0 z-10 bg-muted/90 backdrop-blur-sm border-b border-border">
                            <tr>
                                <th className="px-6 py-2.5 text-[10px] font-black text-muted-foreground uppercase tracking-widest text-left">Estudiante</th>
                                <th className="px-6 py-2.5 text-[10px] font-black text-muted-foreground uppercase tracking-widest text-center w-64">Estado</th>
                                <th className="px-6 py-2.5 text-[10px] font-black text-muted-foreground uppercase tracking-widest text-center">Registro</th>
                                <th className="px-6 py-2.5 text-[10px] font-black text-muted-foreground uppercase tracking-widest text-left">Observaciones</th>
                                <th className="px-6 py-2.5 text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {paginatedData.map((item: any) => (
                                <tr key={item.id} className="group hover:bg-muted/5 transition-all">
                                    <td className="px-6 py-[13.7px]">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-black text-primary border border-primary/20">
                                                {item.avatar}
                                            </div>
                                            <p className="font-bold text-xs text-foreground group-hover:text-primary transition-colors">{item.alumno}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-[13.7px]">
                                        <div className="flex items-center justify-center gap-1 bg-muted/30 p-0.5 rounded-full border border-border max-w-[200px] mx-auto">
                                            {[
                                                { id: 'presente', label: 'P', color: 'bg-emerald-500' },
                                                { id: 'tarde', label: 'T', color: 'bg-amber-500' },
                                                { id: 'ausente', label: 'A', color: 'bg-red-500' },
                                                { id: 'justificado', label: 'J', color: 'bg-blue-500' }
                                            ].map(opt => (
                                                <button 
                                                    key={opt.id}
                                                    onClick={() => handleStatusChange(item.id, opt.id)}
                                                    className={`flex-1 h-6 rounded-full text-[9px] font-black transition-all ${item.estado === opt.id ? `${opt.color} text-white shadow-md scale-105` : 'text-muted-foreground hover:bg-muted'}`}
                                                >
                                                    {opt.label}
                                                </button>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-[13.7px] text-center">
                                        <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-muted-foreground">
                                            <Clock className="w-3 h-3" />
                                            {item.hora}
                                        </div>
                                    </td>
                                    <td className="px-6 py-[13.7px]">
                                        <div className="flex items-center gap-2">
                                            <FileText className="w-3.5 h-3.5 text-muted-foreground/30" />
                                            <input 
                                                type="text" 
                                                placeholder="Nota..."
                                                value={item.motivo || ''}
                                                onChange={(e) => handleNoteChange(item.id, e.target.value)}
                                                className="bg-transparent border-none outline-none text-xs font-medium text-foreground w-full placeholder:text-muted-foreground/30 transition-all focus:placeholder:text-transparent"
                                            />
                                        </div>
                                    </td>
                                    <td className="px-6 py-[13.7px] text-right">
                                        <button className="p-1 hover:bg-muted rounded-xl transition-all text-muted-foreground"><MoreVertical className="w-3.5 h-3.5" /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <table className="w-full border-collapse">
                        <thead className="sticky top-0 z-10 bg-muted/90 backdrop-blur-sm border-b border-border">
                            <tr>
                                <th className="px-6 py-2.5 text-[10px] font-black text-muted-foreground uppercase tracking-widest text-left">Fecha</th>
                                <th className="px-6 py-2.5 text-[10px] font-black text-muted-foreground uppercase tracking-widest text-left">Grado y Sección</th>
                                <th className="px-6 py-2.5 text-[10px] font-black text-muted-foreground uppercase tracking-widest text-center">Presentes</th>
                                <th className="px-6 py-2.5 text-[10px] font-black text-muted-foreground uppercase tracking-widest text-center">Ausentes</th>
                                <th className="px-6 py-2.5 text-[10px] font-black text-muted-foreground uppercase tracking-widest text-center">% Asis.</th>
                                <th className="px-6 py-2.5 text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {paginatedData.map((item: any) => (
                                <tr key={item.id} className="group hover:bg-muted/5 transition-all">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <CalendarDays className="w-3.5 h-3.5 text-primary" />
                                            <p className="font-bold text-xs text-foreground">{item.fecha}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-xs font-bold text-muted-foreground">{item.grado}</td>
                                    <td className="px-6 py-5 text-center text-xs font-black text-emerald-600">{item.presentes} / {item.total}</td>
                                    <td className="px-6 py-5 text-center text-xs font-black text-red-500">{item.ausencias}</td>
                                    <td className="px-6 py-5 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="w-14 h-1 bg-muted rounded-full overflow-hidden">
                                                <div className="h-full bg-primary" style={{ width: item.porcentaje }}></div>
                                            </div>
                                            <span className="text-xs font-black text-foreground">{item.porcentaje}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <button className="px-4 py-1 bg-muted/50 border border-border rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all">Ver</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            
            {/* FOOTER: py-2.5 Estricto */}
            <div className="px-6 py-2.5 border-t border-border flex items-center justify-between bg-muted/10 flex-shrink-0">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    Mostrando <span className="text-foreground">{paginatedData.length}</span> registros
                </p>
                <div className="flex items-center gap-2">
                    <button 
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="p-1.5 border border-border rounded-xl hover:bg-background disabled:opacity-30 transition-all"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button 
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`w-7 h-7 rounded-xl text-[10px] font-black transition-all ${currentPage === page ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-muted-foreground hover:bg-background border border-transparent'}`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                    <button 
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="p-1.5 border border-border rounded-xl hover:bg-background disabled:opacity-30 transition-all"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
      </div>

      {/* Toast Notification - Al final para no afectar el flex layout */}
      {showToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-bottom-4">
            <div className="bg-emerald-600 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-400/20">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-widest">¡Registro guardado con éxito!</span>
            </div>
        </div>
      )}
    </div>
  );
}
