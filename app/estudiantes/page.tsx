'use client'

import { useState, useMemo } from 'react'
import LayoutClient from '@/components/layout-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Search, Plus, Edit2, Trash2, Eye, GraduationCap, Users, UserX, 
  AlertTriangle, Download, Filter, ChevronLeft, ChevronRight
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import {
  estudiantes as estudiantesData,
  grados,
  niveles,
  type Estudiante,
  getColorCalificacion,
  generarNumeroMatricula,
  validarDNIUnico,
  getCapacidadDisponible,
} from '@/lib/mock-data'

const ITEMS_PER_PAGE = 10

export default function EstudiantesPage() {
  const { toast } = useToast()
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>(estudiantesData)
  const [searchTerm, setSearchTerm] = useState('')
  const [filtroNivel, setFiltroNivel] = useState<string>('todos')
  const [filtroGrado, setFiltroGrado] = useState<string>('todos')
  const [filtroEstado, setFiltroEstado] = useState<string>('todos')
  const [currentPage, setCurrentPage] = useState(1)
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedEstudiante, setSelectedEstudiante] = useState<Estudiante | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    nombre_completo: '',
    documento_identidad: '',
    fecha_nacimiento: '',
    genero: 'M' as 'M' | 'F',
    grado_id: '',
    direccion: '',
    nombre_apoderado: '',
    telefono_apoderado: '',
    email_apoderado: '',
    tipo_sangre: '',
    alergias: '',
    condicion_medica: '',
    contacto_emergencia: '',
    telefono_emergencia: '',
  })

  // Filtered students
  const estudiantesFiltrados = useMemo(() => {
    return estudiantes.filter(est => {
      const matchSearch = est.nombre_completo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        est.codigo_estudiante.toLowerCase().includes(searchTerm.toLowerCase()) ||
        est.documento_identidad.includes(searchTerm)
      
      const matchNivel = filtroNivel === 'todos' || est.nivel === filtroNivel
      const matchGrado = filtroGrado === 'todos' || est.grado_id.toString() === filtroGrado
      const matchEstado = filtroEstado === 'todos' || est.estado_academico === filtroEstado
      
      return matchSearch && matchNivel && matchGrado && matchEstado
    })
  }, [estudiantes, searchTerm, filtroNivel, filtroGrado, filtroEstado])

  // Pagination
  const totalPages = Math.ceil(estudiantesFiltrados.length / ITEMS_PER_PAGE)
  const paginatedEstudiantes = estudiantesFiltrados.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  // Stats
  const stats = useMemo(() => {
    const activos = estudiantes.filter(e => e.estado_academico === 'activo').length
    const enRiesgo = estudiantes.filter(e => e.promedio_general > 0 && e.promedio_general < 11).length
    return {
      total: estudiantes.length,
      activos,
      inactivos: estudiantes.length - activos,
      enRiesgo,
    }
  }, [estudiantes])

  // Grados filtrados por nivel seleccionado
  const gradosFiltrados = useMemo(() => {
    if (filtroNivel === 'todos') return grados
    const nivelId = niveles.find(n => n.nombre === filtroNivel)?.id
    return grados.filter(g => g.nivel_id === nivelId)
  }, [filtroNivel])

  const resetForm = () => {
    setFormData({
      nombre_completo: '',
      documento_identidad: '',
      fecha_nacimiento: '',
      genero: 'M',
      grado_id: '',
      direccion: '',
      nombre_apoderado: '',
      telefono_apoderado: '',
      email_apoderado: '',
      tipo_sangre: '',
      alergias: '',
      condicion_medica: '',
      contacto_emergencia: '',
      telefono_emergencia: '',
    })
    setIsEditing(false)
    setSelectedEstudiante(null)
  }

  const handleOpenAdd = () => {
    resetForm()
    setShowAddModal(true)
  }

  const handleOpenEdit = (estudiante: Estudiante) => {
    setSelectedEstudiante(estudiante)
    setFormData({
      nombre_completo: estudiante.nombre_completo,
      documento_identidad: estudiante.documento_identidad,
      fecha_nacimiento: estudiante.fecha_nacimiento,
      genero: estudiante.genero,
      grado_id: estudiante.grado_id.toString(),
      direccion: estudiante.direccion || '',
      nombre_apoderado: estudiante.nombre_apoderado || '',
      telefono_apoderado: estudiante.telefono_apoderado || '',
      email_apoderado: estudiante.email_apoderado || '',
      tipo_sangre: estudiante.tipo_sangre || '',
      alergias: estudiante.alergias || '',
      condicion_medica: estudiante.condicion_medica || '',
      contacto_emergencia: estudiante.contacto_emergencia || '',
      telefono_emergencia: estudiante.telefono_emergencia || '',
    })
    setIsEditing(true)
    setShowAddModal(true)
  }

  const handleOpenView = (estudiante: Estudiante) => {
    setSelectedEstudiante(estudiante)
    setShowViewModal(true)
  }

  const handleOpenDelete = (estudiante: Estudiante) => {
    setSelectedEstudiante(estudiante)
    setShowDeleteModal(true)
  }

  const handleSubmit = () => {
    // Validaciones
    if (!formData.nombre_completo || !formData.documento_identidad || !formData.grado_id) {
      toast({
        title: 'Error de validacion',
        description: 'Por favor complete todos los campos obligatorios.',
        variant: 'destructive',
      })
      return
    }

    if (formData.documento_identidad.length !== 8) {
      toast({
        title: 'DNI invalido',
        description: 'El DNI debe tener exactamente 8 digitos.',
        variant: 'destructive',
      })
      return
    }

    if (!validarDNIUnico(formData.documento_identidad, selectedEstudiante?.id)) {
      toast({
        title: 'DNI duplicado',
        description: 'Ya existe un estudiante con ese DNI.',
        variant: 'destructive',
      })
      return
    }

    const gradoId = parseInt(formData.grado_id)
    if (!isEditing && getCapacidadDisponible(gradoId) <= 0) {
      toast({
        title: 'Grado lleno',
        description: 'El grado seleccionado ha alcanzado su capacidad maxima.',
        variant: 'destructive',
      })
      return
    }

    const gradoSeleccionado = grados.find(g => g.id === gradoId)

    if (isEditing && selectedEstudiante) {
      // Actualizar estudiante
      setEstudiantes(prev => prev.map(e => 
        e.id === selectedEstudiante.id 
          ? {
              ...e,
              nombre_completo: formData.nombre_completo,
              documento_identidad: formData.documento_identidad,
              fecha_nacimiento: formData.fecha_nacimiento,
              genero: formData.genero,
              grado_id: gradoId,
              grado_nombre: gradoSeleccionado?.nombre || e.grado_nombre,
              seccion: gradoSeleccionado?.seccion || e.seccion,
              nivel: gradoSeleccionado?.nivel_nombre || e.nivel,
              direccion: formData.direccion,
              nombre_apoderado: formData.nombre_apoderado,
              telefono_apoderado: formData.telefono_apoderado,
              email_apoderado: formData.email_apoderado,
              tipo_sangre: formData.tipo_sangre,
              alergias: formData.alergias,
              condicion_medica: formData.condicion_medica,
              contacto_emergencia: formData.contacto_emergencia,
              telefono_emergencia: formData.telefono_emergencia,
            }
          : e
      ))
      toast({
        title: 'Estudiante actualizado',
        description: `${formData.nombre_completo} ha sido actualizado exitosamente.`,
      })
    } else {
      // Crear nuevo estudiante
      const nuevoId = Math.max(...estudiantes.map(e => e.id), 0) + 1
      const nuevoEstudiante: Estudiante = {
        id: nuevoId,
        persona_id: nuevoId + 200,
        grado_id: gradoId,
        ano_academico_id: 1,
        numero_matricula: generarNumeroMatricula(),
        codigo_estudiante: `EST${String(nuevoId).padStart(4, '0')}`,
        fecha_ingreso: new Date().toISOString().split('T')[0],
        estado_academico: 'activo',
        promedio_general: 0,
        posicion_ranking: 0,
        nombre_completo: formData.nombre_completo,
        documento_identidad: formData.documento_identidad,
        fecha_nacimiento: formData.fecha_nacimiento,
        genero: formData.genero,
        grado_nombre: gradoSeleccionado?.nombre || '',
        seccion: gradoSeleccionado?.seccion || '',
        nivel: gradoSeleccionado?.nivel_nombre || '',
        turno: gradoSeleccionado?.turno || 'manana',
        direccion: formData.direccion,
        nombre_apoderado: formData.nombre_apoderado,
        telefono_apoderado: formData.telefono_apoderado,
        email_apoderado: formData.email_apoderado,
        tipo_sangre: formData.tipo_sangre,
        alergias: formData.alergias,
        condicion_medica: formData.condicion_medica,
        contacto_emergencia: formData.contacto_emergencia,
        telefono_emergencia: formData.telefono_emergencia,
      }
      setEstudiantes(prev => [...prev, nuevoEstudiante])
      toast({
        title: 'Estudiante matriculado',
        description: `${formData.nombre_completo} ha sido matriculado con codigo ${nuevoEstudiante.codigo_estudiante}.`,
      })
    }

    setShowAddModal(false)
    resetForm()
  }

  const handleDelete = () => {
    if (selectedEstudiante) {
      setEstudiantes(prev => prev.map(e => 
        e.id === selectedEstudiante.id 
          ? { ...e, estado_academico: 'retirado' as const }
          : e
      ))
      toast({
        title: 'Estudiante retirado',
        description: `${selectedEstudiante.nombre_completo} ha sido marcado como retirado.`,
      })
      setShowDeleteModal(false)
      setSelectedEstudiante(null)
    }
  }

  const handleExport = () => {
    toast({
      title: 'Exportacion iniciada',
      description: 'El archivo Excel se esta generando...',
    })
    // Simular descarga
    setTimeout(() => {
      toast({
        title: 'Exportacion completada',
        description: 'El archivo estudiantes.xlsx se ha descargado.',
      })
    }, 1500)
  }

  return (
    <LayoutClient>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Estudiantes</h1>
            <p className="text-muted-foreground mt-1">
              Gestion de matriculas y expedientes estudiantiles
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            <Button onClick={handleOpenAdd}>
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Estudiante
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Estudiantes</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">Matriculados en 2025</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Activos</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.activos}</div>
              <p className="text-xs text-muted-foreground">{Math.round(stats.activos / stats.total * 100)}% del total</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Retirados</CardTitle>
              <UserX className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.inactivos}</div>
              <p className="text-xs text-muted-foreground">Este ano academico</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En Riesgo</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.enRiesgo}</div>
              <p className="text-xs text-muted-foreground">Promedio menor a 11</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filtros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nombre, codigo o DNI..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="pl-9"
                />
              </div>
              <Select value={filtroNivel} onValueChange={(v) => {
                setFiltroNivel(v)
                setFiltroGrado('todos')
                setCurrentPage(1)
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Nivel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los niveles</SelectItem>
                  {niveles.map(nivel => (
                    <SelectItem key={nivel.id} value={nivel.nombre}>{nivel.nombre}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filtroGrado} onValueChange={(v) => {
                setFiltroGrado(v)
                setCurrentPage(1)
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Grado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los grados</SelectItem>
                  {gradosFiltrados.map(grado => (
                    <SelectItem key={grado.id} value={grado.id.toString()}>
                      {grado.nombre} - {grado.seccion}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filtroEstado} onValueChange={(v) => {
                setFiltroEstado(v)
                setCurrentPage(1)
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los estados</SelectItem>
                  <SelectItem value="activo">Activo</SelectItem>
                  <SelectItem value="retirado">Retirado</SelectItem>
                  <SelectItem value="trasladado">Trasladado</SelectItem>
                  <SelectItem value="egresado">Egresado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Estudiantes</CardTitle>
            <CardDescription>
              Mostrando {paginatedEstudiantes.length} de {estudiantesFiltrados.length} estudiantes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Codigo</TableHead>
                    <TableHead>Nombre Completo</TableHead>
                    <TableHead>DNI</TableHead>
                    <TableHead>Grado</TableHead>
                    <TableHead>Nivel</TableHead>
                    <TableHead className="text-center">Promedio</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedEstudiantes.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                        No se encontraron estudiantes con los filtros seleccionados
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedEstudiantes.map((estudiante) => (
                      <TableRow key={estudiante.id}>
                        <TableCell className="font-mono text-sm">{estudiante.codigo_estudiante}</TableCell>
                        <TableCell className="font-medium">{estudiante.nombre_completo}</TableCell>
                        <TableCell>{estudiante.documento_identidad}</TableCell>
                        <TableCell>{estudiante.grado_nombre} - {estudiante.seccion}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{estudiante.nivel}</Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          {estudiante.promedio_general > 0 ? (
                            <span className={`px-2 py-1 rounded text-sm font-medium ${getColorCalificacion(estudiante.promedio_general)}`}>
                              {estudiante.promedio_general.toFixed(1)}
                            </span>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={estudiante.estado_academico === 'activo' ? 'default' : 'secondary'}
                            className={estudiante.estado_academico === 'activo' ? 'bg-green-100 text-green-800 hover:bg-green-100' : ''}
                          >
                            {estudiante.estado_academico}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleOpenView(estudiante)}
                              title="Ver detalles"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleOpenEdit(estudiante)}
                              title="Editar"
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleOpenDelete(estudiante)}
                              title="Retirar"
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-muted-foreground">
                  Pagina {currentPage} de {totalPages}
                </p>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => p - 1)}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Anterior
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => p + 1)}
                  >
                    Siguiente
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Add/Edit Modal */}
        <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {isEditing ? 'Editar Estudiante' : 'Matricular Nuevo Estudiante'}
              </DialogTitle>
              <DialogDescription>
                {isEditing 
                  ? 'Modifique los datos del estudiante.' 
                  : 'Complete los datos para matricular un nuevo estudiante.'}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-6 py-4">
              {/* Datos Personales */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                  Datos Personales
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre Completo *</Label>
                    <Input
                      id="nombre"
                      value={formData.nombre_completo}
                      onChange={(e) => setFormData({ ...formData, nombre_completo: e.target.value })}
                      placeholder="Ej: Juan Carlos Perez Garcia"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dni">DNI *</Label>
                    <Input
                      id="dni"
                      value={formData.documento_identidad}
                      onChange={(e) => setFormData({ ...formData, documento_identidad: e.target.value.replace(/\D/g, '').slice(0, 8) })}
                      placeholder="12345678"
                      maxLength={8}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fecha_nacimiento">Fecha de Nacimiento *</Label>
                    <Input
                      id="fecha_nacimiento"
                      type="date"
                      value={formData.fecha_nacimiento}
                      onChange={(e) => setFormData({ ...formData, fecha_nacimiento: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="genero">Genero *</Label>
                    <Select 
                      value={formData.genero} 
                      onValueChange={(v) => setFormData({ ...formData, genero: v as 'M' | 'F' })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="M">Masculino</SelectItem>
                        <SelectItem value="F">Femenino</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="direccion">Direccion</Label>
                    <Input
                      id="direccion"
                      value={formData.direccion}
                      onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                      placeholder="Av. Los Pinos 123, San Martin de Porres"
                    />
                  </div>
                </div>
              </div>

              {/* Datos Academicos */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                  Datos Academicos
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="grado">Grado y Seccion *</Label>
                    <Select 
                      value={formData.grado_id} 
                      onValueChange={(v) => setFormData({ ...formData, grado_id: v })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un grado" />
                      </SelectTrigger>
                      <SelectContent>
                        {grados.filter(g => g.activo).map(grado => {
                          const capacidad = getCapacidadDisponible(grado.id)
                          return (
                            <SelectItem 
                              key={grado.id} 
                              value={grado.id.toString()}
                              disabled={capacidad <= 0 && !isEditing}
                            >
                              {grado.nivel_nombre} - {grado.nombre} - {grado.seccion} 
                              ({capacidad} vacantes)
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Datos del Apoderado */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                  Datos del Apoderado
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="apoderado">Nombre del Apoderado</Label>
                    <Input
                      id="apoderado"
                      value={formData.nombre_apoderado}
                      onChange={(e) => setFormData({ ...formData, nombre_apoderado: e.target.value })}
                      placeholder="Nombre completo"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefono_apoderado">Telefono</Label>
                    <Input
                      id="telefono_apoderado"
                      value={formData.telefono_apoderado}
                      onChange={(e) => setFormData({ ...formData, telefono_apoderado: e.target.value })}
                      placeholder="987654321"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="email_apoderado">Email</Label>
                    <Input
                      id="email_apoderado"
                      type="email"
                      value={formData.email_apoderado}
                      onChange={(e) => setFormData({ ...formData, email_apoderado: e.target.value })}
                      placeholder="correo@ejemplo.com"
                    />
                  </div>
                </div>
              </div>

              {/* Datos Medicos */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                  Informacion Medica
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="tipo_sangre">Tipo de Sangre</Label>
                    <Select 
                      value={formData.tipo_sangre} 
                      onValueChange={(v) => setFormData({ ...formData, tipo_sangre: v })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="alergias">Alergias</Label>
                    <Input
                      id="alergias"
                      value={formData.alergias}
                      onChange={(e) => setFormData({ ...formData, alergias: e.target.value })}
                      placeholder="Ninguna conocida"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="condicion_medica">Condiciones Medicas</Label>
                    <Textarea
                      id="condicion_medica"
                      value={formData.condicion_medica}
                      onChange={(e) => setFormData({ ...formData, condicion_medica: e.target.value })}
                      placeholder="Describa cualquier condicion medica relevante"
                      rows={2}
                    />
                  </div>
                </div>
              </div>

              {/* Contacto de Emergencia */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                  Contacto de Emergencia
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="contacto_emergencia">Nombre</Label>
                    <Input
                      id="contacto_emergencia"
                      value={formData.contacto_emergencia}
                      onChange={(e) => setFormData({ ...formData, contacto_emergencia: e.target.value })}
                      placeholder="Familiar cercano"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefono_emergencia">Telefono</Label>
                    <Input
                      id="telefono_emergencia"
                      value={formData.telefono_emergencia}
                      onChange={(e) => setFormData({ ...formData, telefono_emergencia: e.target.value })}
                      placeholder="987654321"
                    />
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddModal(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSubmit}>
                {isEditing ? 'Guardar Cambios' : 'Matricular Estudiante'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Modal */}
        <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Detalle del Estudiante</DialogTitle>
            </DialogHeader>
            
            {selectedEstudiante && (
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                    <GraduationCap className="h-10 w-10 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{selectedEstudiante.nombre_completo}</h2>
                    <p className="text-muted-foreground">{selectedEstudiante.codigo_estudiante}</p>
                    <div className="flex gap-2 mt-2">
                      <Badge>{selectedEstudiante.nivel}</Badge>
                      <Badge variant="outline">{selectedEstudiante.grado_nombre} - {selectedEstudiante.seccion}</Badge>
                      <Badge 
                        variant={selectedEstudiante.estado_academico === 'activo' ? 'default' : 'secondary'}
                        className={selectedEstudiante.estado_academico === 'activo' ? 'bg-green-100 text-green-800' : ''}
                      >
                        {selectedEstudiante.estado_academico}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">DNI</p>
                    <p className="font-medium">{selectedEstudiante.documento_identidad}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Fecha de Nacimiento</p>
                    <p className="font-medium">{selectedEstudiante.fecha_nacimiento}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Numero de Matricula</p>
                    <p className="font-medium">{selectedEstudiante.numero_matricula}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Promedio General</p>
                    <p className={`font-medium ${selectedEstudiante.promedio_general > 0 ? getColorCalificacion(selectedEstudiante.promedio_general) : ''} inline-block px-2 py-0.5 rounded`}>
                      {selectedEstudiante.promedio_general > 0 ? selectedEstudiante.promedio_general.toFixed(1) : 'Sin notas'}
                    </p>
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <p className="text-sm text-muted-foreground">Direccion</p>
                    <p className="font-medium">{selectedEstudiante.direccion || 'No registrada'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Apoderado</p>
                    <p className="font-medium">{selectedEstudiante.nombre_apoderado || 'No registrado'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Telefono Apoderado</p>
                    <p className="font-medium">{selectedEstudiante.telefono_apoderado || 'No registrado'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Tipo de Sangre</p>
                    <p className="font-medium">{selectedEstudiante.tipo_sangre || 'No registrado'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Alergias</p>
                    <p className="font-medium">{selectedEstudiante.alergias || 'Ninguna conocida'}</p>
                  </div>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowViewModal(false)}>
                Cerrar
              </Button>
              <Button onClick={() => {
                setShowViewModal(false)
                if (selectedEstudiante) handleOpenEdit(selectedEstudiante)
              }}>
                <Edit2 className="w-4 h-4 mr-2" />
                Editar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Modal */}
        <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar Retiro</DialogTitle>
              <DialogDescription>
                Esta accion marcara al estudiante como retirado. Los datos se conservaran en el sistema.
              </DialogDescription>
            </DialogHeader>
            
            {selectedEstudiante && (
              <div className="py-4">
                <p className="text-center">
                  Esta seguro que desea retirar a<br />
                  <span className="font-semibold">{selectedEstudiante.nombre_completo}</span>?
                </p>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
                Cancelar
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Confirmar Retiro
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </LayoutClient>
  )
}
