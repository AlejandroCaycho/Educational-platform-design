// Re-export all types
export * from './types'

// Re-export all data
export * from './data'

// Import data for calculations
import {
  estudiantes,
  profesores,
  grados,
  materias,
  asistencias,
  calificaciones,
  tareas,
  incidencias,
  eventos,
  mensajes,
} from './data'

import type { EstadisticasDashboard } from './types'

// ============================================
// FUNCIONES DE CALCULO Y UTILIDADES
// ============================================

/**
 * Calcula las estadísticas generales del dashboard
 */
export function calcularEstadisticasDashboard(): EstadisticasDashboard {
  const estudiantesActivos = estudiantes.filter(e => e.estado_academico === 'activo')
  const hoy = new Date().toISOString().split('T')[0]
  const asistenciasHoy = asistencias.filter(a => a.fecha === '2025-05-01')
  const presentesHoy = asistenciasHoy.filter(a => a.estado === 'presente' || a.estado === 'tarde')
  
  const promedios = estudiantes
    .filter(e => e.promedio_general > 0)
    .map(e => e.promedio_general)
  const promedioGeneral = promedios.length > 0 
    ? Math.round((promedios.reduce((a, b) => a + b, 0) / promedios.length) * 10) / 10 
    : 0

  const estudiantesEnRiesgo = estudiantes.filter(e => e.promedio_general < 11 && e.promedio_general > 0).length
  
  const eventosProximos = eventos.filter(e => {
    const fechaEvento = new Date(e.fecha_inicio)
    const ahora = new Date('2025-05-01')
    const enUnaSemana = new Date(ahora)
    enUnaSemana.setDate(ahora.getDate() + 7)
    return fechaEvento >= ahora && fechaEvento <= enUnaSemana
  }).length

  const mensajesNoLeidos = mensajes.filter(m => !m.leido).length
  const incidenciasAbiertas = incidencias.filter(i => i.estado === 'abierta' || i.estado === 'en_seguimiento').length
  const tareasPendientes = tareas.filter(t => t.estado === 'publicada' && new Date(t.fecha_vencimiento) >= new Date('2025-05-01')).length

  return {
    totalEstudiantes: estudiantes.length,
    estudiantesActivos: estudiantesActivos.length,
    estudiantesInactivos: estudiantes.length - estudiantesActivos.length,
    totalProfesores: profesores.filter(p => p.estado_laboral === 'activo').length,
    totalMaterias: materias.filter(m => m.activa).length,
    totalGrados: grados.filter(g => g.activo).length,
    asistenciaHoy: presentesHoy.length,
    porcentajeAsistencia: asistenciasHoy.length > 0 
      ? Math.round((presentesHoy.length / asistenciasHoy.length) * 100) 
      : 95,
    tareasPendientes,
    incidenciasAbiertas,
    promedioGeneral,
    estudiantesEnRiesgo,
    eventosProximos,
    mensajesNoLeidos,
  }
}

/**
 * Obtiene estudiantes filtrados por grado
 */
export function getEstudiantesPorGrado(gradoId: number) {
  return estudiantes.filter(e => e.grado_id === gradoId)
}

/**
 * Obtiene estudiantes filtrados por nivel
 */
export function getEstudiantesPorNivel(nivel: string) {
  return estudiantes.filter(e => e.nivel === nivel)
}

/**
 * Obtiene calificaciones de un estudiante
 */
export function getCalificacionesEstudiante(estudianteId: number) {
  return calificaciones.filter(c => c.estudiante_id === estudianteId)
}

/**
 * Obtiene asistencia de un estudiante
 */
export function getAsistenciaEstudiante(estudianteId: number) {
  return asistencias.filter(a => a.estudiante_id === estudianteId)
}

/**
 * Calcula el porcentaje de asistencia de un estudiante
 */
export function calcularPorcentajeAsistencia(estudianteId: number): number {
  const asistenciasEst = getAsistenciaEstudiante(estudianteId)
  if (asistenciasEst.length === 0) return 100
  
  const presentes = asistenciasEst.filter(a => a.estado === 'presente' || a.estado === 'tarde' || a.estado === 'justificado')
  return Math.round((presentes.length / asistenciasEst.length) * 100)
}

/**
 * Calcula el promedio de calificaciones de un estudiante
 */
export function calcularPromedioEstudiante(estudianteId: number): number {
  const cals = getCalificacionesEstudiante(estudianteId)
  if (cals.length === 0) return 0
  
  const suma = cals.reduce((acc, c) => acc + c.calificacion, 0)
  return Math.round((suma / cals.length) * 10) / 10
}

/**
 * Obtiene tareas de una clase
 */
export function getTareasPorClase(claseId: number) {
  return tareas.filter(t => t.clase_id === claseId)
}

/**
 * Obtiene incidencias de un estudiante
 */
export function getIncidenciasEstudiante(estudianteId: number) {
  return incidencias.filter(i => i.estudiante_id === estudianteId)
}

