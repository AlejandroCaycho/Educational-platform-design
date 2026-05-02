'use client';

import { PenTool, Download, Settings2, CheckCircle2 } from 'lucide-react';

const MOCK_NOTAS = [
  { id: 1, alumno: 'Carlos Ruiz', p1: 15, p2: 17, p3: 16, examen: 18, final: 16.5 },
  { id: 2, alumno: 'Ana Soto', p1: 14, p2: 13, p3: 15, examen: 14, final: 14.0 },
  { id: 3, alumno: 'Luis Medina', p1: 18, p2: 19, p3: 17, examen: 19, final: 18.2 },
  { id: 4, alumno: 'Sofía Castro', p1: 10, p2: 12, p3: 11, examen: 13, final: 11.5 },
  { id: 5, alumno: 'Diego Torres', p1: 16, p2: 15, p3: 16, examen: 16, final: 15.8 },
];

export default function CalificacionesPage({ hideHeader = false }: { hideHeader?: boolean }) {
  return (
    <div className={`h-full flex flex-col bg-background ${hideHeader ? '' : 'p-6 md:p-8'}`}>
      {!hideHeader && (
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <PenTool className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground leading-tight">Registro de Calificaciones</h1>
              <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">Gestión académica</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-full text-xs font-semibold transition-all shadow-md shadow-primary/20 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Guardar Notas</span>
            </button>
          </div>
        </div>
      )}

      <div className={`flex-1 ${hideHeader ? 'p-6 md:p-8' : ''} overflow-y-auto space-y-6`}>
        <div className="flex flex-wrap gap-4 items-center bg-card p-4 border border-border/50 rounded-2xl shadow-sm">
          <select className="flex-1 min-w-[200px] px-3 py-2 rounded-lg border border-border/50 bg-muted/20 text-xs font-bold outline-none focus:ring-2 focus:ring-primary/20">
            <option>Matemática Avanzada - 5to A</option>
            <option>Comunicación - 3ro B</option>
          </select>
          <select className="flex-1 min-w-[200px] px-3 py-2 rounded-lg border border-border/50 bg-muted/20 text-xs font-bold outline-none focus:ring-2 focus:ring-primary/20">
            <option>I Bimestre (Marzo - Mayo)</option>
            <option>II Bimestre (Mayo - Julio)</option>
          </select>
          <div className="flex gap-2">
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:text-foreground transition-all text-[10px] font-black uppercase tracking-widest">
              <Download className="w-4 h-4" /> Exportar
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:text-foreground transition-all text-[10px] font-black uppercase tracking-widest">
              <Settings2 className="w-4 h-4" /> Criterios
            </button>
            {hideHeader && (
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all shadow-md shadow-primary/20 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Guardar
              </button>
            )}
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border/50 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted/30 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                  <th className="px-6 py-4 border-b border-border/50">Alumno</th>
                  <th className="px-4 py-4 border-b border-border/50 text-center">P1 <span className="block opacity-50">(20%)</span></th>
                  <th className="px-4 py-4 border-b border-border/50 text-center">P2 <span className="block opacity-50">(20%)</span></th>
                  <th className="px-4 py-4 border-b border-border/50 text-center">Tareas <span className="block opacity-50">(20%)</span></th>
                  <th className="px-4 py-4 border-b border-border/50 text-center">Examen <span className="block opacity-50">(40%)</span></th>
                  <th className="px-6 py-4 border-b border-border/50 text-center text-primary bg-primary/5">Final</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {MOCK_NOTAS.map((nota) => (
                  <tr key={nota.id} className="hover:bg-muted/10 transition-colors group">
                    <td className="px-6 py-4 font-bold text-sm text-foreground">{nota.alumno}</td>
                    <td className="px-4 py-4 text-center">
                      <input type="number" defaultValue={nota.p1} className="w-12 text-center py-1 rounded bg-muted/20 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-primary/20" />
                    </td>
                    <td className="px-4 py-4 text-center">
                      <input type="number" defaultValue={nota.p2} className="w-12 text-center py-1 rounded bg-muted/20 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-primary/20" />
                    </td>
                    <td className="px-4 py-4 text-center">
                      <input type="number" defaultValue={nota.p3} className="w-12 text-center py-1 rounded bg-muted/20 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-primary/20" />
                    </td>
                    <td className="px-4 py-4 text-center">
                      <input type="number" defaultValue={nota.examen} className="w-12 text-center py-1 rounded bg-muted/20 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-primary/20 text-primary" />
                    </td>
                    <td className="px-6 py-4 text-center font-black bg-primary/5">
                      <span className={nota.final >= 13 ? 'text-emerald-600' : 'text-red-500'}>
                        {nota.final.toFixed(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
