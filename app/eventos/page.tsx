'use client';

import { CalendarDays, DollarSign, MapPin, Users, Plus, ChevronRight } from 'lucide-react';

const MOCK_EVENTOS = [
  { id: 1, nombre: 'Aniversario del Colegio', fecha: '25 Mayo 2026', lugar: 'Patio Principal', cuota: 15.00, asistentes: 450, activo: true },
  { id: 2, nombre: 'Día del Logro', fecha: '14 Julio 2026', lugar: 'Aulas y Auditorio', cuota: 0, asistentes: 600, activo: true },
  { id: 3, nombre: 'Kermés Pro-Fondos Deporte', fecha: '12 Agosto 2026', lugar: 'Cancha de Fútbol', cuota: 10.00, asistentes: 320, activo: true },
  { id: 4, nombre: 'Ceremonia de Clausura', fecha: '20 Diciembre 2026', lugar: 'Coliseo Municipal', cuota: 25.00, asistentes: 800, activo: true },
];

export default function EventosPage() {
  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Header unificado h-16 */}
      <div className="h-16 px-8 border-b border-border/50 flex items-center justify-between bg-background flex-shrink-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <CalendarDays className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground leading-tight">Eventos y Actividades</h1>
            <p className="text-xs text-muted-foreground font-medium">Programación de eventos institucionales</p>
          </div>
        </div>
        <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-md shadow-primary/20 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          <span>Programar Evento</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 min-h-0">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 pb-8">
          {MOCK_EVENTOS.map(evento => (
            <div key={evento.id} className="bg-card rounded-3xl border border-border overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 group flex flex-col">
              <div className="h-40 bg-muted flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CalendarDays className="w-16 h-16 text-muted-foreground/20 group-hover:text-primary/20 transition-all group-hover:scale-110 duration-500" />
                <div className="absolute top-4 right-4">
                  <span className="text-xs font-bold bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full border border-emerald-200 uppercase tracking-widest shadow-sm">Confirmado</span>
                </div>
              </div>
              
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="font-bold text-xl text-foreground group-hover:text-primary transition-colors leading-tight mb-6">{evento.nombre}</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-4 text-sm font-semibold text-muted-foreground">
                    <div className="p-2 bg-muted rounded-lg group-hover:bg-primary/10 transition-colors">
                      <CalendarDays className="w-4 h-4 text-primary/60" />
                    </div>
                    <span>{evento.fecha}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm font-semibold text-muted-foreground">
                    <div className="p-2 bg-muted rounded-lg group-hover:bg-primary/10 transition-colors">
                      <MapPin className="w-4 h-4 text-primary/60" />
                    </div>
                    <span className="truncate">{evento.lugar}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm font-semibold text-muted-foreground">
                    <div className="p-2 bg-muted rounded-lg group-hover:bg-primary/10 transition-colors">
                      <Users className="w-4 h-4 text-primary/60" />
                    </div>
                    <span>{evento.asistentes} participantes estimados</span>
                  </div>
                </div>

                <div className="mt-auto pt-8 border-t border-border">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Cuota Sugerida</p>
                      <p className="text-2xl font-black text-foreground">
                        {evento.cuota > 0 ? `S/ ${evento.cuota.toFixed(2)}` : 'Ingreso Libre'}
                      </p>
                    </div>
                    {evento.cuota > 0 && (
                      <div className="w-14 h-14 rounded-2xl bg-primary/5 text-primary flex items-center justify-center border border-primary/10 shadow-inner group-hover:bg-primary group-hover:text-white transition-all duration-500">
                        <DollarSign className="w-7 h-7" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="px-8 py-5 bg-muted/20 border-t border-border flex gap-3">
                <button className="flex-1 px-4 py-2.5 bg-background border border-border text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl text-xs font-bold uppercase tracking-widest transition-all">Editar</button>
                <button className="flex-1 px-4 py-2.5 bg-primary/10 text-primary hover:bg-primary/20 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                  Detalles
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
