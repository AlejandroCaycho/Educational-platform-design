// Tipos basados exactamente en las tablas SQL de EduNova

export interface Institucion {
  id: number
  uuid: string
  nombre: string
  nombre_corto: string
  email: string
  telefono: string
  direccion: string
  ciudad: string
  departamento: string
  pais: string
  logo_url: string
  tipo_institucion: string
  codigo_modular: string
  activa: boolean
  created_at: string
  updated_at: string
}

export interface NivelEducativo {
  id: number
  institucion_id: number
  nombre: string
  orden: number
  descripcion: string
  edad_minima: number
  edad_maxima: number
  activo: boolean
}

export interface Grado {
  id: number
  institucion_id: number
  nivel_id: number
  nombre: string
  seccion: string
  orden: number
  turno: 'manana' | 'tarde'
  capacidad_max: number
  activo: boolean
  // Datos denormalizados para UI
  nivel_nombre: string
  cantidad_estudiantes: number
  tutor_nombre?: string
}

export interface Materia {
  id: number
  institucion_id: number
  nivel_id: number
  nombre: string
  codigo: string
  descripcion: string
  creditos: number
  horas_semana: number
  color: string
  es_obligatoria: boolean
  activa: boolean
  nivel_nombre: string
}

export interface PeriodoAcademico {
  id: number
  institucion_id: number
  ano_academico_id: number
  nombre: string
  fecha_inicio: string
  fecha_fin: string
  activo: boolean
  orden: number
}

export interface AnoAcademico {
  id: number
  institucion_id: number
  nombre: string
  fecha_inicio: string
  fecha_fin: string
  activo: boolean
}

export interface Usuario {
  id: number
  uuid: string
  institucion_id: number
  nombre: string
  email: string
  telefono: string
  estado: 'activo' | 'inactivo' | 'suspendido'
  ultimo_acceso: string
  roles: string[]
  avatar_url?: string
  created_at: string
}

export interface Persona {
  id: number
  usuario_id?: number
  institucion_id: number
  tipo_persona: 'docente' | 'estudiante' | 'padre' | 'administrativo'
  primer_nombre: string
  segundo_nombre?: string
  primer_apellido: string
  segundo_apellido?: string
  documento_tipo: 'DNI' | 'CE' | 'PASAPORTE'
  documento_identidad: string
  fecha_nacimiento: string
  genero: 'M' | 'F'
  foto_url?: string
  telefono_personal?: string
  direccion?: string
  ciudad?: string
  departamento?: string
  email_personal?: string
  created_at: string
}

export interface Estudiante {
  id: number
  persona_id: number
  grado_id: number
  ano_academico_id: number
  numero_matricula: string
  codigo_estudiante: string
  fecha_ingreso: string
  estado_academico: 'activo' | 'retirado' | 'egresado' | 'trasladado'
  promedio_general: number
  posicion_ranking: number
  // Datos denormalizados para UI
  nombre_completo: string
  documento_identidad: string
  fecha_nacimiento: string
  genero: 'M' | 'F'
  grado_nombre: string
  seccion: string
  nivel: string
  turno: 'manana' | 'tarde'
  direccion?: string
  telefono_apoderado?: string
  nombre_apoderado?: string
  email_apoderado?: string
  foto_url?: string
  alergias?: string
  tipo_sangre?: string
  condicion_medica?: string
  contacto_emergencia?: string
  telefono_emergencia?: string
}

export interface Profesor {
  id: number
  persona_id: number
  numero_empleado: string
  tipo_contrato: 'Nombrado' | 'Contratado' | 'Practicante'
  especialidad: string
  titulo_academico: string
  fecha_ingreso: string
  estado_laboral: 'activo' | 'licencia' | 'cesado'
  carga_horaria_max: number
  carga_horaria_actual: number
  // Datos denormalizados
  nombre_completo: string
  documento_identidad: string
  email: string
  telefono?: string
  foto_url?: string
  materias: string[]
  grados_asignados: string[]
}

export interface Clase {
  id: number
  materia_id: number
  grado_id: number
  profesor_id: number
  periodo_id: number
  nombre: string
  descripcion: string
  horario: string
  aula: string
  activa: boolean
  // Denormalizados
  materia_nombre: string
  grado_nombre: string
  profesor_nombre: string
  periodo_nombre: string
}

export interface Calificacion {
  id: number
  estudiante_id: number
  clase_id: number
  periodo_id: number
  criterio_id?: number
  tipo: 'examen' | 'practica' | 'tarea' | 'participacion' | 'proyecto'
  calificacion: number
  calificacion_letra?: string
  peso: number
  observaciones?: string
  fecha_registro: string
  registrado_por: number
  // Denormalizados
  estudiante_nombre: string
  materia_nombre: string
  periodo_nombre: string
  criterio_nombre?: string
}

export interface CriterioEvaluacion {
  id: number
  clase_id: number
  nombre: string
  descripcion: string
  peso_porcentaje: number
  orden: number
}

