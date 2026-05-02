import type {
  Institucion,
  NivelEducativo,
  Grado,
  Materia,
  PeriodoAcademico,
  AnoAcademico,
  Estudiante,
  Profesor,
  Clase,
  Calificacion,
  Asistencia,
  Tarea,
  EntregaTarea,
  Incidencia,
  Evento,
  Mensaje,
  HorarioClase,
  Usuario,
} from './types'

// ============================================
// INSTITUCION PRINCIPAL
// ============================================
export const institucion: Institucion = {
  id: 1,
  uuid: 'inst-001-sanjose',
  nombre: 'Institucion Educativa Publica N 1234 "San Jose"',
  nombre_corto: 'I.E. San Jose',
  email: 'direccion@iesanjose.edu.pe',
  telefono: '01-4567890',
  direccion: 'Av. Universitaria 1250, San Martin de Porres',
  ciudad: 'Lima',
  departamento: 'Lima',
  pais: 'Peru',
  logo_url: '/logo-institucion.png',
  tipo_institucion: 'Publica',
  codigo_modular: '0123456',
  activa: true,
  created_at: '2020-01-15',
  updated_at: '2025-03-01',
}

// ============================================
// NIVELES EDUCATIVOS
// ============================================
export const niveles: NivelEducativo[] = [
  { id: 1, institucion_id: 1, nombre: 'Inicial', orden: 1, descripcion: 'Educacion Inicial 5 anos', edad_minima: 5, edad_maxima: 6, activo: true },
  { id: 2, institucion_id: 1, nombre: 'Primaria', orden: 2, descripcion: 'Educacion Primaria', edad_minima: 6, edad_maxima: 12, activo: true },
  { id: 3, institucion_id: 1, nombre: 'Secundaria', orden: 3, descripcion: 'Educacion Secundaria', edad_minima: 12, edad_maxima: 17, activo: true },
]

// ============================================
// ANO Y PERIODOS ACADEMICOS
// ============================================
export const anoAcademico: AnoAcademico = {
  id: 1,
  institucion_id: 1,
  nombre: 'Ano Academico 2025',
  fecha_inicio: '2025-03-01',
  fecha_fin: '2025-12-20',
  activo: true,
}

export const periodos: PeriodoAcademico[] = [
  { id: 1, institucion_id: 1, ano_academico_id: 1, nombre: 'Primer Bimestre', fecha_inicio: '2025-03-01', fecha_fin: '2025-05-15', activo: false, orden: 1 },
  { id: 2, institucion_id: 1, ano_academico_id: 1, nombre: 'Segundo Bimestre', fecha_inicio: '2025-05-16', fecha_fin: '2025-07-31', activo: true, orden: 2 },
  { id: 3, institucion_id: 1, ano_academico_id: 1, nombre: 'Tercer Bimestre', fecha_inicio: '2025-08-01', fecha_fin: '2025-10-15', activo: false, orden: 3 },
  { id: 4, institucion_id: 1, ano_academico_id: 1, nombre: 'Cuarto Bimestre', fecha_inicio: '2025-10-16', fecha_fin: '2025-12-20', activo: false, orden: 4 },
]

// ============================================
// GRADOS Y SECCIONES
// ============================================
export const grados: Grado[] = [
  // Inicial
  { id: 1, institucion_id: 1, nivel_id: 1, nombre: '5 anos', seccion: 'A', orden: 1, turno: 'manana', capacidad_max: 25, activo: true, nivel_nombre: 'Inicial', cantidad_estudiantes: 22, tutor_nombre: 'Maria Elena Paredes' },
  { id: 2, institucion_id: 1, nivel_id: 1, nombre: '5 anos', seccion: 'B', orden: 1, turno: 'manana', capacidad_max: 25, activo: true, nivel_nombre: 'Inicial', cantidad_estudiantes: 20, tutor_nombre: 'Carmen Rosa Diaz' },
  // Primaria
  { id: 3, institucion_id: 1, nivel_id: 2, nombre: '1ro Primaria', seccion: 'A', orden: 1, turno: 'manana', capacidad_max: 30, activo: true, nivel_nombre: 'Primaria', cantidad_estudiantes: 28, tutor_nombre: 'Rosa Maria Gutierrez' },
  { id: 4, institucion_id: 1, nivel_id: 2, nombre: '1ro Primaria', seccion: 'B', orden: 1, turno: 'manana', capacidad_max: 30, activo: true, nivel_nombre: 'Primaria', cantidad_estudiantes: 27, tutor_nombre: 'Patricia Sanchez' },
  { id: 5, institucion_id: 1, nivel_id: 2, nombre: '2do Primaria', seccion: 'A', orden: 2, turno: 'manana', capacidad_max: 30, activo: true, nivel_nombre: 'Primaria', cantidad_estudiantes: 29, tutor_nombre: 'Ana Lucia Torres' },
  { id: 6, institucion_id: 1, nivel_id: 2, nombre: '2do Primaria', seccion: 'B', orden: 2, turno: 'manana', capacidad_max: 30, activo: true, nivel_nombre: 'Primaria', cantidad_estudiantes: 26, tutor_nombre: 'Julia Martinez' },
  { id: 7, institucion_id: 1, nivel_id: 2, nombre: '3ro Primaria', seccion: 'A', orden: 3, turno: 'manana', capacidad_max: 30, activo: true, nivel_nombre: 'Primaria', cantidad_estudiantes: 28, tutor_nombre: 'Gladys Quispe' },
  { id: 8, institucion_id: 1, nivel_id: 2, nombre: '4to Primaria', seccion: 'A', orden: 4, turno: 'manana', capacidad_max: 30, activo: true, nivel_nombre: 'Primaria', cantidad_estudiantes: 30, tutor_nombre: 'Norma Huaman' },
  { id: 9, institucion_id: 1, nivel_id: 2, nombre: '5to Primaria', seccion: 'A', orden: 5, turno: 'manana', capacidad_max: 30, activo: true, nivel_nombre: 'Primaria', cantidad_estudiantes: 27, tutor_nombre: 'Sonia Flores' },
  { id: 10, institucion_id: 1, nivel_id: 2, nombre: '6to Primaria', seccion: 'A', orden: 6, turno: 'manana', capacidad_max: 30, activo: true, nivel_nombre: 'Primaria', cantidad_estudiantes: 29, tutor_nombre: 'Luz Marina Vega' },
  // Secundaria
  { id: 11, institucion_id: 1, nivel_id: 3, nombre: '1ro Secundaria', seccion: 'A', orden: 1, turno: 'manana', capacidad_max: 35, activo: true, nivel_nombre: 'Secundaria', cantidad_estudiantes: 32, tutor_nombre: 'Juan Carlos Delgado' },
  { id: 12, institucion_id: 1, nivel_id: 3, nombre: '1ro Secundaria', seccion: 'B', orden: 1, turno: 'manana', capacidad_max: 35, activo: true, nivel_nombre: 'Secundaria', cantidad_estudiantes: 31, tutor_nombre: 'Pedro Castillo' },
  { id: 13, institucion_id: 1, nivel_id: 3, nombre: '2do Secundaria', seccion: 'A', orden: 2, turno: 'manana', capacidad_max: 35, activo: true, nivel_nombre: 'Secundaria', cantidad_estudiantes: 33, tutor_nombre: 'Miguel Ramirez' },
  { id: 14, institucion_id: 1, nivel_id: 3, nombre: '3ro Secundaria', seccion: 'A', orden: 3, turno: 'manana', capacidad_max: 35, activo: true, nivel_nombre: 'Secundaria', cantidad_estudiantes: 30, tutor_nombre: 'Carlos Mendoza' },
  { id: 15, institucion_id: 1, nivel_id: 3, nombre: '4to Secundaria', seccion: 'A', orden: 4, turno: 'manana', capacidad_max: 35, activo: true, nivel_nombre: 'Secundaria', cantidad_estudiantes: 28, tutor_nombre: 'Roberto Silva' },
  { id: 16, institucion_id: 1, nivel_id: 3, nombre: '5to Secundaria', seccion: 'A', orden: 5, turno: 'manana', capacidad_max: 35, activo: true, nivel_nombre: 'Secundaria', cantidad_estudiantes: 26, tutor_nombre: 'Fernando Vargas' },
]

