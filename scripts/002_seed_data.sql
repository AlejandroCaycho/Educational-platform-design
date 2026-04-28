-- ==========================================
-- EDUCNOVA - DATOS DE EJEMPLO/SEEDING
-- Script para poblar la base de datos con datos de prueba
-- ==========================================

-- ==========================================
-- INSERTAR PERSONAS (Estudiantes, Profesores, etc.)
-- ==========================================

-- Estudiantes
INSERT INTO personas (usuario_id, institucion_id, tipo_persona, documento_identidad, fecha_nacimiento, genero, ciudad) VALUES
(NULL, 1, 'estudiante', '12345678A', '2015-03-15', 'masculino', 'Madrid'),
(NULL, 1, 'estudiante', '87654321B', '2015-05-22', 'femenino', 'Madrid'),
(NULL, 1, 'estudiante', '11223344C', '2015-07-10', 'masculino', 'Madrid'),
(NULL, 1, 'estudiante', '44332211D', '2015-09-18', 'femenino', 'Madrid'),
(NULL, 1, 'estudiante', '55667788E', '2015-11-05', 'masculino', 'Madrid');

-- Profesores
INSERT INTO personas (usuario_id, institucion_id, tipo_persona, documento_identidad, fecha_nacimiento, genero, ciudad) VALUES
(2, 1, 'profesor', '99887766F', '1980-02-14', 'femenino', 'Madrid'),
(3, 1, 'profesor', '66554433G', '1978-08-20', 'masculino', 'Madrid');

-- Padres/Tutores
INSERT INTO personas (usuario_id, institucion_id, tipo_persona, documento_identidad, fecha_nacimiento, genero, ciudad) VALUES
(4, 1, 'padre', '77889900H', '1975-12-01', 'masculino', 'Madrid'),
(5, 1, 'padre', '88990011I', '1976-04-15', 'masculino', 'Madrid');

-- Directivo/Administrador
INSERT INTO personas (usuario_id, institucion_id, tipo_persona, documento_identidad, fecha_nacimiento, genero, ciudad) VALUES
(1, 1, 'directivo', '22334455J', '1970-06-10', 'femenino', 'Madrid');

-- ==========================================
-- INSERTAR ESTUDIANTES
-- ==========================================
INSERT INTO estudiantes (persona_id, grado_id, numero_matricula, estado_academico, promedio_general) VALUES
(1, 1, 'MAT-2024-001', 'activo', 8.50),
(2, 1, 'MAT-2024-002', 'activo', 9.20),
(3, 2, 'MAT-2024-003', 'activo', 6.80),
(4, 1, 'MAT-2024-004', 'activo', 8.80),
(5, 2, 'MAT-2024-005', 'activo', 7.50);

-- ==========================================
-- INSERTAR PROFESORES
-- ==========================================
INSERT INTO profesores (persona_id, numero_empleado, especialidad, estado_laboral) VALUES
(6, 'EMP-001', 'Matemáticas y Lógica', 'activo'),
(7, 'EMP-002', 'Lenguaje y Literatura', 'activo');

-- ==========================================
-- INSERTAR CLASES
-- ==========================================
INSERT INTO clases (profesor_id, grado_id, materia_id, sala, horario_inicio, horario_fin, dias_semana) VALUES
(1, 1, 1, 'Aula 101', '08:00:00', '09:00:00', 'Lunes,Miércoles,Viernes'),
(1, 2, 1, 'Aula 102', '09:15:00', '10:15:00', 'Lunes,Miércoles,Viernes'),
(2, 1, 2, 'Aula 103', '10:30:00', '11:30:00', 'Martes,Jueves'),
(2, 1, 4, 'Aula 104', '11:45:00', '12:45:00', 'Martes,Jueves');

-- ==========================================
-- INSERTAR PADRES/TUTORES
-- ==========================================
INSERT INTO padres_tutores (persona_id, estudiante_id, relacion, ocupacion, empresa) VALUES
(8, 1, 'padre', 'Ingeniero', 'Tech Company S.L.'),
(9, 3, 'padre', 'Médico', 'Hospital Central'),
(8, 4, 'padre', 'Ingeniero', 'Tech Company S.L.');

