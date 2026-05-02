'use client';

import { ClipboardList, Plus, Clock, FileText, ChevronRight } from 'lucide-react';

const MOCK_TAREAS = [
  { id: 1, titulo: 'Ecuaciones de 2do Grado', clase: 'Matemática Avanzada', vence: 'Mañana, 23:59', entregas: '28/32', estado: 'activa' },
  { id: 2, titulo: 'Ensayo sobre Don Quijote', clase: 'Comunicación', vence: 'Vie, 14 Mayo', entregas: '15/28', estado: 'activa' },
  { id: 3, titulo: 'Maqueta Célula Animal', clase: 'Ciencias Naturales', vence: 'Lun, 17 Mayo', entregas: '0/25', estado: 'programada' },
  { id: 4, titulo: 'Cuestionario Guerra Fría', clase: 'Historia Universal', vence: 'Ayer', entregas: '30/30', estado: 'cerrada' },
];

export default function TareasPage({ hideHeader = false }: { hideHeader?: boolean }) {
  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {!hideHeader && (
        <div className="h-16 px-8 border-b border-border/50 flex items-center justify-between bg-background flex-shrink-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <ClipboardList className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground leading-tight">Tareas y Entregas</h1>
              <p className="text-xs text-muted-foreground font-medium">Gestión y monitoreo académico</p>
            </div>
          </div>
          <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-md shadow-primary/20 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>Nueva Tarea</span>
          </button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-6 min-h-0">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar de Filtros */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4 px-2">Filtrar por estado</p>
              <div className="space-y-1">
                <button className="w-full text-left px-4 py-2.5 rounded-xl bg-primary/10 text-primary font-bold text-sm transition-all border border-primary/20">Todas las Tareas</button>
                <button className="w-full text-left px-4 py-2.5 rounded-xl text-muted-foreground hover:bg-muted/50 hover:text-foreground font-bold text-sm transition-all">Activas</button>
                <button className="w-full text-left px-4 py-2.5 rounded-xl text-muted-foreground hover:bg-muted/50 hover:text-foreground font-bold text-sm transition-all">Para Calificar</button>
                <button className="w-full text-left px-4 py-2.5 rounded-xl text-muted-foreground hover:bg-muted/50 hover:text-foreground font-bold text-sm transition-all">Cerradas</button>
              </div>
            </div>
            
            <div className="pt-6 border-t border-border">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4 px-2">Clases</p>
              <select className="w-full px-4 py-3 rounded-xl border border-border bg-muted/20 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer">
                <option>Todas las clases</option>
                <option>Matemática Avanzada</option>
                <option>Comunicación</option>
              </select>
            </div>
          </div>

          {/* Listado Principal */}
          <div className="lg:col-span-3 space-y-4">
            <h2 className="text-sm font-bold text-foreground uppercase tracking-widest mb-2 px-1">Listado de Actividades</h2>
            {MOCK_TAREAS.map(tarea => (
              <div key={tarea.id} className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-all flex flex-col sm:flex-row gap-6 justify-between group shadow-sm">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors leading-tight mb-1">{tarea.titulo}</h3>
                    <p className="text-xs text-primary/70 font-bold uppercase tracking-tight">{tarea.clase}</p>
                    <div className="flex items-center gap-4 mt-4">
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground bg-muted px-3 py-1 rounded-full border border-border">
                        <Clock className="w-3.5 h-3.5" />
                        Vence: {tarea.vence}
                      </span>
                      {tarea.estado === 'activa' && <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Activa</span>}
                      {tarea.estado === 'cerrada' && <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Cerrada</span>}
                    </div>
                  </div>
                </div>
                <div className="flex flex-row sm:flex-col justify-between sm:justify-center items-center sm:items-end gap-4 pt-4 sm:pt-0 border-t sm:border-t-0 border-border sm:border-l sm:pl-8 min-w-[150px]">
                  <div className="text-center sm:text-right">
                    <p className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wider">Entregas</p>
                    <p className="text-2xl font-bold text-foreground">{tarea.entregas}</p>
                  </div>
                  <button className="px-5 py-2.5 bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground rounded-full text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 group/btn">
                    Detalles
                    <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
