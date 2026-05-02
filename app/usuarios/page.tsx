'use client';

import React, { useState } from 'react';
import { Users, Plus, Edit2, Trash2, Search, Mail, Shield, Calendar, LogOut, Users2, GraduationCap, CheckCircle, BookOpen, Heart, Filter, Activity, TrendingUp, ChevronDown } from 'lucide-react';

const usuariosData = [
  { id: 1, nombre: 'Ana García', email: 'ana.garcia@mail.com', rol: 'Docente', estudiante: '5to Primaria A', estado: 'Activo', fecha: '2024-01-15' },
  { id: 2, nombre: 'Carlos López', email: 'carlos.lopez@mail.com', rol: 'Padre', estudiante: 'Familia López', estado: 'Activo', fecha: '2024-02-10' },
  { id: 3, nombre: 'María Fernández', email: 'maria.fer@mail.com', rol: 'Docente', estudiante: '6to Primaria B', estado: 'Activo', fecha: '2024-03-05' },
  { id: 4, nombre: 'Juan Pérez', email: 'juan.perez@mail.com', rol: 'Administrador', estudiante: 'Sistema', estado: 'Activo', fecha: '2024-01-01' },
  { id: 5, nombre: 'Patricia Ruiz', email: 'patricia.ruiz@mail.com', rol: 'Padre', estudiante: 'Familia Ruiz', estado: 'Inactivo', fecha: '2024-04-20' },
  { id: 6, nombre: 'Diego Morales', email: 'diego.morales@mail.com', rol: 'Docente', estudiante: '4to Primaria C', estado: 'Activo', fecha: '2024-02-14' },
  { id: 7, nombre: 'Laura Sánchez', email: 'laura.sanchez@mail.com', rol: 'Padre', estudiante: 'Familia Sánchez', estado: 'Activo', fecha: '2024-03-22' },
  { id: 8, nombre: 'Fernando Gómez', email: 'fernando.gomez@mail.com', rol: 'Docente', estudiante: '3ro Primaria A', estado: 'Activo', fecha: '2024-05-10' },
  { id: 9, nombre: 'Sofía Dominguez', email: 'sofia.dominguez@mail.com', rol: 'Padre', estudiante: 'Familia Dominguez', estado: 'Activo', fecha: '2024-05-15' },
];

const RoleIcon = ({ rol }: { rol: string }) => {
  const icons = {
    'Docente': <BookOpen className="w-4 h-4 text-blue-600" />,
    'Padre': <Heart className="w-4 h-4 text-purple-600" />,
    'Administrador': <Shield className="w-4 h-4 text-gray-600" />,
  };
  return icons[rol as keyof typeof icons] || <Users className="w-4 h-4 text-gray-600" />;
};

const getStatusBadge = (estado: string) => {
  const badges = {
    'Activo': 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-800',
    'Inactivo': 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-800',
  };
  return badges[estado as keyof typeof badges] || 'bg-gray-50 text-gray-700 border-gray-200';
};