-- ==========================================
-- INSERTAR EVENTOS
-- ==========================================
INSERT INTO eventos (institucion_id, organizador_id, titulo, descripcion, tipo, fecha_evento, hora_inicio, ubicacion, estado) VALUES
(1, 1, 'Reunión de Padres', 'Discusión sobre desempeño académico', 'reunion', '2026-04-15', '14:00:00', 'Aula 101', 'programado'),
(1, 2, 'Cita con Asesor', 'Consulta sobre planes futuros', 'cita', '2026-04-18', '10:30:00', 'Oficina de Asesoría', 'programado'),
(1, 1, 'Entrega de Proyecto', 'Proyecto final de Matemáticas', 'tarea', '2026-04-20', '15:00:00', 'Virtual', 'programado'),
(1, 2, 'Sesión de Tutoría', 'Refuerzo en Matemáticas', 'tutoria', '2026-04-22', '16:00:00', 'Aula 105', 'programado'),
(1, 1, 'Jornada de Padres', 'Encuentro trimestral con padres', 'reunion', '2026-05-10', '15:00:00', 'Salón de Actos', 'programado');

-- ==========================================
-- INSERTAR PARTICIPANTES EN EVENTOS
-- ==========================================
INSERT INTO evento_participantes (evento_id, usuario_id, confirmacion, asistio) VALUES
(1, 2, 'confirmado', TRUE),
(1, 3, 'confirmado', TRUE),
(1, 4, 'pendiente', FALSE),
(1, 5, 'confirmado', FALSE),
(2, 1, 'confirmado', TRUE),
(3, 1, 'confirmado', FALSE),
(4, 2, 'confirmado', TRUE),
(5, 4, 'confirmado', FALSE),
(5, 5, 'pendiente', FALSE);

-- ==========================================
-- INSERTAR TAREAS
-- ==========================================
INSERT INTO tareas (clase_id, profesor_id, titulo, descripcion, fecha_asignacion, fecha_vencimiento, valor_puntos) VALUES
(1, 1, 'Ejercicios de Álgebra', 'Resolver 20 ejercicios de la página 45', '2026-04-10', '2026-04-15', 10),
(1, 1, 'Proyecto de Investigación', 'Investigar sobre números primos', '2026-04-12', '2026-04-25', 20),
(3, 2, 'Análisis de Texto', 'Leer y analizar el primer capítulo', '2026-04-11', '2026-04-18', 15);

-- ==========================================
-- INSERTAR ENTREGAS DE TAREAS
-- ==========================================
INSERT INTO entregas_tareas (tarea_id, estudiante_id, fecha_entrega, calificacion, retroalimentacion) VALUES
(1, 1, '2026-04-15 18:30:00', 9.5, 'Excelente trabajo, muy completo'),
(1, 2, '2026-04-14 16:45:00', 9.8, 'Perfectamente realizado'),
(2, 1, '2026-04-24 20:15:00', 8.5, 'Buena investigación, faltó más profundidad'),
(2, 3, '2026-04-25 19:00:00', 7.0, 'Necesita más análisis crítico');

-- ==========================================
-- INSERTAR ASISTENCIA
-- ==========================================
INSERT INTO asistencia (estudiante_id, clase_id, fecha, presente, justificado) VALUES
(1, 1, '2026-04-10', TRUE, FALSE),
(1, 1, '2026-04-12', TRUE, FALSE),
(1, 1, '2026-04-14', TRUE, FALSE),
(2, 1, '2026-04-10', TRUE, FALSE),
(2, 1, '2026-04-12', FALSE, TRUE),
(2, 1, '2026-04-14', TRUE, FALSE),
(3, 2, '2026-04-10', FALSE, FALSE),
(3, 2, '2026-04-12', TRUE, FALSE),
(4, 1, '2026-04-10', TRUE, FALSE),
(4, 1, '2026-04-12', TRUE, FALSE),
(4, 1, '2026-04-14', TRUE, FALSE);

-- ==========================================
-- INSERTAR REPORTES ACADÉMICOS
-- ==========================================
INSERT INTO reportes_academicos (estudiante_id, periodo, ano_academico, profesor_id, materia_id, calificacion, asistencia_porcentaje, observaciones) VALUES
(1, '1er Trimestre', 2026, 1, 1, 8.5, 95, 'Excelente desempeño en matemáticas'),
(1, '1er Trimestre', 2026, 2, 2, 8.3, 100, 'Muy buen nivel de lectura y comprensión'),
(2, '1er Trimestre', 2026, 1, 1, 9.2, 100, 'Sobresaliente en todas las evaluaciones'),
(2, '1er Trimestre', 2026, 2, 2, 8.8, 95, 'Participación destacada en clase'),
(3, '1er Trimestre', 2026, 1, 1, 6.8, 75, 'Necesita refuerzo en conceptos básicos'),
(4, '1er Trimestre', 2026, 1, 1, 8.8, 100, 'Estudiante aplicado y responsable'),
(5, '1er Trimestre', 2026, 1, 1, 7.5, 85, 'Progreso satisfactorio');

