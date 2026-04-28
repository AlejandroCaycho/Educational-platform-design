-- ==========================================
-- EDUCNOVA - PLATAFORMA EDUCATIVA
-- Base de Datos Relacional
-- ==========================================

-- ==========================================
-- 1. TABLA DE INSTITUCIONES
-- ==========================================
CREATE TABLE IF NOT EXISTS instituciones (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL,
  telefono VARCHAR(20),
  direccion TEXT,
  ciudad VARCHAR(100),
  pais VARCHAR(100),
  logo_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- 2. TABLA DE USUARIOS (Base)
-- ==========================================
CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  institucion_id INTEGER NOT NULL REFERENCES instituciones(id) ON DELETE CASCADE,
  nombre VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  contraseña VARCHAR(255) NOT NULL,
  telefono VARCHAR(20),
  estado ENUM('activo', 'inactivo') DEFAULT 'activo',
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(institucion_id, email)
);

-- ==========================================
-- 3. TABLA DE ROLES
-- ==========================================
CREATE TABLE IF NOT EXISTS roles (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL UNIQUE,
  descripcion TEXT,
  permisos JSON
);

-- ==========================================
-- 4. TABLA RELACIONAL USUARIOS-ROLES
-- ==========================================
CREATE TABLE IF NOT EXISTS usuario_roles (
  usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  rol_id INTEGER NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  PRIMARY KEY (usuario_id, rol_id)
);

