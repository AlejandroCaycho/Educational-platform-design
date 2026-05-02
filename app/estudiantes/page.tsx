'use client';

import { useState } from 'react';
import { Search, Filter, MoreVertical, UserPlus, Eye, Edit, Trash2, GraduationCap, CheckCircle, XCircle } from 'lucide-react';

const MOCK_ESTUDIANTES = [
  { id: 'EST-001', nombre: 'Carlos Ruiz', grado: '3ro A', promedio: 16.5, estado: 'activo', tutor: 'María López' },
  { id: 'EST-002', nombre: 'Ana Soto', grado: '3ro A', promedio: 14.0, estado: 'activo', tutor: 'Juan Soto' },
  { id: 'EST-003', nombre: 'Luis Medina', grado: '4to B', promedio: 18.2, estado: 'activo', tutor: 'Carmen Medina' },
  { id: 'EST-004', nombre: 'Sofía Castro', grado: '1ro C', promedio: 11.5, estado: 'en_riesgo', tutor: 'Pedro Castro' },
  { id: 'EST-005', nombre: 'Diego Torres', grado: '5to A', promedio: 15.8, estado: 'activo', tutor: 'Elena Torres' },
  { id: 'EST-006', nombre: 'Valentina Díaz', grado: '2do B', promedio: 19.1, estado: 'activo', tutor: 'Ricardo Díaz' },
  { id: 'EST-007', nombre: 'Mateo Vargas', grado: '3ro A', promedio: 9.5, estado: 'inactivo', tutor: 'Laura Vargas' },
];

export default function EstudiantesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = MOCK_ESTUDIANTES.filter(est => 
    est.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    est.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 h-full flex flex-col bg-background">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-primary" />
            Directorio de Estudiantes
          </h1>
          <p className="text-muted-foreground mt-1">Gestiona los alumnos matriculados en la institución.</p>
        </div>
        <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <UserPlus className="w-4 h-4" />
          <span>Nuevo Estudiante</span>
        </button>
      </div>

      <div className="bg-card rounded-xl border border-border shadow-sm flex-1 flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 justify-between items-center bg-muted/20">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Buscar por nombre o ID..." 
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-accent text-foreground text-sm transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filtros</span>
          </button>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50 sticky top-0">
              <tr>
                <th className="px-6 py-4 font-medium">ID Estudiante</th>
                <th className="px-6 py-4 font-medium">Nombre Completo</th>
                <th className="px-6 py-4 font-medium">Grado y Sección</th>
                <th className="px-6 py-4 font-medium">Promedio</th>
                <th className="px-6 py-4 font-medium">Tutor / Apoderado</th>
                <th className="px-6 py-4 font-medium">Estado</th>
                <th className="px-6 py-4 font-medium text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredData.map((est) => (
                <tr key={est.id} className="hover:bg-accent/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{est.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                        {est.nombre.charAt(0)}
                      </div>
                      <span className="font-medium">{est.nombre}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-secondary text-secondary-foreground px-2.5 py-1 rounded-md text-xs font-medium">
                      {est.grado}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-semibold ${est.promedio >= 13 ? 'text-green-600' : 'text-red-500'}`}>
                      {est.promedio.toFixed(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{est.tutor}</td>
                  <td className="px-6 py-4">
                    {est.estado === 'activo' && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700"><CheckCircle className="w-3.5 h-3.5" /> Activo</span>}
                    {est.estado === 'inactivo' && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"><XCircle className="w-3.5 h-3.5" /> Inactivo</span>}
                    {est.estado === 'en_riesgo' && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700"><XCircle className="w-3.5 h-3.5" /> En Riesgo</span>}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors" title="Ver Perfil">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-muted-foreground hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Editar">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-muted-foreground hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Eliminar">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-muted-foreground">
                    No se encontraron estudiantes que coincidan con la búsqueda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
