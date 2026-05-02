-- ==========================================
-- EDUNOVA - Instituciones Públicas
-- PostgreSQL v1.0
-- ==========================================

-- ==========================================
-- MÓDULO: NÚCLEO / CONFIGURACIÓN BASE
-- ==========================================

-- TABLA: instituciones
-- Entidad raíz del sistema. Representa cada colegio público registrado.
-- Todos los demás módulos dependen de esta tabla mediante institucion_id.
--
-- Backend  : punto de partida para multitenancy; cada query filtra por institucion_id.
-- Frontend : pantalla de perfil institucional, cabecera del sistema (logo, nombre).
-- Funciones: registro de colegio, edición de datos institucionales, gestión de logo.
-- Depende de: ninguna.
-- Referenciada por: casi todas las tablas del sistema.
CREATE TABLE instituciones (
    id SERIAL PRIMARY KEY,
    uuid UUID NOT NULL DEFAULT uuid_generate_v4 () UNIQUE,
    nombre VARCHAR(255) NOT NULL UNIQUE,
    nombre_corto VARCHAR(50),
    email VARCHAR(255) NOT NULL,
    email_secundario VARCHAR(255),
    telefono VARCHAR(20),
    telefono_secundario VARCHAR(20),
    sitio_web VARCHAR(255),
    direccion TEXT,
    ciudad VARCHAR(100),
    departamento VARCHAR(100),
    pais VARCHAR(100) NOT NULL DEFAULT 'Perú',
    codigo_postal VARCHAR(20),
    logo_url VARCHAR(500),
    tipo_institucion VARCHAR(100),
    codigo_modular VARCHAR(50) UNIQUE,
    resolucion_creacion VARCHAR(100),
    activa BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- TABLA: roles
-- Catálogo de roles del sistema (director, docente, padre, etc.).
-- Los roles marcados como es_sistema no pueden ser eliminados por el usuario.
--
-- Backend  : control de acceso basado en roles (RBAC); middleware de autorización.
-- Frontend : gestión de roles en panel administrativo, asignación a usuarios.
-- Funciones: crear/editar roles personalizados, listar roles disponibles por institución.
-- Depende de: ninguna.
-- Referenciada por: rol_permisos, usuario_roles.
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    es_sistema BOOLEAN NOT NULL DEFAULT FALSE
);

-- TABLA: permisos
-- Catálogo granular de acciones permitidas por módulo (ej: calificaciones:crear).
-- Define qué operaciones existen en el sistema independientemente de quién las tenga.
--
-- Backend  : seed inicial del sistema; el middleware valida permiso por accion+modulo.
-- Frontend : pantalla de configuración de permisos por rol.
-- Funciones: listar permisos disponibles, asignar/revocar permisos a roles.
-- Depende de: ninguna.
-- Referenciada por: rol_permisos.
CREATE TABLE permisos (
    id SERIAL PRIMARY KEY,
    modulo VARCHAR(100) NOT NULL,
    accion VARCHAR(30) NOT NULL,
    descripcion TEXT,
    UNIQUE (modulo, accion)
);

-- TABLA: rol_permisos
-- Tabla de unión muchos-a-muchos entre roles y permisos.
-- Define exactamente qué puede hacer cada rol en el sistema.
--
-- Backend  : cargada en caché por rol al momento de login; usada en cada autorización.
-- Frontend : matriz de permisos editable en panel de administración.
-- Funciones: asignar/revocar permisos a un rol, clonar configuración de rol.
-- Depende de: roles, permisos.
-- Referenciada por: ninguna directamente (consultada vía JOIN).
CREATE TABLE rol_permisos (
    rol_id INTEGER NOT NULL REFERENCES roles (id) ON DELETE CASCADE,
    permiso_id INTEGER NOT NULL REFERENCES permisos (id) ON DELETE CASCADE,
    PRIMARY KEY (rol_id, permiso_id)
);

-- TABLA: usuarios
-- Cuentas de acceso al sistema. Un usuario pertenece a una sola institución.
-- Gestiona autenticación, bloqueos por intentos fallidos y recuperación de contraseña.
--
-- Backend  : autenticación JWT; lógica de bloqueo por intentos; reset de contraseña.
-- Frontend : pantalla de login, perfil de cuenta, cambio de contraseña.
-- Funciones: login, logout, recuperar contraseña, bloquear/activar cuenta.
-- Depende de: instituciones.
-- Referenciada por: usuario_roles, personas, y múltiples tablas como registrado_por / autorizado_por.
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    uuid UUID NOT NULL DEFAULT uuid_generate_v4 () UNIQUE,
    institucion_id INTEGER NOT NULL REFERENCES instituciones (id) ON DELETE CASCADE,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    contrasena_hash VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    estado VARCHAR(30) NOT NULL DEFAULT 'activo',
    ultimo_acceso TIMESTAMPTZ,
    token_recuperacion VARCHAR(255),
    token_expiracion TIMESTAMPTZ,
    requiere_cambio_pwd BOOLEAN NOT NULL DEFAULT FALSE,
    intentos_fallidos SMALLINT NOT NULL DEFAULT 0,
    bloqueado_hasta TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (institucion_id, email)
);

-- TABLA: usuario_roles
-- Asigna uno o más roles a cada usuario. Registra quién hizo la asignación.
--
-- Backend  : cargada junto al JWT para construir el contexto de permisos del usuario.
-- Frontend : gestión de roles en el perfil de usuario o panel admin.
-- Funciones: asignar rol, revocar rol, auditar quién asignó cada rol.
-- Depende de: usuarios, roles.
-- Referenciada por: ninguna directamente.
CREATE TABLE usuario_roles (
    usuario_id INTEGER NOT NULL REFERENCES usuarios (id) ON DELETE CASCADE,
    rol_id INTEGER NOT NULL REFERENCES roles (id) ON DELETE CASCADE,
    asignado_por INTEGER REFERENCES usuarios (id) ON DELETE SET NULL,
    asignado_en TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (usuario_id, rol_id)
);

