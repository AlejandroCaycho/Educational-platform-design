'use client';

import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';
import { Download, Filter, Calendar, TrendingUp } from 'lucide-react';

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

const subjectPerformance = [
  { name: 'Matemáticas', value: 8.2 },
  { name: 'Lenguaje', value: 8.5 },
  { name: 'Ciencias', value: 8.1 },
  { name: 'Historia', value: 8.8 },
];

const incidentsData = [
  { name: 'Conducta', value: 45, color: '#ef4444' },
  { name: 'Asistencia', value: 30, color: '#f97316' },
  { name: 'Académico', value: 15, color: '#eab308' },
  { name: 'Otros', value: 10, color: '#8b5cf6' },
];

const performanceTrend = [
  { mes: 'Enero', matematicas: 7.8, lenguaje: 8.1, ciencias: 7.9 },
  { mes: 'Febrero', matematicas: 8.0, lenguaje: 8.3, ciencias: 8.0 },
  { mes: 'Marzo', matematicas: 8.2, lenguaje: 8.5, ciencias: 8.1 },
  { mes: 'Abril', matematicas: 8.2, lenguaje: 8.5, ciencias: 8.3 },
];

export default function Reportes() {
  const [reportType, setReportType] = useState('monthly');
  const [dateRange, setDateRange] = useState('april');

  const handleDownload = () => {
    console.log('Descargando reporte:', reportType);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="px-5 md:px-6 py-4 border-b border-border/30 flex items-center justify-between flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reportes</h1>
          <p className="text-xs text-muted-foreground">Análisis del desempeño institucional</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all text-sm font-medium shadow-sm"
          >
            <Download className="w-4 h-4" />
            Descargar
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Filters - Compact */}
        <div className="px-5 md:px-6 py-3 border-b border-border/20 flex-shrink-0">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">Tipo</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-muted/50 border border-border/30 rounded-lg text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent transition-all"
              >
                <option value="monthly">Mensual</option>
                <option value="quarterly">Trimestral</option>
                <option value="student">Por Estudiante</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">Período</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-muted/50 border border-border/30 rounded-lg text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent transition-all"
              >
                <option value="april">Abril 2026</option>
                <option value="march">Marzo 2026</option>
                <option value="february">Febrero 2026</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">Formato</label>
              <select className="w-full px-2.5 py-1.5 bg-muted/50 border border-border/30 rounded-lg text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent transition-all">
                <option>Excel</option>
                <option>PDF</option>
                <option>CSV</option>
              </select>
            </div>

            <div className="flex items-end">
              <button className="w-full px-2.5 py-1.5 bg-muted/50 border border-border/30 rounded-lg text-xs text-foreground hover:bg-muted transition-all flex items-center justify-center gap-1.5">
                <Filter className="w-3 h-3" />
                Filtrar
              </button>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="flex-1 overflow-y-auto p-5 md:p-6">
          {reportType === 'monthly' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 auto-rows-max">
              {/* Tendencia de Desempeño - Area Chart */}
              <div className="lg:col-span-2 bg-gradient-to-br from-card to-card/80 rounded-2xl border border-border/50 p-4 shadow-sm">
                <h3 className="text-sm font-bold text-foreground mb-3">Tendencia de Desempeño por Materia</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={performanceTrend}>
                    <defs>
                      <linearGradient id="colorMat" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorLen" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorCien" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgb(229, 231, 235)" />
                    <XAxis dataKey="mes" stroke="rgb(107, 114, 128)" style={{ fontSize: '12px' }} />
                    <YAxis stroke="rgb(107, 114, 128)" style={{ fontSize: '12px' }} />
                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid rgb(229, 231, 235)', borderRadius: '8px', fontSize: '12px' }} />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                    <Area type="monotone" dataKey="matematicas" stroke="#3b82f6" fillOpacity={1} fill="url(#colorMat)" name="Matemáticas" />
                    <Area type="monotone" dataKey="lenguaje" stroke="#10b981" fillOpacity={1} fill="url(#colorLen)" name="Lenguaje" />
                    <Area type="monotone" dataKey="ciencias" stroke="#f59e0b" fillOpacity={1} fill="url(#colorCien)" name="Ciencias" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Asistencia - Line Chart */}
              <div className="bg-gradient-to-br from-card to-card/80 rounded-2xl border border-border/50 p-4 shadow-sm">
                <h3 className="text-sm font-bold text-foreground mb-3">Asistencia Mensual</h3>
                <ResponsiveContainer width="100%" height={160}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgb(229, 231, 235)" />
                    <XAxis dataKey="mes" stroke="rgb(107, 114, 128)" style={{ fontSize: '11px' }} />
                    <YAxis stroke="rgb(107, 114, 128)" style={{ fontSize: '11px' }} />
                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid rgb(229, 231, 235)', borderRadius: '8px', fontSize: '11px' }} />
                    <Line type="monotone" dataKey="asistencia" stroke="#7c3aed" strokeWidth={2} dot={{ fill: '#7c3aed', r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Desempeño - Bar Chart */}
              <div className="bg-gradient-to-br from-card to-card/80 rounded-2xl border border-border/50 p-4 shadow-sm">
                <h3 className="text-sm font-bold text-foreground mb-3">Desempeño Académico</h3>
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgb(229, 231, 235)" />
                    <XAxis dataKey="mes" stroke="rgb(107, 114, 128)" style={{ fontSize: '11px' }} />
                    <YAxis stroke="rgb(107, 114, 128)" style={{ fontSize: '11px' }} domain={[7, 9]} />
                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid rgb(229, 231, 235)', borderRadius: '8px', fontSize: '11px' }} />
                    <Bar dataKey="desempeño" fill="#06b6d4" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Desempeño por Materia - Pie Chart */}
              <div className="bg-gradient-to-br from-card to-card/80 rounded-2xl border border-border/50 p-4 shadow-sm">
                <h3 className="text-sm font-bold text-foreground mb-3">Promedio por Materia</h3>
                <ResponsiveContainer width="100%" height={160}>
                  <PieChart>
                    <Pie
                      data={subjectPerformance}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      <Cell fill="#3b82f6" />
                      <Cell fill="#10b981" />
                      <Cell fill="#f59e0b" />
                      <Cell fill="#8b5cf6" />
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid rgb(229, 231, 235)', borderRadius: '8px', fontSize: '11px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Incidencias - Pie Chart */}
              <div className="bg-gradient-to-br from-card to-card/80 rounded-2xl border border-border/50 p-4 shadow-sm">
                <h3 className="text-sm font-bold text-foreground mb-3">Distribución de Incidencias</h3>
                <ResponsiveContainer width="100%" height={160}>
                  <PieChart>
                    <Pie
                      data={incidentsData}
                      cx="50%"
                      cy="50%"
                      innerRadius={35}
                      outerRadius={55}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {incidentsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid rgb(229, 231, 235)', borderRadius: '8px', fontSize: '11px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Stats Cards */}
              <div className="lg:col-span-2 grid grid-cols-3 gap-3">
                <div className="bg-gradient-to-br from-blue-500/10 to-blue-400/5 rounded-xl border border-blue-200/30 p-3">
                  <p className="text-xs text-muted-foreground/70 font-medium mb-1">Asistencia Promedio</p>
                  <p className="text-2xl font-bold text-foreground">89.5%</p>
                  <p className="text-xs text-green-600 mt-1">↑ 2% vs mes anterior</p>
                </div>
                <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-400/5 rounded-xl border border-cyan-200/30 p-3">
                  <p className="text-xs text-muted-foreground/70 font-medium mb-1">Desempeño Promedio</p>
                  <p className="text-2xl font-bold text-foreground">8.3</p>
                  <p className="text-xs text-green-600 mt-1">↑ 0.2 vs mes anterior</p>
                </div>
                <div className="bg-gradient-to-br from-red-500/10 to-red-400/5 rounded-xl border border-red-200/30 p-3">
                  <p className="text-xs text-muted-foreground/70 font-medium mb-1">Total Incidencias</p>
                  <p className="text-2xl font-bold text-foreground">42</p>
                  <p className="text-xs text-red-600 mt-1">↓ 5 vs mes anterior</p>
                </div>
              </div>
            </div>
          )}

          {reportType === 'student' && (
            <div className="bg-gradient-to-br from-card to-card/80 rounded-2xl border border-border/50 p-4 shadow-sm h-fit">
              <h3 className="text-sm font-bold text-foreground mb-3">Desempeño por Estudiante</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-border/30">
                      <th className="text-left px-3 py-2 font-semibold text-foreground">Estudiante</th>
                      <th className="text-center px-3 py-2 font-semibold text-foreground">Asistencia</th>
                      <th className="text-center px-3 py-2 font-semibold text-foreground">Promedio</th>
                      <th className="text-center px-3 py-2 font-semibold text-foreground">Incidencias</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentPerformance.map((student, idx) => (
                      <tr key={idx} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                        <td className="px-3 py-2 text-foreground">{student.nombre}</td>
                        <td className="px-3 py-2 text-center text-foreground">{student.asistencia}%</td>
                        <td className="px-3 py-2 text-center text-foreground font-medium">{student.promedio}</td>
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
