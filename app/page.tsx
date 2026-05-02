'use client';

import { useEffect, useState } from 'react';
import { BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { TrendingUp, Users, AlertCircle, CheckCircle, X, Download, LayoutDashboard } from 'lucide-react';

// Data for Stacked Bar Chart
const attendanceData = [
  { date: 'Lun', presente: 85, ausente: 15 },
  { date: 'Mar', presente: 70, ausente: 30 },
  { date: 'Mié', presente: 95, ausente: 5 },
  { date: 'Jue', presente: 60, ausente: 40 },
  { date: 'Vie', presente: 90, ausente: 10 },
];

// Data for Area Chart
const activityData = [
  { day: 'Lun', interaction: 45, assignments: 20 },
  { day: 'Mar', interaction: 75, assignments: 35 },
  { day: 'Mié', interaction: 35, assignments: 65 },
  { day: 'Jue', interaction: 90, assignments: 45 },
  { day: 'Vie', interaction: 65, assignments: 85 },
];

// Data for Radar
const performanceData = [
  { name: 'Matemática', value: 9.5 },
  { name: 'Lengua', value: 6.2 },
  { name: 'Ciencias', value: 8.8 },
  { name: 'Historia', value: 5.5 },
  { name: 'Arte', value: 9.0 },
];

const incidentsData = [
  { name: 'Comportamiento', value: 40 },
  { name: 'Tareas', value: 25 },
  { name: 'Uniforme', value: 20 },
  { name: 'Tardanza', value: 15 },
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
    <div className="bg-card rounded-2xl border border-border p-5 hover:border-primary/30 transition-all shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-muted-foreground text-sm mb-1">{label}</p>
          <p className="text-2xl font-bold text-foreground leading-none">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-xl ${bgColor} flex items-center justify-center`}>
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
    const hasShownWelcome = sessionStorage.getItem('hasShownWelcome');
    if (!hasShownWelcome) {
      const userEmail = sessionStorage.getItem('userEmail') || 'Usuario';
      const name = userEmail.split('@')[0].charAt(0).toUpperCase() + userEmail.split('@')[0].slice(1);
      setUserName(name);
      setShowWelcome(true);
      sessionStorage.setItem('hasShownWelcome', 'true');
      
      // La notificación dura 2 segundos antes de empezar a desaparecer
      const timer = setTimeout(() => {
        setIsHiding(true);
        // Esperamos 500ms a que termine la animación de colapso para quitarlo del DOM
        setTimeout(() => {
          setShowWelcome(false);
          setIsHiding(false);
        }, 500);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Header unificado h-16 */}
      <div className="h-16 px-8 border-b border-border/50 flex items-center justify-between bg-background flex-shrink-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <LayoutDashboard className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground leading-tight">Dashboard Principal</h1>
            <p className="text-xs text-muted-foreground font-medium">Resumen general del sistema</p>
          </div>
        </div>
        <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-md shadow-primary/20 flex items-center gap-2">
          <Download className="w-4 h-4" />
          <span>Exportar PDF</span>
        </button>
      </div>

      <div className="flex-1 flex flex-col p-6 gap-6 min-h-0">
        {/* Welcome Notification - Colapso de espacio real */}
        {showWelcome && (
          <div className={`transition-all duration-500 ease-in-out overflow-hidden flex-shrink-0 ${isHiding ? 'max-h-0 opacity-0 mb-0 pointer-events-none' : 'max-h-32 opacity-100 mb-2'}`}>
            <div className="bg-primary rounded-2xl p-5 text-white flex items-center justify-between shadow-xl border border-white/10 relative">
              <div className="relative z-10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl font-black">
                  {userName.charAt(0)}
                </div>
                <div>
                  <h2 className="font-bold text-lg leading-tight">¡Bienvenido, {userName}!</h2>
                  <p className="text-sm text-white/80 font-medium">Panel de control actualizado.</p>
                </div>
              </div>
              <button 
                onClick={() => { setIsHiding(true); setTimeout(() => setShowWelcome(false), 500); }} 
                className="relative z-10 ml-4 p-2 hover:bg-white/20 rounded-xl transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Stats Grid - No debe ser empujado, debe ser estático */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 flex-shrink-0">
          <StatCard icon={Users} label="Estudiantes" value="245" color="primary" />
          <StatCard icon={CheckCircle} label="Asistencia Promedio" value="92%" color="green" />
          <StatCard icon={TrendingUp} label="Desempeño Promedio" value="8.4" color="blue" />
          <StatCard icon={AlertCircle} label="En Riesgo" value="12" color="amber" />
        </div>

        {/* Charts Section - Las gráficas absorben la reducción de altura */}
        <div className="flex-1 flex flex-col gap-6 min-h-0">
          {/* Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm flex flex-col h-full min-h-0 overflow-hidden">
              <div className="flex items-center gap-2 mb-4 flex-shrink-0">
                <h3 className="text-lg font-bold text-foreground">Asistencia Semanal</h3>
                <div className="text-[10px] font-black uppercase tracking-widest bg-blue-100 text-blue-700 px-3 py-1 rounded-full border border-blue-200">Consolidado</div>
              </div>
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={attendanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" opacity={0.4} />
                    <XAxis dataKey="date" stroke="#9ca3af" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} dy={10} />
                    <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px' }} />
                    <Bar dataKey="presente" stackId="a" fill="#5048ff" radius={[0, 0, 4, 4]} barSize={40} />
                    <Bar dataKey="ausente" stackId="a" fill="#fca5a5" radius={[4, 4, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm flex flex-col h-full min-h-0 overflow-hidden">
              <div className="flex items-center gap-2 mb-4 flex-shrink-0">
                <h3 className="text-lg font-bold text-foreground">Actividad Académica</h3>
                <div className="text-[10px] font-black uppercase tracking-widest bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20">Interacción</div>
              </div>
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorInt" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#5048ff" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#5048ff" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" opacity={0.4} />
                    <XAxis dataKey="day" stroke="#9ca3af" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} dy={10} />
                    <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px' }} />
                    <Area type="monotone" dataKey="interaction" stroke="#5048ff" strokeWidth={3} fillOpacity={1} fill="url(#colorInt)" />
                    <Area type="monotone" dataKey="assignments" stroke="#10b981" strokeWidth={3} fillOpacity={0} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0 pb-2">
            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm flex flex-col h-full min-h-0 overflow-hidden">
              <h3 className="text-base font-bold text-foreground mb-4 flex-shrink-0">Desempeño</h3>
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={performanceData}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 11 }} />
                    <Radar dataKey="value" stroke="#5048ff" strokeWidth={2} fill="#5048ff" fillOpacity={0.4} />
                    <Tooltip contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm flex flex-col h-full min-h-0 overflow-hidden">
              <h3 className="text-base font-bold text-foreground mb-4 flex-shrink-0">Incidencias</h3>
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={incidentsData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value">
                      {incidentsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm flex flex-col h-full min-h-0 overflow-hidden">
              <h3 className="text-base font-bold text-foreground mb-4 flex-shrink-0">Distribución</h3>
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { name: '16-20', value: 45 },
                    { name: '14-15', value: 85 },
                    { name: '12-13', value: 65 },
                    { name: '10-11', value: 30 },
                    { name: '0-9', value: 10 }
                  ]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" opacity={0.4} />
                    <XAxis dataKey="name" stroke="#9ca3af" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} dy={10} />
                    <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                    <Bar dataKey="value" fill="#8b5cf6" radius={[6, 6, 0, 0]} barSize={35} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
