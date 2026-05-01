'use client';

import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, Shield, Users, Lock } from 'lucide-react';

interface Rol {
  id: number;
  nombre: string;
  descripcion: string;
  es_sistema: boolean;
  usuarios_count: number;
  permisos_count: number;
}

export default function RolesPage() {
  const [roles, setRoles] = useState<Rol[]>([
    {
      id: 1,
      nombre: 'Administrador',
      descripcion: 'Acceso completo al sistema',
      es_sistema: true,
      usuarios_count: 2,
      permisos_count: 25
    },
    {
      id: 2,
      nombre: 'Docente',
      descripcion: 'Gestión de estudiantes y calificaciones',
      es_sistema: true,
      usuarios_count: 15,
      permisos_count: 12
    },
    {
      id: 3,
      nombre: 'Padre/Apoderado',
      descripcion: 'Visualización de información del estudiante',
      es_sistema: true,
      usuarios_count: 45,
      permisos_count: 5
    },
    {
      id: 4,
      nombre: 'Coordinador Académico',
      descripcion: 'Gestión de reportes y coordinación',
      es_sistema: false,
      usuarios_count: 3,
      permisos_count: 18
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [newRol, setNewRol] = useState({
    nombre: '',
    descripcion: ''
  });

  const rolesFiltrados = roles.filter(rol =>
    rol.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rol.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddRol = () => {
    if (newRol.nombre.trim()) {
      const rol: Rol = {
        id: Math.max(...roles.map(r => r.id), 0) + 1,
        ...newRol,
        es_sistema: false,
        usuarios_count: 0,
        permisos_count: 0
      };
      setRoles([...roles, rol]);
      setNewRol({ nombre: '', descripcion: '' });
      setShowForm(false);
    }
  };

  const handleDeleteRol = (id: number) => {
    const rol = roles.find(r => r.id === id);
    if (rol?.es_sistema) {
      alert('No puedes eliminar roles del sistema');
      return;
    }
    setRoles(roles.filter(rol => rol.id !== id));
  };

  const rolesSistema = roles.filter(r => r.es_sistema).length;
  const totalPermisos = roles.reduce((acc, r) => acc + r.permisos_count, 0);

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="px-8 py-5 border-b border-border/40 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Roles y Permisos</h1>
          <p className="text-sm text-muted-foreground mt-1">Administra roles de usuario y asignación de permisos</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold text-sm"
        >
          <Plus className="w-4 h-4" />
          Nuevo Rol
        </button>
      </div>

      {/* Stats */}
      <div className="px-8 py-4 border-b border-border/40">
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-card border border-border/40 rounded-lg p-4">
            <p className="text-xs font-semibold text-muted-foreground/70 mb-2">Total Roles</p>
            <p className="text-2xl font-bold text-foreground">{roles.length}</p>
            <p className="text-xs text-muted-foreground/60 mt-1">definidos</p>
          </div>
          <div className="bg-card border border-border/40 rounded-lg p-4">
            <p className="text-xs font-semibold text-muted-foreground/70 mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Sistema
            </p>
            <p className="text-2xl font-bold text-foreground">{rolesSistema}</p>
            <p className="text-xs text-muted-foreground/60 mt-1">roles base</p>
          </div>
          <div className="bg-card border border-border/40 rounded-lg p-4">
            <p className="text-xs font-semibold text-muted-foreground/70 mb-2">Total Usuarios</p>
            <p className="text-2xl font-bold text-foreground">{roles.reduce((a, r) => a + r.usuarios_count, 0)}</p>
            <p className="text-xs text-muted-foreground/60 mt-1">asignados</p>
          </div>
          <div className="bg-card border border-border/40 rounded-lg p-4">
            <p className="text-xs font-semibold text-muted-foreground/70 mb-2">Permisos</p>
            <p className="text-2xl font-bold text-foreground">{totalPermisos}</p>
            <p className="text-xs text-muted-foreground/60 mt-1">totales</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="px-8 py-3 border-b border-border/40">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
          <input
            type="text"
            placeholder="Buscar por nombre, descripción..."
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
            <h3 className="text-sm font-semibold text-foreground">Crear Nuevo Rol</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Nombre del rol"
                value={newRol.nombre}
                onChange={(e) => setNewRol({ ...newRol, nombre: e.target.value })}
                className="w-full px-3 py-2 bg-background border border-border/40 rounded-lg text-sm text-foreground placeholder-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary/40"
              />
              <textarea
                placeholder="Descripción del rol"
                value={newRol.descripcion}
                onChange={(e) => setNewRol({ ...newRol, descripcion: e.target.value })}
                className="w-full px-3 py-2 bg-background border border-border/40 rounded-lg text-sm text-foreground placeholder-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary/40 resize-none h-24"
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
                onClick={handleAddRol}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold text-sm"
              >
                Crear Rol
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Roles Grid */}
      <div className="flex-1 overflow-hidden px-8 py-4">
        <div className="h-full overflow-y-auto">
          {rolesFiltrados.length > 0 ? (
            <div className="space-y-2.5">
              {rolesFiltrados.map(rol => (
                <div
                  key={rol.id}
                  className="bg-card border border-border/40 rounded-lg p-4 hover:border-border/60 hover:shadow-sm transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="p-2 bg-muted/40 rounded-lg">
                        <Shield className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground text-sm">{rol.nombre}</h3>
                          {rol.es_sistema && (
                            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-700 border border-blue-200/30">
                              Sistema
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground/70 line-clamp-1">{rol.descripcion}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 mr-6">
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground/60 mb-1 flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          Usuarios
                        </p>
                        <p className="text-sm font-medium text-foreground">{rol.usuarios_count}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground/60 mb-1 flex items-center gap-1">
                          <Lock className="w-3 h-3" />
                          Permisos
                        </p>
                        <p className="text-sm font-medium text-foreground">{rol.permisos_count}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-muted rounded-lg transition-colors text-primary">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      {!rol.es_sistema && (
                        <button
                          onClick={() => handleDeleteRol(rol.id)}
                          className="p-2 hover:bg-destructive/10 rounded-lg transition-colors text-destructive/70 hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <Shield className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground/60 text-sm">No se encontraron roles</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
