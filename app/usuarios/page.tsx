'use client';

import React, { useState } from 'react';
import { Users, Plus, Edit2, Trash2, Search, Mail, Shield, Calendar, LogOut, Users2, GraduationCap } from 'lucide-react';

const usuariosData = [
  { id: 1, nombre: 'Familia García López', email: 'garcia@example.com', rol: 'Padre', estudiante: 'Carlos Mendoza', estado: 'Activo', fecha: '15/01/2024' },
  { id: 2, nombre: 'Profa. Daniela García', email: 'daniela@school.com', rol: 'Docente', estudiante: '5to Primaria A', estado: 'Activo', fecha: '20/01/2024' },
  { id: 3, nombre: 'Coordinadora Patricia', email: 'patricia@school.com', rol: 'Administrador', estudiante: 'Escuela', estado: 'Activo', fecha: '01/01/2024' },
  { id: 4, nombre: 'Familia Rodríguez Martín', email: 'rodriguez@example.com', rol: 'Padre', estudiante: 'Juan López', estado: 'Activo', fecha: '10/02/2024' },
  { id: 5, nombre: 'Prof. Juan Morales', email: 'juan@school.com', rol: 'Docente', estudiante: '5to Primaria B', estado: 'Inactivo', fecha: '05/02/2024' },
];

function RoleIcon({ rol }: { rol: string }) {
  const iconClass = 'w-5 h-5 text-muted-foreground';
  switch (rol) {
    case 'Padre':
      return <Users2 className={iconClass} />;
    case 'Docente':
      return <GraduationCap className={iconClass} />;
    case 'Administrador':
      return <Shield className={iconClass} />;
    default:
      return <Users className={iconClass} />;
  }
}

