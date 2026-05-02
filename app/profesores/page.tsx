'use client';

import { useState } from 'react';
import { Search, Briefcase, Mail, Phone, Users } from 'lucide-react';

const MOCK_PROFESORES = [
  { id: 'EMP-100', nombre: 'Roberto Fernández', especialidad: 'Matemáticas', contrato: 'Nombramiento', carga: 36, estado: 'activo' },
  { id: 'EMP-101', nombre: 'Lucía Méndez', especialidad: 'Comunicación', contrato: 'Contratado', carga: 24, estado: 'activo' },
  { id: 'EMP-102', nombre: 'Andrés Gómez', especialidad: 'Ciencias Naturales', contrato: 'Nombramiento', carga: 40, estado: 'activo' },
  { id: 'EMP-103', nombre: 'Diana Silva', especialidad: 'Historia y Geografía', contrato: 'Contratado', carga: 30, estado: 'licencia' },
  { id: 'EMP-104', nombre: 'Hugo Reyes', especialidad: 'Educación Física', contrato: 'Nombramiento', carga: 38, estado: 'activo' },
  { id: 'EMP-105', nombre: 'Valeria Pineda', especialidad: 'Inglés', contrato: 'Contratado', carga: 20, estado: 'activo' },
];

export default function ProfesoresPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = MOCK_PROFESORES.filter(prof => 
    prof.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prof.especialidad.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 h-full flex flex-col bg-background">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" />
            Plana Docente
          </h1>
          <p className="text-muted-foreground mt-1">Gestión de profesores, asignaciones y carga horaria.</p>
        </div>
        <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Briefcase className="w-4 h-4" />
          <span>Nuevo Docente</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="mb-6 flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Buscar docente o especialidad..." 
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Grid of Teachers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pb-6">
        {filteredData.map((prof) => (
          <div key={prof.id} className="bg-card rounded-xl border border-border p-6 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
            {prof.estado === 'licencia' && (
              <div className="absolute top-4 right-4 px-2 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded">LICENCIA</div>
            )}
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary text-xl font-bold border border-primary/20 group-hover:scale-105 transition-transform">
                {prof.nombre.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0 pt-1">
                <h3 className="font-semibold text-lg text-foreground truncate">{prof.nombre}</h3>
                <p className="text-sm text-primary font-medium">{prof.especialidad}</p>
                <p className="text-xs text-muted-foreground mt-1">{prof.id}</p>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-border grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Contrato</p>
                <p className="text-sm font-medium">{prof.contrato}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Carga Horaria</p>
                <p className="text-sm font-medium">{prof.carga} hs / sem</p>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-sm font-medium">
                <Mail className="w-4 h-4" />
                Mensaje
              </button>
              <button className="flex items-center justify-center p-2 border border-border rounded-lg hover:bg-accent transition-colors">
                <Phone className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