// ============================================
// MATERIAS
// ============================================
export const materias: Materia[] = [
  { id: 1, institucion_id: 1, nivel_id: 3, nombre: 'Matematica', codigo: 'MAT', descripcion: 'Algebra, geometria y trigonometria', creditos: 4, horas_semana: 6, color: '#3B82F6', es_obligatoria: true, activa: true, nivel_nombre: 'Secundaria' },
  { id: 2, institucion_id: 1, nivel_id: 3, nombre: 'Comunicacion', codigo: 'COM', descripcion: 'Comprension lectora y produccion de textos', creditos: 4, horas_semana: 6, color: '#10B981', es_obligatoria: true, activa: true, nivel_nombre: 'Secundaria' },
  { id: 3, institucion_id: 1, nivel_id: 3, nombre: 'Ciencia y Tecnologia', codigo: 'CYT', descripcion: 'Fisica, quimica y biologia', creditos: 3, horas_semana: 4, color: '#8B5CF6', es_obligatoria: true, activa: true, nivel_nombre: 'Secundaria' },
  { id: 4, institucion_id: 1, nivel_id: 3, nombre: 'Ciencias Sociales', codigo: 'CCSS', descripcion: 'Historia, geografia y economia', creditos: 3, horas_semana: 4, color: '#F59E0B', es_obligatoria: true, activa: true, nivel_nombre: 'Secundaria' },
  { id: 5, institucion_id: 1, nivel_id: 3, nombre: 'Ingles', codigo: 'ING', descripcion: 'Idioma extranjero ingles', creditos: 2, horas_semana: 3, color: '#EF4444', es_obligatoria: true, activa: true, nivel_nombre: 'Secundaria' },
  { id: 6, institucion_id: 1, nivel_id: 3, nombre: 'Arte y Cultura', codigo: 'ART', descripcion: 'Expresion artistica y apreciacion cultural', creditos: 2, horas_semana: 2, color: '#EC4899', es_obligatoria: true, activa: true, nivel_nombre: 'Secundaria' },
  { id: 7, institucion_id: 1, nivel_id: 3, nombre: 'Educacion Fisica', codigo: 'EF', descripcion: 'Actividad fisica y deportes', creditos: 2, horas_semana: 2, color: '#06B6D4', es_obligatoria: true, activa: true, nivel_nombre: 'Secundaria' },
  { id: 8, institucion_id: 1, nivel_id: 3, nombre: 'Educacion Religiosa', codigo: 'REL', descripcion: 'Formacion en valores y espiritualidad', creditos: 1, horas_semana: 2, color: '#84CC16', es_obligatoria: false, activa: true, nivel_nombre: 'Secundaria' },
  { id: 9, institucion_id: 1, nivel_id: 3, nombre: 'Tutoria', codigo: 'TUT', descripcion: 'Orientacion y acompanamiento', creditos: 1, horas_semana: 1, color: '#64748B', es_obligatoria: true, activa: true, nivel_nombre: 'Secundaria' },
  { id: 10, institucion_id: 1, nivel_id: 2, nombre: 'Matematica', codigo: 'MAT-P', descripcion: 'Matematica para primaria', creditos: 4, horas_semana: 6, color: '#3B82F6', es_obligatoria: true, activa: true, nivel_nombre: 'Primaria' },
  { id: 11, institucion_id: 1, nivel_id: 2, nombre: 'Comunicacion', codigo: 'COM-P', descripcion: 'Comunicacion para primaria', creditos: 4, horas_semana: 6, color: '#10B981', es_obligatoria: true, activa: true, nivel_nombre: 'Primaria' },
  { id: 12, institucion_id: 1, nivel_id: 2, nombre: 'Personal Social', codigo: 'PS', descripcion: 'Desarrollo personal y ciudadania', creditos: 3, horas_semana: 3, color: '#F59E0B', es_obligatoria: true, activa: true, nivel_nombre: 'Primaria' },
]