function getStatusBadge(estado: string) {
  return estado === 'Activo'
    ? 'bg-green-500/10 text-green-700 border-green-200/30'
    : 'bg-muted text-muted-foreground border-border/30';
}

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState(usuariosData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroRol, setFiltroRol] = useState('todos');
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({
    nombre: '',
    email: '',
    rol: 'Padre',
    estudiante: '',
  });

  const usuariosFiltrados = usuarios.filter(u => {
    const matchesSearch = u.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRol = filtroRol === 'todos' || u.rol === filtroRol;
    return matchesSearch && matchesRol;
  });

  const handleAddUser = () => {
    if (newUser.nombre && newUser.email) {
      const usuario = {
        id: Math.max(...usuarios.map(u => u.id), 0) + 1,
        nombre: newUser.nombre,
        email: newUser.email,
        rol: newUser.rol,
        estudiante: newUser.estudiante || 'N/A',
        estado: 'Activo',
        fecha: new Date().toLocaleDateString('es-ES'),
      };
      setUsuarios([...usuarios, usuario]);
      setNewUser({ nombre: '', email: '', rol: 'Padre', estudiante: '' });
      setShowModal(false);
    }
  };

  const handleDeleteUser = (id: number) => {
    setUsuarios(usuarios.filter(u => u.id !== id));
  };

  const totalActivos = usuarios.filter(u => u.estado === 'Activo').length;
  const totalDocentes = usuarios.filter(u => u.rol === 'Docente').length;
  const totalPadres = usuarios.filter(u => u.rol === 'Padre').length;

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="px-8 py-4 border-b border-border/40 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Gestión de Usuarios</h1>
          <p className="text-sm text-muted-foreground mt-1">Administra cuentas y permisos de acceso</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold text-sm"
        >
          <Plus className="w-4 h-4" />
          Agregar Usuario
        </button>
      </div>

      {/* Content - Vertical Layout */}
      <div className="flex-1 overflow-hidden px-8 py-6 flex flex-col gap-6">
        {/* Stats: Horizontal */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-4">Estadísticas</h3>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-card border border-border/40 rounded-lg p-4">
              <p className="text-xs font-semibold text-muted-foreground/70 mb-2">Total Usuarios</p>
              <p className="text-3xl font-bold text-foreground">{usuarios.length}</p>
              <p className="text-xs text-muted-foreground/60 mt-1">en el sistema</p>
            </div>
            <div className="bg-card border border-border/40 rounded-lg p-4">
              <p className="text-xs font-semibold text-muted-foreground/70 mb-2 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Activos
              </p>
              <p className="text-3xl font-bold text-foreground">{totalActivos}</p>
              <p className="text-xs text-muted-foreground/60 mt-1">{Math.round((totalActivos/usuarios.length)*100)}% del total</p>
            </div>
            <div className="bg-card border border-border/40 rounded-lg p-4">
              <p className="text-xs font-semibold text-muted-foreground/70 mb-2">Docentes</p>
              <p className="text-3xl font-bold text-foreground">{totalDocentes}</p>
              <p className="text-xs text-muted-foreground/60 mt-1">registrados</p>
            </div>
            <div className="bg-card border border-border/40 rounded-lg p-4">
              <p className="text-xs font-semibold text-muted-foreground/70 mb-2">Padres</p>
              <p className="text-3xl font-bold text-foreground">{totalPadres}</p>
              <p className="text-xs text-muted-foreground/60 mt-1">en la plataforma</p>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">Filtros</h3>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
              <input
                type="text"
                placeholder="Buscar usuario..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-card border border-border/40 rounded-lg text-sm text-foreground placeholder-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <select
              value={filtroRol}
              onChange={(e) => setFiltroRol(e.target.value)}
              className="px-4 py-2 bg-card border border-border/40 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 min-w-fit"
            >
              <option value="todos">Todos los roles</option>
              <option value="Padre">Padres</option>
              <option value="Docente">Docentes</option>
              <option value="Administrador">Administradores</option>
            </select>
          </div>
        </div>

        {/* Users List */}
        <div className="flex-1 overflow-y-auto pr-2">
            {usuariosFiltrados.length > 0 ? (
              <div className="space-y-2.5">
                {usuariosFiltrados.map(usuario => (
                  <div
                    key={usuario.id}
                    className="bg-card border border-border/40 rounded-lg p-4 hover:border-border/60 hover:shadow-sm transition-all group"
                  >
                    <div className="flex items-center justify-between gap-4">
                      {/* Icon + Info */}
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="p-2 bg-muted/40 rounded-lg flex-shrink-0">
                          <RoleIcon rol={usuario.rol} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-foreground text-sm truncate">{usuario.nombre}</h3>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium border whitespace-nowrap ${getStatusBadge(usuario.estado)}`}>
                              {usuario.estado}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground/70">
                            <span className="flex items-center gap-1 truncate">
                              <Mail className="w-3 h-3 flex-shrink-0" />
                              {usuario.email}
                            </span>
                            <span className="flex items-center gap-1 flex-shrink-0">
                              <Calendar className="w-3 h-3" />
                              {usuario.fecha}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Role + Asignación */}
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs text-muted-foreground/60 mb-1">{usuario.rol}</p>
                        <p className="text-sm font-medium text-foreground max-w-[120px] truncate">{usuario.estudiante}</p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors text-primary">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground">
                          <LogOut className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(usuario.id)}
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
                  <Users className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-muted-foreground/60 text-sm">No se encontraron usuarios</p>
                  <p className="text-muted-foreground/40 text-xs mt-1">Intenta con otros criterios de búsqueda</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Agregar Usuario */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border border-border/40 rounded-lg p-6 w-full max-w-md shadow-xl">
            <h2 className="text-lg font-semibold text-foreground mb-4">Crear Nuevo Usuario</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Nombre completo"
                value={newUser.nombre}
                onChange={(e) => setNewUser({ ...newUser, nombre: e.target.value })}
                className="w-full px-3 py-2 bg-background border border-border/40 rounded-lg text-sm text-foreground placeholder-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="w-full px-3 py-2 bg-background border border-border/40 rounded-lg text-sm text-foreground placeholder-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <select
                value={newUser.rol}
                onChange={(e) => setNewUser({ ...newUser, rol: e.target.value })}
                className="w-full px-3 py-2 bg-background border border-border/40 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="Padre">Padre/Madre</option>
                <option value="Docente">Docente</option>
                <option value="Administrador">Administrador</option>
              </select>
              <input
                type="text"
                placeholder="Asociación (Ej: 5to Primaria A)"
                value={newUser.estudiante}
                onChange={(e) => setNewUser({ ...newUser, estudiante: e.target.value })}
                className="w-full px-3 py-2 bg-background border border-border/40 rounded-lg text-sm text-foreground placeholder-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="flex gap-2 justify-end mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-muted/50 text-foreground rounded-lg hover:bg-muted transition-colors font-medium text-sm border border-border/40"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddUser}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold text-sm"
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
