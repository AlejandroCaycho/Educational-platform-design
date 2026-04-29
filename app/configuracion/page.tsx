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
    <div className="h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="px-8 pt-6 pb-4 border-b border-border/40">
        <h1 className="text-2xl font-bold text-foreground">Configuración</h1>
        <p className="text-sm text-muted-foreground mt-1">Administra tu perfil y preferencias</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-8 py-8 space-y-8">
          
          {/* Sección: Perfil */}
          <section>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-3">
                <div className="p-2 bg-muted rounded-lg">
                  <User className="w-5 h-5 text-muted-foreground" />
                </div>
                Información Personal
              </h2>
            </div>
            <div className="bg-card border border-border/40 rounded-xl p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Nombre Completo</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 bg-background border border-border/40 rounded-lg text-sm text-foreground placeholder-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 bg-background border border-border/40 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Teléfono</label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 bg-background border border-border/40 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Sección: Estudiante */}
          <section>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-foreground">Información del Estudiante</h2>
            </div>
            <div className="bg-card border border-border/40 rounded-xl p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Estudiante</label>
                  <select
                    name="estudiante"
                    value={formData.estudiante}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 bg-background border border-border/40 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent transition-all"
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
                    className="w-full px-3 py-2.5 bg-background border border-border/40 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent transition-all"
                  >
                    <option>Padre</option>
                    <option>Madre</option>
                    <option>Tutor</option>
                    <option>Apoderado</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* Sección: Notificaciones */}
          <section>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-3">
                <div className="p-2 bg-muted rounded-lg">
                  <Bell className="w-5 h-5 text-muted-foreground" />
                </div>
                Notificaciones
              </h2>
            </div>
            <div className="bg-card border border-border/40 rounded-xl p-6 space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4">Canales de Notificación</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="notificacionesEmail"
                      checked={formData.notificacionesEmail}
                      onChange={handleChange}
                      className="w-4 h-4 accent-primary rounded"
                    />
                    <span className="text-sm text-foreground group-hover:text-foreground/80 transition-colors">Notificaciones por Email</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="notificacionesSMS"
                      checked={formData.notificacionesSMS}
                      onChange={handleChange}
                      className="w-4 h-4 accent-primary rounded"
                    />
                    <span className="text-sm text-foreground group-hover:text-foreground/80 transition-colors">Notificaciones por SMS</span>
                  </label>
                </div>
              </div>

              <div className="border-t border-border/20" />

              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4">Tipos de Notificación</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="notificacionesAsistencia"
                      checked={formData.notificacionesAsistencia}
                      onChange={handleChange}
                      className="w-4 h-4 accent-primary rounded"
                    />
                    <span className="text-sm text-foreground group-hover:text-foreground/80 transition-colors">Cambios de Asistencia</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="notificacionesCalificaciones"
                      checked={formData.notificacionesCalificaciones}
                      onChange={handleChange}
                      className="w-4 h-4 accent-primary rounded"
                    />
                    <span className="text-sm text-foreground group-hover:text-foreground/80 transition-colors">Nuevas Calificaciones</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="notificacionesIncidencias"
                      checked={formData.notificacionesIncidencias}
                      onChange={handleChange}
                      className="w-4 h-4 accent-primary rounded"
                    />
                    <span className="text-sm text-foreground group-hover:text-foreground/80 transition-colors">Incidencias Reportadas</span>
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* Sección: Seguridad */}
          <section>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-3">
                <div className="p-2 bg-muted rounded-lg">
                  <Lock className="w-5 h-5 text-muted-foreground" />
                </div>
                Seguridad
              </h2>
            </div>
            <div className="bg-card border border-border/40 rounded-xl p-6">
              <button className="px-4 py-2.5 border border-border/40 rounded-lg text-foreground hover:bg-muted transition-colors text-sm font-medium">
                Cambiar Contraseña
              </button>
            </div>
          </section>

          {/* Sección: Información de Cuenta */}
          <section className="pb-6">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-foreground">Información de Cuenta</h2>
            </div>
            <div className="bg-card border border-border/40 rounded-xl p-6">
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wide mb-1">ID de Cuenta</p>
                  <p className="text-sm text-foreground font-medium">FAM-2024-001</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wide mb-1">Miembro Desde</p>
                  <p className="text-sm text-foreground font-medium">Enero 2024</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wide mb-1">Última Actualización</p>
                  <p className="text-sm text-foreground font-medium">Hoy</p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* Footer - Save Button */}
      <div className="border-t border-border/40 bg-background/80 backdrop-blur-sm px-8 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            {saved ? (
              <span className="text-sm text-green-600 font-medium">Configuración guardada correctamente</span>
            ) : (
              <span className="text-sm text-muted-foreground/70">Haz clic para guardar los cambios</span>
            )}
          </div>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold text-sm shadow-sm"
          >
            <Save className="w-4 h-4" />
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
}
