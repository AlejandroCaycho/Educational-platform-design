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
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6 md:p-8 h-screen flex flex-col">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-foreground">Configuración</h1>
        <p className="text-xs text-muted-foreground">Administra tu cuenta y preferencias</p>
      </div>

      {/* Success Message */}
      {saved && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded-lg text-xs mb-3">
          Configuración guardada correctamente
        </div>
      )}

      {/* Main Grid Layout - Compact */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 flex-1 overflow-hidden">
        {/* Left Column - Personal Info */}
        <div className="lg:col-span-1 space-y-3 overflow-y-auto pr-2">
          <div className="bg-card p-4 rounded-lg border border-border">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <User className="w-4 h-4" />
              Perfil
            </h3>
            <div className="space-y-2">
              <div>
                <label className="block text-xs font-medium text-foreground/80 mb-1">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full px-2.5 py-1.5 bg-background border border-border rounded text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground/80 mb-1">Email</label>
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-background border border-border rounded">
                  <Mail className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="flex-1 bg-transparent text-sm text-foreground focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground/80 mb-1">Teléfono</label>
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-background border border-border rounded">
                  <Phone className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="flex-1 bg-transparent text-sm text-foreground focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-card p-4 rounded-lg border border-border">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Seguridad
            </h3>
            <button className="w-full px-2.5 py-1.5 bg-background border border-border rounded text-foreground hover:bg-muted transition-colors text-xs font-medium">
              Cambiar Contraseña
            </button>
          </div>

          {/* Account Info */}
          <div className="bg-card p-4 rounded-lg border border-border">
            <h3 className="text-xs font-semibold text-foreground/70 mb-2">Cuenta</h3>
            <div className="space-y-1.5 text-xs text-muted-foreground/70">
              <p>ID: FAM-2024-001</p>
              <p>Desde: Enero 2024</p>
              <p>Actualizado: Hoy</p>
            </div>
          </div>
        </div>

        {/* Middle Column - Student Info */}
        <div className="lg:col-span-1 overflow-y-auto pr-2">
          <div className="bg-card p-4 rounded-lg border border-border h-fit">
            <h3 className="text-sm font-semibold text-foreground mb-3">Estudiante</h3>
            <div className="space-y-2">
              <div>
                <label className="block text-xs font-medium text-foreground/80 mb-1">Estudiante</label>
                <select
                  name="estudiante"
                  value={formData.estudiante}
                  onChange={handleChange}
                  className="w-full px-2.5 py-1.5 bg-background border border-border rounded text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option>Carlos Mendoza</option>
                  <option>Santiago Mendoza</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground/80 mb-1">Relación</label>
                <select
                  name="relacion"
                  value={formData.relacion}
                  onChange={handleChange}
                  className="w-full px-2.5 py-1.5 bg-background border border-border rounded text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option>Padre</option>
                  <option>Madre</option>
                  <option>Tutor</option>
                  <option>Apoderado</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Columns - Notifications */}
        <div className="lg:col-span-2 overflow-y-auto pr-2">
          <div className="bg-card p-4 rounded-lg border border-border h-fit">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Notificaciones
            </h3>
            
            {/* Channels */}
            <div className="mb-4 pb-3 border-b border-border/30">
              <p className="text-xs font-medium text-foreground mb-2">Canales</p>
              <div className="grid grid-cols-2 gap-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="notificacionesEmail"
                    checked={formData.notificacionesEmail}
                    onChange={handleChange}
                    className="w-3 h-3 accent-primary"
                  />
                  <span className="text-xs text-foreground">Email</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="notificacionesSMS"
                    checked={formData.notificacionesSMS}
                    onChange={handleChange}
                    className="w-3 h-3 accent-primary"
                  />
                  <span className="text-xs text-foreground">SMS</span>
                </label>
              </div>
            </div>

            {/* Types */}
            <div>
              <p className="text-xs font-medium text-foreground mb-2">Tipos</p>
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="notificacionesAsistencia"
                    checked={formData.notificacionesAsistencia}
                    onChange={handleChange}
                    className="w-3 h-3 accent-primary"
                  />
                  <span className="text-xs text-foreground">Asistencia</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="notificacionesCalificaciones"
                    checked={formData.notificacionesCalificaciones}
                    onChange={handleChange}
                    className="w-3 h-3 accent-primary"
                  />
                  <span className="text-xs text-foreground">Calificaciones</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="notificacionesIncidencias"
                    checked={formData.notificacionesIncidencias}
                    onChange={handleChange}
                    className="w-3 h-3 accent-primary"
                  />
                  <span className="text-xs text-foreground">Incidencias</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button - Fixed Bottom */}
      <button
        onClick={handleSave}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold text-sm mt-4"
      >
        <Save className="w-4 h-4" />
        Guardar Cambios
      </button>
    </div>
  );
}
