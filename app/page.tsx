'use client';

import { useEffect, useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, FileText, AlertCircle, MessageSquare, Clock, CheckCircle, X } from 'lucide-react';

const attendanceData = [
  { date: 'Lun', presente: 92, ausente: 8 },
  { date: 'Mar', presente: 88, ausente: 12 },
  { date: 'Mié', presente: 94, ausente: 6 },
  { date: 'Jue', presente: 91, ausente: 9 },
  { date: 'Vie', presente: 95, ausente: 5 },
];

const performanceData = [
  { name: 'Matemática', value: 8.4 },
  { name: 'Lengua', value: 8.9 },
  { name: 'Ciencias', value: 8.6 },
  { name: 'Historia', value: 7.8 },
];

const incidentsData = [
  { name: 'Comportamiento', value: 35 },
  { name: 'Tareas', value: 28 },
  { name: 'Uniforme', value: 20 },
  { name: 'Tardanza', value: 17 },
];

const COLORS = ['#5048ff', '#10b981', '#06b6d4', '#f59e0b'];

function StatCard({ icon: Icon, label, value, color = 'primary' }) {
  const bgColor = {
    primary: 'bg-primary/10 text-primary',
    green: 'bg-green-50 text-green-600',
    blue: 'bg-blue-50 text-blue-600',
    amber: 'bg-amber-50 text-amber-600',
  }[color];

  return (
    <div className="bg-card rounded-lg border border-border p-6 hover:border-primary/30 transition-colors">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-muted-foreground text-sm mb-1">{label}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-lg ${bgColor} flex items-center justify-center`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(false);
  const [isHiding, setIsHiding] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Solo mostrar la notificación si es la primera vez que entra a esta sesión
    const hasShownWelcome = sessionStorage.getItem('hasShownWelcome');
    
    if (!hasShownWelcome) {
      // Obtener el email del usuario y extraer el nombre
      const userEmail = sessionStorage.getItem('userEmail') || 'Usuario';
      const name = userEmail.split('@')[0].charAt(0).toUpperCase() + userEmail.split('@')[0].slice(1);
      setUserName(name);
      setShowWelcome(true);
      sessionStorage.setItem('hasShownWelcome', 'true');
      
      // Auto-desaparecer después de 3 segundos
      setTimeout(() => {
        setIsHiding(true);
      }, 3000);
      
      // Completar la desaparición después de la animación
      setTimeout(() => {
        setShowWelcome(false);
        setIsHiding(false);
      }, 3300); // 3000 + 300ms de animación
    }
  }, []);

  return (
    <div className={`p-5 md:p-6 space-y-6 flex flex-col ${!showWelcome ? 'h-screen' : ''}`}>
      {/* Welcome Notification */}
      {showWelcome && (
        <div className={`transition-all duration-300 overflow-hidden ${isHiding ? 'opacity-0 -translate-y-full h-0' : 'opacity-100 translate-y-0 mb-6'}`}>
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-4 text-white flex items-center justify-between shadow-lg">
            <div>
              <h2 className="font-semibold text-lg">¡Bienvenido, {userName}!</h2>
              <p className="text-sm text-white/90">Aquí está tu resumen de actividad de esta semana.</p>
            </div>
            <button
              onClick={() => {
                setIsHiding(true);
                setTimeout(() => {
                  setShowWelcome(false);
                  setIsHiding(false);
                }, 300);
              }}
              className="ml-4 p-1 hover:bg-white/20 rounded transition-colors flex-shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-300`}>
        <StatCard icon={Users} label="Estudiantes" value="245" color="primary" />
        <StatCard icon={CheckCircle} label="Asistencia Promedio" value="92%" color="green" />
        <StatCard icon={TrendingUp} label="Desempeño Promedio" value="8.4" color="blue" />
        <StatCard icon={AlertCircle} label="En Riesgo" value="12" color="amber" />
      </div>

      {/* Charts Section - Modern Graphs - 2 Arriba */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Chart */}
        <div className="bg-gradient-to-br from-card to-card/80 rounded-2xl border border-border/50 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg font-semibold text-foreground">Asistencia Semanal</h3>
            <div className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Gráfico de barras</div>
          </div>
          <ResponsiveContainer width="100%" height={showWelcome ? 220 : 250}>
            <BarChart data={attendanceData}>
              <CartesianGrid strokeDasharray="0" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="date" stroke="#9ca3af" style={{fontSize: '12px'}} />
              <YAxis stroke="#9ca3af" style={{fontSize: '12px'}} />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px' }} />
              <Bar dataKey="presente" fill="#5048ff" radius={[8, 8, 0, 0]} />
              <Bar dataKey="ausente" fill="#fca5a5" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Trend Chart */}
        <div className="bg-gradient-to-br from-card to-card/80 rounded-2xl border border-border/50 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg font-semibold text-foreground">Tendencia de Desempeño</h3>
            <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Gráfico de línea</div>
          </div>
          <ResponsiveContainer width="100%" height={showWelcome ? 220 : 250}>
            <LineChart data={attendanceData}>
              <CartesianGrid strokeDasharray="0" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="date" stroke="#9ca3af" style={{fontSize: '12px'}} />
              <YAxis stroke="#9ca3af" style={{fontSize: '12px'}} />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px' }} />
              <Line type="monotone" dataKey="presente" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 4 }} />
              <Line type="monotone" dataKey="ausente" stroke="#f59e0b" strokeWidth={3} dot={{ fill: '#f59e0b', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Section - 3 Abajo */}
      <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0`}>
        {/* Performance Chart */}
        <div className="bg-gradient-to-br from-card to-card/80 rounded-2xl border border-border/50 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col min-h-0">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg font-semibold text-foreground">Desempeño por Materia</h3>
            <div className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Horizontal</div>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData} layout="vertical">
              <CartesianGrid strokeDasharray="0" stroke="#e5e7eb" />
              <XAxis type="number" stroke="#9ca3af" style={{fontSize: '12px'}} />
              <YAxis dataKey="name" type="category" stroke="#9ca3af" style={{fontSize: '11px'}} width={80} />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px' }} />
              <Bar dataKey="value" fill="#10b981" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Incidents Pie Chart */}
        <div className="bg-gradient-to-br from-card to-card/80 rounded-2xl border border-border/50 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col min-h-0">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg font-semibold text-foreground">Tipos de Incidencias</h3>
            <div className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">Gráfico circular</div>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={incidentsData} cx="50%" cy="50%" labelLine={true} outerRadius={70} fill="#8884d8" dataKey="value" label={({ name }) => name}>
                {incidentsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Calificaciones Chart */}
        <div className="bg-gradient-to-br from-card to-card/80 rounded-2xl border border-border/50 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col min-h-0">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg font-semibold text-foreground">Distribución de Calificaciones (0-20)</h3>
            <div className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">Gráfico de barras</div>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={[
              { name: '16-20', value: 45 },
              { name: '14-15', value: 85 },
              { name: '12-13', value: 65 },
              { name: '10-11', value: 30 },
              { name: '0-9', value: 10 }
            ]}>
              <CartesianGrid strokeDasharray="0" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="name" stroke="#9ca3af" style={{fontSize: '12px'}} />
              <YAxis stroke="#9ca3af" style={{fontSize: '12px'}} />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px' }} />
              <Bar dataKey="value" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