-- TABLA: personas
-- Perfil personal y médico de cualquier actor del sistema (docente, alumno, padre).
-- Puede o no estar vinculado a un usuario con acceso al sistema.
--
-- Backend  : base compartida para profesores, estudiantes y padres; evita duplicar datos personales.
-- Frontend : ficha personal, foto de perfil, datos de emergencia, información médica.
-- Funciones: crear perfil, editar datos personales, registrar discapacidades y alergias.
-- Depende de: usuarios (opcional), instituciones.
-- Referenciada por: profesores, estudiantes, padres_tutores.
CREATE TABLE personas (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER UNIQUE REFERENCES usuarios (id) ON DELETE CASCADE,
    institucion_id INTEGER NOT NULL REFERENCES instituciones (id) ON DELETE CASCADE,
    tipo_persona VARCHAR(50) NOT NULL,
    documento_tipo VARCHAR(30),
    documento_identidad VARCHAR(50),
    fecha_nacimiento DATE,
    genero VARCHAR(30),
    foto_url VARCHAR(500),
    telefono_personal VARCHAR(20),
    telefono_emergencia VARCHAR(20),
    contacto_emergencia VARCHAR(255),
    direccion TEXT,
    ciudad VARCHAR(100),
    estado_civil VARCHAR(30),
    nacionalidad VARCHAR(100),
    etnia VARCHAR(100),
    discapacidad BOOLEAN NOT NULL DEFAULT FALSE,
    descripcion_discapacidad TEXT,
    tipo_sangre VARCHAR(5),
    alergias TEXT,
    observaciones_medicas TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==========================================
-- MÓDULO: ESTRUCTURA ACADÉMICA
-- ==========================================

-- TABLA: niveles
-- Define los niveles educativos de la institución (Primaria, Secundaria, etc.).
-- Organiza jerárquicamente los grados y materias.
--
-- Backend  : filtro maestro para grados y materias; valida coherencia curricular.
-- Frontend : selector de nivel en formularios de grado, materia y reporte.
-- Funciones: crear/editar niveles, listar niveles activos por institución.
-- Depende de: instituciones.
-- Referenciada por: grados, materias.
CREATE TABLE niveles (
    id SERIAL PRIMARY KEY,
    institucion_id INTEGER NOT NULL REFERENCES instituciones (id) ON DELETE CASCADE,
    nombre VARCHAR(100) NOT NULL,
    tipo VARCHAR(30) NOT NULL,
    orden SMALLINT NOT NULL,
    descripcion TEXT,
    UNIQUE (institucion_id, nombre)
);

-- TABLA: grados
-- Representa cada aula-grupo del colegio (ej: "1ro A", "3ro B").
-- Agrupa estudiantes y clases dentro de un nivel educativo.
--
-- Backend  : eje de asignación de estudiantes y clases; base del horario escolar.
-- Frontend : panel de gestión de secciones, vista de alumnos por aula.
-- Funciones: crear/editar sección, cambiar turno, ver lista de alumnos, asignar capacidad.
-- Depende de: instituciones, niveles.
-- Referenciada por: clases, estudiantes, tutores_grado, historial_grados_estudiante.
CREATE TABLE grados (
    id SERIAL PRIMARY KEY,
    institucion_id INTEGER NOT NULL REFERENCES instituciones (id) ON DELETE CASCADE,
    nivel_id INTEGER REFERENCES niveles (id) ON DELETE SET NULL,
    nombre VARCHAR(100) NOT NULL,
    seccion VARCHAR(10),
    turno VARCHAR(30),
    capacidad_max SMALLINT,
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (
        institucion_id,
        nombre,
        seccion
    )
);

-- TABLA: aulas
-- Espacios físicos del colegio donde se dictan clases o actividades.
-- Permite gestionar disponibilidad y equipamiento de cada ambiente.
--
-- Backend  : validación de conflictos de horario por aula; filtro de disponibilidad.
-- Frontend : selector de aula al crear clase o actividad; vista de plano del colegio.
-- Funciones: registrar aula, marcar disponibilidad, asignar a clase o actividad.
-- Depende de: instituciones.
-- Referenciada por: clases, cursos_reforzamiento, actividades_extracurriculares.
CREATE TABLE aulas (
    id SERIAL PRIMARY KEY,
    institucion_id INTEGER NOT NULL REFERENCES instituciones (id) ON DELETE CASCADE,
    nombre VARCHAR(100) NOT NULL,
    codigo VARCHAR(30) UNIQUE,
    capacidad SMALLINT,
    tipo VARCHAR(50),
    piso VARCHAR(20),
    bloque VARCHAR(50),
    equipamiento TEXT,
    disponible BOOLEAN NOT NULL DEFAULT TRUE,
    UNIQUE (institucion_id, nombre)
);

-- TABLA: profesores
-- Perfil laboral y académico del docente. Extiende la tabla personas con datos contractuales.
--
-- Backend  : asignación a clases, cálculo de carga horaria, listado por especialidad.
-- Frontend : ficha docente, directorio de profesores, gestión de contrato.
-- Funciones: crear perfil docente, asignar clases, ver carga horaria, registrar salario.
-- Depende de: personas.
-- Referenciada por: clases, tareas, calificaciones, entregas_tareas, tutores_grado,
-- tutores_estudiante, banco_preguntas, cursos_reforzamiento_profesores,
-- actividades_extracurriculares.
CREATE TABLE profesores (
    id SERIAL PRIMARY KEY,
    persona_id INTEGER NOT NULL UNIQUE REFERENCES personas (id) ON DELETE CASCADE,
    numero_empleado VARCHAR(50) UNIQUE NOT NULL,
    tipo_contrato VARCHAR(30),
    especialidad VARCHAR(255),
    sub_especialidad VARCHAR(255),
    titulo_academico VARCHAR(255),
    universidad_origen VARCHAR(255),
    fecha_ingreso DATE,
    fecha_fin_contrato DATE,
    estado_laboral VARCHAR(30) NOT NULL DEFAULT 'activo',
    salario DECIMAL(10, 2),
    carga_horaria_max SMALLINT DEFAULT 40,
    biografia TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- TABLA: materias
-- Catálogo de asignaturas de la institución, asociadas a un nivel educativo.
-- Define créditos, horas semanales y si son obligatorias o electivas.
--
-- Backend  : base del plan curricular y criterios de evaluación; filtrable por nivel.
-- Frontend : selector de materia al crear clase, vista de currículo por nivel.
-- Funciones: crear/editar materia, asignar color para calendario, activar/desactivar.
-- Depende de: instituciones, niveles.
-- Referenciada por: clases, banco_preguntas, cursos_reforzamiento, recursos_educativos.
CREATE TABLE materias (
    id SERIAL PRIMARY KEY,
    institucion_id INTEGER NOT NULL REFERENCES instituciones (id) ON DELETE CASCADE,
    nivel_id INTEGER REFERENCES niveles (id) ON DELETE SET NULL,
    nombre VARCHAR(255) NOT NULL,
    codigo VARCHAR(50),
    descripcion TEXT,
    creditos SMALLINT,
    horas_semana SMALLINT,
    color VARCHAR(7),
    es_obligatoria BOOLEAN NOT NULL DEFAULT TRUE,
    activa BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (institucion_id, codigo)
);

-- TABLA: anos_academicos
-- Define el año escolar de una institución (ej: "2025").
-- Solo puede haber un año académico activo a la vez por institución.
--
-- Backend  : filtro temporal global; todas las entidades académicas se contextualizan aquí.
-- Frontend : selector de año en reportes, historial académico, cambio de periodo activo.
-- Funciones: abrir/cerrar año académico, consultar histórico por año.
-- Depende de: instituciones.
-- Referenciada por: periodos_academicos, clases, estudiantes, historial_grados_estudiante,
-- programas_tutoria.
CREATE TABLE anos_academicos (
    id SERIAL PRIMARY KEY,
    institucion_id INTEGER NOT NULL REFERENCES instituciones (id) ON DELETE CASCADE,
    nombre VARCHAR(50) NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    activo BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (institucion_id, nombre),
    CONSTRAINT chk_fechas_ano CHECK (fecha_fin > fecha_inicio)
);

-- TABLA: periodos_academicos
-- Subdivide el año académico en bimestres, trimestres o semestres.
-- La institución se obtiene siempre vía ano_academico_id → anos_academicos.
--
-- Backend  : segmenta calificaciones, tareas y asistencia por periodo; activa uno a la vez.
-- Frontend : selector de periodo en boletines, registro de notas, vista de progreso.
-- Funciones: crear periodos, activar periodo actual, consultar notas por periodo.
-- Depende de: anos_academicos.
-- Referenciada por: criterios_evaluacion, calificaciones, promedios_periodo,
-- plan_curricular, examenes.
CREATE TABLE periodos_academicos (
    id SERIAL PRIMARY KEY,
    ano_academico_id INTEGER NOT NULL REFERENCES anos_academicos (id) ON DELETE CASCADE,
    nombre VARCHAR(50) NOT NULL,
    tipo VARCHAR(50),
    orden SMALLINT NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    activo BOOLEAN NOT NULL DEFAULT FALSE,
    UNIQUE (ano_academico_id, nombre),
    CONSTRAINT chk_fechas_periodo CHECK (fecha_fin > fecha_inicio)
);

-- TABLA: clases
-- Vincula un profesor, un grado y una materia dentro de un año académico.
-- Es el eje central de la actividad pedagógica del sistema.
--
-- Backend  : origen de horarios, tareas, calificaciones, asistencia y plan curricular.
-- Frontend : lista de clases del docente, vista del alumno "mis cursos", horario semanal.
-- Funciones: asignar docente a curso, ver alumnos de la clase, registrar modalidad.
-- Depende de: profesores, grados, materias, aulas, anos_academicos.
-- Referenciada por: horarios_clase, asistencia, criterios_evaluacion, calificaciones,
-- promedios_periodo, tareas, examenes, plan_curricular.
CREATE TABLE clases (
    id SERIAL PRIMARY KEY,
    profesor_id INTEGER NOT NULL REFERENCES profesores (id) ON DELETE CASCADE,
    grado_id INTEGER NOT NULL REFERENCES grados (id) ON DELETE CASCADE,
    materia_id INTEGER NOT NULL REFERENCES materias (id) ON DELETE CASCADE,
    aula_id INTEGER REFERENCES aulas (id) ON DELETE SET NULL,
    ano_academico_id INTEGER NOT NULL REFERENCES anos_academicos (id) ON DELETE CASCADE,
    modalidad VARCHAR(30) NOT NULL DEFAULT 'presencial',
    enlace_virtual VARCHAR(500),
    descripcion TEXT,
    activa BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (
        profesor_id,
        grado_id,
        materia_id,
        ano_academico_id
    )
);

-- TABLA: horarios_clase
-- Define los días y franjas horarias en que se dicta cada clase durante la semana.
--
-- Backend  : validación de conflictos de horario para aula y profesor; generación de horario semanal.
-- Frontend : vista de horario semanal del alumno y del docente, calendario de clases.
-- Funciones: crear horario, detectar solapamientos, exportar horario en PDF.
-- Depende de: clases.
-- Referenciada por: asistencia.
CREATE TABLE horarios_clase (
    id SERIAL PRIMARY KEY,
    clase_id INTEGER NOT NULL REFERENCES clases (id) ON DELETE CASCADE,
    dia_semana VARCHAR(20) NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    CONSTRAINT chk_horario CHECK (hora_fin > hora_inicio)
);

-- ==========================================
-- MÓDULO: ESTUDIANTES Y FAMILIA
-- ==========================================

-- TABLA: estudiantes
-- Perfil académico del alumno dentro de un año académico. Extiende personas.
-- Registra matrícula, grado actual, promedio general y estado académico.
--
-- Backend  : centro de todos los módulos académicos; referenciado en notas, asistencia, tareas.
-- Frontend : ficha del estudiante, dashboard del alumno, buscador de alumnos.
-- Funciones: matricular alumno, ver historial académico, calcular promedio general.
-- Depende de: personas, grados, anos_academicos.
-- Referenciada por: historial_grados_estudiante, padres_estudiantes, cuotas_eventos,
-- asistencia, calificaciones, promedios_periodo, entregas_tareas,
-- tutores_estudiante, inscripciones_reforzamiento,
-- inscripciones_extracurriculares, incidencias, examen_respuestas,
-- examen_resultados.
CREATE TABLE estudiantes (
    id SERIAL PRIMARY KEY,
    persona_id INTEGER NOT NULL UNIQUE REFERENCES personas (id) ON DELETE CASCADE,
    grado_id INTEGER NOT NULL REFERENCES grados (id),
    ano_academico_id INTEGER NOT NULL REFERENCES anos_academicos (id),
    numero_matricula VARCHAR(50) UNIQUE NOT NULL,
    codigo_estudiante VARCHAR(50) UNIQUE,
    fecha_ingreso DATE,
    institucion_anterior VARCHAR(255),
    estado_academico VARCHAR(30) NOT NULL DEFAULT 'activo',
    promedio_general DECIMAL(5, 2) DEFAULT 0.00,
    posicion_ranking INTEGER,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- TABLA: historial_grados_estudiante
-- Registra cada cambio de grado o sección de un alumno a lo largo del tiempo.
-- Permite auditar promociones, repitencias o traslados entre secciones.
--
-- Backend  : auditoría de cambios de grado; trazabilidad académica por año.
-- Frontend : historial en ficha del estudiante, reporte de movimientos.
-- Funciones: registrar promoción/repitencia, ver historial completo de cambios.
-- Depende de: estudiantes, grados, anos_academicos, usuarios.
-- Referenciada por: ninguna.
CREATE TABLE historial_grados_estudiante (
    id SERIAL PRIMARY KEY,
    estudiante_id INTEGER NOT NULL REFERENCES estudiantes (id) ON DELETE CASCADE,
    grado_id_anterior INTEGER REFERENCES grados (id),
    grado_id_nuevo INTEGER NOT NULL REFERENCES grados (id),
    ano_academico_id INTEGER NOT NULL REFERENCES anos_academicos (id),
    motivo TEXT,
    autorizado_por INTEGER REFERENCES usuarios (id),
    fecha_cambio DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- TABLA: padres_tutores
-- Perfil laboral y de contacto del padre, madre o apoderado.
-- Extiende personas con información de empleo y nivel educativo.
--
-- Backend  : gestión de apoderados; base para notificaciones y comunicados a familias.
-- Frontend : ficha del apoderado, directorio de padres, contacto de emergencia.
-- Funciones: registrar apoderado, vincular a estudiante, ver datos laborales.
-- Depende de: personas.
-- Referenciada por: padres_estudiantes.
CREATE TABLE padres_tutores (
    id SERIAL PRIMARY KEY,
    persona_id INTEGER NOT NULL UNIQUE REFERENCES personas (id) ON DELETE CASCADE,
    ocupacion VARCHAR(255),
    empresa VARCHAR(255),
    cargo VARCHAR(255),
    telefono_trabajo VARCHAR(20),
    nivel_educativo VARCHAR(100),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- TABLA: padres_estudiantes
-- Relación entre padres/tutores y estudiantes. Permite múltiples apoderados por alumno.
-- Define quién es el apoderado oficial, con quién vive el alumno y quién puede recogerlo.
--
-- Backend  : filtro de apoderado principal para envío de comunicados y notificaciones.
-- Frontend : sección "familia" en ficha del estudiante, lista de autorizados para retiro.
-- Funciones: vincular padre/tutor a alumno, definir apoderado principal, autorizar retiro.
-- Depende de: padres_tutores, estudiantes.
-- Referenciada por: ninguna.
CREATE TABLE padres_estudiantes (
    padre_id INTEGER NOT NULL REFERENCES padres_tutores (id) ON DELETE CASCADE,
    estudiante_id INTEGER NOT NULL REFERENCES estudiantes (id) ON DELETE CASCADE,
    relacion VARCHAR(30) NOT NULL,
    es_apoderado BOOLEAN NOT NULL DEFAULT FALSE,
    vive_con_alumno BOOLEAN NOT NULL DEFAULT TRUE,
    autorizado_recoger BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (padre_id, estudiante_id)
);

-- ==========================================
-- MÓDULO: EVENTOS Y CUOTAS
-- ==========================================

-- TABLA: eventos_festivos
-- Registra actividades institucionales (aniversario, día del logro, kermés, etc.)
-- que pueden requerir una cuota voluntaria de los padres.
-- Es la única fuente legítima de cobro en instituciones públicas.
--
-- Backend  : origen de cuotas; genera registros en cuotas_eventos al activarse.
-- Frontend : calendario de eventos, panel de administración de eventos, publicación a padres.
-- Funciones: crear evento, activar cuota voluntaria, publicar a familias, ver participación.
-- Depende de: instituciones, usuarios.
-- Referenciada por: cuotas_eventos.
CREATE TABLE eventos_festivos (
    id SERIAL PRIMARY KEY,
    institucion_id INTEGER NOT NULL REFERENCES instituciones (id) ON DELETE CASCADE,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    fecha_evento DATE NOT NULL,
    lugar VARCHAR(255),
    responsable_id INTEGER REFERENCES usuarios (id) ON DELETE SET NULL,
    requiere_cuota BOOLEAN NOT NULL DEFAULT FALSE,
    monto_cuota DECIMAL(10, 2) DEFAULT 0.00,
    moneda VARCHAR(10) NOT NULL DEFAULT 'PEN',
    cuota_obligatoria BOOLEAN NOT NULL DEFAULT FALSE,
    descripcion_cuota TEXT,
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- TABLA: cuotas_eventos
-- Registro de pago (o exoneración) por estudiante para un evento festivo.
-- Permite controlar quién pagó, cómo pagó y quién fue exonerado con su motivo.
--
-- Backend  : reportes de recaudación por evento; validación de exoneraciones.
-- Frontend : panel de pagos del evento, estado de cuota en portal del padre.
-- Funciones: registrar pago, exonerar alumno, generar reporte de recaudación por evento.
-- Depende de: eventos_festivos, estudiantes, usuarios.
-- Referenciada por: ninguna.
CREATE TABLE cuotas_eventos (
    id SERIAL PRIMARY KEY,
    evento_festivo_id INTEGER NOT NULL REFERENCES eventos_festivos (id) ON DELETE CASCADE,
    estudiante_id INTEGER NOT NULL REFERENCES estudiantes (id) ON DELETE CASCADE,
    monto DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    moneda VARCHAR(10) NOT NULL DEFAULT 'PEN',
    estado VARCHAR(30) NOT NULL DEFAULT 'pendiente',
    fecha_pago DATE,
    metodo_pago VARCHAR(100),
    referencia_pago VARCHAR(255),
    exonerado BOOLEAN NOT NULL DEFAULT FALSE,
    motivo_exoneracion TEXT,
    registrado_por INTEGER REFERENCES usuarios (id) ON DELETE SET NULL,
    observaciones TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (
        evento_festivo_id,
        estudiante_id
    )
);

-- ==========================================
-- MÓDULO: ASISTENCIA
-- ==========================================

-- TABLA: asistencia
-- Registra la presencia diaria de cada estudiante en cada clase.
-- Diferencia entre ausencia, tardanza y tardanza justificada.
--
-- Backend  : cálculo de porcentaje de asistencia por periodo; alertas de inasistencia.
-- Frontend : lista de asistencia diaria para el docente, reporte de asistencia para padres.
-- Funciones: tomar asistencia, justificar falta, generar reporte mensual, alertar a padres.
-- Depende de: estudiantes, clases, horarios_clase, usuarios.
-- Referenciada por: promedios_periodo (asistencia_pct).
CREATE TABLE asistencia (
    id SERIAL PRIMARY KEY,
    estudiante_id INTEGER NOT NULL REFERENCES estudiantes (id) ON DELETE CASCADE,
    clase_id INTEGER NOT NULL REFERENCES clases (id) ON DELETE CASCADE,
    horario_id INTEGER REFERENCES horarios_clase (id),
    fecha DATE NOT NULL,
    presente BOOLEAN NOT NULL DEFAULT FALSE,
    tarde BOOLEAN NOT NULL DEFAULT FALSE,
    minutos_tarde SMALLINT,
    justificado BOOLEAN NOT NULL DEFAULT FALSE,
    motivo_inasistencia VARCHAR(255),
    documento_justificacion VARCHAR(500),
    registrado_por INTEGER REFERENCES usuarios (id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (
        estudiante_id,
        clase_id,
        fecha
    )
);

-- ==========================================
-- MÓDULO: EVALUACIÓN Y CALIFICACIONES
-- ==========================================

-- TABLA: escalas_calificacion
-- Define el sistema de notas de la institución (ej: 0-20, AD/A/B/C).
-- Establece la nota mínima, máxima y aprobatoria.
--
-- Backend  : validación de notas al registrar calificaciones; referenciada en configuración.
-- Frontend : selector de escala en ajustes institucionales, visualización en boletín.
-- Funciones: crear escala, definir nota aprobatoria, asociar a configuración institucional.
-- Depende de: instituciones.
-- Referenciada por: configuracion_institucion.
CREATE TABLE escalas_calificacion (
    id SERIAL PRIMARY KEY,
    institucion_id INTEGER NOT NULL REFERENCES instituciones (id) ON DELETE CASCADE,
    nombre VARCHAR(100) NOT NULL,
    nota_minima DECIMAL(5, 2) NOT NULL,
    nota_maxima DECIMAL(5, 2) NOT NULL,
    nota_aprobatoria DECIMAL(5, 2) NOT NULL,
    descripcion TEXT,
    activa BOOLEAN NOT NULL DEFAULT TRUE,
    UNIQUE (institucion_id, nombre)
);

-- TABLA: criterios_evaluacion
-- Define los instrumentos de evaluación de una clase en un periodo
-- (ej: participación 20%, examen parcial 30%, proyecto 50%).
-- La suma de pesos debe ser controlada en la lógica de negocio.
--
-- Backend  : base para calcular promedios ponderados; vinculado a tareas y calificaciones.
-- Frontend : configuración de evaluación por clase, barra de pesos visualizada al docente.
-- Funciones: crear criterios, definir pesos, listar instrumentos activos por periodo.
-- Depende de: clases, periodos_academicos.
-- Referenciada por: calificaciones, tareas, examenes.
CREATE TABLE criterios_evaluacion (
    id SERIAL PRIMARY KEY,
    clase_id INTEGER NOT NULL REFERENCES clases (id) ON DELETE CASCADE,
    periodo_id INTEGER NOT NULL REFERENCES periodos_academicos (id),
    nombre VARCHAR(255) NOT NULL,
    tipo VARCHAR(30) NOT NULL,
    peso DECIMAL(5, 2) NOT NULL CHECK (peso > 0),
    descripcion TEXT,
    UNIQUE (clase_id, periodo_id, nombre)
);

-- TABLA: calificaciones
-- Almacena cada nota registrada por el docente para un estudiante en una clase y periodo.
-- Cuando criterio_id está presente, su periodo_id debe coincidir con el de la calificación.
--
-- Backend  : fuente de datos para promedios_periodo; validación de consistencia criterio-periodo.
-- Frontend : registro de notas por el docente, historial de calificaciones del alumno.
-- Funciones: ingresar nota, editar nota, listar notas por materia/periodo, generar boleta.
-- Depende de: estudiantes, clases, periodos_academicos, criterios_evaluacion, profesores.
-- Referenciada por: promedios_periodo (calculado desde aquí).
CREATE TABLE calificaciones (
    id SERIAL PRIMARY KEY,
    estudiante_id INTEGER NOT NULL REFERENCES estudiantes (id) ON DELETE CASCADE,
    clase_id INTEGER NOT NULL REFERENCES clases (id) ON DELETE CASCADE,
    periodo_id INTEGER NOT NULL REFERENCES periodos_academicos (id),
    criterio_id INTEGER REFERENCES criterios_evaluacion (id) ON DELETE SET NULL,
    tipo VARCHAR(30) NOT NULL,
    calificacion DECIMAL(5, 2) NOT NULL,
    calificacion_letra VARCHAR(5),
    observaciones TEXT,
    registrado_por INTEGER NOT NULL REFERENCES profesores (id),
    fecha_registro DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_criterio_periodo CHECK (
        criterio_id IS NULL
        OR periodo_id = (
            SELECT ce.periodo_id
            FROM criterios_evaluacion ce
            WHERE
                ce.id = criterio_id
        )
    )
);

-- TABLA: promedios_periodo
-- Almacena el promedio calculado de cada estudiante por clase y periodo.
-- Se recalcula automáticamente al registrar o modificar calificaciones.
--
-- Backend  : resultado de job o trigger de cálculo de promedios; base de boletines.
-- Frontend : dashboard del alumno, reporte de notas por periodo, ranking de clase.
-- Funciones: consultar promedio por materia, ver estado aprobado/desaprobado, generar boleta.
-- Depende de: estudiantes, clases, periodos_academicos.
-- Referenciada por: ninguna (es tabla de resultados calculados).
CREATE TABLE promedios_periodo (
    id SERIAL PRIMARY KEY,
    estudiante_id INTEGER NOT NULL REFERENCES estudiantes (id) ON DELETE CASCADE,
    clase_id INTEGER NOT NULL REFERENCES clases (id) ON DELETE CASCADE,
    periodo_id INTEGER NOT NULL REFERENCES periodos_academicos (id),
    promedio DECIMAL(5, 2),
    aprobado BOOLEAN,
    asistencia_pct DECIMAL(5, 2),
    observaciones TEXT,
    calculado_en TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (
        estudiante_id,
        clase_id,
        periodo_id
    )
);

-- ==========================================
-- MÓDULO: TAREAS Y ENTREGAS
-- ==========================================

-- TABLA: tareas
-- Actividades asignadas por el docente a una clase.
-- El profesor se obtiene siempre desde clases.profesor_id.
--
-- Backend  : gestión del ciclo de vida de tareas (publicada → cerrada); enlazada a criterios.
-- Frontend : panel de tareas del docente, lista de pendientes del alumno, vista del padre.
-- Funciones: crear tarea, publicar/cerrar, adjuntar recursos, ver entregas recibidas.
-- Depende de: clases, criterios_evaluacion.
-- Referenciada por: recursos_tarea, entregas_tareas.
CREATE TABLE tareas (
    id SERIAL PRIMARY KEY,
    clase_id INTEGER NOT NULL REFERENCES clases (id) ON DELETE CASCADE,
    criterio_id INTEGER REFERENCES criterios_evaluacion (id) ON DELETE SET NULL,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    instrucciones TEXT,
    fecha_asignacion DATE NOT NULL DEFAULT CURRENT_DATE,
    fecha_vencimiento DATE NOT NULL,
    valor_puntos DECIMAL(5, 2) DEFAULT 0,
    intentos_permitidos SMALLINT DEFAULT 1,
    es_grupal BOOLEAN NOT NULL DEFAULT FALSE,
    visible_para_padres BOOLEAN NOT NULL DEFAULT TRUE,
    estado VARCHAR(30) NOT NULL DEFAULT 'publicada',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_fecha_tarea CHECK (
        fecha_vencimiento >= fecha_asignacion
    )
);

-- TABLA: recursos_tarea
-- Archivos o enlaces adjuntos por el docente a una tarea (enunciados, plantillas, videos).
--
-- Backend  : almacenamiento de metadatos de archivos; URL apunta a almacenamiento externo.
-- Frontend : sección de adjuntos en vista de tarea, descarga de materiales por el alumno.
-- Funciones: subir archivo a tarea, eliminar recurso, previsualizar documento.
-- Depende de: tareas.
-- Referenciada por: ninguna.
CREATE TABLE recursos_tarea (
    id SERIAL PRIMARY KEY,
    tarea_id INTEGER NOT NULL REFERENCES tareas (id) ON DELETE CASCADE,
    tipo VARCHAR(30) NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    url VARCHAR(500) NOT NULL,
    tamano_kb INTEGER,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- TABLA: entregas_tareas
-- Registro de cada entrega de un alumno para una tarea. Soporta reintentos.
-- Incluye calificación y retroalimentación del docente.
--
-- Backend  : gestión de estado de entrega; notificación al docente de nueva entrega.
-- Frontend : formulario de entrega del alumno, bandeja de calificación del docente.
-- Funciones: entregar tarea, calificar entrega, dar retroalimentación, ver intentos previos.
-- Depende de: tareas, estudiantes, profesores.
-- Referenciada por: archivos_entrega.
CREATE TABLE entregas_tareas (
    id SERIAL PRIMARY KEY,
    tarea_id INTEGER NOT NULL REFERENCES tareas (id) ON DELETE CASCADE,
    estudiante_id INTEGER NOT NULL REFERENCES estudiantes (id) ON DELETE CASCADE,
    intento_numero SMALLINT NOT NULL DEFAULT 1,
    fecha_entrega TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    estado VARCHAR(30) NOT NULL DEFAULT 'entregada',
    calificacion DECIMAL(5, 2),
    retroalimentacion TEXT,
    calificado_por INTEGER REFERENCES profesores (id),
    fecha_calificacion TIMESTAMPTZ,
    comentario_alumno TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (
        tarea_id,
        estudiante_id,
        intento_numero
    )
);

-- TABLA: archivos_entrega
-- Archivos adjuntos por el alumno en su entrega de tarea (PDF, imagen, zip, etc.).
--
-- Backend  : metadatos del archivo subido; URL apunta a bucket de almacenamiento externo.
-- Frontend : lista de archivos adjuntos en entrega, descarga y previsualización.
-- Funciones: adjuntar archivo a entrega, descargar, eliminar adjunto.
-- Depende de: entregas_tareas.
-- Referenciada por: ninguna.
CREATE TABLE archivos_entrega (
    id SERIAL PRIMARY KEY,
    entrega_id INTEGER NOT NULL REFERENCES entregas_tareas (id) ON DELETE CASCADE,
    tipo VARCHAR(30) NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    url VARCHAR(500) NOT NULL,
    tamano_kb INTEGER,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==========================================
-- MÓDULO: TUTORÍA
-- ==========================================

-- TABLA: programas_tutoria
-- Define los programas de acompañamiento del año académico (tutoría grupal, individual, etc.).
-- Es el contenedor que da sentido a tutores_grado y tutores_estudiante.
--
-- Backend  : agrupa sesiones de tutoría bajo un marco institucional y año académico.
-- Frontend : módulo de tutoría, creación de programa, listado por año.
-- Funciones: crear programa, activar/desactivar, listar tutores asignados.
-- Depende de: instituciones, anos_academicos.
-- Referenciada por: tutores_grado, tutores_estudiante.
CREATE TABLE programas_tutoria (
    id SERIAL PRIMARY KEY,
    institucion_id INTEGER NOT NULL REFERENCES instituciones (id) ON DELETE CASCADE,
    ano_academico_id INTEGER NOT NULL REFERENCES anos_academicos (id),
    nombre VARCHAR(255) NOT NULL,
    tipo VARCHAR(30) NOT NULL,
    descripcion TEXT,
    objetivos TEXT,
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- TABLA: tutores_grado
-- Asigna un docente como tutor de un grado completo dentro de un programa de tutoría.
-- El año académico se obtiene vía programa_tutoria_id → programas_tutoria.ano_academico_id.
--
-- Backend  : asignación de tutor de aula; base para sesiones grupales.
-- Frontend : vista "mi tutoría" del docente, lista de tutores por grado en panel admin.
-- Funciones: asignar tutor de aula, ver grado a cargo, registrar sesiones grupales.
-- Depende de: programas_tutoria, profesores, grados.
-- Referenciada por: sesiones_tutoria.
CREATE TABLE tutores_grado (
    id SERIAL PRIMARY KEY,
    programa_tutoria_id INTEGER NOT NULL REFERENCES programas_tutoria (id) ON DELETE CASCADE,
    profesor_id INTEGER NOT NULL REFERENCES profesores (id) ON DELETE CASCADE,
    grado_id INTEGER NOT NULL REFERENCES grados (id) ON DELETE CASCADE,
    fecha_inicio DATE NOT NULL DEFAULT CURRENT_DATE,
    fecha_fin DATE,
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (
        profesor_id,
        grado_id,
        programa_tutoria_id
    )
);

-- TABLA: tutores_estudiante
-- Asignación de tutoría individual a un estudiante específico.
-- Puede surgir de una derivación por incidencia, bajo rendimiento u otra razón.
--
-- Backend  : gestión de casos individuales; puede derivarse desde incidencias.
-- Frontend : ficha de tutoría individual, historial del alumno, seguimiento de objetivos.
-- Funciones: asignar tutor individual, registrar motivo, cerrar caso, ver historial.
-- Depende de: programas_tutoria, profesores, estudiantes, usuarios.
-- Referenciada por: sesiones_tutoria.
CREATE TABLE tutores_estudiante (
    id SERIAL PRIMARY KEY,
    programa_tutoria_id INTEGER REFERENCES programas_tutoria (id) ON DELETE SET NULL,
    profesor_id INTEGER NOT NULL REFERENCES profesores (id) ON DELETE CASCADE,
    estudiante_id INTEGER NOT NULL REFERENCES estudiantes (id) ON DELETE CASCADE,
    tipo VARCHAR(30) NOT NULL,
    motivo TEXT,
    objetivos TEXT,
    fecha_inicio DATE NOT NULL DEFAULT CURRENT_DATE,
    fecha_fin DATE,
    estado VARCHAR(30) NOT NULL DEFAULT 'activa',
    derivado_por INTEGER REFERENCES usuarios (id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- TABLA: sesiones_tutoria
-- Registro de cada sesión realizada, ya sea grupal (tutor_grado_id)
-- o individual (tutor_estudiante_id). Almacena acuerdos y compromisos firmados.
--
-- Backend  : historial de interacciones; base para reportes de seguimiento y alertas.
-- Frontend : formulario de sesión, historial de sesiones, firma digital del alumno/padre.
-- Funciones: registrar sesión, listar sesiones por alumno, exportar ficha de tutoría.
-- Depende de: tutores_estudiante, tutores_grado.
-- Referenciada por: ninguna.
CREATE TABLE sesiones_tutoria (
    id SERIAL PRIMARY KEY,
    tutor_estudiante_id INTEGER REFERENCES tutores_estudiante (id) ON DELETE CASCADE,
    tutor_grado_id INTEGER REFERENCES tutores_grado (id) ON DELETE CASCADE,
    fecha_sesion DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME,
    tipo VARCHAR(30) NOT NULL,
    modalidad VARCHAR(30) NOT NULL DEFAULT 'presencial',
    temas_tratados TEXT,
    acuerdos TEXT,
    compromisos_alumno TEXT,
    compromisos_tutor TEXT,
    proxima_sesion DATE,
    firmado_por_alumno BOOLEAN NOT NULL DEFAULT FALSE,
    firmado_por_padre BOOLEAN NOT NULL DEFAULT FALSE,
    observaciones TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_sesion_origen CHECK (
        tutor_estudiante_id IS NOT NULL
        OR tutor_grado_id IS NOT NULL
    )
);

-- ==========================================
-- MÓDULO: REFORZAMIENTO Y EXTRACURRICULARES
-- ==========================================

-- TABLA: cursos_reforzamiento
-- Talleres o clases adicionales para alumnos con bajo rendimiento o necesidades especiales.
-- Pueden ser presenciales o virtuales y tener varios profesores asignados.
--
-- Backend  : gestión de cupos e inscripciones; seguimiento de asistencia y calificación final.
-- Frontend : catálogo de cursos de apoyo, inscripción desde ficha del alumno.
-- Funciones: crear curso, publicar fechas, inscribir alumno, registrar progreso.
-- Depende de: instituciones, materias, aulas.
-- Referenciada por: cursos_reforzamiento_profesores, inscripciones_reforzamiento.
CREATE TABLE cursos_reforzamiento (
    id SERIAL PRIMARY KEY,
    institucion_id INTEGER NOT NULL REFERENCES instituciones (id) ON DELETE CASCADE,
    materia_id INTEGER REFERENCES materias (id) ON DELETE SET NULL,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    tipo VARCHAR(100),
    modalidad VARCHAR(30) NOT NULL DEFAULT 'presencial',
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    hora_inicio TIME,
    hora_fin TIME,
    dias VARCHAR(100),
    aula_id INTEGER REFERENCES aulas (id),
    capacidad_max SMALLINT,
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- TABLA: cursos_reforzamiento_profesores
-- Asigna uno o más docentes a un curso de reforzamiento.
-- Diferencia entre docente principal y de apoyo.
--
-- Backend  : listado de docentes por curso; filtro de carga horaria.
-- Frontend : formulario de asignación de docentes al curso.
-- Funciones: asignar docente principal y de apoyo, remover docente del curso.
-- Depende de: cursos_reforzamiento, profesores.
-- Referenciada por: ninguna.
CREATE TABLE cursos_reforzamiento_profesores (
    curso_id INTEGER NOT NULL REFERENCES cursos_reforzamiento (id) ON DELETE CASCADE,
    profesor_id INTEGER NOT NULL REFERENCES profesores (id) ON DELETE CASCADE,
    es_principal BOOLEAN NOT NULL DEFAULT TRUE,
    PRIMARY KEY (curso_id, profesor_id)
);

-- TABLA: inscripciones_reforzamiento
-- Registro de cada alumno inscrito en un curso de reforzamiento.
-- Almacena el motivo, el porcentaje de asistencia y la calificación final.
--
-- Backend  : control de cupos; cálculo de avance del alumno en el curso.
-- Frontend : lista de inscritos por curso, progreso del alumno, reporte de cierre.
-- Funciones: inscribir alumno, registrar asistencia, calificar, dar de baja.
-- Depende de: cursos_reforzamiento, estudiantes, usuarios.
-- Referenciada por: ninguna.
CREATE TABLE inscripciones_reforzamiento (
    id SERIAL PRIMARY KEY,
    curso_id INTEGER NOT NULL REFERENCES cursos_reforzamiento (id) ON DELETE CASCADE,
    estudiante_id INTEGER NOT NULL REFERENCES estudiantes (id) ON DELETE CASCADE,
    fecha_inscripcion DATE NOT NULL DEFAULT CURRENT_DATE,
    motivo_inscripcion TEXT,
    inscrito_por INTEGER REFERENCES usuarios (id),
    asistencia_pct DECIMAL(5, 2),
    calificacion_final DECIMAL(5, 2),
    estado VARCHAR(50) NOT NULL DEFAULT 'activo',
    observaciones TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (curso_id, estudiante_id)
);

-- TABLA: actividades_extracurriculares
-- Talleres, clubes o deportes ofrecidos por la institución fuera del horario regular.
-- Tienen un responsable docente, día/hora fijo y límite de cupos.
--
-- Backend  : catálogo de actividades; validación de cupos al inscribir.
-- Frontend : catálogo de actividades para padres/alumnos, panel de gestión para admin.
-- Funciones: publicar actividad, gestionar cupos, ver lista de participantes.
-- Depende de: instituciones, profesores, aulas.
-- Referenciada por: inscripciones_extracurriculares.
CREATE TABLE actividades_extracurriculares (
    id SERIAL PRIMARY KEY,
    institucion_id INTEGER NOT NULL REFERENCES instituciones (id) ON DELETE CASCADE,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    categoria VARCHAR(100),
    responsable_id INTEGER REFERENCES profesores (id),
    dia_semana VARCHAR(20),
    hora_inicio TIME,
    hora_fin TIME,
    aula_id INTEGER REFERENCES aulas (id),
    cupo_maximo SMALLINT,
    activa BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- TABLA: inscripciones_extracurriculares
-- Registro de alumnos inscritos en actividades extracurriculares.
-- Controla el estado de participación (activo, retirado, suspendido).
--
-- Backend  : validación de cupo máximo antes de insertar; notificación de confirmación.
-- Frontend : formulario de inscripción, lista de actividades del alumno.
-- Funciones: inscribir, retirar, suspender alumno de actividad, generar lista de participantes.
-- Depende de: actividades_extracurriculares, estudiantes.
-- Referenciada por: ninguna.
CREATE TABLE inscripciones_extracurriculares (
    id SERIAL PRIMARY KEY,
    actividad_id INTEGER NOT NULL REFERENCES actividades_extracurriculares (id) ON DELETE CASCADE,
    estudiante_id INTEGER NOT NULL REFERENCES estudiantes (id) ON DELETE CASCADE,
    fecha_inscripcion DATE NOT NULL DEFAULT CURRENT_DATE,
    estado VARCHAR(30) NOT NULL DEFAULT 'activo',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (actividad_id, estudiante_id)
);

-- ==========================================
-- MÓDULO: CONVIVENCIA E INCIDENCIAS
-- ==========================================

-- TABLA: incidencias
-- Registra eventos de conducta, conflictos o situaciones que requieren seguimiento.
-- Clasifica por tipo (disciplinaria, académica, emocional) y severidad.
--
-- Backend  : flujo de estado (abierta → en seguimiento → cerrada); notificación al padre.
-- Frontend : formulario de reporte de incidencia, bandeja de casos abiertos, ficha del alumno.
-- Funciones: reportar incidencia, hacer seguimiento, notificar a padres, cerrar caso.
-- Depende de: instituciones, estudiantes, usuarios.
-- Referenciada por: seguimiento_incidencias.
CREATE TABLE incidencias (
    id SERIAL PRIMARY KEY,
    institucion_id INTEGER NOT NULL REFERENCES instituciones (id) ON DELETE CASCADE,
    estudiante_id INTEGER NOT NULL REFERENCES estudiantes (id) ON DELETE CASCADE,
    reportador_id INTEGER NOT NULL REFERENCES usuarios (id) ON DELETE CASCADE,
    tipo VARCHAR(30) NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT NOT NULL,
    severidad VARCHAR(20) NOT NULL DEFAULT 'leve',
    fecha_incidencia DATE NOT NULL DEFAULT CURRENT_DATE,
    lugar VARCHAR(255),
    testigos TEXT,
    acciones_inmediatas TEXT,
    seguimiento TEXT,
    estado VARCHAR(30) NOT NULL DEFAULT 'abierta',
    cerrado_por INTEGER REFERENCES usuarios (id),
    fecha_cierre DATE,
    notificado_padre BOOLEAN NOT NULL DEFAULT FALSE,
    fecha_notificacion_padre DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- TABLA: seguimiento_incidencias
-- Historial de acciones realizadas sobre una incidencia (llamada al padre, reunión, etc.).
-- Cada acción queda vinculada al usuario que la ejecutó.
--
-- Backend  : log de acciones; base para reporte de gestión de convivencia.
-- Frontend : línea de tiempo de la incidencia, panel de seguimiento activo.
-- Funciones: agregar acción, registrar resultado, ver historial completo del caso.
-- Depende de: incidencias, usuarios.
-- Referenciada por: ninguna.
CREATE TABLE seguimiento_incidencias (
    id SERIAL PRIMARY KEY,
    incidencia_id INTEGER NOT NULL REFERENCES incidencias (id) ON DELETE CASCADE,
    usuario_id INTEGER NOT NULL REFERENCES usuarios (id),
    accion TEXT NOT NULL,
    resultado TEXT,
    fecha_accion DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==========================================
-- MÓDULO: MENSAJERÍA Y COMUNICACIÓN
-- ==========================================

-- TABLA: grupos
-- Espacios de comunicación colectiva (grupo de padres, sala de docentes, etc.).
-- Pueden ser oficiales (creados por la institución) o informales.
--
-- Backend  : contexto de mensajería grupal; control de miembros y roles dentro del grupo.
-- Frontend : lista de grupos del usuario, chat grupal, creación de nuevo grupo.
-- Funciones: crear grupo, agregar/eliminar miembros, archivar grupo, silenciar.
-- Depende de: instituciones, usuarios.
-- Referenciada por: grupo_miembros, mensajes.
CREATE TABLE grupos (
    id SERIAL PRIMARY KEY,
    institucion_id INTEGER NOT NULL REFERENCES instituciones (id) ON DELETE CASCADE,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    creador_id INTEGER NOT NULL REFERENCES usuarios (id) ON DELETE CASCADE,
    foto_grupo_url VARCHAR(500),
    es_oficial BOOLEAN NOT NULL DEFAULT FALSE,
    archivado BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- TABLA: grupo_miembros
-- Participantes de un grupo con su rol (admin o miembro) y estado de silencio.
--
-- Backend  : validación de pertenencia al enviar mensajes grupales.
-- Frontend : lista de miembros del grupo, opciones de silenciar/expulsar.
-- Funciones: agregar miembro, cambiar rol, silenciar grupo, salir del grupo.
-- Depende de: grupos, usuarios.
-- Referenciada por: ninguna.
CREATE TABLE grupo_miembros (
    grupo_id INTEGER NOT NULL REFERENCES grupos (id) ON DELETE CASCADE,
    usuario_id INTEGER NOT NULL REFERENCES usuarios (id) ON DELETE CASCADE,
    rol VARCHAR(30) NOT NULL DEFAULT 'miembro',
    silenciado BOOLEAN NOT NULL DEFAULT FALSE,
    joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (grupo_id, usuario_id)
);

-- TABLA: mensajes
-- Mensajes directos entre usuarios o en grupos. Soporta hilos (mensaje_padre_id).
-- Un mensaje debe tener destinatario individual O grupo, nunca ninguno.
--
-- Backend  : motor de mensajería; indexado por destinatario y grupo para bandeja de entrada.
-- Frontend : bandeja de mensajes, chat directo, chat grupal, vista de hilo.
-- Funciones: enviar mensaje, responder, marcar importante, eliminar de bandeja.
-- Depende de: usuarios, grupos, mensajes (autoreferencia para hilos).
-- Referenciada por: mensajes_estado, adjuntos_mensaje.
CREATE TABLE mensajes (
    id SERIAL PRIMARY KEY,
    remitente_id INTEGER NOT NULL REFERENCES usuarios (id) ON DELETE CASCADE,
    destinatario_id INTEGER REFERENCES usuarios (id) ON DELETE CASCADE,
    grupo_id INTEGER REFERENCES grupos (id) ON DELETE CASCADE,
    mensaje_padre_id INTEGER REFERENCES mensajes (id),
    asunto VARCHAR(255),
    contenido TEXT NOT NULL,
    es_importante BOOLEAN NOT NULL DEFAULT FALSE,
    eliminado_remitente BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_destino CHECK (
        destinatario_id IS NOT NULL
        OR grupo_id IS NOT NULL
    )
);

-- TABLA: mensajes_estado
-- Estado de lectura, eliminación y archivo de un mensaje para cada destinatario.
-- Permite que cada usuario tenga su propia vista del mismo mensaje.
--
-- Backend  : conteo de no leídos por usuario; filtros de bandeja (leído, archivado, eliminado).
-- Frontend : indicador de mensajes no leídos, acciones de bandeja por usuario.
-- Funciones: marcar como leído, archivar, eliminar de bandeja, ver fecha de lectura.
-- Depende de: mensajes, usuarios.
-- Referenciada por: ninguna.
CREATE TABLE mensajes_estado (
    mensaje_id INTEGER NOT NULL REFERENCES mensajes (id) ON DELETE CASCADE,
    usuario_id INTEGER NOT NULL REFERENCES usuarios (id) ON DELETE CASCADE,
    leido BOOLEAN NOT NULL DEFAULT FALSE,
    leido_en TIMESTAMPTZ,
    eliminado BOOLEAN NOT NULL DEFAULT FALSE,
    archivado BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (mensaje_id, usuario_id)
);

-- TABLA: adjuntos_mensaje
-- Archivos adjuntos a un mensaje (imágenes, PDFs, documentos).
--
-- Backend  : metadatos del archivo; URL referencia almacenamiento externo (S3, Drive, etc.).
-- Frontend : lista de adjuntos en el mensaje, descarga y previsualización.
-- Funciones: adjuntar archivo al mensaje, descargar adjunto, eliminar adjunto.
-- Depende de: mensajes.
-- Referenciada por: ninguna.
CREATE TABLE adjuntos_mensaje (
    id SERIAL PRIMARY KEY,
    mensaje_id INTEGER NOT NULL REFERENCES mensajes (id) ON DELETE CASCADE,
    tipo VARCHAR(30) NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    url VARCHAR(500) NOT NULL,
    tamano_kb INTEGER,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==========================================
-- MÓDULO: AGENDA Y EVENTOS
-- ==========================================

-- TABLA: eventos
-- Calendario institucional: reuniones de padres, fechas cívicas, capacitaciones, etc.
-- Soporta eventos únicos y recurrentes, presenciales y virtuales.
--
-- Backend  : generación de instancias por patrón de recurrencia; filtro por tipo y fecha.
-- Frontend : calendario institucional, agenda del docente, vista del padre.
-- Funciones: crear evento, invitar participantes, confirmar asistencia, ver agenda.
-- Depende de: instituciones, usuarios.
-- Referenciada por: evento_participantes.
CREATE TABLE eventos (
    id SERIAL PRIMARY KEY,
    institucion_id INTEGER NOT NULL REFERENCES instituciones (id) ON DELETE CASCADE,
    organizador_id INTEGER NOT NULL REFERENCES usuarios (id) ON DELETE CASCADE,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    tipo VARCHAR(50) NOT NULL,
    fecha_evento DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME,
    es_todo_el_dia BOOLEAN NOT NULL DEFAULT FALSE,
    recurrente BOOLEAN NOT NULL DEFAULT FALSE,
    patron_recurrencia VARCHAR(50),
    ubicacion VARCHAR(255),
    enlace_virtual VARCHAR(500),
    afecta_a_todos BOOLEAN NOT NULL DEFAULT FALSE,
    estado VARCHAR(30) NOT NULL DEFAULT 'programado',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- TABLA: evento_participantes
-- Lista de usuarios invitados a un evento y su estado de confirmación y asistencia real.
--
-- Backend  : envío masivo de invitaciones; registro de asistencia post-evento.
-- Frontend : lista de invitados, formulario de confirmación, reporte de asistencia.
-- Funciones: invitar usuario, confirmar/rechazar asistencia, registrar asistencia real.
-- Depende de: eventos, usuarios.
-- Referenciada por: ninguna.
CREATE TABLE evento_participantes (
    evento_id INTEGER NOT NULL REFERENCES eventos (id) ON DELETE CASCADE,
    usuario_id INTEGER NOT NULL REFERENCES usuarios (id) ON DELETE CASCADE,
    confirmacion VARCHAR(30) NOT NULL DEFAULT 'pendiente',
    asistio BOOLEAN,
    notas TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (evento_id, usuario_id)
);

-- ==========================================
-- MÓDULO: NOTIFICACIONES
-- ==========================================

-- TABLA: notificaciones
-- Alertas individuales generadas por el sistema para cada usuario
-- (nueva nota, inasistencia, mensaje nuevo, evento próximo, etc.).
--
-- Backend  : creadas por triggers o workers; enviadas vía push y/o email según preferencia.
-- Frontend : panel de notificaciones, badge de no leídas, centro de alertas.
-- Funciones: listar notificaciones, marcar como leída, filtrar por tipo.
-- Depende de: usuarios.
-- Referenciada por: ninguna.
CREATE TABLE notificaciones (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL REFERENCES usuarios (id) ON DELETE CASCADE,
    titulo VARCHAR(255) NOT NULL,
    contenido TEXT NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    referencia_id INTEGER,
    referencia_tabla VARCHAR(100),
    leida BOOLEAN NOT NULL DEFAULT FALSE,
    leida_en TIMESTAMPTZ,
    enviada_push BOOLEAN NOT NULL DEFAULT FALSE,
    enviada_email BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- TABLA: plantillas_notificacion
-- Mensajes predefinidos reutilizables para notificaciones automáticas del sistema.
-- Pueden ser globales (sin institucion_id) o personalizadas por institución.
--
-- Backend  : motor de plantillas; sustituye variables dinámicas antes de enviar.
-- Frontend : panel de personalización de mensajes automáticos en configuración.
-- Funciones: crear/editar plantilla, activar/desactivar, previsualizar antes de publicar.
-- Depende de: instituciones (opcional).
-- Referenciada por: ninguna (usada por el motor de notificaciones).
CREATE TABLE plantillas_notificacion (
    id SERIAL PRIMARY KEY,
    institucion_id INTEGER REFERENCES instituciones (id) ON DELETE CASCADE,
    nombre VARCHAR(100) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    asunto_email VARCHAR(255),
    cuerpo_email TEXT,
    cuerpo_push VARCHAR(500),
    activa BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==========================================
-- MÓDULO: EVALUACIONES Y EXÁMENES
-- ==========================================

-- TABLA: banco_preguntas
-- Repositorio de preguntas reutilizables creadas por los docentes por materia.
-- Soporta múltiple opción, verdadero/falso, desarrollo, entre otros tipos.
--
-- Backend  : fuente para generación aleatoria de exámenes; filtrable por tipo y dificultad.
-- Frontend : editor de preguntas del docente, selector al crear examen.
-- Funciones: crear pregunta, editar, etiquetar por tema, reutilizar en múltiples exámenes.
-- Depende de: materias, profesores.
-- Referenciada por: examen_preguntas.
CREATE TABLE banco_preguntas (
    id SERIAL PRIMARY KEY,
    materia_id INTEGER NOT NULL REFERENCES materias (id) ON DELETE CASCADE,
    profesor_id INTEGER NOT NULL REFERENCES profesores (id) ON DELETE CASCADE,
    tipo VARCHAR(50) NOT NULL,
    dificultad VARCHAR(30),
    enunciado TEXT NOT NULL,
    opciones JSONB,
    respuesta_clave TEXT,
    explicacion TEXT,
    tags VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- TABLA: examenes
-- Evaluaciones formales con fecha, duración y puntaje definidos por el docente.
-- Pueden ser presenciales (registradas manualmente) o en línea (respondidas en el sistema).
--
-- Backend  : control de ventana de tiempo; aleatorización de preguntas; autocorrección.
-- Frontend : creación de examen por docente, vista del alumno para rendir, resultados.
-- Funciones: crear examen, publicar, asignar a clase, ver resultados, exportar reporte.
-- Depende de: clases, criterios_evaluacion.
-- Referenciada por: examen_preguntas, examen_respuestas, examen_resultados.
CREATE TABLE examenes (
    id SERIAL PRIMARY KEY,
    clase_id INTEGER NOT NULL REFERENCES clases (id) ON DELETE CASCADE,
    criterio_id INTEGER REFERENCES criterios_evaluacion (id),
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    tipo VARCHAR(30) NOT NULL,
    fecha_inicio TIMESTAMPTZ NOT NULL,
    fecha_fin TIMESTAMPTZ NOT NULL,
    duracion_minutos SMALLINT,
    puntaje_total DECIMAL(5, 2) NOT NULL,
    puntaje_aprobatorio DECIMAL(5, 2) NOT NULL,
    intentos_permitidos SMALLINT DEFAULT 1,
    aleatorizar BOOLEAN NOT NULL DEFAULT FALSE,
    mostrar_resultados BOOLEAN NOT NULL DEFAULT TRUE,
    estado VARCHAR(30) NOT NULL DEFAULT 'borrador',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- TABLA: examen_preguntas
-- Preguntas que componen un examen. Pueden venir del banco o ingresarse ad hoc.
-- Almacena enunciado y opciones propias si no se usa el banco.
--
-- Backend  : estructura del examen renderizada al alumno; base del autocorrector.
-- Frontend : vista del examen al rendir, editor de preguntas al construir el examen.
-- Funciones: agregar pregunta (del banco o nueva), definir orden y puntaje, eliminar.
-- Depende de: examenes, banco_preguntas.
-- Referenciada por: examen_respuestas.
CREATE TABLE examen_preguntas (
    id SERIAL PRIMARY KEY,
    examen_id INTEGER NOT NULL REFERENCES examenes (id) ON DELETE CASCADE,
    pregunta_id INTEGER REFERENCES banco_preguntas (id) ON DELETE SET NULL,
    orden SMALLINT,
    puntaje DECIMAL(5, 2) NOT NULL,
    tipo VARCHAR(50),
    enunciado TEXT,
    opciones JSONB,
    respuesta_clave TEXT
);

-- TABLA: examen_respuestas
-- Respuesta individual de cada alumno a cada pregunta del examen.
-- Permite corrección automática y revisión manual de respuestas abiertas.
--
-- Backend  : autocorrección al finalizar; revisión manual para preguntas de desarrollo.
-- Frontend : vista de corrección del docente, revisión de respuestas por el alumno.
-- Funciones: registrar respuesta, autocorregir, asignar puntaje manual, ver detalle.
-- Depende de: examenes, estudiantes, examen_preguntas.
-- Referenciada por: ninguna.
CREATE TABLE examen_respuestas (
    id SERIAL PRIMARY KEY,
    examen_id INTEGER NOT NULL REFERENCES examenes (id) ON DELETE CASCADE,
    estudiante_id INTEGER NOT NULL REFERENCES estudiantes (id) ON DELETE CASCADE,
    pregunta_id INTEGER NOT NULL REFERENCES examen_preguntas (id) ON DELETE CASCADE,
    respuesta TEXT,
    es_correcta BOOLEAN,
    puntaje_obtenido DECIMAL(5, 2),
    intento_numero SMALLINT NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- TABLA: examen_resultados
-- Resumen del resultado final de un alumno en un examen (puntaje total, aprobado/no).
-- Se genera al finalizar o corregir el examen completo.
--
-- Backend  : cálculo de puntaje total sumando examen_respuestas; notificación de resultado.
-- Frontend : pantalla de resultado post-examen, ranking de la clase, reporte del docente.
-- Funciones: consultar resultado, ver detalle de respuestas, exportar acta de notas.
-- Depende de: examenes, estudiantes.
-- Referenciada por: ninguna.
CREATE TABLE examen_resultados (
    id SERIAL PRIMARY KEY,
    examen_id INTEGER NOT NULL REFERENCES examenes (id) ON DELETE CASCADE,
    estudiante_id INTEGER NOT NULL REFERENCES estudiantes (id) ON DELETE CASCADE,
    intento_numero SMALLINT NOT NULL DEFAULT 1,
    puntaje_obtenido DECIMAL(5, 2),
    calificacion DECIMAL(5, 2),
    aprobado BOOLEAN,
    inicio_examen TIMESTAMPTZ,
    fin_examen TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (
        examen_id,
        estudiante_id,
        intento_numero
    )
);

-- ==========================================
-- MÓDULO: PLANIFICACIÓN Y RECURSOS
-- ==========================================

-- TABLA: plan_curricular
-- Planificación de unidades didácticas por clase y periodo.
-- El docente registra competencias, contenidos, estrategias y horas previstas.
--
-- Backend  : base para reportes de avance curricular; comparación planificado vs ejecutado.
-- Frontend : editor de unidades para el docente, vista de progreso curricular por periodo.
-- Funciones: crear unidad, editar contenidos, marcar como ejecutada, exportar plan anual.
-- Depende de: clases, periodos_academicos.
-- Referenciada por: ninguna.
CREATE TABLE plan_curricular (
    id SERIAL PRIMARY KEY,
    clase_id INTEGER NOT NULL REFERENCES clases (id) ON DELETE CASCADE,
    periodo_id INTEGER NOT NULL REFERENCES periodos_academicos (id),
    unidad SMALLINT NOT NULL,
    titulo_unidad VARCHAR(255) NOT NULL,
    competencias TEXT,
    contenidos TEXT,
    estrategias TEXT,
    recursos TEXT,
    horas_previstas SMALLINT,
    UNIQUE (clase_id, periodo_id, unidad)
);

-- TABLA: recursos_educativos
-- Biblioteca digital de la institución: PDFs, videos, presentaciones, enlaces.
-- Pueden ser públicos (visibles a toda la institución) o privados.
--
-- Backend  : repositorio central; filtrable por materia y tipo; contador de descargas.
-- Frontend : biblioteca digital, búsqueda de recursos, subida de material por docentes.
-- Funciones: subir recurso, publicar/privatizar, filtrar por materia, descargar.
-- Depende de: instituciones, usuarios, materias.
-- Referenciada por: ninguna.
CREATE TABLE recursos_educativos (
    id SERIAL PRIMARY KEY,
    institucion_id INTEGER NOT NULL REFERENCES instituciones (id) ON DELETE CASCADE,
    subido_por INTEGER NOT NULL REFERENCES usuarios (id),
    materia_id INTEGER REFERENCES materias (id),
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    tipo VARCHAR(30) NOT NULL,
    url VARCHAR(500) NOT NULL,
    tamano_kb INTEGER,
    publico BOOLEAN NOT NULL DEFAULT FALSE,
    descargas INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==========================================
-- MÓDULO: CONFIGURACIÓN Y AUDITORÍA
-- ==========================================

-- TABLA: configuracion_institucion
-- Parámetros operativos de cada colegio: escala de notas, tema visual, horarios,
-- permisos de padres y umbrales de alerta. Un registro por institución.
--
-- Backend  : cargada al inicio de sesión; controla comportamiento global del sistema.
-- Frontend : panel de configuración del director, personalización visual, ajustes de alertas.
-- Funciones: cambiar escala de calificación, personalizar colores, habilitar portal de padres.
-- Depende de: instituciones, escalas_calificacion.
-- Referenciada por: lógica de negocio en múltiples módulos (no FK directa).
CREATE TABLE configuracion_institucion (
    id SERIAL PRIMARY KEY,
    institucion_id INTEGER NOT NULL UNIQUE REFERENCES instituciones (id) ON DELETE CASCADE,
    escala_calificacion_id INTEGER REFERENCES escalas_calificacion (id),
    tema_color_primario VARCHAR(7) DEFAULT '#1A73E8',
    tema_color_secundario VARCHAR(7) DEFAULT '#34A853',
    logo_url VARCHAR(500),
    mantener_registros_anos SMALLINT DEFAULT 5,
    permitir_registro_padres BOOLEAN NOT NULL DEFAULT TRUE,
    padres_ven_calificaciones BOOLEAN NOT NULL DEFAULT TRUE,
    padres_ven_asistencia BOOLEAN NOT NULL DEFAULT TRUE,
    padres_ven_tareas BOOLEAN NOT NULL DEFAULT TRUE,
    notificacion_inasistencia BOOLEAN NOT NULL DEFAULT TRUE,
    notificacion_calificacion_baja BOOLEAN NOT NULL DEFAULT TRUE,
    umbral_calificacion_baja DECIMAL(5, 2) DEFAULT 11.00,
    horario_inicio_clases TIME DEFAULT '07:30:00',
    horario_fin_clases TIME DEFAULT '15:00:00',
    dias_laborables VARCHAR(100) DEFAULT 'lunes,martes,miercoles,jueves,viernes',
    idioma_principal VARCHAR(10) DEFAULT 'es',
    zona_horaria VARCHAR(50) DEFAULT 'America/Lima',
    moneda VARCHAR(10) DEFAULT 'PEN',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- TABLA: audit_log
-- Registro inmutable de toda acción de escritura en el sistema (INSERT, UPDATE, DELETE).
-- Almacena el estado anterior y nuevo del registro afectado en JSONB.
--
-- Backend  : poblada por triggers en tablas críticas; nunca se elimina ni edita.
-- Frontend : panel de auditoría para el director/admin, filtros por usuario/tabla/fecha.
-- Funciones: rastrear quién hizo qué y cuándo, revertir cambios, detectar accesos indebidos.
-- Depende de: usuarios (opcional; puede ser NULL si la acción fue del sistema).
-- Referenciada por: ninguna.
CREATE TABLE audit_log (
    id BIGSERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios (id),
    tabla VARCHAR(100) NOT NULL,
    registro_id INTEGER NOT NULL,
    accion VARCHAR(20) NOT NULL,
    datos_anteriores JSONB,
    datos_nuevos JSONB,
    ip_origen INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);