const ITEMS_PER_PAGE = 5;

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState(usuariosData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroRol, setFiltroRol] = useState('todos');
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [newUser, setNewUser] = useState({
    nombre: '',
    email: '',
    rol: 'Padre',
    estudiante: '',
  });

  const totalActivos = usuarios.filter(u => u.estado === 'Activo').length;
  const totalDocentes = usuarios.filter(u => u.rol === 'Docente').length;
  const totalPadres = usuarios.filter(u => u.rol === 'Padre').length;

  const handleAddUser = () => {
    if (newUser.nombre && newUser.email) {
      setUsuarios([
        ...usuarios,
        {
          id: usuarios.length + 1,
          ...newUser,
          estado: 'Activo',
          fecha: new Date().toISOString().split('T')[0],
        },
      ]);
      setShowModal(false);
      setNewUser({ nombre: '', email: '', rol: 'Padre', estudiante: '' });
    }
  };

  const handleDeleteUser = (id: number) => {
    setUsuarios(usuarios.filter(u => u.id !== id));
  };

  const usuariosFiltrados = usuarios.filter(u => {
    const matchesSearch = u.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRol = filtroRol === 'todos' || u.rol === filtroRol;
    return matchesSearch && matchesRol;
  });

  const totalPages = Math.ceil(usuariosFiltrados.length / ITEMS_PER_PAGE);
  const usuariosActuales = usuariosFiltrados.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header - Same height as sidebar header */}
      <div className="px-8 py-4 border-b border-border/30 flex items-center justify-between bg-card/50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/20 rounded-lg">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">Gestión de Usuarios</h1>
            <p className="text-xs text-muted-foreground">Administra todos los usuarios</p>
          </div>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 active:scale-95 transition-all font-semibold text-sm"
        >
          <Plus className="w-4 h-4" />
          Nuevo Usuario
        </button>
      </div>

      {/* Content - Fits in remaining viewport height */}
      <div className="flex-1 overflow-hidden flex flex-col px-8 py-6">
        <div className="space-y-5 flex-1 flex flex-col overflow-hidden">
          {/* Stats Grid - Compact */}
          <div className="grid grid-cols-4 gap-4 flex-shrink-0">
            <div className="group relative bg-card border border-border/40 rounded-xl p-4 hover:border-primary/40 hover:shadow-md transition-all cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-0.5">Total Usuarios</p>
                    <p className="text-2xl font-bold text-foreground">{usuarios.length}</p>
                  </div>
                  <div className="p-2 bg-primary/12 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative bg-card border border-border/40 rounded-xl p-4 hover:border-emerald-500/40 hover:shadow-md transition-all cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-0.5">Activos</p>
                    <p className="text-2xl font-bold text-foreground">{totalActivos}</p>
                  </div>
                  <div className="p-2 bg-emerald-500/12 rounded-lg group-hover:bg-emerald-500/20 transition-colors">
                    <Activity className="w-5 h-5 text-emerald-600" />
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative bg-card border border-border/40 rounded-xl p-4 hover:border-blue-500/40 hover:shadow-md transition-all cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-0.5">Docentes</p>
                    <p className="text-2xl font-bold text-foreground">{totalDocentes}</p>
                  </div>
                  <div className="p-2 bg-blue-500/12 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative bg-card border border-border/40 rounded-xl p-4 hover:border-purple-500/40 hover:shadow-md transition-all cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-0.5">Padres</p>
                    <p className="text-2xl font-bold text-foreground">{totalPadres}</p>
                  </div>
                  <div className="p-2 bg-purple-500/12 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                    <Heart className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search & Filters - Compact */}
          <div className="bg-card border border-border/40 rounded-xl p-4 flex-shrink-0">
            <div className="flex gap-3">
              <div className="flex-1 relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  placeholder="Buscar por nombre o email..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-3 py-2.5 bg-background border border-border/30 rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all"
                />
              </div>

              <div className="relative group w-40">
                <select
                  value={filtroRol}
                  onChange={(e) => {
                    setFiltroRol(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-3 py-2.5 bg-background border border-border/30 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all appearance-none cursor-pointer"
                >
                  <option value="todos">Todos los roles</option>
                  <option value="Padre">Padres</option>
                  <option value="Docente">Docentes</option>
                  <option value="Administrador">Administradores</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Users Table - Compact with Pagination */}
          <div className="bg-card border border-border/40 rounded-xl overflow-hidden flex flex-col flex-1 min-h-0">
            {/* Table Header */}
            <div className="px-5 py-3 bg-background/50 border-b border-border/20 flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wide flex-shrink-0">
              <div className="flex-1">Usuario</div>
              <div className="w-40">Email</div>
              <div className="w-24">Rol</div>
              <div className="w-28">Asignación</div>
              <div className="w-20 text-center">Estado</div>
              <div className="w-20 text-right">Acciones</div>
            </div>

            {/* Table Body */}
            <div className="overflow-y-auto flex-1">
              {usuariosActuales.length > 0 ? (
                <div className="divide-y divide-border/10">
                  {usuariosActuales.map((usuario) => (
                    <div
                      key={usuario.id}
                      className="px-5 py-3 hover:bg-primary/3 transition-colors group border-l-4 border-l-transparent hover:border-l-primary flex items-center justify-between"
                    >
                      {/* Usuario */}
                      <div className="flex-1 flex items-center gap-2">
                        <div className="p-1.5 bg-primary/12 rounded-lg flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                          <RoleIcon rol={usuario.rol} />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-foreground text-sm">{usuario.nombre}</p>
                          <p className="text-xs text-muted-foreground/60">{usuario.fecha}</p>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="w-40 text-sm text-muted-foreground truncate flex items-center gap-1.5">
                        <Mail className="w-3 h-3 flex-shrink-0 text-primary/60" />
                        <span className="truncate">{usuario.email}</span>
                      </div>

                      {/* Rol */}
                      <div className="w-24">
                        <span className="px-2.5 py-1 bg-primary/12 text-primary text-xs font-semibold rounded-full whitespace-nowrap">
                          {usuario.rol}
                        </span>
                      </div>

                      {/* Asignación */}
                      <div className="w-28">
                        <p className="text-sm font-medium text-foreground truncate">{usuario.estudiante}</p>
                      </div>

                      {/* Estado */}
                      <div className="w-20 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${getStatusBadge(usuario.estado)}`}>
                          {usuario.estado}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="w-20 flex items-center gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 hover:bg-primary/15 rounded-lg transition-all text-primary hover:scale-110" title="Editar">
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(usuario.id)}
                          className="p-1.5 hover:bg-red-500/15 rounded-lg transition-all text-red-600 hover:scale-110"
                          title="Eliminar"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <Users className="w-12 h-12 text-muted-foreground/20 mx-auto mb-3" />
                    <p className="text-muted-foreground/60 font-medium text-sm">No se encontraron usuarios</p>
                    <p className="text-muted-foreground/40 text-xs mt-1">Ajusta tus filtros o agrega nuevos</p>
                  </div>
                </div>
              )}
            </div>

            {/* Pagination */}
            {usuariosFiltrados.length > 0 && (
              <div className="px-5 py-3 border-t border-border/20 bg-background/50 flex items-center justify-between text-sm flex-shrink-0">
                <div className="text-muted-foreground text-xs">
                  Mostrando {((currentPage - 1) * ITEMS_PER_PAGE) + 1} a {Math.min(currentPage * ITEMS_PER_PAGE, usuariosFiltrados.length)} de {usuariosFiltrados.length}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 rounded-lg border border-border/30 text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-background hover:border-primary/30"
                  >
                    Anterior
                  </button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-2.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                          currentPage === page
                            ? 'bg-primary text-primary-foreground'
                            : 'border border-border/30 hover:bg-background hover:border-primary/30'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 rounded-lg border border-border/30 text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-background hover:border-primary/30"
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Agregar Usuario */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-card border border-border/40 rounded-xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-lg font-bold text-foreground mb-4">Nuevo Usuario</h2>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-foreground block mb-1.5">Nombre</label>
                <input
                  type="text"
                  placeholder="Ej: Juan Pérez García"
                  value={newUser.nombre}
                  onChange={(e) => setNewUser({ ...newUser, nombre: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border/30 rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground block mb-1.5">Email</label>
                <input
                  type="email"
                  placeholder="usuario@example.com"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border/30 rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground block mb-1.5">Rol</label>
                <div className="relative">
                  <select
                    value={newUser.rol}
                    onChange={(e) => setNewUser({ ...newUser, rol: e.target.value })}
                    className="w-full px-3 py-2 bg-background border border-border/30 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all appearance-none cursor-pointer"
                  >
                    <option value="Padre">Padre/Madre</option>
                    <option value="Docente">Docente</option>
                    <option value="Administrador">Administrador</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground block mb-1.5">Asignación</label>
                <input
                  type="text"
                  placeholder="Ej: 5to Primaria A"
                  value={newUser.estudiante}
                  onChange={(e) => setNewUser({ ...newUser, estudiante: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border/30 rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all"
                />
              </div>
            </div>

            <div className="flex gap-2 justify-end mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-muted/50 text-foreground rounded-lg hover:bg-muted transition-colors font-semibold text-sm border border-border/30"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddUser}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all font-semibold text-sm"
              >
                Crear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
