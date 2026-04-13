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
    <div className="p-5 md:p-6 space-y-6">
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

      {/* Charts Section - 3x3 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Attendance Chart */}
        <div className="bg-gradient-to-br from-card to-card/80 rounded-2xl border border-border/50 p-6 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-foreground mb-4">Asistencia Semanal</h3>
          <ResponsiveContainer width="100%" height={220}>
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

        {/* Performance Chart */}
        <div className="bg-gradient-to-br from-card to-card/80 rounded-2xl border border-border/50 p-6 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-foreground mb-4">Desempeño por Materia</h3>
          <ResponsiveContainer width="100%" height={220}>
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
        <div className="bg-gradient-to-br from-card to-card/80 rounded-2xl border border-border/50 p-6 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-foreground mb-4">Tipos de Incidencias</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={incidentsData} cx="50%" cy="50%" labelLine={false} outerRadius={70} fill="#8884d8" dataKey="value">
                {incidentsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Tareas Completadas */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-50/50 rounded-2xl border border-blue-200/50 p-6 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            Tareas
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Completadas</span>
              <span className="text-2xl font-bold text-blue-600">623</span>
            </div>
            <div className="w-full bg-blue-100 rounded-full h-3">
              <div className="bg-blue-600 rounded-full h-3" style={{ width: '85%' }} />
            </div>
            <p className="text-xs text-blue-600 font-medium">85% del objetivo</p>
          </div>
        </div>

        {/* Comunicaciones */}
        <div className="bg-gradient-to-br from-cyan-50 to-cyan-50/50 rounded-2xl border border-cyan-200/50 p-6 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-cyan-600" />
            Comunicaciones
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Activas</span>
              <span className="text-2xl font-bold text-cyan-600">48</span>
            </div>
            <div className="flex gap-2">
              <div className="text-xs bg-cyan-100 text-cyan-700 px-2 py-1 rounded-full">+12 nuevas</div>
              <div className="text-xs bg-cyan-100 text-cyan-700 px-2 py-1 rounded-full">3 pendientes</div>
            </div>
          </div>
        </div>

        {/* Asistencia Puntaje */}
        <div className="bg-gradient-to-br from-green-50 to-green-50/50 rounded-2xl border border-green-200/50 p-6 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Asistencia
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Promedio</span>
              <span className="text-2xl font-bold text-green-600">92%</span>
            </div>
            <div className="w-full bg-green-100 rounded-full h-3">
              <div className="bg-green-600 rounded-full h-3" style={{ width: '92%' }} />
            </div>
            <p className="text-xs text-green-600 font-medium">Muy buena</p>
          </div>
        </div>
      </div>
    </div>
  );
}
