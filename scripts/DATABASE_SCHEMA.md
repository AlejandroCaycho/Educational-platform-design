# EduNova - Esquema de Base de Datos Relacional

## Descripción General

EduNova es una plataforma educativa integral que requiere una base de datos relacional robusta para gestionar:
- Usuarios y autenticación
- Instituciones educativas
- Estudiantes, Profesores, Padres y Directivos
- Calendario de eventos y reuniones
- Mensajería y comunicación
- Calificaciones y reportes académicos
- Asistencia e incidencias
- Tareas y entregas

## Estructura de Tablas

### 1. TABLA: `instituciones`
**Propósito**: Almacena información de instituciones educativas

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | SERIAL | Identificador único |
| nombre | VARCHAR(255) | Nombre de la institución |
| email | VARCHAR(255) | Email de contacto |
| telefono | VARCHAR(20) | Teléfono |
| direccion | TEXT | Dirección física |
| ciudad | VARCHAR(100) | Ciudad |
| pais | VARCHAR(100) | País |
| logo_url | VARCHAR(255) | URL del logo |
| created_at | TIMESTAMP | Fecha de creación |
| updated_at | TIMESTAMP | Fecha de actualización |

### 2. TABLA: `usuarios`
**Propósito**: Usuarios del sistema con autenticación

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | SERIAL | Identificador único |
| institucion_id | INTEGER | FK - Institución |
| nombre | VARCHAR(255) | Nombre completo |
| email | VARCHAR(255) | Email único por institución |
| contraseña | VARCHAR(255) | Contraseña (hasheada) |
| telefono | VARCHAR(20) | Teléfono |
| estado | ENUM | 'activo' o 'inactivo' |
| fecha_creacion | TIMESTAMP | Fecha de creación |
| fecha_actualizacion | TIMESTAMP | Última actualización |

### 3. TABLA: `roles`
**Propósito**: Definir roles del sistema

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | SERIAL | Identificador único |
| nombre | VARCHAR(100) | Nombre del rol |
| descripcion | TEXT | Descripción de permisos |
| permisos | JSON | Permisos en formato JSON |

**Roles por defecto**: admin, profesor, estudiante, padre, director

### 4. TABLA: `usuario_roles`
**Propósito**: Relación muchos-a-muchos entre usuarios y roles

| Campo | Tipo | Descripción |
|-------|------|-------------|
| usuario_id | INTEGER | FK - Usuario |
| rol_id | INTEGER | FK - Rol |

### 5. TABLA: `personas`
**Propósito**: Información personal de estudiantes, profesores, padres, etc.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | SERIAL | Identificador único |
| usuario_id | INTEGER | FK - Usuario (opcional) |
| institucion_id | INTEGER | FK - Institución |
| tipo_persona | ENUM | 'estudiante', 'profesor', 'tutor', 'directivo', 'padre' |
| documento_identidad | VARCHAR(50) | Cédula/RUT/DNI |
| fecha_nacimiento | DATE | Fecha de nacimiento |
| genero | ENUM | 'masculino', 'femenino', 'otro' |
| foto_url | VARCHAR(255) | URL de foto de perfil |
| telefono_personal | VARCHAR(20) | Teléfono personal |
| direccion | TEXT | Dirección |
| ciudad | VARCHAR(100) | Ciudad |
| estado_civil | ENUM | Estado civil |

### 6. TABLA: `grados`
**Propósito**: Grados/cursos de la institución

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | SERIAL | Identificador único |
| institucion_id | INTEGER | FK - Institución |
| nombre | VARCHAR(100) | Nombre del grado |
| nivel_academico | VARCHAR(100) | Nivel (Primaria, Secundaria, etc) |
| numero_estudiantes | INTEGER | Cantidad de estudiantes |

### 7. TABLA: `estudiantes`
**Propósito**: Información académica de estudiantes

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | SERIAL | Identificador único |
| persona_id | INTEGER | FK - Persona |
| grado_id | INTEGER | FK - Grado |
| numero_matricula | VARCHAR(50) | Número de matrícula único |
| estado_academico | ENUM | 'activo', 'inactivo', 'suspendido' |
| promedio_general | DECIMAL(3, 2) | Promedio general |

