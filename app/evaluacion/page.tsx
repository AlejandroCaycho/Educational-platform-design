'use client';

import { useState } from 'react';
import { ClipboardList } from 'lucide-react';
import Tareas from '@/app/tareas/page';
import Calificaciones from '@/app/calificaciones/page';

export default function EvaluacionPage() {
  const [activeTab, setActiveTab] = useState<'tareas' | 'calificaciones'>('tareas');

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header unificado h-16 */}
      <div className="h-16 px-6 md:px-8 border-b border-border/50 flex items-center justify-between bg-background flex-shrink-0">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <ClipboardList className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground leading-tight">Evaluaciones</h1>
              <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">Gestión académica</p>
            </div>
          </div>

          {/* Tabs estilo Pill */}
          <div className="hidden md:flex items-center gap-2 bg-muted/50 p-1 rounded-full border border-border/50">
            <button 
              onClick={() => setActiveTab('tareas')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${activeTab === 'tareas' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Tareas y Entregas
            </button>
            <button 
              onClick={() => setActiveTab('calificaciones')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${activeTab === 'calificaciones' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Calificaciones
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden relative bg-background">
        <div className={`absolute inset-0 transition-opacity duration-300 ${activeTab === 'tareas' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
          <Tareas hideHeader={true} />
        </div>
        <div className={`absolute inset-0 transition-opacity duration-300 ${activeTab === 'calificaciones' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
          <Calificaciones hideHeader={true} />
        </div>
      </div>
    </div>
  );
}
