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
    alert('Reporte descargado: ' + reportType + '.xlsx');
  };

  return (
    <div className="p-6 md:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Reportes</h1>
        <p className="text-muted-foreground">Análisis y seguimiento del desempeño institucional</p>
      </div>

      {/* Filters */}
      <div className="bg-card rounded-lg border border-border p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Tipo de Reporte</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="monthly">Reporte Mensual</option>
              <option value="quarterly">Reporte Trimestral</option>
              <option value="annual">Reporte Anual</option>
              <option value="student">Por Estudiante</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Rango de Fechas</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="april">Abril 2024</option>
              <option value="march">Marzo 2024</option>
              <option value="february">Febrero 2024</option>
              <option value="january">Enero 2024</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleDownload}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              <Download className="w-4 h-4" />
              Descargar Excel
            </button>
          </div>
        </div>
      </div>

      {/* Monthly Report */}
      {reportType === 'monthly' && (
        <div className="space-y-6">
          {/* Asistencia */}
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-lg font-bold text-foreground mb-4">Asistencia Mensual</h3>
            <ResponsiveContainer width="100%" height={300}>
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
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-lg font-bold text-foreground mb-4">Desempeño Académico</h3>
            <ResponsiveContainer width="100%" height={300}>
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
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-lg font-bold text-foreground mb-4">Evolución de Incidencias</h3>
            <ResponsiveContainer width="100%" height={300}>
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
        <div className="bg-card p-6 rounded-lg border border-border overflow-x-auto">
          <h3 className="text-lg font-bold text-foreground mb-4">Desempeño por Estudiante</h3>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 py-3 font-semibold text-foreground">Estudiante</th>
                <th className="text-center px-4 py-3 font-semibold text-foreground">Asistencia</th>
                <th className="text-center px-4 py-3 font-semibold text-foreground">Promedio</th>
                <th className="text-center px-4 py-3 font-semibold text-foreground">Incidencias</th>
              </tr>
            </thead>
            <tbody>
              {studentPerformance.map((student, idx) => (
                <tr key={idx} className="border-b border-border hover:bg-background transition-colors">
                  <td className="px-4 py-3 text-foreground">{student.nombre}</td>
                  <td className="px-4 py-3 text-center text-foreground">{student.asistencia}%</td>
                  <td className="px-4 py-3 text-center text-foreground">{student.promedio}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card p-6 rounded-lg border border-border">
          <p className="text-sm text-muted-foreground mb-2">Asistencia Promedio</p>
          <p className="text-2xl font-bold text-foreground">89.5%</p>
        </div>
        <div className="bg-card p-6 rounded-lg border border-border">
          <p className="text-sm text-muted-foreground mb-2">Desempeño Promedio</p>
          <p className="text-2xl font-bold text-foreground">8.3</p>
        </div>
        <div className="bg-card p-6 rounded-lg border border-border">
          <p className="text-sm text-muted-foreground mb-2">Total Incidencias</p>
          <p className="text-2xl font-bold text-foreground">42</p>
        </div>
      </div>
    </div>
  );
}
