'use client';

import React, { useState } from 'react';
import { Settings, Save, User, Building2, Bell, Palette, Clock, X, Check } from 'lucide-react';

export default function ConfiguracionPage() {
  const [activeTab, setActiveTab] = useState<'perfil' | 'institucion'>('perfil');
  const [showModal, setShowModal] = useState(false);

  // Perfil usuario
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

  // Configuración institución
  const [institucion, setInstitucion] = useState({
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

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="px-8 py-5 border-b border-border/40">
        <h1 className="text-2xl font-bold text-foreground">Configuración</h1>
        <p className="text-sm text-muted-foreground mt-1">Administra perfil y configuración de institución</p>
      </div>

      {/* Tabs */}
      <div className="px-8 py-3 border-b border-border/40 flex gap-8">
        <button
          onClick={() => setActiveTab('perfil')}
          className={`flex items-center gap-2 pb-2 border-b-2 transition-colors ${
            activeTab === 'perfil'
              ? 'text-foreground border-primary'
              : 'text-muted-foreground border-transparent hover:text-foreground'
          }`}
        >
          <User className="w-4 h-4" />
          Mi Perfil
        </button>
        <button
          onClick={() => setActiveTab('institucion')}
          className={`flex items-center gap-2 pb-2 border-b-2 transition-colors ${
            activeTab === 'institucion'
              ? 'text-foreground border-primary'
              : 'text-muted-foreground border-transparent hover:text-foreground'
          }`}
        >
          <Building2 className="w-4 h-4" />
          Institución
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        {activeTab === 'perfil' && (
          <div className="max-w-2xl">
            <h2 className="text-lg font-semibold text-foreground mb-6">Información Personal</h2>

            <div className="space-y-6">
              {/* Datos Personales */}
              <div className="bg-card border border-border/40 rounded-lg p-6">
                <h3 className="text-sm font-semibold text-foreground mb-4">Datos Personales</h3>
                <div className="space-y-4">
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
                  <div className="grid grid-cols-2 gap-4">
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
              </div>

              {/* Estudiante Asignado */}
              <div className="bg-card border border-border/40 rounded-lg p-6">
                <h3 className="text-sm font-semibold text-foreground mb-4">Estudiante Asignado</h3>
                <div className="space-y-4">
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

              {/* Notificaciones */}
              <div className="bg-card border border-border/40 rounded-lg p-6">
                <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  Preferencias de Notificaciones
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-foreground mb-3">Canales</p>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          name="notificacionesEmail"
                          checked={perfil.notificacionesEmail}
                          onChange={handleChangeProfile}
                          className="w-4 h-4 accent-primary rounded"
                        />
                        <span className="text-sm text-foreground">Notificaciones por Email</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          name="notificacionesSMS"
                          checked={perfil.notificacionesSMS}
                          onChange={handleChangeProfile}
                          className="w-4 h-4 accent-primary rounded"
                        />
                        <span className="text-sm text-foreground">Notificaciones por SMS</span>
                      </label>
                    </div>
                  </div>

                  <div className="border-t border-border/20 pt-4">
                    <p className="text-xs font-semibold text-foreground mb-3">Tipos de Notificación</p>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          name="notificacionesAsistencia"
                          checked={perfil.notificacionesAsistencia}
                          onChange={handleChangeProfile}
                          className="w-4 h-4 accent-primary rounded"
                        />
                        <span className="text-sm text-foreground">Cambios de Asistencia</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          name="notificacionesCalificaciones"
                          checked={perfil.notificacionesCalificaciones}
                          onChange={handleChangeProfile}
                          className="w-4 h-4 accent-primary rounded"
                        />
                        <span className="text-sm text-foreground">Nuevas Calificaciones</span>
                      </label>
                      <label className="flex items-center gap-3">
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
            </div>
          </div>
        )}

        {activeTab === 'institucion' && (
          <div className="max-w-2xl">
            <h2 className="text-lg font-semibold text-foreground mb-6">Configuración de la Institución</h2>

            <div className="space-y-6">
              {/* Apariencia */}
              <div className="bg-card border border-border/40 rounded-lg p-6">
                <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Tema y Apariencia
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-2">Color Primario</label>
                      <div className="flex gap-2 items-center">
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
                      <div className="flex gap-2 items-center">
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
              </div>

              {/* Horario Escolar */}
              <div className="bg-card border border-border/40 rounded-lg p-6">
                <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Horario Escolar
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-2">Hora de Inicio</label>
                    <input
                      type="time"
                      value={institucion.horario_inicio}
                      onChange={(e) => handleChangeInst('horario_inicio', e.target.value)}
                      className="w-full px-3 py-2 bg-background border border-border/40 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-2">Hora de Fin</label>
                    <input
                      type="time"
                      value={institucion.horario_fin}
                      onChange={(e) => handleChangeInst('horario_fin', e.target.value)}
                      className="w-full px-3 py-2 bg-background border border-border/40 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                </div>
              </div>

              {/* Acceso Padres */}
              <div className="bg-card border border-border/40 rounded-lg p-6">
                <h3 className="text-sm font-semibold text-foreground mb-4">Permisos de Padres</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={institucion.permitir_registro_padres}
                      onChange={(e) => handleChangeInst('permitir_registro_padres', e.target.checked)}
                      className="w-4 h-4 accent-primary rounded"
                    />
                    <span className="text-sm text-foreground">Permitir registro de padres</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={institucion.padres_ven_calificaciones}
                      onChange={(e) => handleChangeInst('padres_ven_calificaciones', e.target.checked)}
                      className="w-4 h-4 accent-primary rounded"
                    />
                    <span className="text-sm text-foreground">Ver calificaciones</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={institucion.padres_ven_asistencia}
                      onChange={(e) => handleChangeInst('padres_ven_asistencia', e.target.checked)}
                      className="w-4 h-4 accent-primary rounded"
                    />
                    <span className="text-sm text-foreground">Ver asistencia</span>
                  </label>
                  <label className="flex items-center gap-3">
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

              {/* Notificaciones Sistema */}
              <div className="bg-card border border-border/40 rounded-lg p-6">
                <h3 className="text-sm font-semibold text-foreground mb-4">Notificaciones del Sistema</h3>
                <div className="space-y-4">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={institucion.notificacion_inasistencia}
                      onChange={(e) => handleChangeInst('notificacion_inasistencia', e.target.checked)}
                      className="w-4 h-4 accent-primary rounded"
                    />
                    <span className="text-sm text-foreground">Notificar inasistencia</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={institucion.notificacion_calificacion_baja}
                      onChange={(e) => handleChangeInst('notificacion_calificacion_baja', e.target.checked)}
                      className="w-4 h-4 accent-primary rounded"
                    />
                    <span className="text-sm text-foreground">Notificar calificación baja</span>
                  </label>
                  <div className="mt-4 pt-4 border-t border-border/20">
                    <label className="block text-xs font-semibold text-foreground mb-2">Umbral de Calificación Baja</label>
                    <input
                      type="number"
                      value={institucion.umbral_calificacion_baja}
                      onChange={(e) => handleChangeInst('umbral_calificacion_baja', parseFloat(e.target.value))}
                      step="0.5"
                      className="w-full px-3 py-2 bg-background border border-border/40 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                </div>
              </div>

              {/* Regional */}
              <div className="bg-card border border-border/40 rounded-lg p-6">
                <h3 className="text-sm font-semibold text-foreground mb-4">Configuración Regional</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-2">Idioma</label>
                      <select
                        value={institucion.idioma}
                        onChange={(e) => handleChangeInst('idioma', e.target.value)}
                        className="w-full px-3 py-2 bg-background border border-border/40 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                      >
                        <option value="es">Español</option>
                        <option value="en">English</option>
                        <option value="pt">Português</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-2">Zona Horaria</label>
                      <select
                        value={institucion.zona_horaria}
                        onChange={(e) => handleChangeInst('zona_horaria', e.target.value)}
                        className="w-full px-3 py-2 bg-background border border-border/40 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                      >
                        <option value="America/Lima">America/Lima</option>
                        <option value="America/Bogota">America/Bogota</option>
                        <option value="America/Santiago">America/Santiago</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-2">Mantener Registros (años)</label>
                    <input
                      type="number"
                      value={institucion.mantener_registros_anos}
                      onChange={(e) => handleChangeInst('mantener_registros_anos', parseInt(e.target.value))}
                      className="w-full px-3 py-2 bg-background border border-border/40 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-border/40 bg-background/80 px-8 py-4">
        <div className="flex items-center justify-between max-w-2xl">
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