-- ==========================================
-- INSERTAR INCIDENCIAS
-- ==========================================
INSERT INTO incidencias (institucion_id, estudiante_id, reportador_id, tipo, descripcion, severidad, fecha_incidencia, estado) VALUES
(1, 3, 2, 'conducta', 'Falta de respeto al docente', 'moderada', '2026-04-12', 'cerrada'),
(1, 3, 2, 'asistencia', 'Múltiples inasistencias sin justificación', 'grave', '2026-04-14', 'en_proceso'),
(1, 5, 3, 'academico', 'Bajo desempeño en pruebas', 'leve', '2026-04-13', 'abierta');

-- ==========================================
-- INSERTAR MENSAJES
-- ==========================================
INSERT INTO mensajes (remitente_id, destinatario_id, asunto, contenido, leido) VALUES
(2, 4, 'Excelente desempeño en Matemáticas', 'Carlos ha mostrado un excelente progreso en Matemáticas este mes. Felicidades por su esfuerzo.', TRUE),
(1, 4, 'Recordatorio: Jornada de Padres 15/04', 'Le recordamos que la jornada de padres será el 15 de abril a las 3:00 PM.', TRUE),
(3, 5, 'Tareas adicionales de refuerzo', 'He enviado tareas adicionales de refuerzo en divisiones.', TRUE),
(1, 5, 'Justificación de ausencia aceptada', 'La justificación de ausencia ha sido revisada y aceptada.', TRUE);

-- ==========================================
-- INSERTAR GRUPOS DE MENSAJERÍA
-- ==========================================
INSERT INTO grupos (institucion_id, nombre, descripcion, creador_id) VALUES
(1, 'Profesores 5to Primaria A', 'Grupo de coordinación de docentes', 1),
(1, 'Padres 5to Primaria A', 'Comunicación con padres de la clase', 2),
(1, 'Dirección', 'Comunicados generales de la institución', 1);

-- ==========================================
-- INSERTAR MIEMBROS DE GRUPOS
-- ==========================================
INSERT INTO grupo_miembros (grupo_id, usuario_id, rol) VALUES
(1, 2, 'miembro'),
(1, 3, 'miembro'),
(1, 1, 'administrador'),
(2, 4, 'miembro'),
(2, 5, 'miembro'),
(2, 2, 'administrador'),
(3, 1, 'administrador'),
(3, 2, 'miembro'),
(3, 3, 'miembro'),
(3, 4, 'miembro'),
(3, 5, 'miembro');

-- ==========================================
-- INSERTAR CONFIGURACIÓN DE INSTITUCIÓN
-- ==========================================
INSERT INTO configuracion_institucion (institucion_id, ano_academico_actual, periodo_actual, permitir_registro_padres, permitir_calificaciones_en_linea, horario_inicio_clases, horario_fin_clases) VALUES
(1, 2026, '1er Trimestre', TRUE, TRUE, '08:00:00', '16:00:00');

-- ==========================================
-- INSERTAR NOTIFICACIONES DE EJEMPLO
-- ==========================================
INSERT INTO notificaciones (usuario_id, titulo, contenido, tipo, leida) VALUES
(4, 'Nueva tarea asignada', 'Se ha asignado una nueva tarea de Matemáticas', 'tarea', FALSE),
(4, 'Calificación publicada', 'Tus calificaciones del primer trimestre están disponibles', 'calificacion', FALSE),
(5, 'Incidencia registrada', 'Se ha registrado una incidencia en tu hijo(a)', 'incidencia', FALSE),
(5, 'Reunión programada', 'Hay una reunión de padres el 15 de abril', 'evento', TRUE);

-- ==========================================
-- ASIGNAR ROLES A USUARIOS
-- ==========================================
INSERT INTO usuario_roles (usuario_id, rol_id) VALUES
(1, 1),  -- Patricia - Admin
(1, 5),  -- Patricia - Director
(2, 2),  -- Daniela - Profesor
(3, 2),  -- Juan - Profesor
(4, 5),  -- Padre - Otro rol
(5, 5);  -- Padre - Otro rol

COMMIT;
