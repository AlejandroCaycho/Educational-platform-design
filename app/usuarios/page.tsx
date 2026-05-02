'use client';

import React, { useState } from 'react';
import { Users, Plus, Edit2, Trash2, Search, Mail, Shield, Calendar, LogOut, Users2, GraduationCap, CheckCircle, BookOpen, Heart, Filter, Activity, TrendingUp, ChevronDown, Eye } from 'lucide-react';

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

const ITEMS_PER_PAGE = 8;

export default function UsuariosPage() {
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
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Header unificado h-16 */}
      <div className="h-16 px-8 border-b border-border/50 flex items-center justify-between bg-background flex-shrink-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground leading-tight">Usuarios</h1>
            <p className="text-xs text-muted-foreground font-medium">Gestión de Accesos</p>
          </div>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-md shadow-primary/20 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Usuario</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 min-h-0 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-card rounded-2xl border border-border p-6 hover:border-primary/30 transition-colors flex items-center justify-between shadow-sm">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Total</p>
              <p className="text-2xl font-bold text-foreground">{usuarios.length}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-muted-foreground"><Users className="w-6 h-6" /></div>
          </div>
          <div className="bg-card rounded-2xl border border-border p-6 hover:border-emerald-500/30 transition-colors flex items-center justify-between shadow-sm">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Activos</p>
              <p className="text-2xl font-bold text-emerald-600">{totalActivos}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-emerald-600"><Activity className="w-6 h-6" /></div>
          </div>
          <div className="bg-card rounded-2xl border border-border p-6 hover:border-blue-500/30 transition-colors flex items-center justify-between shadow-sm">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Docentes</p>
              <p className="text-2xl font-bold text-blue-600">{totalDocentes}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-blue-600"><BookOpen className="w-6 h-6" /></div>
          </div>
          <div className="bg-card rounded-2xl border border-border p-6 hover:border-purple-500/30 transition-colors flex items-center justify-between shadow-sm">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Padres</p>
              <p className="text-2xl font-bold text-purple-600">{totalPadres}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-purple-600"><Heart className="w-6 h-6" /></div>
          </div>
        </div>

        {/* Barra de Búsqueda y Filtros */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-card p-4 border border-border rounded-2xl shadow-sm">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Buscar por nombre o email..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-muted/20 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-semibold"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="relative group w-48">
              <select
                value={filtroRol}
                onChange={(e) => {
                  setFiltroRol(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-4 pr-10 py-3 bg-muted/30 border border-border rounded-xl text-sm font-bold text-foreground outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer"
              >
                <option value="todos">Todos los roles</option>
                <option value="Padre">Padres</option>
                <option value="Docente">Docentes</option>
                <option value="Administrador">Admin</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Tabla Usuarios */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted/30 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  <th className="px-6 py-4 border-b border-border">Usuario</th>
                  <th className="px-6 py-4 border-b border-border">Email Institucional</th>
                  <th className="px-6 py-4 border-b border-border text-center">Rol</th>
                  <th className="px-6 py-4 border-b border-border text-center">Estado</th>
                  <th className="px-6 py-4 border-b border-border text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {usuariosActuales.length > 0 ? (
                  usuariosActuales.map((usuario) => (
                    <tr key={usuario.id} className="hover:bg-muted/5 transition-colors group">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center font-bold text-sm text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                            {usuario.nombre.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-foreground leading-tight">{usuario.nombre}</p>
                            <p className="text-xs text-muted-foreground font-medium uppercase tracking-tight">{usuario.estudiante}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm font-semibold text-muted-foreground">{usuario.email}</td>
                      <td className="px-6 py-5 text-center">
                        <span className="px-4 py-1 bg-muted text-muted-foreground text-[10px] font-black uppercase rounded-full border border-border">
                          {usuario.rol}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border 
                          ${usuario.estado === 'Activo' 
                            ? 'bg-emerald-50 text-emerald-600 border-emerald-200' 
                            : 'bg-red-50 text-red-600 border-red-200'}`}>
                          {usuario.estado}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all">
                          <button className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all"><Eye className="w-4 h-4" /></button>
                          <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all"><Edit2 className="w-4 h-4" /></button>
                          <button onClick={() => handleDeleteUser(usuario.id)} className="p-2 text-muted-foreground hover:text-destructive hover:bg-red-50 rounded-lg transition-all"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground font-medium">
                      No se encontraron resultados para tu búsqueda.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Paginación */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-border bg-muted/10 flex items-center justify-between">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                Página {currentPage} de {totalPages}
              </p>
              <div className="flex gap-2">
                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-4 py-2 rounded-xl border border-border text-xs font-bold uppercase tracking-widest disabled:opacity-50 hover:bg-muted transition-all">Anterior</button>
                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-4 py-2 rounded-xl border border-border text-xs font-bold uppercase tracking-widest disabled:opacity-50 hover:bg-muted transition-all">Siguiente</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-card border border-border rounded-2xl p-8 w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
            <h2 className="text-lg font-bold text-foreground mb-6">Nuevo Usuario del Sistema</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1.5 block">Nombre Completo</label>
                <input type="text" placeholder="Ej: Juan Pérez" value={newUser.nombre} onChange={(e) => setNewUser({ ...newUser, nombre: e.target.value })} className="w-full px-4 py-3 bg-muted/20 border border-border rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1.5 block">Email Institucional</label>
                <input type="email" placeholder="usuario@colegio.edu.pe" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} className="w-full px-4 py-3 bg-muted/20 border border-border rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1.5 block">Rol</label>
                  <select value={newUser.rol} onChange={(e) => setNewUser({ ...newUser, rol: e.target.value })} className="w-full px-4 py-3 bg-muted/20 border border-border rounded-xl text-sm font-bold outline-none appearance-none"><option value="Padre">Padre</option><option value="Docente">Docente</option></select>
                </div>
                <div>
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1.5 block">Asignación</label>
                  <input type="text" placeholder="Ej: 5to A" value={newUser.estudiante} onChange={(e) => setNewUser({ ...newUser, estudiante: e.target.value })} className="w-full px-4 py-3 bg-muted/20 border border-border rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
              </div>
            </div>
            <div className="flex gap-4 justify-end mt-8">
              <button onClick={() => setShowModal(false)} className="px-6 py-2.5 bg-muted text-muted-foreground rounded-xl text-xs font-bold uppercase tracking-widest">Cancelar</button>
              <button onClick={handleAddUser} className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-primary/20">Crear Usuario</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
