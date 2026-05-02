'use client';

import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, MapPin, Mail, Phone, Building2, Filter, ChevronDown } from 'lucide-react';

interface Institucion {
  id: number;
  nombre: string;
  nombre_corto: string;
  email: string;
  telefono: string;
  ciudad: string;
  tipo_institucion: string;
  estado: boolean;
  codigo_modular: string;
}

export default function InstitucionesPage() {
  const [instituciones, setInstituciones] = useState<Institucion[]>([
    {
      id: 1,
      nombre: 'Institución Educativa "San José"',
      nombre_corto: 'IE San José',
      email: 'contact@sanjose.edu.pe',
      telefono: '(01) 1234567',
      ciudad: 'Lima',
      tipo_institucion: 'Primaria y Secundaria',
      estado: true,
      codigo_modular: '1501234'
    },
    {
      id: 2,
      nombre: 'Colegio "María Inmaculada"',
      nombre_corto: 'CMI',
      email: 'info@mariainmaculada.edu.pe',
      telefono: '(01) 9876543',
      ciudad: 'Arequipa',
      tipo_institucion: 'Inicial, Primaria y Secundaria',
      estado: true,
      codigo_modular: '1602456'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [newInst, setNewInst] = useState({
    nombre: '',
    nombre_corto: '',
    email: '',
    telefono: '',
    ciudad: '',
    tipo_institucion: 'Primaria y Secundaria',
    codigo_modular: ''
  });

  const institucionesFiltradas = instituciones.filter(inst =>
    inst.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inst.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddInst = () => {
    if (newInst.nombre.trim()) {
      const inst: Institucion = {
        id: Math.max(...instituciones.map(i => i.id), 0) + 1,
        ...newInst,
        estado: true
      };
      setInstituciones([...instituciones, inst]);
      setNewInst({
        nombre: '',
        nombre_corto: '',
        email: '',
        telefono: '',
        ciudad: '',
        tipo_institucion: 'Primaria y Secundaria',
        codigo_modular: ''
      });
      setShowForm(false);
    }
  };

  const handleDeleteInst = (id: number) => {
    setInstituciones(instituciones.filter(inst => inst.id !== id));
  };

  const totalActivas = instituciones.filter(i => i.estado).length;

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Header unificado h-16 */}
      <div className="h-16 px-8 border-b border-border/50 flex items-center justify-between bg-background flex-shrink-0 z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Building2 className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground leading-tight">Instituciones</h1>
            <p className="text-xs text-muted-foreground font-medium">Gestión de Sedes y Locales</p>
          </div>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-md shadow-primary/20 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Nueva Institución</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 min-h-0 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-card rounded-2xl border border-border p-6 hover:border-primary/30 transition-colors flex items-center justify-between shadow-sm">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Total</p>
              <p className="text-2xl font-bold text-foreground">{instituciones.length}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-muted-foreground"><Building2 className="w-6 h-6" /></div>
          </div>
          <div className="bg-card rounded-2xl border border-border p-6 hover:border-primary/30 transition-colors flex items-center justify-between shadow-sm">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Activas</p>
              <p className="text-2xl font-bold text-emerald-600">{totalActivas}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-emerald-500"><Plus className="w-6 h-6" /></div>
          </div>
          <div className="bg-card rounded-2xl border border-border p-6 hover:border-primary/30 transition-colors flex items-center justify-between shadow-sm">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Ciudades</p>
              <p className="text-2xl font-bold text-foreground">{new Set(instituciones.map(i => i.ciudad)).size}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-muted-foreground"><MapPin className="w-6 h-6" /></div>
          </div>
          <div className="bg-card rounded-2xl border border-border p-6 hover:border-primary/30 transition-colors flex items-center justify-between shadow-sm">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Niveles</p>
              <p className="text-2xl font-bold text-foreground">{new Set(instituciones.map(i => i.tipo_institucion)).size}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-muted-foreground"><Plus className="w-6 h-6" /></div>
          </div>
        </div>

        {/* Barra de Búsqueda y Filtros */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-card p-4 border border-border rounded-2xl shadow-sm">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Buscar institución..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-muted/20 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-semibold"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-2 bg-muted/30 px-4 py-2.5 rounded-xl border border-border cursor-pointer hover:bg-muted/50 transition-all">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-bold text-foreground">Filtros</span>
              <ChevronDown className="w-4 h-4 text-muted-foreground ml-1" />
            </div>
          </div>
        </div>

        {/* Instituciones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 pb-8">
          {institucionesFiltradas.map(inst => (
            <div key={inst.id} className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group flex flex-col relative overflow-hidden shadow-sm">
              <div className="flex items-start justify-between mb-8">
                <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <Building2 className="w-7 h-7" />
                </div>
                <span className="text-[10px] font-black bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full border border-emerald-200 uppercase tracking-widest shadow-sm">Activa</span>
              </div>

              <div className="flex-1">
                <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors mb-1 leading-tight">{inst.nombre}</h3>
                <p className="text-xs text-primary/70 font-bold uppercase tracking-widest mb-6">{inst.nombre_corto}</p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
                    <Mail className="w-4 h-4 text-primary/60" />
                    <span className="truncate">{inst.email}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
                    <Phone className="w-4 h-4 text-primary/60" />
                    <span>{inst.telefono}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
                    <MapPin className="w-4 h-4 text-primary/60" />
                    <span>{inst.ciudad}</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-border mt-auto flex justify-between items-end">
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Nivel</p>
                    <p className="text-sm font-bold text-foreground truncate max-w-[180px]">{inst.tipo_institucion}</p>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                    <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => handleDeleteInst(inst.id)} className="p-2 text-muted-foreground hover:text-destructive hover:bg-red-50 rounded-lg transition-all"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