export interface Asistencia {
  id: number
  estudiante_id: number
  clase_id: number
  fecha: string
  estado: 'presente' | 'ausente' | 'tarde' | 'justificado'
  minutos_tarde?: number
  motivo_inasistencia?: string
  justificacion?: string
  registrado_por: number
  // Denormalizados
  estudiante_nombre: string
  materia_nombre: string
  grado_nombre: string
}

export interface Tarea {
  id: number
  clase_id: number
  titulo: string
  descripcion: string
  instrucciones?: string
  fecha_asignacion: string
  fecha_vencimiento: string
  valor_puntos: number
  estado: 'borrador' | 'publicada' | 'cerrada'
  visible_padres: boolean
  archivos_adjuntos?: string[]
  created_at: string
  // Denormalizados
  materia_nombre: string
  grado_nombre: string
  profesor_nombre: string
  entregas_count: number
  entregas_calificadas: number
}

export interface EntregaTarea {
  id: number
  tarea_id: number
  estudiante_id: number
  contenido?: string
  archivos_adjuntos?: string[]
  fecha_entrega: string
  calificacion?: number
  retroalimentacion?: string
  estado: 'pendiente' | 'entregada' | 'calificada' | 'devuelta'
  // Denormalizados
  estudiante_nombre: string
  a_tiempo: boolean
}

export interface Incidencia {
  id: number
  estudiante_id: number
  reportador_id: number
  tipo: 'disciplinaria' | 'academica' | 'emocional' | 'salud' | 'familiar'
  titulo: string
  descripcion: string
  severidad: 'leve' | 'moderada' | 'grave'
  fecha_incidencia: string
  hora_incidencia?: string
  lugar: string
  testigos?: string
  acciones_tomadas?: string
  estado: 'abierta' | 'en_seguimiento' | 'cerrada'
  notificado_padre: boolean
  fecha_notificacion?: string
  seguimiento?: IncidenciaSeguimiento[]
  created_at: string
  // Denormalizados
  estudiante_nombre: string
  reportador_nombre: string
  grado_nombre: string
}

export interface IncidenciaSeguimiento {
  id: number
  incidencia_id: number
  descripcion: string
  accion: string
  fecha: string
  realizado_por: string
}

export interface Evento {
  id: number
  institucion_id: number
  organizador_id: number
  titulo: string
  descripcion: string
  tipo: 'academico' | 'deportivo' | 'cultural' | 'reunion' | 'feriado' | 'evaluacion'
  fecha_inicio: string
  fecha_fin?: string
  hora_inicio: string
  hora_fin?: string
  ubicacion: string
  estado: 'programado' | 'en_curso' | 'completado' | 'cancelado'
  participantes_tipo: 'todos' | 'docentes' | 'estudiantes' | 'padres' | 'grado_especifico'
  grado_id?: number
  color: string
  // Denormalizados
  organizador_nombre: string
}

export interface Mensaje {
  id: number
  remitente_id: number
  destinatario_id?: number
  grupo_destinatarios?: string
  asunto: string
  contenido: string
  es_importante: boolean
  es_urgente: boolean
  tipo: 'individual' | 'grupal' | 'broadcast'
  categoria: 'general' | 'academico' | 'administrativo' | 'urgente'
  archivos_adjuntos?: string[]
  created_at: string
  leido: boolean
  fecha_lectura?: string
  // Denormalizados
  remitente_nombre: string
  remitente_rol: string
  remitente_avatar?: string
  destinatario_nombre?: string
}

export interface HorarioClase {
  id: number
  clase_id: number
  dia_semana: 0 | 1 | 2 | 3 | 4 | 5 | 6
  hora_inicio: string
  hora_fin: string
  aula: string
  // Denormalizados
  materia_nombre: string
  profesor_nombre: string
  grado_nombre: string
  color: string
}

// Tipos para estadísticas del dashboard
export interface EstadisticasDashboard {
  totalEstudiantes: number
  estudiantesActivos: number
  estudiantesInactivos: number
  totalProfesores: number
  totalMaterias: number
  totalGrados: number
  asistenciaHoy: number
  porcentajeAsistencia: number
  tareasPendientes: number
  incidenciasAbiertas: number
  promedioGeneral: number
  estudiantesEnRiesgo: number
  eventosProximos: number
  mensajesNoLeidos: number
}

// Estado global para el store
export interface MockDataState {
  institucion: Institucion
  niveles: NivelEducativo[]
  grados: Grado[]
  materias: Materia[]
  periodos: PeriodoAcademico[]
  anoAcademico: AnoAcademico
  estudiantes: Estudiante[]
  profesores: Profesor[]
  clases: Clase[]
  calificaciones: Calificacion[]
  asistencias: Asistencia[]
  tareas: Tarea[]
  entregas: EntregaTarea[]
  incidencias: Incidencia[]
  eventos: Evento[]
  mensajes: Mensaje[]
  horarios: HorarioClase[]
  usuarios: Usuario[]
}