-- ==========================================
-- 5. TABLA DE PERSONAS (Estudiantes, Profesores, Padres, etc.)
-- ==========================================
CREATE TABLE IF NOT EXISTS personas (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER UNIQUE REFERENCES usuarios(id) ON DELETE CASCADE,
  institucion_id INTEGER NOT NULL REFERENCES instituciones(id) ON DELETE CASCADE,
  tipo_persona ENUM('estudiante', 'profesor', 'tutor', 'directivo', 'padre') NOT NULL,
  documento_identidad VARCHAR(50),
  fecha_nacimiento DATE,
  genero ENUM('masculino', 'femenino', 'otro'),
  foto_url VARCHAR(255),
  telefono_personal VARCHAR(20),
  direccion TEXT,
  ciudad VARCHAR(100),
  estado_civil ENUM('soltero', 'casado', 'divorciado', 'viudo'),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- 6. TABLA DE GRADOS/CURSOS
-- ==========================================
CREATE TABLE IF NOT EXISTS grados (
  id SERIAL PRIMARY KEY,
  institucion_id INTEGER NOT NULL REFERENCES instituciones(id) ON DELETE CASCADE,
  nombre VARCHAR(100) NOT NULL,
  nivel_academico VARCHAR(100),
  numero_estudiantes INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(institucion_id, nombre)
);

-- ==========================================
-- 7. TABLA DE ESTUDIANTES (con referencia a grados)
-- ==========================================
CREATE TABLE IF NOT EXISTS estudiantes (
  id SERIAL PRIMARY KEY,
  persona_id INTEGER NOT NULL UNIQUE REFERENCES personas(id) ON DELETE CASCADE,
  grado_id INTEGER NOT NULL REFERENCES grados(id) ON DELETE CASCADE,
  numero_matricula VARCHAR(50) UNIQUE NOT NULL,
  estado_academico ENUM('activo', 'inactivo', 'suspendido') DEFAULT 'activo',
  promedio_general DECIMAL(3, 2) DEFAULT 0.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- 8. TABLA DE PROFESORES
-- ==========================================
CREATE TABLE IF NOT EXISTS profesores (
  id SERIAL PRIMARY KEY,
  persona_id INTEGER NOT NULL UNIQUE REFERENCES personas(id) ON DELETE CASCADE,
  numero_empleado VARCHAR(50) UNIQUE NOT NULL,
  especialidad VARCHAR(255),
  estado_laboral ENUM('activo', 'licencia', 'jubilado') DEFAULT 'activo',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- 9. TABLA DE MATERIAS/ASIGNATURAS
-- ==========================================
CREATE TABLE IF NOT EXISTS materias (
  id SERIAL PRIMARY KEY,
  institucion_id INTEGER NOT NULL REFERENCES instituciones(id) ON DELETE CASCADE,
  nombre VARCHAR(255) NOT NULL,
  codigo VARCHAR(50),
  descripcion TEXT,
  creditos INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(institucion_id, codigo)
);

-- ==========================================
-- 10. TABLA DE CLASES (Asignación de Profesor a Grado-Materia)
-- ==========================================
CREATE TABLE IF NOT EXISTS clases (
  id SERIAL PRIMARY KEY,
  profesor_id INTEGER NOT NULL REFERENCES profesores(id) ON DELETE CASCADE,
  grado_id INTEGER NOT NULL REFERENCES grados(id) ON DELETE CASCADE,
  materia_id INTEGER NOT NULL REFERENCES materias(id) ON DELETE CASCADE,
  sala VARCHAR(50),
  horario_inicio TIME,
  horario_fin TIME,
  dias_semana VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(profesor_id, grado_id, materia_id)
);

-- ==========================================
-- 11. TABLA DE PADRES/TUTORES
-- ==========================================
CREATE TABLE IF NOT EXISTS padres_tutores (
  id SERIAL PRIMARY KEY,
  persona_id INTEGER NOT NULL UNIQUE REFERENCES personas(id) ON DELETE CASCADE,
  estudiante_id INTEGER NOT NULL REFERENCES estudiantes(id) ON DELETE CASCADE,
  relacion ENUM('padre', 'madre', 'tutor', 'abuelo', 'otro'),
  ocupacion VARCHAR(255),
  empresa VARCHAR(255),
  telefono_empresa VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- 12. TABLA DE EVENTOS/CALENDARIO
-- ==========================================
CREATE TABLE IF NOT EXISTS eventos (
  id SERIAL PRIMARY KEY,
  institucion_id INTEGER NOT NULL REFERENCES instituciones(id) ON DELETE CASCADE,
  organizador_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  titulo VARCHAR(255) NOT NULL,
  descripcion TEXT,
  tipo ENUM('reunion', 'cita', 'tarea', 'tutoria', 'otro') NOT NULL,
  fecha_evento DATE NOT NULL,
  hora_inicio TIME NOT NULL,
  hora_fin TIME,
  ubicacion VARCHAR(255),
  estado ENUM('programado', 'completado', 'cancelado') DEFAULT 'programado',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_institucion_fecha (institucion_id, fecha_evento)
);

-- ==========================================
-- 13. TABLA RELACIONAL EVENTOS-PARTICIPANTES
-- ==========================================
CREATE TABLE IF NOT EXISTS evento_participantes (
  evento_id INTEGER NOT NULL REFERENCES eventos(id) ON DELETE CASCADE,
  usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  confirmacion ENUM('confirmado', 'pendiente', 'rechazado') DEFAULT 'pendiente',
  asistio BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (evento_id, usuario_id)
);

-- ==========================================
-- 14. TABLA DE MENSAJES
-- ==========================================
CREATE TABLE IF NOT EXISTS mensajes (
  id SERIAL PRIMARY KEY,
  remitente_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  destinatario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
  grupo_id INTEGER REFERENCES grupos(id) ON DELETE CASCADE,
  asunto VARCHAR(255),
  contenido TEXT NOT NULL,
  leido BOOLEAN DEFAULT FALSE,
  archivos_url JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CHECK (destinatario_id IS NOT NULL OR grupo_id IS NOT NULL),
  INDEX idx_destinatario_leido (destinatario_id, leido),
  INDEX idx_remitente_fecha (remitente_id, created_at)
);

-- ==========================================
-- 15. TABLA DE GRUPOS DE MENSAJERÍA
-- ==========================================
CREATE TABLE IF NOT EXISTS grupos (
  id SERIAL PRIMARY KEY,
  institucion_id INTEGER NOT NULL REFERENCES instituciones(id) ON DELETE CASCADE,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT,
  creador_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  foto_grupo_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- 16. TABLA RELACIONAL GRUPOS-MIEMBROS
-- ==========================================
CREATE TABLE IF NOT EXISTS grupo_miembros (
  grupo_id INTEGER NOT NULL REFERENCES grupos(id) ON DELETE CASCADE,
  usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  rol ENUM('administrador', 'miembro') DEFAULT 'miembro',
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (grupo_id, usuario_id)
);

-- ==========================================
-- 17. TABLA DE REPORTES ACADÉMICOS
-- ==========================================
CREATE TABLE IF NOT EXISTS reportes_academicos (
  id SERIAL PRIMARY KEY,
  estudiante_id INTEGER NOT NULL REFERENCES estudiantes(id) ON DELETE CASCADE,
  periodo VARCHAR(50),
  ano_academico INTEGER,
  profesor_id INTEGER REFERENCES profesores(id) ON DELETE SET NULL,
  materia_id INTEGER REFERENCES materias(id) ON DELETE SET NULL,
  calificacion DECIMAL(3, 2),
  asistencia_porcentaje DECIMAL(5, 2),
  observaciones TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_estudiante_periodo (estudiante_id, ano_academico, periodo)
);

-- ==========================================
-- 18. TABLA DE INCIDENCIAS
-- ==========================================
CREATE TABLE IF NOT EXISTS incidencias (
  id SERIAL PRIMARY KEY,
  institucion_id INTEGER NOT NULL REFERENCES instituciones(id) ON DELETE CASCADE,
  estudiante_id INTEGER NOT NULL REFERENCES estudiantes(id) ON DELETE CASCADE,
  reportador_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  tipo ENUM('conducta', 'asistencia', 'academico', 'otro') NOT NULL,
  descripcion TEXT NOT NULL,
  severidad ENUM('leve', 'moderada', 'grave') DEFAULT 'leve',
  fecha_incidencia DATE NOT NULL,
  acciones_tomadas TEXT,
  estado ENUM('abierta', 'en_proceso', 'cerrada') DEFAULT 'abierta',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_estudiante_fecha (estudiante_id, fecha_incidencia)
);

-- ==========================================
-- 19. TABLA DE ASISTENCIA
-- ==========================================
CREATE TABLE IF NOT EXISTS asistencia (
  id SERIAL PRIMARY KEY,
  estudiante_id INTEGER NOT NULL REFERENCES estudiantes(id) ON DELETE CASCADE,
  clase_id INTEGER NOT NULL REFERENCES clases(id) ON DELETE CASCADE,
  fecha DATE NOT NULL,
  presente BOOLEAN DEFAULT FALSE,
  justificado BOOLEAN DEFAULT FALSE,
  motivo_inasistencia VARCHAR(255),
  registrado_por INTEGER REFERENCES usuarios(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(estudiante_id, clase_id, fecha),
  INDEX idx_estudiante_fecha (estudiante_id, fecha)
);

-- ==========================================
-- 20. TABLA DE TAREAS
-- ==========================================
CREATE TABLE IF NOT EXISTS tareas (
  id SERIAL PRIMARY KEY,
  clase_id INTEGER NOT NULL REFERENCES clases(id) ON DELETE CASCADE,
  profesor_id INTEGER NOT NULL REFERENCES profesores(id) ON DELETE CASCADE,
  titulo VARCHAR(255) NOT NULL,
  descripcion TEXT,
  fecha_asignacion DATE NOT NULL,
  fecha_vencimiento DATE NOT NULL,
  archivo_adjunto VARCHAR(255),
  valor_puntos DECIMAL(5, 2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- 21. TABLA DE ENTREGAS DE TAREAS
-- ==========================================
CREATE TABLE IF NOT EXISTS entregas_tareas (
  id SERIAL PRIMARY KEY,
  tarea_id INTEGER NOT NULL REFERENCES tareas(id) ON DELETE CASCADE,
  estudiante_id INTEGER NOT NULL REFERENCES estudiantes(id) ON DELETE CASCADE,
  archivo_entregado VARCHAR(255),
  fecha_entrega TIMESTAMP NOT NULL,
  comentarios TEXT,
  calificacion DECIMAL(3, 2),
  retroalimentacion TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(tarea_id, estudiante_id),
  INDEX idx_estudiante_fecha (estudiante_id, fecha_entrega)
);

-- ==========================================
-- 22. TABLA DE CONFIGURACIÓN DE INSTITUCIÓN
-- ==========================================
CREATE TABLE IF NOT EXISTS configuracion_institucion (
  id SERIAL PRIMARY KEY,
  institucion_id INTEGER NOT NULL UNIQUE REFERENCES instituciones(id) ON DELETE CASCADE,
  ano_academico_actual INTEGER,
  periodo_actual VARCHAR(50),
  tema_color VARCHAR(7),
  logo_url VARCHAR(255),
  mantener_registros_anos INTEGER DEFAULT 5,
  permitir_registro_padres BOOLEAN DEFAULT TRUE,
  permitir_calificaciones_en_linea BOOLEAN DEFAULT TRUE,
  horario_inicio_clases TIME,
  horario_fin_clases TIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- 23. TABLA DE NOTIFICACIONES
-- ==========================================
CREATE TABLE IF NOT EXISTS notificaciones (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  titulo VARCHAR(255) NOT NULL,
  contenido TEXT NOT NULL,
  tipo ENUM('evento', 'calificacion', 'incidencia', 'mensaje', 'tarea', 'otro'),
  referencia_id INTEGER,
  referencia_tipo VARCHAR(50),
  leida BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_usuario_leida (usuario_id, leida)
);

-- ==========================================
-- ÍNDICES ADICIONALES
-- ==========================================
CREATE INDEX idx_usuarios_institucion ON usuarios(institucion_id);
CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_personas_institucion ON personas(institucion_id);
CREATE INDEX idx_personas_tipo ON personas(tipo_persona);
CREATE INDEX idx_estudiantes_grado ON estudiantes(grado_id);
CREATE INDEX idx_reportes_ano ON reportes_academicos(ano_academico);
CREATE INDEX idx_mensajes_grupo ON mensajes(grupo_id);

-- ==========================================
-- INSERCIÓN DE DATOS INICIALES
-- ==========================================

-- Insertar Institución
INSERT INTO instituciones (nombre, email, telefono, direccion, ciudad, pais) VALUES
('EduNova Academy', 'info@edunovacademy.com', '+34 912345678', 'Calle Principal 123', 'Madrid', 'España');

-- Insertar Roles
INSERT INTO roles (nombre, descripcion) VALUES
('admin', 'Administrador del sistema'),
('profesor', 'Docente de la institución'),
('estudiante', 'Estudiante matriculado'),
('padre', 'Padre o tutor legal'),
('director', 'Director académico');

-- Insertar Usuarios de prueba
INSERT INTO usuarios (institucion_id, nombre, email, contraseña, estado) VALUES
(1, 'Coordinadora Patricia', 'patricia@school.com', 'hashed_password_123', 'activo'),
(1, 'Profa. Daniela García', 'daniela@school.com', 'hashed_password_456', 'activo'),
(1, 'Prof. Juan Morales', 'juan@school.com', 'hashed_password_789', 'activo'),
(1, 'Familia García López', 'garcia@example.com', 'hashed_password_101', 'activo'),
(1, 'Familia Rodríguez Martín', 'rodriguez@example.com', 'hashed_password_102', 'activo');

-- Insertar Grados
INSERT INTO grados (institucion_id, nombre, nivel_academico) VALUES
(1, '5to Primaria A', 'Primaria'),
(1, '5to Primaria B', 'Primaria'),
(1, '6to Primaria A', 'Primaria');

-- Insertar Materias
INSERT INTO materias (institucion_id, nombre, codigo) VALUES
(1, 'Matemáticas', 'MAT-001'),
(1, 'Lenguaje', 'LEN-001'),
(1, 'Ciencias', 'CIE-001'),
(1, 'Historia', 'HIS-001');

-- Crear tabla temporal para las IDs generadas
-- (Las IDs se generarán automáticamente con SERIAL)

COMMIT;
