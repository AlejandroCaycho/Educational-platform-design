'use client';

import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, MapPin, Mail, Phone, Globe, Building2 } from 'lucide-react';

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
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="px-8 py-5 border-b border-border/40 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Instituciones</h1>
          <p className="text-sm text-muted-foreground mt-1">Gestiona las sedes y instituciones registradas</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold text-sm"
        >
          <Plus className="w-4 h-4" />
          Nueva Institución
        </button>
      </div>

      {/* Stats */}
      <div className="px-8 py-4 border-b border-border/40">
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-card border border-border/40 rounded-lg p-4">
            <p className="text-xs font-semibold text-muted-foreground/70 mb-2">Total</p>
            <p className="text-2xl font-bold text-foreground">{instituciones.length}</p>
            <p className="text-xs text-muted-foreground/60 mt-1">registradas</p>
          </div>
          <div className="bg-card border border-border/40 rounded-lg p-4">
            <p className="text-xs font-semibold text-muted-foreground/70 mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Activas
            </p>
            <p className="text-2xl font-bold text-foreground">{totalActivas}</p>
            <p className="text-xs text-muted-foreground/60 mt-1">{Math.round((totalActivas/instituciones.length)*100)}%</p>
          </div>
          <div className="bg-card border border-border/40 rounded-lg p-4">
            <p className="text-xs font-semibold text-muted-foreground/70 mb-2">Ciudades</p>
            <p className="text-2xl font-bold text-foreground">{new Set(instituciones.map(i => i.ciudad)).size}</p>
            <p className="text-xs text-muted-foreground/60 mt-1">ubicaciones</p>
          </div>
          <div className="bg-card border border-border/40 rounded-lg p-4">
            <p className="text-xs font-semibold text-muted-foreground/70 mb-2">Niveles</p>
            <p className="text-2xl font-bold text-foreground">{new Set(instituciones.map(i => i.tipo_institucion)).size}</p>
            <p className="text-xs text-muted-foreground/60 mt-1">tipos únicos</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="px-8 py-3 border-b border-border/40 flex-shrink-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
          <input
            type="text"
            placeholder="Buscar por nombre, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2 bg-muted/40 border border-border/40 rounded-lg text-sm text-foreground placeholder-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="px-8 py-4 border-b border-border/40 bg-muted/20">
          <div className="bg-card border border-border/40 rounded-lg p-5 space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Nueva Institución</h3>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Nombre completo"
                value={newInst.nombre}
                onChange={(e) => setNewInst({ ...newInst, nombre: e.target.value })}
                className="px-3 py-2 bg-background border border-border/40 rounded-lg text-sm text-foreground placeholder-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary/40"
              />
              <input
                type="text"
                placeholder="Nombre corto"
                value={newInst.nombre_corto}
                onChange={(e) => setNewInst({ ...newInst, nombre_corto: e.target.value })}
                className="px-3 py-2 bg-background border border-border/40 rounded-lg text-sm text-foreground placeholder-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary/40"
              />
              <input
                type="email"
                placeholder="Email"
                value={newInst.email}
                onChange={(e) => setNewInst({ ...newInst, email: e.target.value })}
                className="px-3 py-2 bg-background border border-border/40 rounded-lg text-sm text-foreground placeholder-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary/40"
              />
              <input
                type="tel"
                placeholder="Teléfono"
                value={newInst.telefono}
                onChange={(e) => setNewInst({ ...newInst, telefono: e.target.value })}
                className="px-3 py-2 bg-background border border-border/40 rounded-lg text-sm text-foreground placeholder-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary/40"
              />
              <input
                type="text"
                placeholder="Ciudad"
                value={newInst.ciudad}
                onChange={(e) => setNewInst({ ...newInst, ciudad: e.target.value })}
                className="px-3 py-2 bg-background border border-border/40 rounded-lg text-sm text-foreground placeholder-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary/40"
              />
              <input
                type="text"
                placeholder="Código Modular"
                value={newInst.codigo_modular}
                onChange={(e) => setNewInst({ ...newInst, codigo_modular: e.target.value })}
                className="px-3 py-2 bg-background border border-border/40 rounded-lg text-sm text-foreground placeholder-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary/40"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-muted/50 text-foreground rounded-lg hover:bg-muted transition-colors font-medium text-sm border border-border/40"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddInst}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold text-sm"
              >
                Crear
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Instituciones Grid */}
      <div className="flex-1 overflow-hidden px-8 py-4">
        <div className="h-full overflow-y-auto">
          {institucionesFiltradas.length > 0 ? (
            <div className="space-y-2.5">
              {institucionesFiltradas.map(inst => (
                <div
                  key={inst.id}
                  className="bg-card border border-border/40 rounded-lg p-4 hover:border-border/60 hover:shadow-sm transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="p-2 bg-muted/40 rounded-lg">
                        <Building2 className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground text-sm truncate">{inst.nombre}</h3>
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-700 border border-green-200/30">
                            Activa
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground/70 flex-wrap">
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {inst.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {inst.telefono}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {inst.ciudad}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right mr-6">
                      <p className="text-xs text-muted-foreground/60 mb-1">Tipo</p>
                      <p className="text-sm font-medium text-foreground">{inst.tipo_institucion}</p>
                    </div>

                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-muted rounded-lg transition-colors text-primary">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteInst(inst.id)}
                        className="p-2 hover:bg-destructive/10 rounded-lg transition-colors text-destructive/70 hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <Building2 className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground/60 text-sm">No se encontraron instituciones</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
