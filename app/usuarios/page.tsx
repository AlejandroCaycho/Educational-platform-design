'use client';

import React, { useState } from 'react';
import { Users, Plus, Edit2, Trash2, Search, Mail, Shield, Calendar, LogOut, Users2, GraduationCap, CheckCircle, BookOpen, Heart, Filter } from 'lucide-react';

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
      {/* Header Premium */}
      <div className="px-8 py-6 border-b border-border/40 flex items-center justify-between bg-card/50">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestión de Usuarios</h1>
          <p className="text-sm text-muted-foreground mt-1">Administra y monitorea todos los usuarios de la plataforma EduNova</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 active:scale-95 transition-all font-semibold text-sm shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Nuevo Usuario
        </button>
      </div>

      {/* Content - Modern Premium Design */}
      <div className="flex-1 overflow-hidden px-8 py-8 flex flex-col gap-8">
        {/* Stats: Premium Cards with Icons */}
        <div className="grid grid-cols-4 gap-5">
          {/* Total Usuarios */}
          <div className="group relative bg-card border border-border/50 rounded-xl p-6 hover:border-primary/50 hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold text-muted-foreground">Total Usuarios</p>
                <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Users className="w-5 h-5 text-primary" />
                </div>
              </div>
              <p className="text-4xl font-bold text-foreground mb-1">{usuarios.length}</p>
              <p className="text-xs text-muted-foreground">En el sistema</p>
            </div>
          </div>

          {/* Activos */}
          <div className="group relative bg-card border border-border/50 rounded-xl p-6 hover:border-green-500/50 hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold text-muted-foreground">Activos</p>
                <div className="p-3 bg-green-500/10 rounded-lg group-hover:bg-green-500/20 transition-colors">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
              </div>
              <p className="text-4xl font-bold text-foreground mb-1">{totalActivos}</p>
              <p className="text-xs text-green-600 font-semibold">{Math.round((totalActivos/usuarios.length)*100)}% del total</p>
            </div>
          </div>

          {/* Docentes */}
          <div className="group relative bg-card border border-border/50 rounded-xl p-6 hover:border-blue-500/50 hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold text-muted-foreground">Docentes</p>
                <div className="p-3 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                  <BookOpen className="w-5 h-5 text-blue-500" />
                </div>
              </div>
              <p className="text-4xl font-bold text-foreground mb-1">{totalDocentes}</p>
              <p className="text-xs text-muted-foreground">Registrados</p>
            </div>
          </div>

          {/* Padres */}
          <div className="group relative bg-card border border-border/50 rounded-xl p-6 hover:border-purple-500/50 hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold text-muted-foreground">Padres</p>
                <div className="p-3 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                  <Heart className="w-5 h-5 text-purple-500" />
                </div>
              </div>
              <p className="text-4xl font-bold text-foreground mb-1">{totalPadres}</p>
              <p className="text-xs text-muted-foreground">En plataforma</p>
            </div>
          </div>
        </div>

        {/* Advanced Filters */}
        <div className="bg-card border border-border/50 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Filter className="w-5 h-5 text-primary" />
            Búsqueda y Filtros Avanzados
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Buscar por nombre, email o ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-background border border-border/40 rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all"
              />
            </div>

            <select
              value={filtroRol}
              onChange={(e) => setFiltroRol(e.target.value)}
              className="px-4 py-3 bg-background border border-border/40 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem center',
                paddingRight: '2.5rem'
              }}
            >
              <option value="todos">Todos los roles</option>
              <option value="Padre">Padres</option>
              <option value="Docente">Docentes</option>
              <option value="Administrador">Administradores</option>
            </select>
          </div>
        </div>

        {/* Users List - Modern Table */}
        <div className="flex-1 overflow-hidden bg-card border border-border/50 rounded-xl flex flex-col">
          {/* Table Header */}
          <div className="px-6 py-4 border-b border-border/30 bg-background/30 flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            <div className="flex-1">Usuario</div>
            <div className="w-48">Email</div>
            <div className="w-28">Rol</div>
            <div className="w-32">Asignación</div>
            <div className="w-24 text-center">Estado</div>
            <div className="w-20 text-right">Acciones</div>
          </div>

          {/* Table Body */}
          <div className="overflow-y-auto flex-1">
            {usuariosFiltrados.length > 0 ? (
              <div className="divide-y divide-border/20">
                {usuariosFiltrados.map((usuario, idx) => (
                  <div
                    key={usuario.id}
                    className="px-6 py-4 hover:bg-background/30 transition-colors group border-l-4 border-l-transparent hover:border-l-primary flex items-center justify-between"
                  >
                    {/* Usuario */}
                    <div className="flex-1 flex items-center gap-3">
                      <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                        <RoleIcon rol={usuario.rol} />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-foreground text-sm">{usuario.nombre}</p>
                        <p className="text-xs text-muted-foreground/60 mt-0.5">{usuario.fecha}</p>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="w-48 text-sm text-muted-foreground flex items-center gap-1.5 truncate">
                      <Mail className="w-3.5 h-3.5 flex-shrink-0 text-primary/60" />
                      <span className="truncate">{usuario.email}</span>
                    </div>

                    {/* Rol */}
                    <div className="w-28">
                      <span className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-semibold rounded-full whitespace-nowrap">
                        {usuario.rol}
                      </span>
                    </div>

                    {/* Asignación */}
                    <div className="w-32">
                      <p className="text-sm font-medium text-foreground">{usuario.estudiante}</p>
                    </div>

                    {/* Estado */}
                    <div className="w-24 text-center">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusBadge(usuario.estado)}`}>
                        {usuario.estado}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="w-20 flex items-center gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-primary/10 rounded-lg transition-all text-primary hover:scale-110" title="Editar">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-muted rounded-lg transition-all text-muted-foreground hover:text-foreground hover:scale-110" title="Logout">
                        <LogOut className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(usuario.id)}
                        className="p-2 hover:bg-destructive/10 rounded-lg transition-all text-destructive/70 hover:text-destructive hover:scale-110"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <Users className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
                  <p className="text-muted-foreground/60 text-base font-medium">No se encontraron usuarios</p>
                  <p className="text-muted-foreground/40 text-sm mt-1">Intenta con otros criterios de búsqueda o agrega nuevos usuarios</p>
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