// ============================================
// PROFESORES (15)
// ============================================
export const profesores: Profesor[] = [
  { id: 1, persona_id: 101, numero_empleado: 'DOC-001', tipo_contrato: 'Nombrado', especialidad: 'Matematica', titulo_academico: 'Licenciado en Educacion Matematica', fecha_ingreso: '2015-03-01', estado_laboral: 'activo', carga_horaria_max: 30, carga_horaria_actual: 28, nombre_completo: 'Rosa Maria Gutierrez Espinoza', documento_identidad: '10234567', email: 'rgutierrez@iesanjose.edu.pe', telefono: '987654321', foto_url: '/avatars/profesor-1.jpg', materias: ['Matematica', 'Razonamiento Matematico'], grados_asignados: ['1ro Sec A', '2do Sec A', '3ro Sec A'] },
  { id: 2, persona_id: 102, numero_empleado: 'DOC-002', tipo_contrato: 'Nombrado', especialidad: 'Comunicacion', titulo_academico: 'Licenciada en Lengua y Literatura', fecha_ingreso: '2012-03-01', estado_laboral: 'activo', carga_horaria_max: 30, carga_horaria_actual: 26, nombre_completo: 'Juan Carlos Delgado Vera', documento_identidad: '10345678', email: 'jdelgado@iesanjose.edu.pe', telefono: '987654322', materias: ['Comunicacion', 'Plan Lector'], grados_asignados: ['1ro Sec A', '1ro Sec B', '2do Sec A'] },
  { id: 3, persona_id: 103, numero_empleado: 'DOC-003', tipo_contrato: 'Nombrado', especialidad: 'Ciencias Naturales', titulo_academico: 'Licenciado en Biologia', fecha_ingreso: '2010-03-01', estado_laboral: 'activo', carga_horaria_max: 30, carga_horaria_actual: 24, nombre_completo: 'Patricia Elena Ramirez Condori', documento_identidad: '10456789', email: 'pramirez@iesanjose.edu.pe', telefono: '987654323', materias: ['Ciencia y Tecnologia'], grados_asignados: ['3ro Sec A', '4to Sec A', '5to Sec A'] },
  { id: 4, persona_id: 104, numero_empleado: 'DOC-004', tipo_contrato: 'Contratado', especialidad: 'Historia', titulo_academico: 'Licenciado en Historia', fecha_ingreso: '2020-03-01', estado_laboral: 'activo', carga_horaria_max: 24, carga_horaria_actual: 20, nombre_completo: 'Miguel Angel Castillo Huaman', documento_identidad: '10567890', email: 'mcastillo@iesanjose.edu.pe', telefono: '987654324', materias: ['Ciencias Sociales', 'Historia del Peru'], grados_asignados: ['1ro Sec A', '2do Sec A'] },
  { id: 5, persona_id: 105, numero_empleado: 'DOC-005', tipo_contrato: 'Nombrado', especialidad: 'Ingles', titulo_academico: 'Licenciada en Idiomas', fecha_ingreso: '2018-03-01', estado_laboral: 'activo', carga_horaria_max: 30, carga_horaria_actual: 22, nombre_completo: 'Ana Lucia Torres Mendez', documento_identidad: '10678901', email: 'atorres@iesanjose.edu.pe', telefono: '987654325', materias: ['Ingles'], grados_asignados: ['1ro Sec A', '1ro Sec B', '2do Sec A', '3ro Sec A'] },
  { id: 6, persona_id: 106, numero_empleado: 'DOC-006', tipo_contrato: 'Nombrado', especialidad: 'Educacion Fisica', titulo_academico: 'Licenciado en Educacion Fisica', fecha_ingreso: '2014-03-01', estado_laboral: 'activo', carga_horaria_max: 30, carga_horaria_actual: 20, nombre_completo: 'Carlos Alberto Mendoza Rios', documento_identidad: '10789012', email: 'cmendoza@iesanjose.edu.pe', telefono: '987654326', materias: ['Educacion Fisica'], grados_asignados: ['1ro Sec A', '1ro Sec B', '2do Sec A', '3ro Sec A', '4to Sec A', '5to Sec A'] },
  { id: 7, persona_id: 107, numero_empleado: 'DOC-007', tipo_contrato: 'Contratado', especialidad: 'Arte', titulo_academico: 'Licenciada en Artes Plasticas', fecha_ingreso: '2022-03-01', estado_laboral: 'activo', carga_horaria_max: 24, carga_horaria_actual: 18, nombre_completo: 'Valeria Sofia Paredes Luna', documento_identidad: '10890123', email: 'vparedes@iesanjose.edu.pe', telefono: '987654327', materias: ['Arte y Cultura'], grados_asignados: ['1ro Sec A', '2do Sec A', '3ro Sec A'] },
  { id: 8, persona_id: 108, numero_empleado: 'DOC-008', tipo_contrato: 'Nombrado', especialidad: 'Religion', titulo_academico: 'Licenciado en Ciencias Religiosas', fecha_ingreso: '2008-03-01', estado_laboral: 'activo', carga_horaria_max: 30, carga_horaria_actual: 16, nombre_completo: 'Pedro Pablo Sanchez Flores', documento_identidad: '10901234', email: 'psanchez@iesanjose.edu.pe', telefono: '987654328', materias: ['Educacion Religiosa'], grados_asignados: ['1ro Sec A', '1ro Sec B', '2do Sec A', '3ro Sec A', '4to Sec A', '5to Sec A'] },
  { id: 9, persona_id: 109, numero_empleado: 'DOC-009', tipo_contrato: 'Nombrado', especialidad: 'Matematica', titulo_academico: 'Magister en Didactica de la Matematica', fecha_ingreso: '2005-03-01', estado_laboral: 'activo', carga_horaria_max: 30, carga_horaria_actual: 28, nombre_completo: 'Fernando Jose Vargas Diaz', documento_identidad: '11012345', email: 'fvargas@iesanjose.edu.pe', telefono: '987654329', materias: ['Matematica', 'Algebra'], grados_asignados: ['4to Sec A', '5to Sec A'] },
  { id: 10, persona_id: 110, numero_empleado: 'DOC-010', tipo_contrato: 'Nombrado', especialidad: 'Comunicacion', titulo_academico: 'Licenciada en Comunicacion Social', fecha_ingreso: '2016-03-01', estado_laboral: 'activo', carga_horaria_max: 30, carga_horaria_actual: 26, nombre_completo: 'Maria Elena Quispe Mamani', documento_identidad: '11123456', email: 'mquispe@iesanjose.edu.pe', telefono: '987654330', materias: ['Comunicacion'], grados_asignados: ['3ro Sec A', '4to Sec A', '5to Sec A'] },
  { id: 11, persona_id: 111, numero_empleado: 'DOC-011', tipo_contrato: 'Contratado', especialidad: 'Informatica', titulo_academico: 'Ingeniero de Sistemas', fecha_ingreso: '2023-03-01', estado_laboral: 'activo', carga_horaria_max: 24, carga_horaria_actual: 20, nombre_completo: 'Diego Fernando Rojas Castro', documento_identidad: '11234567', email: 'drojas@iesanjose.edu.pe', telefono: '987654331', materias: ['Computacion', 'Tecnologia'], grados_asignados: ['1ro Sec A', '2do Sec A', '3ro Sec A'] },
  { id: 12, persona_id: 112, numero_empleado: 'DOC-012', tipo_contrato: 'Nombrado', especialidad: 'Primaria', titulo_academico: 'Licenciada en Educacion Primaria', fecha_ingreso: '2011-03-01', estado_laboral: 'activo', carga_horaria_max: 30, carga_horaria_actual: 30, nombre_completo: 'Gladys Norma Huaman Perez', documento_identidad: '11345678', email: 'ghuaman@iesanjose.edu.pe', telefono: '987654332', materias: ['Matematica', 'Comunicacion', 'Personal Social'], grados_asignados: ['3ro Prim A'] },
  { id: 13, persona_id: 113, numero_empleado: 'DOC-013', tipo_contrato: 'Nombrado', especialidad: 'Primaria', titulo_academico: 'Licenciada en Educacion Primaria', fecha_ingreso: '2009-03-01', estado_laboral: 'activo', carga_horaria_max: 30, carga_horaria_actual: 30, nombre_completo: 'Sonia Margarita Flores Vega', documento_identidad: '11456789', email: 'sflores@iesanjose.edu.pe', telefono: '987654333', materias: ['Matematica', 'Comunicacion', 'Personal Social'], grados_asignados: ['5to Prim A'] },
  { id: 14, persona_id: 114, numero_empleado: 'DOC-014', tipo_contrato: 'Nombrado', especialidad: 'Inicial', titulo_academico: 'Licenciada en Educacion Inicial', fecha_ingreso: '2013-03-01', estado_laboral: 'activo', carga_horaria_max: 30, carga_horaria_actual: 30, nombre_completo: 'Carmen Rosa Diaz Salazar', documento_identidad: '11567890', email: 'cdiaz@iesanjose.edu.pe', telefono: '987654334', materias: ['Inicial Integral'], grados_asignados: ['5 anos B'] },
  { id: 15, persona_id: 115, numero_empleado: 'DOC-015', tipo_contrato: 'Nombrado', especialidad: 'Inicial', titulo_academico: 'Licenciada en Educacion Inicial', fecha_ingreso: '2007-03-01', estado_laboral: 'licencia', carga_horaria_max: 30, carga_horaria_actual: 0, nombre_completo: 'Maria Elena Paredes Rojas', documento_identidad: '11678901', email: 'mparedes@iesanjose.edu.pe', telefono: '987654335', materias: ['Inicial Integral'], grados_asignados: ['5 anos A'] },
]

