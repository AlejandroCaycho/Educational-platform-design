'use client';

import { useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, FileText, AlertCircle, MessageSquare, Clock, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();

  useEffect(() => {
    // Solo mostrar el toast si es la primera vez que entra a esta sesión
    const hasShownWelcome = sessionStorage.getItem('hasShownWelcome');
    
    if (!hasShownWelcome) {
      // Obtener el email del usuario y extraer el nombre
      const userEmail = sessionStorage.getItem('userEmail') || 'Usuario';
      const userName = userEmail.split('@')[0].charAt(0).toUpperCase() + userEmail.split('@')[0].slice(1);
      
      toast({
        title: `Bienvenido al sistema, ${userName}`,
        description: 'Aquí está tu resumen de actividad de esta semana.',
      });
      sessionStorage.setItem('hasShownWelcome', 'true');
    }
  }, [toast]);

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Estudiantes" value="245" color="primary" />
        <StatCard icon={CheckCircle} label="Asistencia Promedio" value="92%" color="green" />
        <StatCard icon={TrendingUp} label="Desempeño Promedio" value="8.4" color="blue" />
        <StatCard icon={AlertCircle} label="En Riesgo" value="12" color="amber" />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Chart */}
        <div className="lg:col-span-2 bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Asistencia Semanal</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '6px' }} />
              <Legend />
              <Bar dataKey="presente" fill="#5048ff" radius={[4, 4, 0, 0]} />
              <Bar dataKey="ausente" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Incidents Pie Chart */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Tipos de Incidencias</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={incidentsData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
                {incidentsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '6px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance and Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance by Subject */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Desempeño por Materia</h3>
          <div className="space-y-3">
            {performanceData.map((subject) => (
              <div key={subject.name}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-foreground">{subject.name}</span>
                  <span className="text-sm font-bold text-primary">{subject.value}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary rounded-full h-2"
                    style={{ width: `${(subject.value / 10) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Mensajes Recientes
          </h3>
          <div className="space-y-3">
            {[
              { from: 'Profa. García', message: 'Buen trabajo en la última prueba', time: 'Hoy 2:30 PM' },
              { from: 'Dirección', message: 'Recordatorio de jornada de padres', time: 'Ayer 10:00 AM' },
              { from: 'Profa. Morales', message: 'Tareas extras disponibles', time: '2 días atrás' },
            ].map((msg, i) => (
              <div key={i} className="p-3 border border-border rounded-lg hover:bg-muted transition-colors">
                <p className="font-medium text-foreground text-sm">{msg.from}</p>
                <p className="text-sm text-muted-foreground">{msg.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{msg.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
