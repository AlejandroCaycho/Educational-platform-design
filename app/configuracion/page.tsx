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
      <div className="px-8 py-4 border-b border-border/40">
        <h1 className="text-xl font-bold text-foreground">Configuración</h1>
        <p className="text-xs text-muted-foreground mt-1">Administra tu perfil y preferencias</p>
      </div>

      {/* Content */}
      <div className="flex-1 px-8 py-6 overflow-hidden">
        <div className="grid grid-cols-3 gap-6 h-full">
          
          {/* Col 1: Perfil e Información */}
          <div className="space-y-4">
            {/* Perfil */}
            <section>
              <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                Perfil
              </h2>
              <div className="bg-card border border-border/40 rounded-lg p-5 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-2">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-background border border-border/40 rounded-lg text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-background border border-border/40 rounded-lg text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-2">Teléfono</label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-background border border-border/40 rounded-lg text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"
                  />
                </div>
              </div>
            </section>

            {/* Seguridad */}
            <section>
              <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Lock className="w-4 h-4 text-muted-foreground" />
                Seguridad
              </h2>
              <div className="bg-card border border-border/40 rounded-lg p-5">
                <button className="w-full px-3 py-2 border border-border/40 rounded-lg text-foreground hover:bg-muted transition-colors text-sm font-medium">
                  Cambiar Contraseña
                </button>
              </div>
            </section>

            {/* Información de Cuenta */}
            <section className="mt-auto">
              <h2 className="text-sm font-semibold text-foreground mb-3">Cuenta</h2>
              <div className="bg-card border border-border/40 rounded-lg p-5 text-sm space-y-3">
                <div>
                  <p className="text-muted-foreground/70 font-semibold text-xs">ID</p>
                  <p className="text-foreground font-medium">FAM-2024-001</p>
                </div>
                <div>
                  <p className="text-muted-foreground/70 font-semibold text-xs">Desde</p>
                  <p className="text-foreground font-medium">Enero 2024</p>
                </div>
                <div>
                  <p className="text-muted-foreground/70 font-semibold text-xs">Actualizado</p>
                  <p className="text-foreground font-medium">Hoy</p>
                </div>
              </div>
            </section>
          </div>

          {/* Col 2: Estudiante */}
          <div className="flex flex-col">
            <section>
              <h2 className="text-sm font-semibold text-foreground mb-3">Estudiante</h2>
              <div className="bg-card border border-border/40 rounded-lg p-5 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-2">Estudiante</label>
                  <select
                    name="estudiante"
                    value={formData.estudiante}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-background border border-border/40 rounded-lg text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"
                  >
                    <option>Carlos Mendoza</option>
                    <option>Santiago Mendoza</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-2">Relación</label>
                  <select
                    name="relacion"
                    value={formData.relacion}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-background border border-border/40 rounded-lg text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"
                  >
                    <option>Padre</option>
                    <option>Madre</option>
                    <option>Tutor</option>
                    <option>Apoderado</option>
                  </select>
                </div>
              </div>
            </section>
          </div>

          {/* Col 3: Notificaciones */}
          <div>
            <section>
              <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Bell className="w-4 h-4 text-muted-foreground" />
                Notificaciones
              </h2>
              <div className="bg-card border border-border/40 rounded-lg p-5 space-y-4">
                <div>
                  <p className="text-xs font-semibold text-foreground mb-3">Canales</p>
                  <div className="space-y-2.5">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="notificacionesEmail"
                        checked={formData.notificacionesEmail}
                        onChange={handleChange}
                        className="w-4 h-4 accent-primary rounded"
                      />
                      <span className="text-sm text-foreground">Email</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="notificacionesSMS"
                        checked={formData.notificacionesSMS}
                        onChange={handleChange}
                        className="w-4 h-4 accent-primary rounded"
                      />
                      <span className="text-sm text-foreground">SMS</span>
                    </label>
                  </div>
                </div>

                <div className="border-t border-border/20" />

                <div>
                  <p className="text-xs font-semibold text-foreground mb-3">Tipos</p>
                  <div className="space-y-2.5">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="notificacionesAsistencia"
                        checked={formData.notificacionesAsistencia}
                        onChange={handleChange}
                        className="w-4 h-4 accent-primary rounded"
                      />
                      <span className="text-sm text-foreground">Asistencia</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="notificacionesCalificaciones"
                        checked={formData.notificacionesCalificaciones}
                        onChange={handleChange}
                        className="w-4 h-4 accent-primary rounded"
                      />
                      <span className="text-sm text-foreground">Calificaciones</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="notificacionesIncidencias"
                        checked={formData.notificacionesIncidencias}
                        onChange={handleChange}
                        className="w-4 h-4 accent-primary rounded"
                      />
                      <span className="text-sm text-foreground">Incidencias</span>
                    </label>
                  </div>
                </div>
              </div>
            </section>
          </div>

        </div>
      </div>

      {/* Footer - Save Button */}
      <div className="border-t border-border/40 bg-background/80 px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            {saved ? (
              <span className="text-sm text-green-600 font-semibold">Guardado correctamente</span>
            ) : (
              <span className="text-sm text-muted-foreground/70">Haz clic para guardar los cambios</span>
            )}
          </div>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold text-sm"
          >
            <Save className="w-4 h-4" />
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
}