### 8. TABLA: `profesores`
**Propósito**: Información de profesores/docentes

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | SERIAL | Identificador único |
| persona_id | INTEGER | FK - Persona |
| numero_empleado | VARCHAR(50) | Número de empleado |
| especialidad | VARCHAR(255) | Área de especialidad |
| estado_laboral | ENUM | 'activo', 'licencia', 'jubilado' |

### 9. TABLA: `materias`
**Propósito**: Asignaturas/materias del currículo

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | SERIAL | Identificador único |
| institucion_id | INTEGER | FK - Institución |
| nombre | VARCHAR(255) | Nombre de materia |
| codigo | VARCHAR(50) | Código único |
| descripcion | TEXT | Descripción |
| creditos | INTEGER | Créditos académicos |

### 10. TABLA: `clases`
**Propósito**: Asignación de profesor a grado-materia

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | SERIAL | Identificador único |
| profesor_id | INTEGER | FK - Profesor |
| grado_id | INTEGER | FK - Grado |
| materia_id | INTEGER | FK - Materia |
| sala | VARCHAR(50) | Número de aula |
| horario_inicio | TIME | Hora de inicio |
| horario_fin | TIME | Hora de finalización |
| dias_semana | VARCHAR(50) | Días (Lunes,Miércoles,etc) |

### 11. TABLA: `padres_tutores`
**Propósito**: Relación padres/tutores con estudiantes

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | SERIAL | Identificador único |
| persona_id | INTEGER | FK - Persona (padre) |
| estudiante_id | INTEGER | FK - Estudiante |
| relacion | ENUM | 'padre', 'madre', 'tutor', 'abuelo', 'otro' |
| ocupacion | VARCHAR(255) | Ocupación |
| empresa | VARCHAR(255) | Empresa donde trabaja |
| telefono_empresa | VARCHAR(20) | Teléfono de empresa |

### 12. TABLA: `eventos`
**Propósito**: Eventos del calendario (reuniones, citas, tareas, tutorías)

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | SERIAL | Identificador único |
| institucion_id | INTEGER | FK - Institución |
| organizador_id | INTEGER | FK - Usuario que organiza |
| titulo | VARCHAR(255) | Título del evento |
| descripcion | TEXT | Descripción |
| tipo | ENUM | 'reunion', 'cita', 'tarea', 'tutoria', 'otro' |
| fecha_evento | DATE | Fecha del evento |
| hora_inicio | TIME | Hora de inicio |
| hora_fin | TIME | Hora de finalización |
| ubicacion | VARCHAR(255) | Ubicación |
| estado | ENUM | 'programado', 'completado', 'cancelado' |

### 13. TABLA: `evento_participantes`
**Propósito**: Participantes en eventos

| Campo | Tipo | Descripción |
|-------|------|-------------|
| evento_id | INTEGER | FK - Evento |
| usuario_id | INTEGER | FK - Usuario |
| confirmacion | ENUM | 'confirmado', 'pendiente', 'rechazado' |
| asistio | BOOLEAN | ¿Asistió? |

### 14. TABLA: `mensajes`
**Propósito**: Sistema de mensajería entre usuarios

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | SERIAL | Identificador único |
| remitente_id | INTEGER | FK - Usuario remitente |
| destinatario_id | INTEGER | FK - Usuario destinatario |
| grupo_id | INTEGER | FK - Grupo (si es grupal) |
| asunto | VARCHAR(255) | Asunto del mensaje |
| contenido | TEXT | Contenido |
| leido | BOOLEAN | ¿Ha sido leído? |
| archivos_url | JSON | URLs de archivos adjuntos |

### 15. TABLA: `grupos`
**Propósito**: Grupos de mensajería

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | SERIAL | Identificador único |
| institucion_id | INTEGER | FK - Institución |
| nombre | VARCHAR(255) | Nombre del grupo |
| descripcion | TEXT | Descripción |
| creador_id | INTEGER | FK - Usuario creador |
| foto_grupo_url | VARCHAR(255) | Foto del grupo |

