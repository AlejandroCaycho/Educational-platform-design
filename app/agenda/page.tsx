'use client';

import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Plus } from 'lucide-react';
import Mensajes from '@/app/mensajes/page';
import Calendario from '@/app/calendario/page';

export default function AgendaPage() {
  const [activeTab, setActiveTab] = useState<'mensajes' | 'calendario'>('mensajes');

  const handleNewEventClick = () => {
    // Usamos un evento personalizado con un nombre muy específico
    const event = new CustomEvent('EDU_NOVA_OPEN_NEW_EVENT');
    window.dispatchEvent(event);
  };

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Header Unificado h-16 con Z-INDEX superior */}
      <div className="h-16 px-8 border-b border-border/50 flex items-center justify-between bg-background flex-shrink-0 z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <CalendarIcon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground leading-tight">Mi Agenda</h1>
              <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Comunicación y Eventos</p>
            </div>
          </div>

          {/* Tabs estilo Pill */}
          <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-full border border-border/50">
            <button 
              onClick={() => setActiveTab('mensajes')}
              className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all ${activeTab === 'mensajes' ? 'bg-background text-primary shadow-md' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Mensajes
            </button>
            <button 
              onClick={() => setActiveTab('calendario')}
              className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all ${activeTab === 'calendario' ? 'bg-background text-primary shadow-md' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Calendario
            </button>
          </div>
        </div>

        {activeTab === 'calendario' && (
          <button 
            className="flex items-center gap-2 px-5 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all text-xs font-bold uppercase tracking-widest shadow-lg shadow-primary/20 relative z-[60]"
            onClick={handleNewEventClick}
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Evento</span>
          </button>
        )}
      </div>
      
      <div className="flex-1 overflow-hidden relative bg-background z-0">
        <div className={`absolute inset-0 transition-all duration-300 ${activeTab === 'mensajes' ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-95 pointer-events-none'}`}>
          <Mensajes />
        </div>
        <div className={`absolute inset-0 transition-all duration-300 ${activeTab === 'calendario' ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-95 pointer-events-none'}`}>
          <Calendario />
        </div>
      </div>
    </div>
  );
}
