'use client';

import { useState } from 'react';
import { Search, Filter, Eye, Edit, Trash2, CheckCircle, XCircle, Briefcase, Mail, Phone, Users, UserPlus, ChevronDown } from 'lucide-react';

const MOCK_ESTUDIANTES = [
  { id: 'EST-001', nombre: 'Carlos Ruiz', grado: '3ro A', promedio: 16.5, estado: 'activo', tutor: 'María López' },
  { id: 'EST-002', nombre: 'Ana Soto', grado: '3ro A', promedio: 14.0, estado: 'activo', tutor: 'Juan Soto' },
  { id: 'EST-003', nombre: 'Luis Medina', grado: '4to B', promedio: 18.2, estado: 'activo', tutor: 'Carmen Medina' },
  { id: 'EST-004', nombre: 'Sofía Castro', grado: '1ro C', promedio: 11.5, estado: 'en_riesgo', tutor: 'Pedro Castro' },
  { id: 'EST-005', nombre: 'Diego Torres', grado: '5to A', promedio: 15.8, estado: 'activo', tutor: 'Elena Torres' },
  { id: 'EST-006', nombre: 'Valentina Díaz', grado: '2do B', promedio: 19.1, estado: 'activo', tutor: 'Ricardo Díaz' },
  { id: 'EST-007', nombre: 'Mateo Vargas', grado: '3ro A', promedio: 9.5, estado: 'inactivo', tutor: 'Laura Vargas' },
];

const MOCK_PROFESORES = [
  { id: 'EMP-100', nombre: 'Roberto Fernández', especialidad: 'Matemáticas', contrato: 'Nombramiento', carga: 36, estado: 'activo' },
  { id: 'EMP-101', nombre: 'Lucía Méndez', especialidad: 'Comunicación', contrato: 'Contratado', carga: 24, estado: 'activo' },
  { id: 'EMP-102', nombre: 'Andrés Gómez', especialidad: 'Ciencias Naturales', contrato: 'Nombramiento', carga: 40, estado: 'activo' },
  { id: 'EMP-103', nombre: 'Diana Silva', especialidad: 'Historia y Geografía', contrato: 'Contratado', carga: 30, estado: 'licencia' },
  { id: 'EMP-104', nombre: 'Hugo Reyes', especialidad: 'Educación Física', contrato: 'Nombramiento', carga: 38, estado: 'activo' },
  { id: 'EMP-105', nombre: 'Valeria Pineda', especialidad: 'Inglés', contrato: 'Contratado', carga: 20, estado: 'activo' },
];

export default function DirectorioPage() {
  const [activeTab, setActiveTab] = useState<'estudiantes' | 'profesores'>('estudiantes');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Header unificado h-16 */}
      <div className="h-16 px-8 border-b border-border/50 flex items-center justify-between bg-background flex-shrink-0 z-10">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground leading-tight">Directorio</h1>
              <p className="text-xs text-muted-foreground font-medium">Gestión de alumnos y docentes</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 bg-muted/50 p-1 rounded-full border border-border/50">
            <button 
              onClick={() => setActiveTab('estudiantes')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${activeTab === 'estudiantes' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Estudiantes
            </button>
            <button 
              onClick={() => setActiveTab('profesores')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${activeTab === 'profesores' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Docentes
            </button>
          </div>
        </div>
        <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-md shadow-primary/20 flex items-center gap-2">
          <UserPlus className="w-4 h-4" />
          <span>Añadir Registro</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 min-h-0 space-y-8">
        {/* Barra de Búsqueda y Filtros */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-card p-4 border border-border rounded-2xl shadow-sm">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Buscar por nombre, ID o especialidad..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-muted/20 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-semibold"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-2 bg-muted/30 px-4 py-2.5 rounded-xl border border-border cursor-pointer hover:bg-muted/50 transition-all group">
              <Filter className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-sm font-bold text-foreground">Filtros Avanzados</span>
              <ChevronDown className="w-4 h-4 text-muted-foreground ml-1" />
            </div>
          </div>
        </div>

        {activeTab === 'estudiantes' ? (
          <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-muted/30 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                    <th className="px-6 py-4 border-b border-border">ID</th>
                    <th className="px-6 py-4 border-b border-border">Nombre Completo</th>
                    <th className="px-6 py-4 border-b border-border text-center">Grado</th>
                    <th className="px-6 py-4 border-b border-border text-center">Promedio</th>
                    <th className="px-6 py-4 border-b border-border text-center">Estado</th>
                    <th className="px-6 py-4 border-b border-border text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {MOCK_ESTUDIANTES.filter(e => e.nombre.toLowerCase().includes(searchTerm.toLowerCase())).map((est) => (
                    <tr key={est.id} className="hover:bg-muted/5 transition-colors group">
                      <td className="px-6 py-5 text-sm font-bold text-muted-foreground">{est.id}</td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold text-sm text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                            {est.nombre.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-foreground">{est.nombre}</p>
                            <p className="text-xs text-muted-foreground font-medium">Tutor: {est.tutor}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span className="bg-muted text-muted-foreground px-3 py-1 rounded-lg text-xs font-bold border border-border">
                          {est.grado}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span className={`text-sm font-black ${est.promedio >= 13 ? 'text-emerald-600' : 'text-red-500'}`}>
                          {est.promedio.toFixed(1)}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border
                          ${est.estado === 'activo' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 
                            est.estado === 'en_riesgo' ? 'bg-orange-50 text-orange-600 border-orange-200' : 
                            'bg-muted text-muted-foreground border-border'}
                        `}>
                          {est.estado}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                          <button className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all"><Eye className="w-4 h-4" /></button>
                          <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all"><Edit className="w-4 h-4" /></button>
                          <button className="p-2 text-muted-foreground hover:text-destructive hover:bg-red-50 rounded-lg transition-all"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 pb-8">
            {MOCK_PROFESORES.filter(p => p.nombre.toLowerCase().includes(searchTerm.toLowerCase())).map((prof) => (
              <div key={prof.id} className="bg-card rounded-2xl border border-border p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group flex flex-col shadow-sm">
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center text-xl font-bold text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      {prof.nombre.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground leading-tight mb-1">{prof.nombre}</h3>
                      <p className="text-xs text-primary/70 font-black uppercase tracking-widest">{prof.especialidad}</p>
                    </div>
                  </div>
                  {prof.estado === 'licencia' && (
                    <span className="text-[10px] font-black bg-orange-50 text-orange-600 px-3 py-1 rounded-full border border-orange-200 uppercase tracking-widest">Licencia</span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-border mt-auto">
                  <div>
                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mb-1.5">Contrato</p>
                    <p className="text-sm font-bold text-foreground">{prof.contrato}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mb-1.5">Carga Lectiva</p>
                    <p className="text-sm font-bold text-foreground">{prof.carga}h / sem</p>
                  </div>
                </div>

                <div className="mt-8 flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground rounded-xl transition-all text-xs font-bold uppercase tracking-widest group/btn">
                    <Mail className="w-4 h-4" /> Mensaje
                  </button>
                  <button className="p-3 bg-muted text-muted-foreground hover:bg-muted/80 rounded-xl transition-all">
                    <Phone className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