### 16. TABLA: `grupo_miembros`
**Propósito**: Miembros de grupos de mensajería

| Campo | Tipo | Descripción |
|-------|------|-------------|
| grupo_id | INTEGER | FK - Grupo |
| usuario_id | INTEGER | FK - Usuario |
| rol | ENUM | 'administrador', 'miembro' |
| joined_at | TIMESTAMP | Fecha de ingreso |

### 17. TABLA: `reportes_academicos`
**Propósito**: Calificaciones y reportes académicos

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | SERIAL | Identificador único |
| estudiante_id | INTEGER | FK - Estudiante |
| periodo | VARCHAR(50) | Periodo (1er Trimestre, etc) |
| ano_academico | INTEGER | Año académico |
| profesor_id | INTEGER | FK - Profesor |
| materia_id | INTEGER | FK - Materia |
| calificacion | DECIMAL(3, 2) | Calificación (0-10) |
| asistencia_porcentaje | DECIMAL(5, 2) | % de asistencia |
| observaciones | TEXT | Observaciones |

### 18. TABLA: `incidencias`
**Propósito**: Registro de incidencias disciplinarias

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | SERIAL | Identificador único |
| institucion_id | INTEGER | FK - Institución |
| estudiante_id | INTEGER | FK - Estudiante |
| reportador_id | INTEGER | FK - Usuario que reporta |
| tipo | ENUM | 'conducta', 'asistencia', 'academico', 'otro' |
| descripcion | TEXT | Descripción de incidencia |
| severidad | ENUM | 'leve', 'moderada', 'grave' |
| fecha_incidencia | DATE | Fecha cuando ocurrió |
| acciones_tomadas | TEXT | Acciones tomadas |
| estado | ENUM | 'abierta', 'en_proceso', 'cerrada' |

### 19. TABLA: `asistencia`
**Propósito**: Control de asistencia por clase

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | SERIAL | Identificador único |
| estudiante_id | INTEGER | FK - Estudiante |
| clase_id | INTEGER | FK - Clase |
| fecha | DATE | Fecha de clase |
| presente | BOOLEAN | ¿Asistió? |
| justificado | BOOLEAN | ¿Justificado? |
| motivo_inasistencia | VARCHAR(255) | Motivo |
| registrado_por | INTEGER | FK - Usuario que registra |

### 20. TABLA: `tareas`
**Propósito**: Tareas asignadas por profesores

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | SERIAL | Identificador único |
| clase_id | INTEGER | FK - Clase |
| profesor_id | INTEGER | FK - Profesor |
| titulo | VARCHAR(255) | Título de la tarea |
| descripcion | TEXT | Descripción |
| fecha_asignacion | DATE | Fecha de asignación |
| fecha_vencimiento | DATE | Fecha de vencimiento |
| archivo_adjunto | VARCHAR(255) | URL de archivo |
| valor_puntos | DECIMAL(5, 2) | Puntos de la tarea |

### 21. TABLA: `entregas_tareas`
**Propósito**: Entregas de tareas por estudiantes

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | SERIAL | Identificador único |
| tarea_id | INTEGER | FK - Tarea |
| estudiante_id | INTEGER | FK - Estudiante |
| archivo_entregado | VARCHAR(255) | URL del archivo entregado |
| fecha_entrega | TIMESTAMP | Fecha/hora de entrega |
| comentarios | TEXT | Comentarios del estudiante |
| calificacion | DECIMAL(3, 2) | Calificación |
| retroalimentacion | TEXT | Retroalimentación del profesor |

### 22. TABLA: `configuracion_institucion`
**Propósito**: Configuración de parámetros institucionales

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | SERIAL | Identificador único |
| institucion_id | INTEGER | FK - Institución |
| ano_academico_actual | INTEGER | Año académico vigente |
| periodo_actual | VARCHAR(50) | Periodo actual |
| permitir_registro_padres | BOOLEAN | ¿Permite registro de padres? |
| permitir_calificaciones_en_linea | BOOLEAN | ¿Muestra calificaciones online? |
| horario_inicio_clases | TIME | Hora inicio de clases |
| horario_fin_clases | TIME | Hora fin de clases |