// ============================================
// ESTUDIANTES (150 - Generados con nombres peruanos)
// ============================================
const nombresEstudiantes = [
  'Carlos Alberto Mendoza Quispe', 'Maria Fernanda Huaman Torres', 'Luis Fernando Rojas Condori',
  'Ana Paula Diaz Mamani', 'Diego Alejandro Vargas Flores', 'Valeria Sofia Sanchez Paredes',
  'Jose Miguel Castro Rios', 'Camila Andrea Gutierrez Luna', 'Fernando Jose Ramirez Vega',
  'Lucia Valentina Torres Mendez', 'Pedro Pablo Flores Huaman', 'Isabella Maria Quispe Diaz',
  'Santiago Nicolas Paredes Castro', 'Mariana Sofia Condori Rojas', 'Mateo Alejandro Luna Vargas',
  'Daniela Fernanda Vega Sanchez', 'Sebastian Andres Mamani Torres', 'Gabriela Lucia Rios Gutierrez',
  'Nicolas Fernando Diaz Flores', 'Valentina Andrea Huaman Paredes', 'Adrian Jose Castro Quispe',
  'Sofia Alejandra Rojas Condori', 'Joaquin Sebastian Torres Luna', 'Emma Valentina Vargas Vega',
  'Leonardo David Sanchez Mamani', 'Renata Maria Flores Diaz', 'Matias Alejandro Gutierrez Rios',
  'Antonella Sofia Paredes Torres', 'Benjamin Nicolas Luna Castro', 'Victoria Andrea Quispe Rojas',
  'Thiago Fernando Condori Vargas', 'Mia Fernanda Vega Sanchez', 'Lucas Sebastian Mamani Flores',
  'Martina Lucia Diaz Gutierrez', 'Ian Alejandro Huaman Luna', 'Sara Valentina Castro Paredes',
  'Dylan Jose Rojas Torres', 'Emilia Sofia Vargas Quispe', 'Samuel Nicolas Sanchez Condori',
  'Catalina Maria Flores Vega', 'Alejandro David Torres Mamani', 'Paula Andrea Gutierrez Diaz',
  'Rodrigo Fernando Paredes Huaman', 'Julieta Sofia Luna Rojas', 'Gabriel Sebastian Castro Vargas',
  'Ariana Lucia Quispe Sanchez', 'Martin Alejandro Condori Flores', 'Luana Valentina Vega Torres',
  'Daniel Jose Mamani Gutierrez', 'Milagros Maria Diaz Paredes', 'Bruno Nicolas Huaman Castro',
  'Xiomara Andrea Rojas Luna', 'Felipe Sebastian Torres Quispe', 'Abril Sofia Vargas Condori',
  'Mauricio Fernando Sanchez Vega', 'Bianca Lucia Flores Mamani', 'Gonzalo Alejandro Gutierrez Diaz',
  'Renata Maria Paredes Huaman', 'Facundo Jose Luna Rojas', 'Micaela Valentina Castro Torres',
  'Ivan Nicolas Quispe Vargas', 'Florencia Sofia Condori Sanchez', 'Tomas Sebastian Vega Flores',
  'Agustina Andrea Mamani Gutierrez', 'Julian Fernando Diaz Paredes', 'Candela Maria Huaman Luna',
  'Maximo Alejandro Rojas Castro', 'Jazmin Sofia Torres Quispe', 'Santino Jose Vargas Condori',
  'Alma Lucia Sanchez Vega', 'Bautista Nicolas Flores Mamani', 'Delfina Valentina Gutierrez Diaz',
  'Lorenzo Sebastian Paredes Huaman', 'Uma Andrea Luna Rojas', 'Lautaro Fernando Castro Torres',
  'Helena Sofia Quispe Vargas', 'Benicio Alejandro Condori Sanchez', 'Amparo Maria Vega Flores',
  'Octavio Jose Mamani Gutierrez', 'Malena Lucia Diaz Paredes', 'Ciro Nicolas Huaman Luna',
  'Paloma Valentina Rojas Castro', 'Esteban Sebastian Torres Quispe', 'Aurelia Andrea Vargas Condori',
  'Franco Fernando Sanchez Vega', 'Giovanna Sofia Flores Mamani', 'Ramiro Alejandro Gutierrez Diaz',
  'Priscila Maria Paredes Huaman', 'Genaro Jose Luna Rojas', 'Clarisa Lucia Castro Torres',
  'Ignacio Nicolas Quispe Vargas', 'Estrella Valentina Condori Sanchez', 'Dario Sebastian Vega Flores',
  'Celeste Andrea Mamani Gutierrez', 'Hernan Fernando Diaz Paredes', 'Jazmina Sofia Huaman Luna',
  'Eliseo Alejandro Rojas Castro', 'Mercedes Maria Torres Quispe', 'Tadeo Jose Vargas Condori',
  'Gisela Lucia Sanchez Vega', 'Cristobal Nicolas Flores Mamani', 'Natalia Valentina Gutierrez Diaz',
  'Emiliano Sebastian Paredes Huaman', 'Silvana Andrea Luna Rojas', 'Rolando Fernando Castro Torres',
  'Vanessa Sofia Quispe Vargas', 'Enzo Alejandro Condori Sanchez', 'Maritza Maria Vega Flores',
  'Ricardo Jose Mamani Gutierrez', 'Karina Lucia Diaz Paredes', 'Walter Nicolas Huaman Luna',
  'Yessica Valentina Rojas Castro', 'Oscar Sebastian Torres Quispe', 'Fabiola Andrea Vargas Condori',
  'Julio Fernando Sanchez Vega', 'Roxana Sofia Flores Mamani', 'Andres Alejandro Gutierrez Diaz',
  'Marisol Maria Paredes Huaman', 'Hugo Jose Luna Rojas', 'Elizabeth Lucia Castro Torres',
  'Raul Nicolas Quispe Vargas', 'Carmen Valentina Condori Sanchez', 'Jorge Sebastian Vega Flores',
  'Teresa Andrea Mamani Gutierrez', 'Victor Fernando Diaz Paredes', 'Gloria Sofia Huaman Luna',
  'Eduardo Alejandro Rojas Castro', 'Rosa Maria Torres Quispe', 'Roberto Jose Vargas Condori',
  'Luisa Lucia Sanchez Vega', 'Alberto Nicolas Flores Mamani', 'Patricia Valentina Gutierrez Diaz',
  'Manuel Sebastian Paredes Huaman', 'Angela Andrea Luna Rojas', 'Francisco Fernando Castro Torres',
  'Beatriz Sofia Quispe Vargas', 'Antonio Alejandro Condori Sanchez', 'Dolores Maria Vega Flores',
  'Enrique Jose Mamani Gutierrez', 'Irma Lucia Diaz Paredes', 'Alfredo Nicolas Huaman Luna',
  'Esther Valentina Rojas Castro', 'Ramon Sebastian Torres Quispe', 'Juana Andrea Vargas Condori',
  'Cesar Fernando Sanchez Vega', 'Norma Sofia Flores Mamani', 'Pablo Alejandro Gutierrez Diaz',
  'Lidia Maria Paredes Huaman', 'Sergio Jose Luna Rojas',
]

