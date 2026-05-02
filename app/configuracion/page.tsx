'use client';

import React, { useState } from 'react';
import { Settings, Save, User, Building2, Bell, Palette, Clock, Shield } from 'lucide-react';
import AccesoPage from '@/app/acceso/page';

export default function ConfiguracionPage() {
  const [perfil, setPerfil] = useState({
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

  const [institucion, setInstitucion] = useState({
    tema_primario: '#1A73E8',
    tema_secundario: '#34A853',
    horario_inicio: '07:30',
    horario_fin: '15:00',
    permitir_registro_padres: true,
    padres_ven_calificaciones: true,
    padres_ven_asistencia: true,
    padres_ven_tareas: true,
  });

  const [saved, setSaved] = useState(false);

  const handleChangeProfile = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setPerfil(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked
      }));
    } else {
      setPerfil(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleChangeInst = (field: string, value: any) => {
    setInstitucion({ ...institucion, [field]: value } as any);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const [activeTab, setActiveTab] = useState<'general' | 'acceso'>('general');

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header with Tabs */}
      <div className="px-8 pt-6 flex gap-6 border-b border-border/40 bg-background">
        <button
          onClick={() => setActiveTab('general')}
          className={`pb-3 font-medium transition-colors border-b-2 px-1 flex items-center gap-2 ${
            activeTab === 'general' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <Settings className="w-4 h-4" /> Configuración General
        </button>
        <button
          onClick={() => setActiveTab('acceso')}
          className={`pb-3 font-medium transition-colors border-b-2 px-1 flex items-center gap-2 ${
            activeTab === 'acceso' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <Shield className="w-4 h-4" /> Accesos y Roles
        </button>
      </div>

      <div className="flex-1 overflow-hidden relative">
        <div className={`absolute inset-0 transition-opacity duration-300 flex flex-col ${activeTab === 'general' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
          {/* Content - 2 Column Layout */}
          <div className="flex-1 overflow-hidden px-8 py-6">
        <div className="grid grid-cols-2 gap-6 h-full">
          {/* Column 1: Perfil Personal */}
          <div className="space-y-4 overflow-y-auto pr-2">
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">Información Personal</h2>
              <div className="bg-card border border-border/40 rounded-lg p-5 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-2">Nombre Completo</label>
                  <input
                    type="text"
                    name="nombre"
                    value={perfil.nombre}
                    onChange={handleChangeProfile}
                    className="w-full px-3 py-2 bg-background border border-border/40 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={perfil.email}
                    onChange={handleChangeProfile}
                    className="w-full px-3 py-2 bg-background border border-border/40 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-2">Teléfono</label>
                  <input
                    type="tel"
                    name="telefono"
                    value={perfil.telefono}
                    onChange={handleChangeProfile}
                    className="w-full px-3 py-2 bg-background border border-border/40 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">Estudiante Asignado</h2>
              <div className="bg-card border border-border/40 rounded-lg p-5 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-2">Estudiante</label>
                  <select
                    name="estudiante"
                    value={perfil.estudiante}
                    onChange={handleChangeProfile}
                    className="w-full px-3 py-2 bg-background border border-border/40 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    <option>Carlos Mendoza</option>
                    <option>Santiago Mendoza</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-2">Relación</label>
                  <select
                    name="relacion"
                    value={perfil.relacion}
                    onChange={handleChangeProfile}
                    className="w-full px-3 py-2 bg-background border border-border/40 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    <option>Padre</option>
                    <option>Madre</option>
                    <option>Tutor</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">Seguridad</h2>
              <div className="bg-card border border-border/40 rounded-lg p-5">
                <button className="w-full px-4 py-2.5 border border-border/40 rounded-lg text-foreground hover:bg-muted transition-colors font-medium text-sm">
                  Cambiar Contraseña
                </button>
              </div>
            </div>
          </div>

          {/* Column 2: Notificaciones e Institución */}
          <div className="space-y-4 overflow-y-auto pr-2">
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Mis Notificaciones
              </h2>
              <div className="bg-card border border-border/40 rounded-lg p-5 space-y-4">
                <div>
                  <p className="text-xs font-semibold text-foreground mb-3">Canales</p>
                  <div className="space-y-2.5">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="notificacionesEmail"
                        checked={perfil.notificacionesEmail}
                        onChange={handleChangeProfile}
                        className="w-4 h-4 accent-primary rounded"
                      />
                      <span className="text-sm text-foreground">Email</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="notificacionesSMS"
                        checked={perfil.notificacionesSMS}
                        onChange={handleChangeProfile}
                        className="w-4 h-4 accent-primary rounded"
                      />
                      <span className="text-sm text-foreground">SMS</span>
                    </label>
                  </div>
                </div>

                <div className="border-t border-border/20 pt-4">
                  <p className="text-xs font-semibold text-foreground mb-3">Tipos</p>
                  <div className="space-y-2.5">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="notificacionesAsistencia"
                        checked={perfil.notificacionesAsistencia}
                        onChange={handleChangeProfile}
                        className="w-4 h-4 accent-primary rounded"
                      />
                      <span className="text-sm text-foreground">Asistencia</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="notificacionesCalificaciones"
                        checked={perfil.notificacionesCalificaciones}
                        onChange={handleChangeProfile}
                        className="w-4 h-4 accent-primary rounded"
                      />
                      <span className="text-sm text-foreground">Calificaciones</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="notificacionesIncidencias"
                        checked={perfil.notificacionesIncidencias}
                        onChange={handleChangeProfile}
                        className="w-4 h-4 accent-primary rounded"
                      />
                      <span className="text-sm text-foreground">Incidencias</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Tema del Sistema
              </h2>
              <div className="bg-card border border-border/40 rounded-lg p-5 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-2">Color Primario</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={institucion.tema_primario}
                      onChange={(e) => handleChangeInst('tema_primario', e.target.value)}
                      className="w-12 h-10 rounded cursor-pointer border border-border/40"
                    />
                    <input
                      type="text"
                      value={institucion.tema_primario}
                      onChange={(e) => handleChangeInst('tema_primario', e.target.value)}
                      className="flex-1 px-3 py-2 bg-background border border-border/40 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-2">Color Secundario</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={institucion.tema_secundario}
                      onChange={(e) => handleChangeInst('tema_secundario', e.target.value)}
                      className="w-12 h-10 rounded cursor-pointer border border-border/40"
                    />
                    <input
                      type="text"
                      value={institucion.tema_secundario}
                      onChange={(e) => handleChangeInst('tema_secundario', e.target.value)}
                      className="flex-1 px-3 py-2 bg-background border border-border/40 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Horario Escolar
              </h2>
              <div className="bg-card border border-border/40 rounded-lg p-5 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-2">Inicio</label>
                  <input
                    type="time"
                    value={institucion.horario_inicio}
                    onChange={(e) => handleChangeInst('horario_inicio', e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-border/40 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-2">Fin</label>
                  <input
                    type="time"
                    value={institucion.horario_fin}
                    onChange={(e) => handleChangeInst('horario_fin', e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-border/40 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Permisos de Padres
              </h2>
              <div className="bg-card border border-border/40 rounded-lg p-5 space-y-2.5">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={institucion.permitir_registro_padres}
                    onChange={(e) => handleChangeInst('permitir_registro_padres', e.target.checked)}
                    className="w-4 h-4 accent-primary rounded"
                  />
                  <span className="text-sm text-foreground">Permitir registro</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={institucion.padres_ven_calificaciones}
                    onChange={(e) => handleChangeInst('padres_ven_calificaciones', e.target.checked)}
                    className="w-4 h-4 accent-primary rounded"
                  />
                  <span className="text-sm text-foreground">Ver calificaciones</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={institucion.padres_ven_asistencia}
                    onChange={(e) => handleChangeInst('padres_ven_asistencia', e.target.checked)}
                    className="w-4 h-4 accent-primary rounded"
                  />
                  <span className="text-sm text-foreground">Ver asistencia</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={institucion.padres_ven_tareas}
                    onChange={(e) => handleChangeInst('padres_ven_tareas', e.target.checked)}
                    className="w-4 h-4 accent-primary rounded"
                  />
                  <span className="text-sm text-foreground">Ver tareas</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Save Button */}
      <div className="border-t border-border/40 bg-background/80 px-8 py-3">
        <div className="flex items-center justify-between">
          <div>
            {saved ? (
              <span className="text-sm text-green-600 font-semibold">Configuración guardada</span>
            ) : (
              <span className="text-sm text-muted-foreground/70">Haz clic para guardar los cambios</span>
            )}
          </div>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold text-sm"
          >
            <Save className="w-4 h-4" />
            Guardar
          </button>
        </div>
      </div>
      </div>
      
      <div className={`absolute inset-0 transition-opacity duration-300 ${activeTab === 'acceso' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
        <AccesoPage />
      </div>
      </div>
    </div>
  );
}
