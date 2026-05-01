'use client';

import React, { useState } from 'react';
import { Shield, Lock, Plus, Edit2, Trash2, X, Check } from 'lucide-react';

interface Role {
  id: number;
  nombre: string;
  descripcion: string;
  usuarios_asignados: number;
  permisos: string[];
}

interface Permiso {
  id: number;
  modulo: string;
  accion: string;
  descripcion: string;
  roles_asignados: string[];
}

export default function AccesoPage() {
  const [activeTab, setActiveTab] = useState<'roles' | 'permisos'>('roles');
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showPermisoModal, setShowPermisoModal] = useState(false);

  // Roles
  const [roles, setRoles] = useState<Role[]>([
    {
      id: 1,
      nombre: 'Administrador',
      descripcion: 'Acceso total al sistema',
      usuarios_asignados: 2,
      permisos: ['usuarios:crear', 'usuarios:editar', 'usuarios:eliminar', 'reportes:ver', 'configuracion:editar']
    },
    {
      id: 2,
      nombre: 'Docente',
      descripcion: 'Gestión de calificaciones y asistencia',
      usuarios_asignados: 12,
      permisos: ['calificaciones:editar', 'asistencia:registrar', 'reportes:ver_propios']
    },
    {
      id: 3,
      nombre: 'Padre',
      descripcion: 'Visualización de información del estudiante',
      usuarios_asignados: 45,
      permisos: ['calificaciones:ver', 'asistencia:ver', 'mensajes:enviar']
    }
  ]);

  const [permisos, setPermisos] = useState<Permiso[]>([
    {
      id: 1,
      modulo: 'Usuarios',
      accion: 'crear',
      descripcion: 'Crear nuevos usuarios en el sistema',
      roles_asignados: ['Administrador']
    },
    {
      id: 2,
      modulo: 'Usuarios',
      accion: 'editar',
      descripcion: 'Editar información de usuarios',
      roles_asignados: ['Administrador']
    },
    {
      id: 3,
      modulo: 'Calificaciones',
      accion: 'editar',
      descripcion: 'Editar calificaciones de estudiantes',
      roles_asignados: ['Docente', 'Administrador']
    },
    {
      id: 4,
      modulo: 'Reportes',
      accion: 'ver',
      descripcion: 'Visualizar reportes del sistema',
      roles_asignados: ['Administrador', 'Docente']
    }
  ]);

  const [newRole, setNewRole] = useState({ nombre: '', descripcion: '' });
  const [newPermiso, setNewPermiso] = useState({ modulo: '', accion: '', descripcion: '' });

  const handleAddRole = () => {
    if (newRole.nombre.trim()) {
      setRoles([...roles, {
        id: Math.max(...roles.map(r => r.id)) + 1,
        nombre: newRole.nombre,
        descripcion: newRole.descripcion,
        usuarios_asignados: 0,
        permisos: []
      }]);
      setNewRole({ nombre: '', descripcion: '' });
      setShowRoleModal(false);
    }
  };

  const handleAddPermiso = () => {
    if (newPermiso.modulo.trim() && newPermiso.accion.trim()) {
      setPermisos([...permisos, {
        id: Math.max(...permisos.map(p => p.id)) + 1,
        modulo: newPermiso.modulo,
        accion: newPermiso.accion,
        descripcion: newPermiso.descripcion,
        roles_asignados: []
      }]);
      setNewPermiso({ modulo: '', accion: '', descripcion: '' });
      setShowPermisoModal(false);
    }
  };

  const handleDeleteRole = (id: number) => {
    setRoles(roles.filter(r => r.id !== id));
  };

  const handleDeletePermiso = (id: number) => {
    setPermisos(permisos.filter(p => p.id !== id));
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="px-8 py-5 border-b border-border/40">
        <h1 className="text-2xl font-bold text-foreground">Gestión de Acceso</h1>
        <p className="text-sm text-muted-foreground mt-1">Administra roles y permisos del sistema</p>
      </div>

      {/* Tabs */}
      <div className="px-8 py-3 border-b border-border/40 flex gap-6">
        <button
          onClick={() => setActiveTab('roles')}
          className={`flex items-center gap-2 pb-2 border-b-2 transition-colors ${
            activeTab === 'roles'
              ? 'text-foreground border-primary'
              : 'text-muted-foreground border-transparent hover:text-foreground'
          }`}
        >
          <Shield className="w-4 h-4" />
          Roles ({roles.length})
        </button>
        <button
          onClick={() => setActiveTab('permisos')}
          className={`flex items-center gap-2 pb-2 border-b-2 transition-colors ${
            activeTab === 'permisos'
              ? 'text-foreground border-primary'
              : 'text-muted-foreground border-transparent hover:text-foreground'
          }`}
        >
          <Lock className="w-4 h-4" />
          Permisos ({permisos.length})
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        {activeTab === 'roles' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Roles del Sistema</h2>
                <p className="text-sm text-muted-foreground mt-1">Define los perfiles de acceso y sus permisos asociados</p>
              </div>
              <button
                onClick={() => setShowRoleModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold text-sm"
              >
                <Plus className="w-4 h-4" />
                Nuevo Rol
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {roles.map(role => (
                <div key={role.id} className="bg-card border border-border/40 rounded-lg p-5 hover:border-border/60 hover:shadow-sm transition-all group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground text-sm">{role.nombre}</h3>
                      <p className="text-xs text-muted-foreground/70 mt-1">{role.descripcion}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteRole(role.id)}
                      className="p-1.5 hover:bg-destructive/10 rounded transition-colors text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-muted-foreground/70">Usuarios asignados:</span>
                      <span className="font-semibold text-foreground">{role.usuarios_asignados}</span>
                    </div>

                    {role.permisos.length > 0 && (
                      <div className="pt-3 border-t border-border/20">
                        <p className="text-xs font-semibold text-muted-foreground/70 mb-2">Permisos:</p>
                        <div className="flex flex-wrap gap-1.5">
                          {role.permisos.map((perm, idx) => (
                            <span key={idx} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                              {perm}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <button className="w-full mt-4 px-3 py-1.5 border border-border/40 text-foreground hover:bg-muted rounded text-sm font-medium transition-colors">
                    Editar Permisos
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'permisos' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Matriz de Permisos</h2>
                <p className="text-sm text-muted-foreground mt-1">Control granular de acciones por módulo</p>
              </div>
              <button
                onClick={() => setShowPermisoModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold text-sm"
              >
                <Plus className="w-4 h-4" />
                Nuevo Permiso
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/40 bg-muted/20">
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Módulo</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Acción</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Descripción</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Roles Asignados</th>
                    <th className="text-center px-4 py-3 font-semibold text-foreground">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20">
                  {permisos.map(perm => (
                    <tr key={perm.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-medium text-foreground">{perm.modulo}</td>
                      <td className="px-4 py-3 text-foreground">{perm.accion}</td>
                      <td className="px-4 py-3 text-muted-foreground/70 text-xs">{perm.descripcion}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {perm.roles_asignados.map((rol, idx) => (
                            <span key={idx} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded font-medium">
                              {rol}
                            </span>
                          ))}
                          {perm.roles_asignados.length === 0 && (
                            <span className="text-xs text-muted-foreground/50">Sin asignar</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button className="p-1.5 hover:bg-muted rounded transition-colors text-muted-foreground hover:text-foreground">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeletePermiso(perm.id)}
                          className="p-1.5 hover:bg-destructive/10 rounded transition-colors text-muted-foreground hover:text-destructive ml-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modal - Nuevo Rol */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-card border border-border/40 rounded-lg shadow-lg w-full max-w-md mx-4">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border/20">
              <h3 className="font-semibold text-foreground">Crear Nuevo Rol</h3>
              <button
                onClick={() => setShowRoleModal(false)}
                className="p-1 hover:bg-muted rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Nombre del Rol</label>
                <input
                  type="text"
                  placeholder="Ej: Coordinador"
                  value={newRole.nombre}
                  onChange={(e) => setNewRole({ ...newRole, nombre: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border/40 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Descripción</label>
                <textarea
                  placeholder="Describe el propósito de este rol..."
                  value={newRole.descripcion}
                  onChange={(e) => setNewRole({ ...newRole, descripcion: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border/40 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none h-24"
                />
              </div>
            </div>

            <div className="flex gap-3 px-6 py-4 border-t border-border/20">
              <button
                onClick={() => setShowRoleModal(false)}
                className="flex-1 px-4 py-2 bg-muted/50 text-foreground rounded-lg hover:bg-muted transition-colors font-medium text-sm"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddRole}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold text-sm flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                Crear Rol
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal - Nuevo Permiso */}
      {showPermisoModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-card border border-border/40 rounded-lg shadow-lg w-full max-w-md mx-4">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border/20">
              <h3 className="font-semibold text-foreground">Crear Nuevo Permiso</h3>
              <button
                onClick={() => setShowPermisoModal(false)}
                className="p-1 hover:bg-muted rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Módulo</label>
                <input
                  type="text"
                  placeholder="Ej: Calificaciones"
                  value={newPermiso.modulo}
                  onChange={(e) => setNewPermiso({ ...newPermiso, modulo: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border/40 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Acción</label>
                <input
                  type="text"
                  placeholder="Ej: crear, editar, eliminar"
                  value={newPermiso.accion}
                  onChange={(e) => setNewPermiso({ ...newPermiso, accion: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border/40 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Descripción</label>
                <textarea
                  placeholder="Describe qué permite este permiso..."
                  value={newPermiso.descripcion}
                  onChange={(e) => setNewPermiso({ ...newPermiso, descripcion: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border/40 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none h-20"
                />
              </div>
            </div>

            <div className="flex gap-3 px-6 py-4 border-t border-border/20">
              <button
                onClick={() => setShowPermisoModal(false)}
                className="flex-1 px-4 py-2 bg-muted/50 text-foreground rounded-lg hover:bg-muted transition-colors font-medium text-sm"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddPermiso}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold text-sm flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                Crear Permiso
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