function generarEstudiantes(): Estudiante[] {
  const estudiantes: Estudiante[] = []
  let id = 1

  // Distribuir estudiantes por grado
  const distribucion = [
    { grado_id: 1, grado_nombre: '5 anos', seccion: 'A', nivel: 'Inicial', turno: 'manana' as const, cantidad: 22 },
    { grado_id: 2, grado_nombre: '5 anos', seccion: 'B', nivel: 'Inicial', turno: 'manana' as const, cantidad: 20 },
    { grado_id: 3, grado_nombre: '1ro Primaria', seccion: 'A', nivel: 'Primaria', turno: 'manana' as const, cantidad: 15 },
    { grado_id: 11, grado_nombre: '1ro Secundaria', seccion: 'A', nivel: 'Secundaria', turno: 'manana' as const, cantidad: 32 },
    { grado_id: 12, grado_nombre: '1ro Secundaria', seccion: 'B', nivel: 'Secundaria', turno: 'manana' as const, cantidad: 31 },
    { grado_id: 13, grado_nombre: '2do Secundaria', seccion: 'A', nivel: 'Secundaria', turno: 'manana' as const, cantidad: 20 },
    { grado_id: 14, grado_nombre: '3ro Secundaria', seccion: 'A', nivel: 'Secundaria', turno: 'manana' as const, cantidad: 10 },
  ]

  let nombreIndex = 0
  for (const dist of distribucion) {
    for (let i = 0; i < dist.cantidad && nombreIndex < nombresEstudiantes.length; i++) {
      const promedio = Math.round((Math.random() * 10 + 10) * 10) / 10 // 10.0 - 20.0
      estudiantes.push({
        id,
        persona_id: id + 200,
        grado_id: dist.grado_id,
        ano_academico_id: 1,
        numero_matricula: `MAT-2025-${String(id).padStart(3, '0')}`,
        codigo_estudiante: `EST${String(id).padStart(4, '0')}`,
        fecha_ingreso: '2025-03-01',
        estado_academico: Math.random() > 0.05 ? 'activo' : 'retirado',
        promedio_general: promedio,
        posicion_ranking: i + 1,
        nombre_completo: nombresEstudiantes[nombreIndex],
        documento_identidad: `7${String(1000000 + id).substring(1)}`,
        fecha_nacimiento: `${2010 + Math.floor(Math.random() * 8)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
        genero: Math.random() > 0.5 ? 'M' : 'F',
        grado_nombre: dist.grado_nombre,
        seccion: dist.seccion,
        nivel: dist.nivel,
        turno: dist.turno,
        direccion: `Jr. Los Pinos ${100 + id}, San Martin de Porres`,
        telefono_apoderado: `9${String(10000000 + Math.floor(Math.random() * 89999999)).substring(0, 8)}`,
        nombre_apoderado: `${Math.random() > 0.5 ? 'Juan' : 'Maria'} ${nombresEstudiantes[nombreIndex].split(' ').slice(-2).join(' ')}`,
        email_apoderado: `apoderado${id}@gmail.com`,
        tipo_sangre: ['O+', 'A+', 'B+', 'AB+', 'O-'][Math.floor(Math.random() * 5)],
        contacto_emergencia: 'Familiar cercano',
        telefono_emergencia: `9${String(10000000 + Math.floor(Math.random() * 89999999)).substring(0, 8)}`,
      })
      id++
      nombreIndex++
    }
  }
  return estudiantes
}

export const estudiantes: Estudiante[] = generarEstudiantes()

// ============================================
// CLASES (combinacion materia-grado-profesor)
// ============================================
export const clases: Clase[] = [
  { id: 1, materia_id: 1, grado_id: 11, profesor_id: 1, periodo_id: 2, nombre: 'Matematica - 1ro Sec A', descripcion: 'Algebra y aritmetica basica', horario: 'Lun-Mie-Vie 8:00-9:30', aula: 'Aula 101', activa: true, materia_nombre: 'Matematica', grado_nombre: '1ro Secundaria A', profesor_nombre: 'Rosa Maria Gutierrez', periodo_nombre: 'Segundo Bimestre' },
  { id: 2, materia_id: 2, grado_id: 11, profesor_id: 2, periodo_id: 2, nombre: 'Comunicacion - 1ro Sec A', descripcion: 'Comprension lectora', horario: 'Mar-Jue 8:00-9:30', aula: 'Aula 101', activa: true, materia_nombre: 'Comunicacion', grado_nombre: '1ro Secundaria A', profesor_nombre: 'Juan Carlos Delgado', periodo_nombre: 'Segundo Bimestre' },
  { id: 3, materia_id: 3, grado_id: 11, profesor_id: 3, periodo_id: 2, nombre: 'CyT - 1ro Sec A', descripcion: 'Ciencias naturales', horario: 'Lun-Jue 10:00-11:00', aula: 'Lab. Ciencias', activa: true, materia_nombre: 'Ciencia y Tecnologia', grado_nombre: '1ro Secundaria A', profesor_nombre: 'Patricia Elena Ramirez', periodo_nombre: 'Segundo Bimestre' },
  { id: 4, materia_id: 4, grado_id: 11, profesor_id: 4, periodo_id: 2, nombre: 'CCSS - 1ro Sec A', descripcion: 'Historia y geografia', horario: 'Mar-Vie 10:00-11:00', aula: 'Aula 101', activa: true, materia_nombre: 'Ciencias Sociales', grado_nombre: '1ro Secundaria A', profesor_nombre: 'Miguel Angel Castillo', periodo_nombre: 'Segundo Bimestre' },
  { id: 5, materia_id: 5, grado_id: 11, profesor_id: 5, periodo_id: 2, nombre: 'Ingles - 1ro Sec A', descripcion: 'English basics', horario: 'Mie 10:00-12:00', aula: 'Aula 101', activa: true, materia_nombre: 'Ingles', grado_nombre: '1ro Secundaria A', profesor_nombre: 'Ana Lucia Torres', periodo_nombre: 'Segundo Bimestre' },
  { id: 6, materia_id: 1, grado_id: 12, profesor_id: 1, periodo_id: 2, nombre: 'Matematica - 1ro Sec B', descripcion: 'Algebra y aritmetica basica', horario: 'Lun-Mie-Vie 9:45-11:15', aula: 'Aula 102', activa: true, materia_nombre: 'Matematica', grado_nombre: '1ro Secundaria B', profesor_nombre: 'Rosa Maria Gutierrez', periodo_nombre: 'Segundo Bimestre' },
  { id: 7, materia_id: 2, grado_id: 12, profesor_id: 2, periodo_id: 2, nombre: 'Comunicacion - 1ro Sec B', descripcion: 'Comprension lectora', horario: 'Mar-Jue 9:45-11:15', aula: 'Aula 102', activa: true, materia_nombre: 'Comunicacion', grado_nombre: '1ro Secundaria B', profesor_nombre: 'Juan Carlos Delgado', periodo_nombre: 'Segundo Bimestre' },
  { id: 8, materia_id: 1, grado_id: 13, profesor_id: 1, periodo_id: 2, nombre: 'Matematica - 2do Sec A', descripcion: 'Ecuaciones y funciones', horario: 'Mar-Jue-Sab 8:00-9:30', aula: 'Aula 201', activa: true, materia_nombre: 'Matematica', grado_nombre: '2do Secundaria A', profesor_nombre: 'Rosa Maria Gutierrez', periodo_nombre: 'Segundo Bimestre' },
  { id: 9, materia_id: 1, grado_id: 14, profesor_id: 9, periodo_id: 2, nombre: 'Matematica - 3ro Sec A', descripcion: 'Algebra avanzada', horario: 'Lun-Mie-Vie 8:00-9:30', aula: 'Aula 301', activa: true, materia_nombre: 'Matematica', grado_nombre: '3ro Secundaria A', profesor_nombre: 'Fernando Jose Vargas', periodo_nombre: 'Segundo Bimestre' },
  { id: 10, materia_id: 2, grado_id: 13, profesor_id: 10, periodo_id: 2, nombre: 'Comunicacion - 2do Sec A', descripcion: 'Literatura peruana', horario: 'Lun-Mie 10:00-11:30', aula: 'Aula 201', activa: true, materia_nombre: 'Comunicacion', grado_nombre: '2do Secundaria A', profesor_nombre: 'Maria Elena Quispe', periodo_nombre: 'Segundo Bimestre' },
]

// ============================================
// CALIFICACIONES
// ============================================
function generarCalificaciones(): Calificacion[] {
  const calificaciones: Calificacion[] = []
  let id = 1

  // Solo para estudiantes de secundaria (grado_id >= 11)
  const estudiantesSecundaria = estudiantes.filter(e => e.grado_id >= 11)
  
  for (const est of estudiantesSecundaria) {
    // 4 materias principales por estudiante
    const materiasEstudiante = [1, 2, 3, 4] // MAT, COM, CYT, CCSS
    
    for (const materiaId of materiasEstudiante) {
      const materia = materias.find(m => m.id === materiaId)
      // 3-4 notas por materia por bimestre
      const numNotas = 3 + Math.floor(Math.random() * 2)
      
      for (let i = 0; i < numNotas; i++) {
        const tipos: Array<'examen' | 'practica' | 'tarea' | 'participacion'> = ['examen', 'practica', 'tarea', 'participacion']
        const nota = Math.round((Math.random() * 10 + 10) * 10) / 10 // 10-20
        
        calificaciones.push({
          id: id++,
          estudiante_id: est.id,
          clase_id: 1,
          periodo_id: 2,
          tipo: tipos[i % 4],
          calificacion: nota,
          calificacion_letra: nota >= 17 ? 'AD' : nota >= 14 ? 'A' : nota >= 11 ? 'B' : 'C',
          peso: tipos[i % 4] === 'examen' ? 30 : 20,
          observaciones: nota < 11 ? 'Necesita reforzamiento' : undefined,
          fecha_registro: `2025-0${4 + Math.floor(i / 2)}-${String(10 + i * 5).padStart(2, '0')}`,
          registrado_por: 1,
          estudiante_nombre: est.nombre_completo,
          materia_nombre: materia?.nombre || 'Matematica',
          periodo_nombre: 'Segundo Bimestre',
        })
      }
    }
  }
  return calificaciones
}

export const calificaciones: Calificacion[] = generarCalificaciones()

// ============================================
// ASISTENCIA
// ============================================
function generarAsistencia(): Asistencia[] {
  const asistencias: Asistencia[] = []
  let id = 1

  // Ultimos 20 dias de clase
  const fechas: string[] = []
  const hoy = new Date('2025-05-01')
  for (let i = 0; i < 20; i++) {
    const fecha = new Date(hoy)
    fecha.setDate(hoy.getDate() - i)
    if (fecha.getDay() !== 0 && fecha.getDay() !== 6) { // Sin fines de semana
      fechas.push(fecha.toISOString().split('T')[0])
    }
  }

  for (const est of estudiantes.slice(0, 100)) { // Solo primeros 100 para performance
    for (const fecha of fechas.slice(0, 10)) {
      const rand = Math.random()
      let estado: 'presente' | 'ausente' | 'tarde' | 'justificado' = 'presente'
      if (rand > 0.95) estado = 'ausente'
      else if (rand > 0.90) estado = 'tarde'
      else if (rand > 0.88) estado = 'justificado'

      asistencias.push({
        id: id++,
        estudiante_id: est.id,
        clase_id: 1,
        fecha,
        estado,
        minutos_tarde: estado === 'tarde' ? Math.floor(Math.random() * 15) + 5 : undefined,
        motivo_inasistencia: estado === 'ausente' ? 'Sin justificacion' : estado === 'justificado' ? 'Cita medica' : undefined,
        registrado_por: 1,
        estudiante_nombre: est.nombre_completo,
        materia_nombre: 'Matematica',
        grado_nombre: est.grado_nombre,
      })
    }
  }
  return asistencias
}

export const asistencias: Asistencia[] = generarAsistencia()

// ============================================
// TAREAS
// ============================================
export const tareas: Tarea[] = [
  { id: 1, clase_id: 1, titulo: 'Ejercicios de ecuaciones lineales', descripcion: 'Resolver los ejercicios del libro paginas 45-48', instrucciones: 'Mostrar todos los procedimientos. Presentar en hoja cuadriculada.', fecha_asignacion: '2025-04-15', fecha_vencimiento: '2025-04-22', valor_puntos: 20, estado: 'publicada', visible_padres: true, created_at: '2025-04-15', materia_nombre: 'Matematica', grado_nombre: '1ro Secundaria A', profesor_nombre: 'Rosa Maria Gutierrez', entregas_count: 28, entregas_calificadas: 25 },
  { id: 2, clase_id: 1, titulo: 'Problemas de razonamiento matematico', descripcion: 'Resolver problemas de logica y razonamiento', instrucciones: 'Trabajo individual. No copiar.', fecha_asignacion: '2025-04-20', fecha_vencimiento: '2025-04-27', valor_puntos: 15, estado: 'publicada', visible_padres: true, created_at: '2025-04-20', materia_nombre: 'Matematica', grado_nombre: '1ro Secundaria A', profesor_nombre: 'Rosa Maria Gutierrez', entregas_count: 20, entregas_calificadas: 0 },
  { id: 3, clase_id: 2, titulo: 'Ensayo: Mi Peru', descripcion: 'Escribir un ensayo sobre la identidad peruana', instrucciones: 'Minimo 500 palabras. Incluir bibliografia.', fecha_asignacion: '2025-04-18', fecha_vencimiento: '2025-04-30', valor_puntos: 20, estado: 'publicada', visible_padres: true, created_at: '2025-04-18', materia_nombre: 'Comunicacion', grado_nombre: '1ro Secundaria A', profesor_nombre: 'Juan Carlos Delgado', entregas_count: 15, entregas_calificadas: 10 },
  { id: 4, clase_id: 3, titulo: 'Informe de laboratorio: Celula', descripcion: 'Documentar el experimento de observacion celular', instrucciones: 'Incluir dibujos y conclusiones.', fecha_asignacion: '2025-04-22', fecha_vencimiento: '2025-05-05', valor_puntos: 25, estado: 'publicada', visible_padres: true, created_at: '2025-04-22', materia_nombre: 'Ciencia y Tecnologia', grado_nombre: '1ro Secundaria A', profesor_nombre: 'Patricia Elena Ramirez', entregas_count: 5, entregas_calificadas: 0 },
  { id: 5, clase_id: 4, titulo: 'Linea de tiempo: Culturas preincas', descripcion: 'Crear linea de tiempo de las principales culturas', instrucciones: 'Usar cartulina. Incluir imagenes.', fecha_asignacion: '2025-04-25', fecha_vencimiento: '2025-05-10', valor_puntos: 20, estado: 'publicada', visible_padres: true, created_at: '2025-04-25', materia_nombre: 'Ciencias Sociales', grado_nombre: '1ro Secundaria A', profesor_nombre: 'Miguel Angel Castillo', entregas_count: 0, entregas_calificadas: 0 },
  { id: 6, clase_id: 5, titulo: 'Vocabulary Unit 3', descripcion: 'Learn and practice vocabulary from unit 3', instrucciones: 'Complete exercises in workbook.', fecha_asignacion: '2025-04-20', fecha_vencimiento: '2025-04-28', valor_puntos: 15, estado: 'cerrada', visible_padres: true, created_at: '2025-04-20', materia_nombre: 'Ingles', grado_nombre: '1ro Secundaria A', profesor_nombre: 'Ana Lucia Torres', entregas_count: 30, entregas_calificadas: 30 },
  { id: 7, clase_id: 6, titulo: 'Geometria: Areas y perimetros', descripcion: 'Ejercicios de calculo de areas', instrucciones: 'Resolver en cuaderno de trabajo.', fecha_asignacion: '2025-04-28', fecha_vencimiento: '2025-05-05', valor_puntos: 20, estado: 'publicada', visible_padres: true, created_at: '2025-04-28', materia_nombre: 'Matematica', grado_nombre: '1ro Secundaria B', profesor_nombre: 'Rosa Maria Gutierrez', entregas_count: 12, entregas_calificadas: 0 },
  { id: 8, clase_id: 1, titulo: 'Examen parcial - Algebra', descripcion: 'Evaluacion del primer parcial de algebra', instrucciones: 'Traer calculadora cientifica.', fecha_asignacion: '2025-05-01', fecha_vencimiento: '2025-05-08', valor_puntos: 40, estado: 'borrador', visible_padres: false, created_at: '2025-05-01', materia_nombre: 'Matematica', grado_nombre: '1ro Secundaria A', profesor_nombre: 'Rosa Maria Gutierrez', entregas_count: 0, entregas_calificadas: 0 },
]

// ============================================
// ENTREGAS DE TAREAS
// ============================================
function generarEntregas(): EntregaTarea[] {
  const entregas: EntregaTarea[] = []
  let id = 1

  const estudiantesSecA = estudiantes.filter(e => e.grado_id === 11)
  
  for (const est of estudiantesSecA) {
    // Entregar tareas 1, 2 y 3
    for (const tareaId of [1, 2, 3]) {
      const rand = Math.random()
      if (rand > 0.15) { // 85% de entrega
        const tarea = tareas.find(t => t.id === tareaId)
        const aTimepo = rand > 0.25
        entregas.push({
          id: id++,
          tarea_id: tareaId,
          estudiante_id: est.id,
          contenido: 'Trabajo completado',
          fecha_entrega: aTimepo ? tarea?.fecha_vencimiento || '2025-04-25' : '2025-04-28',
          calificacion: tareaId === 1 ? Math.round((Math.random() * 6 + 14) * 10) / 10 : undefined,
          retroalimentacion: tareaId === 1 ? 'Buen trabajo' : undefined,
          estado: tareaId === 1 ? 'calificada' : 'entregada',
          estudiante_nombre: est.nombre_completo,
          a_tiempo: aTimepo,
        })
      }
    }
  }
  return entregas
}

export const entregas: EntregaTarea[] = generarEntregas()

// ============================================
// INCIDENCIAS
// ============================================
export const incidencias: Incidencia[] = [
  {
    id: 1,
    estudiante_id: 1,
    reportador_id: 1,
    tipo: 'disciplinaria',
    titulo: 'Uso de celular en clase',
    descripcion: 'El estudiante fue encontrado usando su telefono celular durante la clase de matematicas sin autorizacion.',
    severidad: 'leve',
    fecha_incidencia: '2025-04-20',
    hora_incidencia: '10:30',
    lugar: 'Aula 101',
    testigos: 'Companeros de clase',
    acciones_tomadas: 'Se confisco el celular y se entregara al padre/madre',
    estado: 'cerrada',
    notificado_padre: true,
    fecha_notificacion: '2025-04-20',
    created_at: '2025-04-20',
    estudiante_nombre: 'Carlos Alberto Mendoza Quispe',
    reportador_nombre: 'Rosa Maria Gutierrez',
    grado_nombre: '1ro Secundaria A',
  },
  {
    id: 2,
    estudiante_id: 5,
    reportador_id: 2,
    tipo: 'academica',
    titulo: 'Bajo rendimiento continuo',
    descripcion: 'El estudiante ha mostrado un descenso significativo en su rendimiento academico en las ultimas semanas.',
    severidad: 'moderada',
    fecha_incidencia: '2025-04-22',
    lugar: 'Direccion academica',
    acciones_tomadas: 'Se programo reunion con padres y tutor',
    estado: 'en_seguimiento',
    notificado_padre: true,
    fecha_notificacion: '2025-04-23',
    seguimiento: [
      { id: 1, incidencia_id: 2, descripcion: 'Reunion con padres realizada', accion: 'Compromiso de apoyo en casa', fecha: '2025-04-25', realizado_por: 'Juan Carlos Delgado' },
    ],
    created_at: '2025-04-22',
    estudiante_nombre: 'Diego Alejandro Vargas Flores',
    reportador_nombre: 'Juan Carlos Delgado',
    grado_nombre: '1ro Secundaria A',
  },
  {
    id: 3,
    estudiante_id: 10,
    reportador_id: 3,
    tipo: 'emocional',
    titulo: 'Estudiante presenta ansiedad',
    descripcion: 'La estudiante mostro signos de ansiedad antes del examen, incluyendo temblores y dificultad para respirar.',
    severidad: 'moderada',
    fecha_incidencia: '2025-04-28',
    hora_incidencia: '08:15',
    lugar: 'Aula 101',
    acciones_tomadas: 'Se derivo a psicologia educativa',
    estado: 'en_seguimiento',
    notificado_padre: true,
    fecha_notificacion: '2025-04-28',
    seguimiento: [
      { id: 2, incidencia_id: 3, descripcion: 'Primera sesion con psicologa', accion: 'Se recomendaron tecnicas de relajacion', fecha: '2025-04-29', realizado_por: 'Dra. Martinez - Psicologia' },
    ],
    created_at: '2025-04-28',
    estudiante_nombre: 'Lucia Valentina Torres Mendez',
    reportador_nombre: 'Patricia Elena Ramirez',
    grado_nombre: '1ro Secundaria A',
  },
  {
    id: 4,
    estudiante_id: 15,
    reportador_id: 6,
    tipo: 'salud',
    titulo: 'Lesion durante educacion fisica',
    descripcion: 'El estudiante sufrio una torcedura de tobillo durante la clase de educacion fisica al caer mientras corria.',
    severidad: 'moderada',
    fecha_incidencia: '2025-04-30',
    hora_incidencia: '11:00',
    lugar: 'Cancha deportiva',
    testigos: 'Profesor de educacion fisica y companeros',
    acciones_tomadas: 'Se aplico primeros auxilios y se llamo a los padres para llevar al estudiante al centro de salud',
    estado: 'cerrada',
    notificado_padre: true,
    fecha_notificacion: '2025-04-30',
    created_at: '2025-04-30',
    estudiante_nombre: 'Pedro Pablo Flores Huaman',
    reportador_nombre: 'Carlos Alberto Mendoza Rios',
    grado_nombre: '1ro Secundaria A',
  },
  {
    id: 5,
    estudiante_id: 20,
    reportador_id: 4,
    tipo: 'disciplinaria',
    titulo: 'Altercado verbal entre estudiantes',
    descripcion: 'Se presento una discusion verbal acalorada entre dos estudiantes durante el recreo.',
    severidad: 'grave',
    fecha_incidencia: '2025-04-29',
    hora_incidencia: '10:45',
    lugar: 'Patio central',
    testigos: 'Auxiliar de educacion',
    acciones_tomadas: 'Se separo a los estudiantes y se llevaron a direccion',
    estado: 'abierta',
    notificado_padre: false,
    created_at: '2025-04-29',
    estudiante_nombre: 'Valentina Andrea Huaman Paredes',
    reportador_nombre: 'Miguel Angel Castillo',
    grado_nombre: '1ro Secundaria A',
  },
]

// ============================================
// EVENTOS
// ============================================
export const eventos: Evento[] = [
  { id: 1, institucion_id: 1, organizador_id: 1, titulo: 'Dia del Trabajo', descripcion: 'Feriado nacional', tipo: 'feriado', fecha_inicio: '2025-05-01', hora_inicio: '00:00', ubicacion: 'N/A', estado: 'programado', participantes_tipo: 'todos', color: '#EF4444', organizador_nombre: 'Direccion' },
  { id: 2, institucion_id: 1, organizador_id: 1, titulo: 'Examen Bimestral - Matematica', descripcion: 'Evaluacion del segundo bimestre', tipo: 'evaluacion', fecha_inicio: '2025-05-08', hora_inicio: '08:00', hora_fin: '10:00', ubicacion: 'Aulas regulares', estado: 'programado', participantes_tipo: 'estudiantes', color: '#3B82F6', organizador_nombre: 'Coordinacion Academica' },
  { id: 3, institucion_id: 1, organizador_id: 1, titulo: 'Dia de la Madre', descripcion: 'Celebracion especial por el dia de la madre', tipo: 'cultural', fecha_inicio: '2025-05-09', hora_inicio: '10:00', hora_fin: '12:00', ubicacion: 'Auditorio', estado: 'programado', participantes_tipo: 'todos', color: '#EC4899', organizador_nombre: 'Comite de actividades' },
  { id: 4, institucion_id: 1, organizador_id: 2, titulo: 'Reunion de padres - 1ro Sec', descripcion: 'Informe de avance academico del bimestre', tipo: 'reunion', fecha_inicio: '2025-05-12', hora_inicio: '18:00', hora_fin: '20:00', ubicacion: 'Salon de usos multiples', estado: 'programado', participantes_tipo: 'padres', grado_id: 11, color: '#F59E0B', organizador_nombre: 'Juan Carlos Delgado' },
  { id: 5, institucion_id: 1, organizador_id: 6, titulo: 'Campeonato de Futbol Inter-aulas', descripcion: 'Torneo deportivo entre secciones', tipo: 'deportivo', fecha_inicio: '2025-05-15', hora_inicio: '14:00', hora_fin: '17:00', ubicacion: 'Campo deportivo', estado: 'programado', participantes_tipo: 'estudiantes', color: '#06B6D4', organizador_nombre: 'Carlos Alberto Mendoza' },
  { id: 6, institucion_id: 1, organizador_id: 1, titulo: 'Capacitacion docente', descripcion: 'Taller de estrategias pedagogicas', tipo: 'academico', fecha_inicio: '2025-05-16', hora_inicio: '15:00', hora_fin: '18:00', ubicacion: 'Sala de profesores', estado: 'programado', participantes_tipo: 'docentes', color: '#8B5CF6', organizador_nombre: 'Direccion' },
  { id: 7, institucion_id: 1, organizador_id: 7, titulo: 'Exposicion de Arte', descripcion: 'Muestra de trabajos artisticos de estudiantes', tipo: 'cultural', fecha_inicio: '2025-05-20', hora_inicio: '10:00', hora_fin: '13:00', ubicacion: 'Patio central', estado: 'programado', participantes_tipo: 'todos', color: '#EC4899', organizador_nombre: 'Valeria Sofia Paredes' },
  { id: 8, institucion_id: 1, organizador_id: 1, titulo: 'Examen Bimestral - Comunicacion', descripcion: 'Evaluacion del segundo bimestre', tipo: 'evaluacion', fecha_inicio: '2025-05-09', hora_inicio: '08:00', hora_fin: '10:00', ubicacion: 'Aulas regulares', estado: 'programado', participantes_tipo: 'estudiantes', color: '#10B981', organizador_nombre: 'Coordinacion Academica' },
]

// ============================================
// MENSAJES
// ============================================
export const mensajes: Mensaje[] = [
  { id: 1, remitente_id: 1, grupo_destinatarios: '1ro Secundaria A - Padres', asunto: 'Recordatorio: Reunion de padres', contenido: 'Estimados padres de familia, les recordamos que este viernes 12 de mayo se llevara a cabo la reunion de padres de familia a las 6:00 PM en el salon de usos multiples. Su asistencia es importante.', es_importante: true, es_urgente: false, tipo: 'grupal', categoria: 'administrativo', created_at: '2025-05-01T08:00:00', leido: false, remitente_nombre: 'Rosa Maria Gutierrez', remitente_rol: 'Docente', remitente_avatar: '/avatars/profesor-1.jpg' },
  { id: 2, remitente_id: 2, grupo_destinatarios: 'Todos los docentes', asunto: 'Capacitacion obligatoria', contenido: 'Comunicamos que el dia viernes 16 de mayo se realizara una capacitacion obligatoria para todos los docentes. Tema: Nuevas estrategias pedagogicas.', es_importante: true, es_urgente: true, tipo: 'broadcast', categoria: 'administrativo', created_at: '2025-04-30T14:00:00', leido: true, fecha_lectura: '2025-04-30T15:30:00', remitente_nombre: 'Direccion', remitente_rol: 'Administracion' },
  { id: 3, remitente_id: 3, destinatario_id: 1, asunto: 'Consulta sobre calificaciones', contenido: 'Profesora, quisiera saber como puedo ayudar a mi hijo Carlos a mejorar sus notas en matematicas. Estoy preocupado por su rendimiento.', es_importante: false, es_urgente: false, tipo: 'individual', categoria: 'academico', created_at: '2025-04-29T19:00:00', leido: true, fecha_lectura: '2025-04-30T07:00:00', remitente_nombre: 'Juan Mendoza (Padre)', remitente_rol: 'Padre de familia', destinatario_nombre: 'Rosa Maria Gutierrez' },
  { id: 4, remitente_id: 1, destinatario_id: 3, asunto: 'Re: Consulta sobre calificaciones', contenido: 'Estimado Sr. Mendoza, Carlos ha mostrado mejoria en las ultimas semanas. Le recomiendo que practique los ejercicios del libro en casa. Con gusto podemos coordinar una tutoria adicional.', es_importante: false, es_urgente: false, tipo: 'individual', categoria: 'academico', created_at: '2025-04-30T08:00:00', leido: false, remitente_nombre: 'Rosa Maria Gutierrez', remitente_rol: 'Docente', destinatario_nombre: 'Juan Mendoza (Padre)' },
  { id: 5, remitente_id: 1, grupo_destinatarios: '1ro Secundaria A', asunto: 'Tarea de matematicas', contenido: 'Estudiantes, recuerden que la tarea de ecuaciones lineales debe ser entregada este viernes. No se aceptaran trabajos fuera de fecha.', es_importante: true, es_urgente: false, tipo: 'grupal', categoria: 'academico', created_at: '2025-04-28T10:00:00', leido: true, remitente_nombre: 'Rosa Maria Gutierrez', remitente_rol: 'Docente' },
  { id: 6, remitente_id: 6, grupo_destinatarios: 'Todos', asunto: 'Campeonato de futbol', contenido: 'Se invita a todos los estudiantes interesados a inscribirse en el campeonato inter-aulas de futbol. Las inscripciones cierran el 10 de mayo.', es_importante: false, es_urgente: false, tipo: 'broadcast', categoria: 'general', created_at: '2025-04-27T12:00:00', leido: true, remitente_nombre: 'Carlos Alberto Mendoza', remitente_rol: 'Docente Ed. Fisica' },
]

// ============================================
// HORARIOS
// ============================================
export const horarios: HorarioClase[] = [
  // 1ro Sec A - Lunes
  { id: 1, clase_id: 1, dia_semana: 1, hora_inicio: '08:00', hora_fin: '09:30', aula: 'Aula 101', materia_nombre: 'Matematica', profesor_nombre: 'Rosa M. Gutierrez', grado_nombre: '1ro Sec A', color: '#3B82F6' },
  { id: 2, clase_id: 3, dia_semana: 1, hora_inicio: '09:45', hora_fin: '11:15', aula: 'Lab. Ciencias', materia_nombre: 'Ciencia y Tecnologia', profesor_nombre: 'Patricia Ramirez', grado_nombre: '1ro Sec A', color: '#8B5CF6' },
  { id: 3, clase_id: 7, dia_semana: 1, hora_inicio: '11:30', hora_fin: '12:30', aula: 'Cancha', materia_nombre: 'Educacion Fisica', profesor_nombre: 'Carlos Mendoza', grado_nombre: '1ro Sec A', color: '#06B6D4' },
  // 1ro Sec A - Martes
  { id: 4, clase_id: 2, dia_semana: 2, hora_inicio: '08:00', hora_fin: '09:30', aula: 'Aula 101', materia_nombre: 'Comunicacion', profesor_nombre: 'Juan C. Delgado', grado_nombre: '1ro Sec A', color: '#10B981' },
  { id: 5, clase_id: 4, dia_semana: 2, hora_inicio: '09:45', hora_fin: '11:15', aula: 'Aula 101', materia_nombre: 'Ciencias Sociales', profesor_nombre: 'Miguel Castillo', grado_nombre: '1ro Sec A', color: '#F59E0B' },
  { id: 6, clase_id: 8, dia_semana: 2, hora_inicio: '11:30', hora_fin: '12:30', aula: 'Aula 101', materia_nombre: 'Arte y Cultura', profesor_nombre: 'Valeria Paredes', grado_nombre: '1ro Sec A', color: '#EC4899' },
  // 1ro Sec A - Miercoles
  { id: 7, clase_id: 1, dia_semana: 3, hora_inicio: '08:00', hora_fin: '09:30', aula: 'Aula 101', materia_nombre: 'Matematica', profesor_nombre: 'Rosa M. Gutierrez', grado_nombre: '1ro Sec A', color: '#3B82F6' },
  { id: 8, clase_id: 5, dia_semana: 3, hora_inicio: '09:45', hora_fin: '11:45', aula: 'Aula 101', materia_nombre: 'Ingles', profesor_nombre: 'Ana L. Torres', grado_nombre: '1ro Sec A', color: '#EF4444' },
  // 1ro Sec A - Jueves
  { id: 9, clase_id: 2, dia_semana: 4, hora_inicio: '08:00', hora_fin: '09:30', aula: 'Aula 101', materia_nombre: 'Comunicacion', profesor_nombre: 'Juan C. Delgado', grado_nombre: '1ro Sec A', color: '#10B981' },
  { id: 10, clase_id: 3, dia_semana: 4, hora_inicio: '09:45', hora_fin: '11:15', aula: 'Lab. Ciencias', materia_nombre: 'Ciencia y Tecnologia', profesor_nombre: 'Patricia Ramirez', grado_nombre: '1ro Sec A', color: '#8B5CF6' },
  { id: 11, clase_id: 9, dia_semana: 4, hora_inicio: '11:30', hora_fin: '12:30', aula: 'Aula 101', materia_nombre: 'Religion', profesor_nombre: 'Pedro Sanchez', grado_nombre: '1ro Sec A', color: '#84CC16' },
  // 1ro Sec A - Viernes
  { id: 12, clase_id: 1, dia_semana: 5, hora_inicio: '08:00', hora_fin: '09:30', aula: 'Aula 101', materia_nombre: 'Matematica', profesor_nombre: 'Rosa M. Gutierrez', grado_nombre: '1ro Sec A', color: '#3B82F6' },
  { id: 13, clase_id: 4, dia_semana: 5, hora_inicio: '09:45', hora_fin: '11:15', aula: 'Aula 101', materia_nombre: 'Ciencias Sociales', profesor_nombre: 'Miguel Castillo', grado_nombre: '1ro Sec A', color: '#F59E0B' },
  { id: 14, clase_id: 10, dia_semana: 5, hora_inicio: '11:30', hora_fin: '12:30', aula: 'Aula 101', materia_nombre: 'Tutoria', profesor_nombre: 'Rosa M. Gutierrez', grado_nombre: '1ro Sec A', color: '#64748B' },
]

// ============================================
// USUARIOS
// ============================================
export const usuarios: Usuario[] = [
  { id: 1, uuid: 'usr-001', institucion_id: 1, nombre: 'Rosa Maria Gutierrez', email: 'rgutierrez@iesanjose.edu.pe', telefono: '987654321', estado: 'activo', ultimo_acceso: '2025-05-01T07:30:00', roles: ['docente', 'tutor'], avatar_url: '/avatars/profesor-1.jpg', created_at: '2020-03-01' },
  { id: 2, uuid: 'usr-002', institucion_id: 1, nombre: 'Juan Carlos Delgado', email: 'jdelgado@iesanjose.edu.pe', telefono: '987654322', estado: 'activo', ultimo_acceso: '2025-05-01T07:45:00', roles: ['docente', 'tutor'], created_at: '2020-03-01' },
  { id: 3, uuid: 'usr-003', institucion_id: 1, nombre: 'Juan Mendoza Quispe', email: 'jmendoza@gmail.com', telefono: '987654300', estado: 'activo', ultimo_acceso: '2025-04-30T19:00:00', roles: ['padre'], created_at: '2025-03-01' },
  { id: 4, uuid: 'usr-004', institucion_id: 1, nombre: 'Director General', email: 'direccion@iesanjose.edu.pe', telefono: '014567890', estado: 'activo', ultimo_acceso: '2025-05-01T08:00:00', roles: ['admin', 'director'], created_at: '2018-01-01' },
  { id: 5, uuid: 'usr-005', institucion_id: 1, nombre: 'Patricia Elena Ramirez', email: 'pramirez@iesanjose.edu.pe', telefono: '987654323', estado: 'activo', ultimo_acceso: '2025-05-01T07:50:00', roles: ['docente'], created_at: '2020-03-01' },
  { id: 6, uuid: 'usr-006', institucion_id: 1, nombre: 'Carlos Alberto Mendoza', email: 'cmendoza@iesanjose.edu.pe', telefono: '987654326', estado: 'activo', ultimo_acceso: '2025-05-01T06:30:00', roles: ['docente'], created_at: '2020-03-01' },
  { id: 7, uuid: 'usr-007', institucion_id: 1, nombre: 'Valeria Sofia Paredes', email: 'vparedes@iesanjose.edu.pe', telefono: '987654327', estado: 'activo', ultimo_acceso: '2025-04-30T14:00:00', roles: ['docente'], created_at: '2022-03-01' },
  { id: 8, uuid: 'usr-008', institucion_id: 1, nombre: 'Maria Huaman Torres', email: 'mhuaman.madre@gmail.com', telefono: '987654301', estado: 'activo', ultimo_acceso: '2025-04-28T20:00:00', roles: ['padre'], created_at: '2025-03-01' },
]
