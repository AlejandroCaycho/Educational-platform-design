'use client';

import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, Key, Grid3x3, CheckCircle2, Circle } from 'lucide-react';

interface Permiso {
  id: number;
  modulo: string;
  accion: string;
  descripcion: string;
  roles_count: number;
}

export default function PermisosPage() {
  const [permisos, setPermisos] = useState<Permiso[]>([
    { id: 1, modulo: 'Usuarios', accion: 'crear', descripcion: 'Crear nuevos usuarios en el sistema', roles_count: 2 },
    { id: 2, modulo: 'Usuarios', accion: 'editar', descripcion: 'Editar información de usuarios', roles_count: 2 },
    { id: 3, modulo: 'Usuarios', accion: 'eliminar', descripcion: 'Eliminar usuarios del sistema', roles_count: 1 },
    { id: 4, modulo: 'Usuarios', accion: 'ver', descripcion: 'Ver información de usuarios', roles_count: 4 },
    { id: 5, modulo: 'Calificaciones', accion: 'crear', descripcion: 'Crear nuevas calificaciones', roles_count: 2 },
    { id: 6, modulo: 'Calificaciones', accion: 'editar', descripcion: 'Editar calificaciones existentes', roles_count: 2 },
    { id: 7, modulo: 'Calificaciones', accion: 'ver', descripcion: 'Ver calificaciones de estudiantes', roles_count: 3 },
    { id: 8, modulo: 'Reportes', accion: 'generar', descripcion: 'Generar reportes académicos', roles_count: 2 },
    { id: 9, modulo: 'Reportes', accion: 'exportar', descripcion: 'Exportar datos a archivos', roles_count: 2 },
    { id: 10, modulo: 'Configuración', accion: 'ver', descripcion: 'Ver configuración del sistema', roles_count: 3 },
    { id: 11, modulo: 'Configuración', accion: 'editar', descripcion: 'Editar configuración del sistema', roles_count: 1 },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [newPerm, setNewPerm] = useState({
    modulo: '',
    accion: '',
    descripcion: ''
  });

  const permisosFiltrados = permisos.filter(perm =>
    perm.modulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    perm.accion.toLowerCase().includes(searchTerm.toLowerCase()) ||
    perm.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPermiso = () => {
    if (newPerm.modulo.trim() && newPerm.accion.trim()) {
      const perm: Permiso = {
        id: Math.max(...permisos.map(p => p.id), 0) + 1,
        ...newPerm,
        roles_count: 0
      };
      setPermisos([...permisos, perm]);
      setNewPerm({ modulo: '', accion: '', descripcion: '' });
      setShowForm(false);
    }
  };

  const handleDeletePermiso = (id: number) => {
    setPermisos(permisos.filter(perm => perm.id !== id));
  };

  const modulos = new Set(permisos.map(p => p.modulo));
  const totalRolesAsignados = permisos.reduce((acc, p) => acc + p.roles_count, 0);

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="px-8 py-5 border-b border-border/40 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Permisos</h1>
          <p className="text-sm text-muted-foreground mt-1">Administra permisos y accesos por módulo</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold text-sm"
        >
          <Plus className="w-4 h-4" />
          Nuevo Permiso
        </button>
      </div>

      {/* Stats */}
      <div className="px-8 py-4 border-b border-border/40">
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-card border border-border/40 rounded-lg p-4">
            <p className="text-xs font-semibold text-muted-foreground/70 mb-2">Total Permisos</p>
            <p className="text-2xl font-bold text-foreground">{permisos.length}</p>
            <p className="text-xs text-muted-foreground/60 mt-1">definidos</p>
          </div>
          <div className="bg-card border border-border/40 rounded-lg p-4">
            <p className="text-xs font-semibold text-muted-foreground/70 mb-2 flex items-center gap-1.5">
              <Grid3x3 className="w-4 h-4" />
              Módulos
            </p>
            <p className="text-2xl font-bold text-foreground">{modulos.size}</p>
            <p className="text-xs text-muted-foreground/60 mt-1">activos</p>
          </div>
          <div className="bg-card border border-border/40 rounded-lg p-4">
            <p className="text-xs font-semibold text-muted-foreground/70 mb-2">Roles Asignados</p>
            <p className="text-2xl font-bold text-foreground">{totalRolesAsignados}</p>
            <p className="text-xs text-muted-foreground/60 mt-1">asignaciones</p>
          </div>
          <div className="bg-card border border-border/40 rounded-lg p-4">
            <p className="text-xs font-semibold text-muted-foreground/70 mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              Cobertura
            </p>
            <p className="text-2xl font-bold text-foreground">{Math.round((totalRolesAsignados / (permisos.length * 4)) * 100)}%</p>
            <p className="text-xs text-muted-foreground/60 mt-1">uso</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="px-8 py-3 border-b border-border/40">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
          <input
            type="text"
            placeholder="Buscar por módulo, acción, descripción..."
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
            <h3 className="text-sm font-semibold text-foreground">Nuevo Permiso</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Módulo (Ej: Usuarios, Calificaciones)"
                  value={newPerm.modulo}
                  onChange={(e) => setNewPerm({ ...newPerm, modulo: e.target.value })}
                  className="px-3 py-2 bg-background border border-border/40 rounded-lg text-sm text-foreground placeholder-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary/40"
                />
                <input
                  type="text"
                  placeholder="Acción (Ej: crear, editar, eliminar)"
                  value={newPerm.accion}
                  onChange={(e) => setNewPerm({ ...newPerm, accion: e.target.value })}
                  className="px-3 py-2 bg-background border border-border/40 rounded-lg text-sm text-foreground placeholder-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary/40"
                />
              </div>
              <textarea
                placeholder="Descripción del permiso"
                value={newPerm.descripcion}
                onChange={(e) => setNewPerm({ ...newPerm, descripcion: e.target.value })}
                className="w-full px-3 py-2 bg-background border border-border/40 rounded-lg text-sm text-foreground placeholder-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary/40 resize-none h-20"
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
                onClick={handleAddPermiso}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold text-sm"
              >
                Crear Permiso
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Permisos Grid */}
      <div className="flex-1 overflow-hidden px-8 py-4">
        <div className="h-full overflow-y-auto">
          {permisosFiltrados.length > 0 ? (
            <div className="space-y-2.5">
              {permisosFiltrados.map(perm => (
                <div
                  key={perm.id}
                  className="bg-card border border-border/40 rounded-lg p-4 hover:border-border/60 hover:shadow-sm transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="p-2 bg-muted/40 rounded-lg">
                        <Key className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-semibold text-foreground text-sm">
                            <span className="text-primary/80">{perm.modulo}</span>
                            <span className="text-muted-foreground/50 mx-2">•</span>
                            <span className="text-foreground">{perm.accion}</span>
                          </h3>
                        </div>
                        <p className="text-xs text-muted-foreground/70 line-clamp-1">{perm.descripcion}</p>
                      </div>
                    </div>

                    <div className="text-right mr-6">
                      <p className="text-xs text-muted-foreground/60 mb-1">Roles</p>
                      <div className="flex items-center gap-1">
                        {[...Array(Math.min(perm.roles_count, 3))].map((_, i) => (
                          <CheckCircle2 key={i} className="w-4 h-4 text-green-600" />
                        ))}
                        {perm.roles_count > 3 && (
                          <span className="text-xs text-muted-foreground">+{perm.roles_count - 3}</span>
                        )}
                        {perm.roles_count === 0 && (
                          <Circle className="w-4 h-4 text-muted-foreground/30" />
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-muted rounded-lg transition-colors text-primary">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeletePermiso(perm.id)}
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
                <Key className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground/60 text-sm">No se encontraron permisos</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
