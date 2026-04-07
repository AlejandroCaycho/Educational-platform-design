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
    <div className="p-6 md:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Usuarios</h1>
        <p className="text-muted-foreground">Gestión de cuentas de usuarios del sistema</p>
      </div>

      {/* Filters and Actions */}
      <div className="bg-card rounded-lg border border-border p-4 md:p-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por nombre o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Filter */}
          <select
            value={filtroRol}
            onChange={(e) => setFiltroRol(e.target.value)}
            className="px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="todos">Todos los Roles</option>
            <option value="Padre">Padres</option>
            <option value="Docente">Docentes</option>
            <option value="Administrador">Administradores</option>
          </select>

          {/* Add Button */}
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            Nuevo Usuario
          </button>
        </div>

        {/* Add Form */}
        {showForm && (
          <div className="border-t border-border pt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nombre completo"
                value={newUser.nombre}
                onChange={(e) => setNewUser({ ...newUser, nombre: e.target.value })}
                className="px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <select
                value={newUser.rol}
                onChange={(e) => setNewUser({ ...newUser, rol: e.target.value })}
                className="px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Padre">Padre</option>
                <option value="Docente">Docente</option>
                <option value="Administrador">Administrador</option>
              </select>
              <input
                type="text"
                placeholder="Estudiante/Clase"
                value={newUser.estudiante}
                onChange={(e) => setNewUser({ ...newUser, estudiante: e.target.value })}
                className="px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAddUser}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold"
              >
                Agregar Usuario
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Users Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-background">
                <th className="text-left px-4 py-4 font-semibold text-foreground">Nombre</th>
                <th className="text-left px-4 py-4 font-semibold text-foreground">Email</th>
                <th className="text-left px-4 py-4 font-semibold text-foreground">Rol</th>
                <th className="text-left px-4 py-4 font-semibold text-foreground">Asignación</th>
                <th className="text-left px-4 py-4 font-semibold text-foreground">Estado</th>
                <th className="text-left px-4 py-4 font-semibold text-foreground">Fecha Registro</th>
                <th className="text-center px-4 py-4 font-semibold text-foreground">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuariosFiltrados.map(usuario => (
                <tr
                  key={usuario.id}
                  className="border-b border-border hover:bg-background transition-colors"
                >
                  <td className="px-4 py-4 text-foreground">{usuario.nombre}</td>
                  <td className="px-4 py-4 text-muted-foreground text-sm">{usuario.email}</td>
                  <td className="px-4 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleColor(usuario.rol)}`}>
                      {usuario.rol}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-foreground text-sm">{usuario.estudiante}</td>
                  <td className="px-4 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(usuario.estado)}`}>
                      {usuario.estado}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-muted-foreground text-sm">{usuario.fecha}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 hover:bg-muted rounded transition-colors">
                        <Edit2 className="w-4 h-4 text-primary" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(usuario.id)}
                        className="p-2 hover:bg-destructive/20 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {usuariosFiltrados.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">No se encontraron usuarios con los criterios de búsqueda</p>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card p-4 rounded-lg border border-border">
          <p className="text-sm text-muted-foreground mb-1">Total Usuarios</p>
          <p className="text-2xl font-bold text-foreground">{usuarios.length}</p>
        </div>
        <div className="bg-card p-4 rounded-lg border border-border">
          <p className="text-sm text-muted-foreground mb-1">Usuarios Activos</p>
          <p className="text-2xl font-bold text-foreground">{usuarios.filter(u => u.estado === 'Activo').length}</p>
        </div>
        <div className="bg-card p-4 rounded-lg border border-border">
          <p className="text-sm text-muted-foreground mb-1">Docentes</p>
          <p className="text-2xl font-bold text-foreground">{usuarios.filter(u => u.rol === 'Docente').length}</p>
        </div>
      </div>
    </div>
  );
}
