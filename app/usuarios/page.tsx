'use client';

import React, { useState } from 'react';
import { Users, Plus, Edit2, Trash2, Search, Eye, EyeOff } from 'lucide-react';

const usuariosData = [
  { id: 1, nombre: 'Familia García López', email: 'garcia@example.com', rol: 'Padre', estudiante: 'Carlos Mendoza', estado: 'Activo', fecha: '15/01/2024' },
  { id: 2, nombre: 'Profa. Daniela García', email: 'daniela@school.com', rol: 'Docente', estudiante: '5to Primaria A', estado: 'Activo', fecha: '20/01/2024' },
  { id: 3, nombre: 'Coordinadora Patricia', email: 'patricia@school.com', rol: 'Administrador', estudiante: 'Escuela', estado: 'Activo', fecha: '01/01/2024' },
  { id: 4, nombre: 'Familia Rodríguez Martín', email: 'rodriguez@example.com', rol: 'Padre', estudiante: 'Juan López', estado: 'Activo', fecha: '10/02/2024' },
  { id: 5, nombre: 'Prof. Juan Morales', email: 'juan@school.com', rol: 'Docente', estudiante: '5to Primaria B', estado: 'Inactivo', fecha: '05/02/2024' },
];

function getRoleColor(rol: string) {
  switch (rol) {
    case 'Padre':
      return 'bg-blue-100 text-blue-700';
    case 'Docente':
      return 'bg-green-100 text-green-700';
    case 'Administrador':
      return 'bg-purple-100 text-purple-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}

function getStatusColor(estado: string) {
  return estado === 'Activo'
    ? 'bg-green-100 text-green-700'
    : 'bg-red-100 text-red-700';
}

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState(usuariosData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroRol, setFiltroRol] = useState('todos');
  const [showForm, setShowForm] = useState(false);
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
      setShowForm(false);
    }
  };

  const handleDeleteUser = (id: number) => {
    setUsuarios(usuarios.filter(u => u.id !== id));
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="px-5 md:px-6 py-4 border-b border-border/30 flex items-center justify-between flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Usuarios</h1>
          <p className="text-xs text-muted-foreground">Gestión de cuentas del sistema</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all shadow-sm font-medium text-sm"
        >
          <Plus className="w-4 h-4" />
          Nuevo
        </button>
      </div>

      {/* Stats and Filters */}
      <div className="px-5 md:px-6 py-3 border-b border-border/20 flex-shrink-0 space-y-3">
        {/* Metrics */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-400/5 rounded-lg border border-blue-200/30 p-2.5">
            <p className="text-xs text-muted-foreground/70 font-medium">Total Usuarios</p>
            <p className="text-lg font-bold text-foreground">{usuarios.length}</p>
          </div>
          <div className="bg-gradient-to-br from-green-500/10 to-green-400/5 rounded-lg border border-green-200/30 p-2.5">
            <p className="text-xs text-muted-foreground/70 font-medium">Activos</p>
            <p className="text-lg font-bold text-foreground">{usuarios.filter(u => u.estado === 'Activo').length}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-400/5 rounded-lg border border-purple-200/30 p-2.5">
            <p className="text-xs text-muted-foreground/70 font-medium">Docentes</p>
            <p className="text-lg font-bold text-foreground">{usuarios.filter(u => u.rol === 'Docente').length}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por nombre o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-1.5 bg-muted/50 border border-border/30 rounded-lg text-sm text-foreground placeholder-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent transition-all"
            />
          </div>
          <select
            value={filtroRol}
            onChange={(e) => setFiltroRol(e.target.value)}
            className="px-3 py-1.5 bg-muted/50 border border-border/30 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent transition-all"
          >
            <option value="todos">Todos</option>
            <option value="Padre">Padres</option>
            <option value="Docente">Docentes</option>
            <option value="Administrador">Admin</option>
          </select>
        </div>

        {/* Add Form */}
        {showForm && (
          <div className="bg-gradient-to-br from-card to-card/80 rounded-lg border border-border/30 p-3 space-y-3">
            <h3 className="text-sm font-bold text-foreground">Crear Nuevo Usuario</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <input
                type="text"
                placeholder="Nombre"
                value={newUser.nombre}
                onChange={(e) => setNewUser({ ...newUser, nombre: e.target.value })}
                className="px-2.5 py-1.5 bg-muted/50 border border-border/30 rounded-lg text-xs text-foreground placeholder-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent transition-all"
              />
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="px-2.5 py-1.5 bg-muted/50 border border-border/30 rounded-lg text-xs text-foreground placeholder-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent transition-all"
              />
              <select
                value={newUser.rol}
                onChange={(e) => setNewUser({ ...newUser, rol: e.target.value })}
                className="px-2.5 py-1.5 bg-muted/50 border border-border/30 rounded-lg text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent transition-all"
              >
                <option value="Padre">Padre</option>
                <option value="Docente">Docente</option>
                <option value="Administrador">Admin</option>
              </select>
              <input
                type="text"
                placeholder="Estudiante/Clase"
                value={newUser.estudiante}
                onChange={(e) => setNewUser({ ...newUser, estudiante: e.target.value })}
                className="px-2.5 py-1.5 bg-muted/50 border border-border/30 rounded-lg text-xs text-foreground placeholder-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent transition-all"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAddUser}
                className="flex-1 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all font-medium text-xs"
              >
                Agregar
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-3 py-1.5 bg-muted/50 text-foreground rounded-lg hover:bg-muted transition-all font-medium text-xs border border-border/30"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Users Table */}
      <div className="flex-1 overflow-hidden flex flex-col px-5 md:px-6 py-4">
        <div className="flex-1 overflow-y-auto rounded-2xl border border-border/50 bg-gradient-to-br from-card to-card/80 shadow-sm">
          <div className="overflow-x-auto h-full flex flex-col">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-gradient-to-r from-primary/5 to-primary/10 border-b border-border/30">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-foreground text-xs">Nombre</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground text-xs">Email</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground text-xs">Rol</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground text-xs">Asignación</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground text-xs">Estado</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground text-xs">Registro</th>
                  <th className="text-center px-4 py-3 font-semibold text-foreground text-xs">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                {usuariosFiltrados.length > 0 ? (
                  usuariosFiltrados.map(usuario => (
                    <tr
                      key={usuario.id}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-4 py-3 text-foreground font-medium">{usuario.nombre}</td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">{usuario.email}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getRoleColor(usuario.rol)}`}>
                          {usuario.rol}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-foreground text-xs">{usuario.estudiante}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(usuario.estado)}`}>
                          {usuario.estado}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">{usuario.fecha}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-1.5">
                          <button className="p-1.5 hover:bg-muted/50 rounded-lg transition-colors text-primary hover:text-primary/80">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(usuario.id)}
                            className="p-1.5 hover:bg-destructive/20 rounded-lg transition-colors text-destructive hover:text-destructive/80"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-muted-foreground/60 text-sm">
                      No se encontraron usuarios con los criterios de búsqueda
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