### 23. TABLA: `notificaciones`
**Propósito**: Sistema de notificaciones

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | SERIAL | Identificador único |
| usuario_id | INTEGER | FK - Usuario destinatario |
| titulo | VARCHAR(255) | Título de notificación |
| contenido | TEXT | Contenido |
| tipo | ENUM | 'evento', 'calificacion', 'incidencia', 'mensaje', 'tarea', 'otro' |
| referencia_id | INTEGER | ID del evento relacionado |
| referencia_tipo | VARCHAR(50) | Tipo de referencia |
| leida | BOOLEAN | ¿Ha sido leída? |

## Relaciones Clave (Diagramas Conceptuales)

### Jerarquía de Usuarios
```
Institución
    ├── Usuario (cuenta de sistema)
    │   ├── Usuario_Roles (relación N:M)
    │   └── Persona
    │       ├── Estudiante → Grado
    │       ├── Profesor → Clases
    │       ├── Padre/Tutor → Estudiante
    │       └── Directivo
```

### Flujo Académico
```
Profesor
    ├── Clase (Profesor + Grado + Materia)
    │   ├── Estudiantes (mediante Grado)
    │   ├── Tareas
    │   │   └── Entregas (Estudiante + Tarea)
    │   └── Asistencia
    │
    └── Reportes Académicos (Calificaciones)
```

### Sistema de Comunicación
```
Usuarios
├── Mensajes (1:1 directo)
└── Grupos
    └── Grupo_Miembros (relación N:M)
```

## Índices Principales

Para optimizar consultas frecuentes:

```sql
- idx_usuarios_institucion: (institucion_id)
- idx_usuarios_email: (email)
- idx_personas_institucion: (institucion_id)
- idx_estudiantes_grado: (grado_id)
- idx_eventos_institucion_fecha: (institucion_id, fecha_evento)
- idx_mensajes_destinatario_leido: (destinatario_id, leido)
- idx_reportes_ano: (ano_academico)
- idx_asistencia_estudiante_fecha: (estudiante_id, fecha)
```

## Restricciones Importantes

1. **Integridad Referencial**: Todas las FK tienen ON DELETE CASCADE
2. **Unicidad**: 
   - Email único por institución
   - Número de matrícula único
   - Código de materia único por institución
3. **Enumerados**: Validación a nivel BD para campos específicos

## Consultas Comunes

### Obtener calificaciones de un estudiante
```sql
SELECT r.materia_id, m.nombre, r.calificacion, r.periodo
FROM reportes_academicos r
JOIN materias m ON r.materia_id = m.id
WHERE r.estudiante_id = ?
ORDER BY r.ano_academico DESC, r.periodo;
```

### Obtener eventos del calendario
```sql
SELECT * FROM eventos
WHERE institucion_id = ?
AND fecha_evento BETWEEN ? AND ?
ORDER BY fecha_evento, hora_inicio;
```

### Obtener asistencia de un estudiante
```sql
SELECT COUNT(CASE WHEN presente = TRUE THEN 1 END) / COUNT(*) * 100 as asistencia_pct
FROM asistencia
WHERE estudiante_id = ?
AND MONTH(fecha) = ?
AND YEAR(fecha) = ?;
```

### Obtener mensajes no leídos
```sql
SELECT COUNT(*) as no_leidos
FROM mensajes
WHERE destinatario_id = ?
AND leido = FALSE;
```

## Notas de Implementación

1. **Seguridad**: Las contraseñas deben estar hasheadas (bcrypt, Argon2)
2. **Performance**: Usar índices en campos de búsqueda frecuente
3. **Auditoría**: Mantener created_at y updated_at para rastreo
4. **Escalabilidad**: Considerar particionamiento por institución
5. **Backup**: Implementar estrategia regular de backups

## Ejecución de Scripts

```bash
# Crear tablas
psql -U usuario -d educnova -f 001_create_tables.sql

# Cargar datos de ejemplo
psql -U usuario -d educnova -f 002_seed_data.sql
```

---

**Versión**: 1.0
**Actualizado**: Abril 2026
**Autor**: EduNova Development Team