/**
 * Obtiene eventos de la semana
 */
export function getEventosSemana(fechaBase: string = '2025-05-01') {
  const inicio = new Date(fechaBase)
  const fin = new Date(fechaBase)
  fin.setDate(inicio.getDate() + 7)
  
  return eventos.filter(e => {
    const fecha = new Date(e.fecha_inicio)
    return fecha >= inicio && fecha <= fin
  })
}

/**
 * Obtiene estudiantes en riesgo académico (promedio < 11)
 */
export function getEstudiantesEnRiesgo() {
  return estudiantes.filter(e => e.promedio_general > 0 && e.promedio_general < 11)
}

/**
 * Busca estudiantes por nombre
 */
export function buscarEstudiantes(termino: string) {
  const terminoLower = termino.toLowerCase()
  return estudiantes.filter(e => 
    e.nombre_completo.toLowerCase().includes(terminoLower) ||
    e.codigo_estudiante.toLowerCase().includes(terminoLower) ||
    e.documento_identidad.includes(termino)
  )
}

/**
 * Busca profesores por nombre o especialidad
 */
export function buscarProfesores(termino: string) {
  const terminoLower = termino.toLowerCase()
  return profesores.filter(p => 
    p.nombre_completo.toLowerCase().includes(terminoLower) ||
    p.especialidad.toLowerCase().includes(terminoLower) ||
    p.email.toLowerCase().includes(terminoLower)
  )
}

/**
 * Genera un nuevo ID para una entidad
 */
export function generarNuevoId(entidad: 'estudiante' | 'profesor' | 'tarea' | 'incidencia' | 'evento' | 'mensaje'): number {
  switch (entidad) {
    case 'estudiante':
      return Math.max(...estudiantes.map(e => e.id), 0) + 1
    case 'profesor':
      return Math.max(...profesores.map(p => p.id), 0) + 1
    case 'tarea':
      return Math.max(...tareas.map(t => t.id), 0) + 1
    case 'incidencia':
      return Math.max(...incidencias.map(i => i.id), 0) + 1
    case 'evento':
      return Math.max(...eventos.map(e => e.id), 0) + 1
    case 'mensaje':
      return Math.max(...mensajes.map(m => m.id), 0) + 1
    default:
      return Date.now()
  }
}

/**
 * Genera número de matrícula automático
 */
export function generarNumeroMatricula(): string {
  const año = new Date().getFullYear()
  const siguiente = estudiantes.length + 1
  return `MAT-${año}-${String(siguiente).padStart(3, '0')}`
}

/**
 * Valida que el DNI sea único
 */
export function validarDNIUnico(dni: string, excluirId?: number): boolean {
  return !estudiantes.some(e => e.documento_identidad === dni && e.id !== excluirId)
}

/**
 * Obtiene la capacidad disponible de un grado
 */
export function getCapacidadDisponible(gradoId: number): number {
  const grado = grados.find(g => g.id === gradoId)
  if (!grado) return 0
  return grado.capacidad_max - grado.cantidad_estudiantes
}

/**
 * Formatea fecha para mostrar
 */
export function formatearFecha(fecha: string): string {
  const date = new Date(fecha)
  return date.toLocaleDateString('es-PE', { 
    day: '2-digit', 
    month: 'short', 
    year: 'numeric' 
  })
}

/**
 * Formatea fecha y hora
 */
export function formatearFechaHora(fecha: string): string {
  const date = new Date(fecha)
  return date.toLocaleDateString('es-PE', { 
    day: '2-digit', 
    month: 'short', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

/**
 * Obtiene el color de estado de calificación
 */
export function getColorCalificacion(nota: number): string {
  if (nota >= 17) return 'text-green-600 bg-green-50'
  if (nota >= 14) return 'text-blue-600 bg-blue-50'
  if (nota >= 11) return 'text-yellow-600 bg-yellow-50'
  return 'text-red-600 bg-red-50'
}

/**
 * Obtiene letra de calificación
 */
export function getLetraCalificacion(nota: number): string {
  if (nota >= 17) return 'AD'
  if (nota >= 14) return 'A'
  if (nota >= 11) return 'B'
  return 'C'
}

/**
 * Obtiene color de severidad de incidencia
 */
export function getColorSeveridad(severidad: string): string {
  switch (severidad) {
    case 'leve': return 'text-yellow-700 bg-yellow-100'
    case 'moderada': return 'text-orange-700 bg-orange-100'
    case 'grave': return 'text-red-700 bg-red-100'
    default: return 'text-gray-700 bg-gray-100'
  }
}

/**
 * Obtiene color de estado de incidencia
 */
export function getColorEstadoIncidencia(estado: string): string {
  switch (estado) {
    case 'abierta': return 'text-red-700 bg-red-100'
    case 'en_seguimiento': return 'text-yellow-700 bg-yellow-100'
    case 'cerrada': return 'text-green-700 bg-green-100'
    default: return 'text-gray-700 bg-gray-100'
  }
}
