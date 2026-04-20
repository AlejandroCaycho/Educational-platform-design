'use client';

import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, Filter, Calendar } from 'lucide-react';

const monthlyData = [
  { mes: 'Enero', asistencia: 92, desempeño: 8.1, incidencias: 12 },
  { mes: 'Febrero', asistencia: 90, desempeño: 8.3, incidencias: 10 },
  { mes: 'Marzo', asistencia: 91, desempeño: 8.5, incidencias: 8 },
  { mes: 'Abril', asistencia: 89, desempeño: 8.4, incidencias: 6 },
];

const studentPerformance = [
  { nombre: 'Carlos Mendoza', asistencia: 94, promedio: 8.5, incidencias: 2 },
  { nombre: 'María García', asistencia: 88, promedio: 9.2, incidencias: 0 },
  { nombre: 'Juan López', asistencia: 72, promedio: 6.8, incidencias: 5 },
  { nombre: 'Ana Rodríguez', asistencia: 92, promedio: 8.8, incidencias: 1 },
  { nombre: 'Pedro Sánchez', asistencia: 85, promedio: 7.5, incidencias: 3 },
];

export default function Reportes() {
  const [reportType, setReportType] = useState('monthly');
  const [dateRange, setDateRange] = useState('april');

  const handleDownload = () => {
    console.log('Descargando reporte:', reportType);
  };

  return (
    <div className="p-5 md:p-6 space-y-5 max-h-screen overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-1">Reportes</h1>
          <p className="text-sm text-muted-foreground">Análisis del desempeño institucional</p>
        </div>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all text-sm font-medium shadow-sm"
        >
          <Download className="w-4 h-4" />
          Descargar
        </button>
      </div>

      {/* Filters - Compact */}
      <div className="bg-card rounded-xl border border-border/50 p-3 md:p-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">Tipo de Reporte</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-3 py-2 bg-muted border border-border/50 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent transition-all"
            >
              <option value="monthly">Mensual</option>
              <option value="quarterly">Trimestral</option>
              <option value="annual">Anual</option>
              <option value="student">Por Estudiante</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">Rango de Fechas</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-3 py-2 bg-muted border border-border/50 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent transition-all"
            >
              <option value="april">Abril 2026</option>
              <option value="march">Marzo 2026</option>
              <option value="february">Febrero 2026</option>
              <option value="january">Enero 2026</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">Formato</label>
            <select className="w-full px-3 py-2 bg-muted border border-border/50 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent transition-all">
              <option>Excel</option>
              <option>PDF</option>
              <option>CSV</option>
            </select>
          </div>
        </div>
      </div>

      {/* Monthly Report */}
      {reportType === 'monthly' && (
        <div className="space-y-4">
          {/* Asistencia */}
          <div className="bg-card p-4 rounded-xl border border-border/50 shadow-sm">
            <h3 className="text-base font-bold text-foreground mb-3">Asistencia Mensual</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgb(229, 231, 235)" />
                <XAxis dataKey="mes" stroke="rgb(107, 114, 128)" />
                <YAxis stroke="rgb(107, 114, 128)" />
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid rgb(229, 231, 235)', borderRadius: '8px' }} />
                <Legend />
                <Line type="monotone" dataKey="asistencia" stroke="rgb(124, 58, 237)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Desempeño */}
          <div className="bg-card p-4 rounded-xl border border-border/50 shadow-sm">
            <h3 className="text-base font-bold text-foreground mb-3">Desempeño Académico</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgb(229, 231, 235)" />
                <XAxis dataKey="mes" stroke="rgb(107, 114, 128)" />
                <YAxis stroke="rgb(107, 114, 128)" domain={[7, 9]} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid rgb(229, 231, 235)', borderRadius: '8px' }} />
                <Legend />
                <Bar dataKey="desempeño" fill="rgb(6, 182, 212)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Incidencias */}
          <div className="bg-card p-4 rounded-xl border border-border/50 shadow-sm">
            <h3 className="text-base font-bold text-foreground mb-3">Evolución de Incidencias</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgb(229, 231, 235)" />
                <XAxis dataKey="mes" stroke="rgb(107, 114, 128)" />
                <YAxis stroke="rgb(107, 114, 128)" />
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid rgb(229, 231, 235)', borderRadius: '8px' }} />
                <Legend />
                <Line type="monotone" dataKey="incidencias" stroke="rgb(239, 68, 68)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Student Performance */}
      {reportType === 'student' && (
        <div className="bg-card p-4 rounded-xl border border-border/50 overflow-x-auto shadow-sm">
          <h3 className="text-base font-bold text-foreground mb-3">Desempeño por Estudiante</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left px-3 py-2 font-semibold text-foreground text-xs">Estudiante</th>
                <th className="text-center px-3 py-2 font-semibold text-foreground text-xs">Asistencia</th>
                <th className="text-center px-3 py-2 font-semibold text-foreground text-xs">Promedio</th>
                <th className="text-center px-3 py-2 font-semibold text-foreground text-xs">Incidencias</th>
              </tr>
            </thead>
            <tbody>
              {studentPerformance.map((student, idx) => (
                <tr key={idx} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                  <td className="px-3 py-2 text-foreground text-sm">{student.nombre}</td>
                  <td className="px-3 py-2 text-center text-foreground">{student.asistencia}%</td>
                  <td className="px-3 py-2 text-center text-foreground">{student.promedio}</td>
                  <td className="px-3 py-2 text-center">
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                      student.incidencias === 0
                        ? 'bg-green-100 text-green-700'
                        : student.incidencias <= 2
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {student.incidencias}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-card p-4 rounded-xl border border-border/50 shadow-sm">
          <p className="text-xs text-muted-foreground mb-1.5 font-medium">Asistencia Promedio</p>
          <p className="text-2xl font-bold text-foreground">89.5%</p>
        </div>
        <div className="bg-card p-4 rounded-xl border border-border/50 shadow-sm">
          <p className="text-xs text-muted-foreground mb-1.5 font-medium">Desempeño Promedio</p>
          <p className="text-2xl font-bold text-foreground">8.3</p>
        </div>
        <div className="bg-card p-4 rounded-xl border border-border/50 shadow-sm">
          <p className="text-xs text-muted-foreground mb-1.5 font-medium">Total Incidencias</p>
          <p className="text-2xl font-bold text-foreground">42</p>
        </div>
      </div>
    </div>
  );
}
