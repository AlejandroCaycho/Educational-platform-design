'use client';

import React, { useState } from 'react';
import { Save, Settings, Palette, Clock, Bell, Users } from 'lucide-react';

interface ConfiguracionInst {
  tema_primario: string;
  tema_secundario: string;
  mantener_registros_anos: number;
  permitir_registro_padres: boolean;
  padres_ven_calificaciones: boolean;
  padres_ven_asistencia: boolean;
  padres_ven_tareas: boolean;
  notificacion_inasistencia: boolean;
  notificacion_calificacion_baja: boolean;
  umbral_calificacion_baja: number;
  horario_inicio: string;
  horario_fin: string;
  idioma: string;
  zona_horaria: string;
}

export default function AdminConfiguracionPage() {
  const [config, setConfig] = useState<ConfiguracionInst>({
    tema_primario: '#1A73E8',
    tema_secundario: '#34A853',
    mantener_registros_anos: 5,
    permitir_registro_padres: true,
    padres_ven_calificaciones: true,
    padres_ven_asistencia: true,
    padres_ven_tareas: true,
    notificacion_inasistencia: true,
    notificacion_calificacion_baja: true,
    umbral_calificacion_baja: 11.00,
    horario_inicio: '07:30',
    horario_fin: '15:00',
    idioma: 'es',
    zona_horaria: 'America/Lima'
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (field: keyof ConfiguracionInst, value: any) => {
    setConfig({ ...config, [field]: value });
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="px-8 py-5 border-b border-border/40">
        <h1 className="text-2xl font-bold text-foreground">Configuración General</h1>
        <p className="text-sm text-muted-foreground mt-1">Personaliza los parámetros de la institución</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-8 py-8 space-y-8">
          
          {/* Sección: Temas y Apariencia */}
          <section>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-3">
                <div className="p-2 bg-muted rounded-lg">
                  <Palette className="w-5 h-5 text-muted-foreground" />
                </div>
                Temas y Apariencia
              </h2>
            </div>
            <div className="bg-card border border-border/40 rounded-xl p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">Color Primario</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={config.tema_primario}
                      onChange={(e) => handleChange('tema_primario', e.target.value)}
                      className="w-16 h-12 rounded-lg cursor-pointer border border-border/40"
                    />
                    <input
                      type="text"
                      value={config.tema_primario}
                      onChange={(e) => handleChange('tema_primario', e.target.value)}
                      className="flex-1 px-3 py-2 bg-background border border-border/40 rounded-lg text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">Color Secundario</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={config.tema_secundario}
                      onChange={(e) => handleChange('tema_secundario', e.target.value)}
                      className="w-16 h-12 rounded-lg cursor-pointer border border-border/40"
                    />
                    <input
                      type="text"
                      value={config.tema_secundario}
                      onChange={(e) => handleChange('tema_secundario', e.target.value)}
                      className="flex-1 px-3 py-2 bg-background border border-border/40 rounded-lg text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Sección: Horarios */}
          <section>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-3">
                <div className="p-2 bg-muted rounded-lg">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                </div>
                Horarios Escolares
              </h2>
            </div>
            <div className="bg-card border border-border/40 rounded-xl p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Hora de Inicio</label>
                  <input
                    type="time"
                    value={config.horario_inicio}
                    onChange={(e) => handleChange('horario_inicio', e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-border/40 rounded-lg text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Hora de Fin</label>
                  <input
                    type="time"
                    value={config.horario_fin}
                    onChange={(e) => handleChange('horario_fin', e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-border/40 rounded-lg text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Sección: Acceso de Padres */}
          <section>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-3">
                <div className="p-2 bg-muted rounded-lg">
                  <Users className="w-5 h-5 text-muted-foreground" />
                </div>
                Permisos de Padres
              </h2>
            </div>
            <div className="bg-card border border-border/40 rounded-xl p-6 space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.permitir_registro_padres}
                  onChange={(e) => handleChange('permitir_registro_padres', e.target.checked)}
                  className="w-4 h-4 accent-primary rounded"
                />
                <span className="text-sm text-foreground">Permitir registro de padres</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.padres_ven_calificaciones}
                  onChange={(e) => handleChange('padres_ven_calificaciones', e.target.checked)}
                  className="w-4 h-4 accent-primary rounded"
                />
                <span className="text-sm text-foreground">Padres pueden ver calificaciones</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.padres_ven_asistencia}
                  onChange={(e) => handleChange('padres_ven_asistencia', e.target.checked)}
                  className="w-4 h-4 accent-primary rounded"
                />
                <span className="text-sm text-foreground">Padres pueden ver asistencia</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.padres_ven_tareas}
                  onChange={(e) => handleChange('padres_ven_tareas', e.target.checked)}
                  className="w-4 h-4 accent-primary rounded"
                />
                <span className="text-sm text-foreground">Padres pueden ver tareas</span>
              </label>
            </div>
          </section>

          {/* Sección: Notificaciones */}
          <section>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-3">
                <div className="p-2 bg-muted rounded-lg">
                  <Bell className="w-5 h-5 text-muted-foreground" />
                </div>
                Configuración de Notificaciones
              </h2>
            </div>
            <div className="bg-card border border-border/40 rounded-xl p-6 space-y-5">
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.notificacion_inasistencia}
                    onChange={(e) => handleChange('notificacion_inasistencia', e.target.checked)}
                    className="w-4 h-4 accent-primary rounded"
                  />
                  <span className="text-sm text-foreground">Notificar inasistencias</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.notificacion_calificacion_baja}
                    onChange={(e) => handleChange('notificacion_calificacion_baja', e.target.checked)}
                    className="w-4 h-4 accent-primary rounded"
                  />
                  <span className="text-sm text-foreground">Notificar calificaciones bajas</span>
                </label>
              </div>

              <div className="border-t border-border/20 pt-4">
                <label className="block text-sm font-semibold text-foreground mb-2">Umbral de Calificación Baja</label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="20"
                    value={config.umbral_calificacion_baja}
                    onChange={(e) => handleChange('umbral_calificacion_baja', parseFloat(e.target.value))}
                    className="w-24 px-3 py-2 bg-background border border-border/40 rounded-lg text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"
                  />
                  <span className="text-sm text-muted-foreground/70">/ 20</span>
                </div>
              </div>
            </div>
          </section>

          {/* Sección: Información del Sistema */}
          <section>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-3">
                <div className="p-2 bg-muted rounded-lg">
                  <Settings className="w-5 h-5 text-muted-foreground" />
                </div>
                Sistema
              </h2>
            </div>
            <div className="bg-card border border-border/40 rounded-xl p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Idioma</label>
                  <select
                    value={config.idioma}
                    onChange={(e) => handleChange('idioma', e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-border/40 rounded-lg text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"
                  >
                    <option value="es">Español</option>
                    <option value="en">English</option>
                    <option value="pt">Português</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Zona Horaria</label>
                  <select
                    value={config.zona_horaria}
                    onChange={(e) => handleChange('zona_horaria', e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-border/40 rounded-lg text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"
                  >
                    <option value="America/Lima">Lima (UTC-5)</option>
                    <option value="America/Bogota">Bogotá (UTC-5)</option>
                    <option value="America/Buenos_Aires">Buenos Aires (UTC-3)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Mantener Registros Por</label>
                  <select
                    value={config.mantener_registros_anos}
                    onChange={(e) => handleChange('mantener_registros_anos', parseInt(e.target.value))}
                    className="w-full px-3 py-2 bg-background border border-border/40 rounded-lg text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"
                  >
                    <option value={1}>1 año</option>
                    <option value={3}>3 años</option>
                    <option value={5}>5 años</option>
                    <option value={7}>7 años</option>
                    <option value={10}>10 años</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* Footer - Save Button */}
      <div className="border-t border-border/40 bg-background/80 px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            {saved ? (
              <span className="text-sm text-green-600 font-semibold">Configuración guardada correctamente</span>
            ) : (
              <span className="text-sm text-muted-foreground/70">Los cambios aún no se han guardado</span>
            )}
          </div>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold text-sm"
          >
            <Save className="w-4 h-4" />
            Guardar Configuración
          </button>
        </div>
      </div>
    </div>
  );
}
