'use client';

import React, { useState } from 'react';
import { Settings, Save, Bell, Lock, User, Mail, Phone } from 'lucide-react';

export default function Configuracion() {
  const [formData, setFormData] = useState({
    nombre: 'García López',
    email: 'familia@example.com',
    telefono: '+34 612 345 678',
    estudiante: 'Carlos Mendoza',
    relacion: 'Padre',
    notificacionesEmail: true,
    notificacionesSMS: false,
    notificacionesAsistencia: true,
    notificacionesCalificaciones: true,
    notificacionesIncidencias: true,
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    console.log('Configuración guardada:', formData);
  };

  return (
    <div className="p-6 md:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Configuración</h1>
        <p className="text-muted-foreground">Administra tu cuenta y preferencias</p>
      </div>

      {/* Success Message */}
      {saved && (
        <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-lg">
          Configuración guardada correctamente
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Section */}
          <div className="bg-card p-6 rounded-lg border border-border">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Información Personal
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Nombre Completo</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
                  <div className="flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-lg">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="flex-1 bg-transparent text-foreground focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Teléfono</label>
                  <div className="flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-lg">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      className="flex-1 bg-transparent text-foreground focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Student Section */}
          <div className="bg-card p-6 rounded-lg border border-border">
            <h2 className="text-xl font-bold text-foreground mb-4">Información del Estudiante</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Estudiante</label>
                <select
                  name="estudiante"
                  value={formData.estudiante}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option>Carlos Mendoza</option>
                  <option>Santiago Mendoza</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Relación</label>
                <select
                  name="relacion"
                  value={formData.relacion}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option>Padre</option>
                  <option>Madre</option>
                  <option>Tutor</option>
                  <option>Apoderado</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="bg-card p-6 rounded-lg border border-border">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Preferencias de Notificaciones
            </h2>
            <div className="space-y-4">
              <div className="space-y-3">
                <p className="text-sm font-semibold text-foreground mb-3">Canales de Notificación</p>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="notificacionesEmail"
                    checked={formData.notificacionesEmail}
                    onChange={handleChange}
                    className="w-4 h-4 accent-primary"
                  />
                  <span className="text-foreground">Notificaciones por Email</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="notificacionesSMS"
                    checked={formData.notificacionesSMS}
                    onChange={handleChange}
                    className="w-4 h-4 accent-primary"
                  />
                  <span className="text-foreground">Notificaciones por SMS</span>
                </label>
              </div>

              <div className="border-t border-border pt-4 space-y-3">
                <p className="text-sm font-semibold text-foreground mb-3">Tipos de Notificación</p>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="notificacionesAsistencia"
                    checked={formData.notificacionesAsistencia}
                    onChange={handleChange}
                    className="w-4 h-4 accent-primary"
                  />
                  <span className="text-foreground">Cambios de Asistencia</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="notificacionesCalificaciones"
                    checked={formData.notificacionesCalificaciones}
                    onChange={handleChange}
                    className="w-4 h-4 accent-primary"
                  />
                  <span className="text-foreground">Nuevas Calificaciones</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="notificacionesIncidencias"
                    checked={formData.notificacionesIncidencias}
                    onChange={handleChange}
                    className="w-4 h-4 accent-primary"
                  />
                  <span className="text-foreground">Incidencias Reportadas</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold sticky top-24"
          >
            <Save className="w-5 h-5" />
            Guardar Cambios
          </button>

          {/* Security Section */}
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" />
              Seguridad
            </h3>
            <button className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground hover:bg-muted transition-colors text-sm font-semibold">
              Cambiar Contraseña
            </button>
          </div>

          {/* Account Info */}
          <div className="bg-card p-6 rounded-lg border border-border text-sm space-y-2">
            <p className="text-muted-foreground">ID de Cuenta: FAM-2024-001</p>
            <p className="text-muted-foreground">Miembro desde: Enero 2024</p>
            <p className="text-muted-foreground">Última actualización: Hoy</p>
          </div>
        </div>
      </div>
    </div>
  );
}
