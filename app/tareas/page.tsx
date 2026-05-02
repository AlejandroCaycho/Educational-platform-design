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
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { 
  ListTodo, Plus, Edit2, Eye, Trash2, Calendar, Clock, Users, 
  CheckCircle2, FileText, AlertCircle, Search, Filter
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import {
  tareas as tareasData,
  clases,
  entregas as entregasData,
  type Tarea,
  type EntregaTarea,
  formatearFecha,
} from '@/lib/mock-data'

export default function TareasPage() {
  const { toast } = useToast()
  const [tareas, setTareas] = useState<Tarea[]>(tareasData)
  const [entregas] = useState<EntregaTarea[]>(entregasData)
  const [searchTerm, setSearchTerm] = useState('')
  const [filtroEstado, setFiltroEstado] = useState<string>('todos')
  const [filtroClase, setFiltroClase] = useState<string>('todos')
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedTarea, setSelectedTarea] = useState<Tarea | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    instrucciones: '',
    clase_id: '',
    fecha_vencimiento: '',
    valor_puntos: '20',
    visible_padres: true,
    estado: 'borrador' as 'borrador' | 'publicada' | 'cerrada',
  })

  // Filtered tasks
  const tareasFiltradas = useMemo(() => {
    return tareas.filter(t => {
      const matchSearch = t.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.materia_nombre.toLowerCase().includes(searchTerm.toLowerCase())
      const matchEstado = filtroEstado === 'todos' || t.estado === filtroEstado
      const matchClase = filtroClase === 'todos' || t.clase_id.toString() === filtroClase
      return matchSearch && matchEstado && matchClase
    })
  }, [tareas, searchTerm, filtroEstado, filtroClase])

  // Stats
  const stats = useMemo(() => ({
    total: tareas.length,
    publicadas: tareas.filter(t => t.estado === 'publicada').length,
    pendientes: tareas.filter(t => t.estado === 'publicada' && new Date(t.fecha_vencimiento) >= new Date()).length,
    vencidas: tareas.filter(t => t.estado === 'publicada' && new Date(t.fecha_vencimiento) < new Date()).length,
  }), [tareas])

  const resetForm = () => {
    setFormData({
      titulo: '',
      descripcion: '',
      instrucciones: '',
      clase_id: '',
      fecha_vencimiento: '',
      valor_puntos: '20',
      visible_padres: true,
      estado: 'borrador',
    })
    setIsEditing(false)
    setSelectedTarea(null)
  }

  const handleOpenAdd = () => {
    resetForm()
    setShowAddModal(true)
  }

  const handleOpenEdit = (tarea: Tarea) => {
    setSelectedTarea(tarea)
    setFormData({
      titulo: tarea.titulo,
      descripcion: tarea.descripcion,
      instrucciones: tarea.instrucciones || '',
      clase_id: tarea.clase_id.toString(),
      fecha_vencimiento: tarea.fecha_vencimiento,
      valor_puntos: tarea.valor_puntos.toString(),
      visible_padres: tarea.visible_padres,
      estado: tarea.estado,
    })
    setIsEditing(true)
    setShowAddModal(true)
  }

  const handleOpenView = (tarea: Tarea) => {
    setSelectedTarea(tarea)
    setShowViewModal(true)
  }

  const handleOpenDelete = (tarea: Tarea) => {
    setSelectedTarea(tarea)
    setShowDeleteModal(true)
  }

  const handleSubmit = () => {
    if (!formData.titulo || !formData.clase_id || !formData.fecha_vencimiento) {
      toast({
        title: 'Error de validacion',
        description: 'Por favor complete todos los campos obligatorios.',
        variant: 'destructive',
      })
      return
    }

    const clase = clases.find(c => c.id.toString() === formData.clase_id)

    if (isEditing && selectedTarea) {
      setTareas(prev => prev.map(t => 
        t.id === selectedTarea.id 
          ? {
              ...t,
              titulo: formData.titulo,
              descripcion: formData.descripcion,
              instrucciones: formData.instrucciones,
              clase_id: parseInt(formData.clase_id),
              fecha_vencimiento: formData.fecha_vencimiento,
              valor_puntos: parseInt(formData.valor_puntos),
              visible_padres: formData.visible_padres,
              estado: formData.estado,
              materia_nombre: clase?.materia_nombre || t.materia_nombre,
              grado_nombre: clase?.grado_nombre || t.grado_nombre,
            }
          : t
      ))
      toast({
        title: 'Tarea actualizada',
        description: `"${formData.titulo}" ha sido actualizada exitosamente.`,
      })
    } else {
      const nuevoId = Math.max(...tareas.map(t => t.id), 0) + 1
      const nuevaTarea: Tarea = {
        id: nuevoId,
        clase_id: parseInt(formData.clase_id),
        titulo: formData.titulo,
        descripcion: formData.descripcion,
        instrucciones: formData.instrucciones,
        fecha_asignacion: new Date().toISOString().split('T')[0],
        fecha_vencimiento: formData.fecha_vencimiento,
        valor_puntos: parseInt(formData.valor_puntos),
        estado: formData.estado,
        visible_padres: formData.visible_padres,
        created_at: new Date().toISOString(),
        materia_nombre: clase?.materia_nombre || '',
        grado_nombre: clase?.grado_nombre || '',
        profesor_nombre: clase?.profesor_nombre || '',
        entregas_count: 0,
        entregas_calificadas: 0,
      }
      setTareas(prev => [...prev, nuevaTarea])
      toast({
        title: 'Tarea creada',
        description: `"${formData.titulo}" ha sido ${formData.estado === 'publicada' ? 'publicada' : 'guardada como borrador'}.`,
      })
    }

    setShowAddModal(false)
    resetForm()
  }

  const handleDelete = () => {
    if (selectedTarea) {
      setTareas(prev => prev.filter(t => t.id !== selectedTarea.id))
      toast({
        title: 'Tarea eliminada',
        description: `"${selectedTarea.titulo}" ha sido eliminada.`,
      })
      setShowDeleteModal(false)
      setSelectedTarea(null)
    }
  }

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case 'publicada': return 'bg-green-100 text-green-800 hover:bg-green-100'
      case 'borrador': return 'bg-gray-100 text-gray-800 hover:bg-gray-100'
      case 'cerrada': return 'bg-blue-100 text-blue-800 hover:bg-blue-100'
      default: return ''
    }
  }

  const isVencida = (fecha: string) => new Date(fecha) < new Date()

  const entregasTarea = (tareaId: number) => entregas.filter(e => e.tarea_id === tareaId)

  return (
    <LayoutClient>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Tareas</h1>
            <p className="text-muted-foreground mt-1">
              Gestion de tareas y actividades academicas
            </p>
          </div>
          <Button onClick={handleOpenAdd}>
            <Plus className="w-4 h-4 mr-2" />
            Nueva Tarea
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tareas</CardTitle>
              <ListTodo className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">Este periodo</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Publicadas</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.publicadas}</div>
              <p className="text-xs text-muted-foreground">Visibles para estudiantes</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pendientes}</div>
              <p className="text-xs text-muted-foreground">Por vencer</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vencidas</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.vencidas}</div>
              <p className="text-xs text-muted-foreground">Fecha pasada</p>
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
            <div className="grid gap-4 md:grid-cols-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar tarea..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={filtroClase} onValueChange={setFiltroClase}>
                <SelectTrigger>
                  <SelectValue placeholder="Clase" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todas las clases</SelectItem>
                  {clases.map(clase => (
                    <SelectItem key={clase.id} value={clase.id.toString()}>
                      {clase.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filtroEstado} onValueChange={setFiltroEstado}>
                <SelectTrigger>
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los estados</SelectItem>
                  <SelectItem value="publicada">Publicada</SelectItem>
                  <SelectItem value="borrador">Borrador</SelectItem>
                  <SelectItem value="cerrada">Cerrada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tasks Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tareasFiltradas.length === 0 ? (
            <Card className="col-span-full">
              <CardContent className="py-12">
                <div className="text-center text-muted-foreground">
                  <ListTodo className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">No se encontraron tareas</p>
                  <p className="text-sm">Ajuste los filtros o cree una nueva tarea</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            tareasFiltradas.map(tarea => {
              const entregasTareaActual = entregasTarea(tarea.id)
              const vencida = isVencida(tarea.fecha_vencimiento) && tarea.estado === 'publicada'
              
              return (
                <Card key={tarea.id} className={vencida ? 'border-red-200' : ''}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg leading-tight">{tarea.titulo}</CardTitle>
                        <CardDescription>{tarea.materia_nombre} - {tarea.grado_nombre}</CardDescription>
                      </div>
                      <Badge className={getEstadoBadge(tarea.estado)}>
                        {tarea.estado}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-2">{tarea.descripcion}</p>
                    
                    <div className="flex flex-wrap gap-2 text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span className={vencida ? 'text-red-600 font-medium' : ''}>
                          {formatearFecha(tarea.fecha_vencimiento)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <FileText className="w-4 h-4" />
                        <span>{tarea.valor_puntos} pts</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {tarea.entregas_count} entregas
                        </span>
                        {tarea.entregas_calificadas > 0 && (
                          <Badge variant="outline" className="ml-1">
                            {tarea.entregas_calificadas} calificadas
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-1 pt-2 border-t">
                      <Button variant="ghost" size="sm" onClick={() => handleOpenView(tarea)}>
                        <Eye className="w-4 h-4 mr-1" />
                        Ver
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleOpenEdit(tarea)}>
                        <Edit2 className="w-4 h-4 mr-1" />
                        Editar
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleOpenDelete(tarea)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </div>

        {/* Add/Edit Modal */}
        <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{isEditing ? 'Editar Tarea' : 'Nueva Tarea'}</DialogTitle>
              <DialogDescription>
                {isEditing ? 'Modifique los detalles de la tarea.' : 'Complete los detalles para crear una nueva tarea.'}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="titulo">Titulo *</Label>
                <Input
                  id="titulo"
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                  placeholder="Ej: Ejercicios de ecuaciones lineales"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="clase">Clase *</Label>
                  <Select 
                    value={formData.clase_id} 
                    onValueChange={(v) => setFormData({ ...formData, clase_id: v })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione una clase" />
                    </SelectTrigger>
                    <SelectContent>
                      {clases.map(clase => (
                        <SelectItem key={clase.id} value={clase.id.toString()}>
                          {clase.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fecha">Fecha de vencimiento *</Label>
                  <Input
                    id="fecha"
                    type="date"
                    value={formData.fecha_vencimiento}
                    onChange={(e) => setFormData({ ...formData, fecha_vencimiento: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descripcion">Descripcion</Label>
                <Textarea
                  id="descripcion"
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  placeholder="Describa brevemente la tarea..."
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instrucciones">Instrucciones</Label>
                <Textarea
                  id="instrucciones"
                  value={formData.instrucciones}
                  onChange={(e) => setFormData({ ...formData, instrucciones: e.target.value })}
                  placeholder="Instrucciones detalladas para el estudiante..."
                  rows={3}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="puntos">Valor (puntos)</Label>
                  <Input
                    id="puntos"
                    type="number"
                    min="1"
                    max="100"
                    value={formData.valor_puntos}
                    onChange={(e) => setFormData({ ...formData, valor_puntos: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estado">Estado</Label>
                  <Select 
                    value={formData.estado} 
                    onValueChange={(v) => setFormData({ ...formData, estado: v as 'borrador' | 'publicada' | 'cerrada' })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="borrador">Borrador</SelectItem>
                      <SelectItem value="publicada">Publicada</SelectItem>
                      <SelectItem value="cerrada">Cerrada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Visible para padres</Label>
                  <div className="flex items-center space-x-2 h-10">
                    <Switch
                      checked={formData.visible_padres}
                      onCheckedChange={(c) => setFormData({ ...formData, visible_padres: c })}
                    />
                    <span className="text-sm text-muted-foreground">
                      {formData.visible_padres ? 'Si' : 'No'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddModal(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSubmit}>
                {isEditing ? 'Guardar Cambios' : (formData.estado === 'publicada' ? 'Publicar' : 'Guardar Borrador')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Modal */}
        <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Detalle de Tarea</DialogTitle>
            </DialogHeader>
            
            {selectedTarea && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold">{selectedTarea.titulo}</h2>
                  <div className="flex gap-2 mt-2">
                    <Badge className={getEstadoBadge(selectedTarea.estado)}>{selectedTarea.estado}</Badge>
                    <Badge variant="outline">{selectedTarea.materia_nombre}</Badge>
                    <Badge variant="outline">{selectedTarea.grado_nombre}</Badge>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Fecha de asignacion</p>
                    <p className="font-medium">{formatearFecha(selectedTarea.fecha_asignacion)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Fecha de vencimiento</p>
                    <p className={`font-medium ${isVencida(selectedTarea.fecha_vencimiento) ? 'text-red-600' : ''}`}>
                      {formatearFecha(selectedTarea.fecha_vencimiento)}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Valor</p>
                    <p className="font-medium">{selectedTarea.valor_puntos} puntos</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Profesor</p>
                    <p className="font-medium">{selectedTarea.profesor_nombre}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Descripcion</p>
                  <p>{selectedTarea.descripcion}</p>
                </div>

                {selectedTarea.instrucciones && (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Instrucciones</p>
                    <p className="whitespace-pre-wrap">{selectedTarea.instrucciones}</p>
                  </div>
                )}

                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-2">Entregas</h3>
                  <div className="flex gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold">{selectedTarea.entregas_count}</p>
                      <p className="text-sm text-muted-foreground">Recibidas</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{selectedTarea.entregas_calificadas}</p>
                      <p className="text-sm text-muted-foreground">Calificadas</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-yellow-600">{selectedTarea.entregas_count - selectedTarea.entregas_calificadas}</p>
                      <p className="text-sm text-muted-foreground">Pendientes</p>
                    </div>
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
                if (selectedTarea) handleOpenEdit(selectedTarea)
              }}>
                <Edit2 className="w-4 h-4 mr-2" />
                Editar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Modal */}
        <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Eliminar Tarea</DialogTitle>
              <DialogDescription>
                Esta accion eliminara la tarea y todas sus entregas asociadas. Esta accion no se puede deshacer.
              </DialogDescription>
            </DialogHeader>
            
            {selectedTarea && (
              <div className="py-4">
                <p className="text-center">
                  Esta seguro que desea eliminar<br />
                  <span className="font-semibold">{selectedTarea.titulo}</span>?
                </p>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
                Cancelar
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Eliminar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </LayoutClient>
  )
}
