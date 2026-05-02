'use client'

import { useState, useMemo } from 'react'
import LayoutClient from '@/components/layout-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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
import { Checkbox } from '@/components/ui/checkbox'
import { 
  ClipboardCheck, Save, Download, Users, UserCheck, UserX, Clock, 
  CheckCircle2, XCircle, AlertCircle, Calendar
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import {
  estudiantes,
  clases,
  grados,
  asistencias as asistenciasData,
  type Asistencia,
} from '@/lib/mock-data'

type AttendanceStatus = 'presente' | 'ausente' | 'tarde' | 'justificado'

type AttendanceEntry = {
  estudiante_id: number
  estudiante_nombre: string
  estado: AttendanceStatus
  minutos_tarde?: number
  motivo?: string
}

export default function AsistenciaPage() {
  const { toast } = useToast()
  const [selectedClase, setSelectedClase] = useState<string>('')
  const [selectedFecha, setSelectedFecha] = useState<string>(new Date().toISOString().split('T')[0])
  const [asistencias, setAsistencias] = useState<Asistencia[]>(asistenciasData)
  const [attendance, setAttendance] = useState<Record<number, AttendanceEntry>>({})
  const [hasChanges, setHasChanges] = useState(false)

  // Obtener estudiantes de la clase seleccionada
  const estudiantesClase = useMemo(() => {
    if (!selectedClase) return []
    const clase = clases.find(c => c.id.toString() === selectedClase)
    if (!clase) return []
    return estudiantes.filter(e => e.grado_id === clase.grado_id && e.estado_academico === 'activo')
  }, [selectedClase])

  // Inicializar o cargar asistencia cuando cambia la clase o fecha
  useMemo(() => {
    if (estudiantesClase.length === 0) return

    const newAttendance: Record<number, AttendanceEntry> = {}
    estudiantesClase.forEach(est => {
      const registro = asistencias.find(
        a => a.estudiante_id === est.id && 
             a.clase_id.toString() === selectedClase && 
             a.fecha === selectedFecha
      )
      
      newAttendance[est.id] = {
        estudiante_id: est.id,
        estudiante_nombre: est.nombre_completo,
        estado: registro?.estado || 'presente',
        minutos_tarde: registro?.minutos_tarde,
        motivo: registro?.motivo_inasistencia,
      }
    })
    setAttendance(newAttendance)
    setHasChanges(false)
  }, [estudiantesClase, asistencias, selectedClase, selectedFecha])

  const handleStatusChange = (estudianteId: number, estado: AttendanceStatus) => {
    setAttendance(prev => ({
      ...prev,
      [estudianteId]: {
        ...prev[estudianteId],
        estado,
        minutos_tarde: estado === 'tarde' ? 5 : undefined,
        motivo: estado === 'ausente' ? 'Sin justificacion' : estado === 'justificado' ? 'Pendiente de documento' : undefined,
      }
    }))
    setHasChanges(true)
  }

  const handleMinutosTardeChange = (estudianteId: number, minutos: number) => {
    setAttendance(prev => ({
      ...prev,
      [estudianteId]: {
        ...prev[estudianteId],
        minutos_tarde: Math.max(0, Math.min(60, minutos)),
      }
    }))
    setHasChanges(true)
  }

  const handleMarcarTodosPresentes = () => {
    const newAttendance = { ...attendance }
    Object.keys(newAttendance).forEach(key => {
      const id = parseInt(key)
      newAttendance[id] = {
        ...newAttendance[id],
        estado: 'presente',
        minutos_tarde: undefined,
        motivo: undefined,
      }
    })
    setAttendance(newAttendance)
    setHasChanges(true)
    toast({
      title: 'Todos marcados como presentes',
      description: 'Puede ajustar individualmente si es necesario.',
    })
  }

  const handleSave = () => {
    const nuevasAsistencias: Asistencia[] = Object.values(attendance).map((entry, index) => ({
      id: Math.max(...asistencias.map(a => a.id), 0) + index + 1,
      estudiante_id: entry.estudiante_id,
      clase_id: parseInt(selectedClase),
      fecha: selectedFecha,
      estado: entry.estado,
      minutos_tarde: entry.minutos_tarde,
      motivo_inasistencia: entry.motivo,
      registrado_por: 1,
      estudiante_nombre: entry.estudiante_nombre,
      materia_nombre: clases.find(c => c.id.toString() === selectedClase)?.materia_nombre || '',
      grado_nombre: clases.find(c => c.id.toString() === selectedClase)?.grado_nombre || '',
    }))

    setAsistencias(prev => [
      ...prev.filter(a => !(a.clase_id.toString() === selectedClase && a.fecha === selectedFecha)),
      ...nuevasAsistencias
    ])

    setHasChanges(false)
    toast({
      title: 'Asistencia guardada',
      description: `Se ha registrado la asistencia de ${nuevasAsistencias.length} estudiantes.`,
    })
  }

  const handleExport = () => {
    toast({
      title: 'Exportando asistencia',
      description: 'El archivo Excel se esta generando...',
    })
    setTimeout(() => {
      toast({
        title: 'Exportacion completada',
        description: 'El archivo asistencia.xlsx se ha descargado.',
      })
    }, 1500)
  }

  // Estadisticas
  const stats = useMemo(() => {
    const entries = Object.values(attendance)
    if (entries.length === 0) return { presentes: 0, ausentes: 0, tardes: 0, justificados: 0, total: 0, porcentaje: 0 }

    const presentes = entries.filter(e => e.estado === 'presente').length
    const ausentes = entries.filter(e => e.estado === 'ausente').length
    const tardes = entries.filter(e => e.estado === 'tarde').length
    const justificados = entries.filter(e => e.estado === 'justificado').length
    const total = entries.length
    const porcentaje = Math.round(((presentes + tardes + justificados) / total) * 100)

    return { presentes, ausentes, tardes, justificados, total, porcentaje }
  }, [attendance])

  const claseSeleccionada = clases.find(c => c.id.toString() === selectedClase)

  const getStatusIcon = (estado: AttendanceStatus) => {
    switch (estado) {
      case 'presente': return <CheckCircle2 className="w-4 h-4 text-green-600" />
      case 'ausente': return <XCircle className="w-4 h-4 text-red-600" />
      case 'tarde': return <Clock className="w-4 h-4 text-yellow-600" />
      case 'justificado': return <AlertCircle className="w-4 h-4 text-blue-600" />
    }
  }

  const getStatusBadge = (estado: AttendanceStatus) => {
    const styles = {
      presente: 'bg-green-100 text-green-800 hover:bg-green-100',
      ausente: 'bg-red-100 text-red-800 hover:bg-red-100',
      tarde: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
      justificado: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
    }
    return styles[estado]
  }

  return (
    <LayoutClient>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Asistencia</h1>
            <p className="text-muted-foreground mt-1">
              Registro diario de asistencia por clase
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExport} disabled={!selectedClase}>
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            <Button onClick={handleSave} disabled={!hasChanges || !selectedClase}>
              <Save className="w-4 h-4 mr-2" />
              Guardar Asistencia
            </Button>
          </div>
        </div>

        {/* Selectores */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <ClipboardCheck className="w-5 h-5" />
              Seleccionar Clase y Fecha
            </CardTitle>
            <CardDescription>
              Elija la clase y fecha para registrar la asistencia del dia
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Clase</label>
                <Select value={selectedClase} onValueChange={setSelectedClase}>
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
                <label className="text-sm font-medium">Fecha</label>
                <Input
                  type="date"
                  value={selectedFecha}
                  onChange={(e) => setSelectedFecha(e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Informacion</label>
                <div className="h-10 flex items-center">
                  {claseSeleccionada ? (
                    <div className="flex gap-2">
                      <Badge variant="outline">{claseSeleccionada.grado_nombre}</Badge>
                      <Badge variant="secondary">{claseSeleccionada.horario}</Badge>
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">Seleccione una clase</span>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Accion rapida</label>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleMarcarTodosPresentes}
                  disabled={!selectedClase}
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Todos Presentes
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        {selectedClase && (
          <div className="grid gap-4 md:grid-cols-5">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
                <p className="text-xs text-muted-foreground">Estudiantes</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Presentes</CardTitle>
                <UserCheck className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{stats.presentes}</div>
                <p className="text-xs text-muted-foreground">{stats.porcentaje}% asistencia</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ausentes</CardTitle>
                <UserX className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{stats.ausentes}</div>
                <p className="text-xs text-muted-foreground">Sin justificacion</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tardes</CardTitle>
                <Clock className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{stats.tardes}</div>
                <p className="text-xs text-muted-foreground">Llegaron tarde</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Justificados</CardTitle>
                <AlertCircle className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{stats.justificados}</div>
                <p className="text-xs text-muted-foreground">Con documento</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tabla de Asistencia */}
        {selectedClase ? (
          <Card>
            <CardHeader>
              <CardTitle>Registro de Asistencia</CardTitle>
              <CardDescription>
                Marque el estado de asistencia para cada estudiante.
                {hasChanges && <span className="text-yellow-600 ml-2">(Cambios sin guardar)</span>}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">#</TableHead>
                      <TableHead>Estudiante</TableHead>
                      <TableHead className="text-center w-[100px]">Presente</TableHead>
                      <TableHead className="text-center w-[100px]">Ausente</TableHead>
                      <TableHead className="text-center w-[100px]">Tarde</TableHead>
                      <TableHead className="text-center w-[100px]">Justificado</TableHead>
                      <TableHead className="text-center w-[120px]">Estado</TableHead>
                      <TableHead className="text-center w-[100px]">Min. Tarde</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {estudiantesClase.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                          No hay estudiantes en esta clase
                        </TableCell>
                      </TableRow>
                    ) : (
                      estudiantesClase.map((est, index) => {
                        const entry = attendance[est.id]
                        if (!entry) return null
                        
                        return (
                          <TableRow 
                            key={est.id} 
                            className={entry.estado === 'ausente' ? 'bg-red-50/50' : entry.estado === 'tarde' ? 'bg-yellow-50/50' : ''}
                          >
                            <TableCell className="font-mono text-sm text-muted-foreground">
                              {index + 1}
                            </TableCell>
                            <TableCell className="font-medium">
                              {est.nombre_completo}
                            </TableCell>
                            <TableCell className="text-center">
                              <Checkbox
                                checked={entry.estado === 'presente'}
                                onCheckedChange={() => handleStatusChange(est.id, 'presente')}
                                className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                              />
                            </TableCell>
                            <TableCell className="text-center">
                              <Checkbox
                                checked={entry.estado === 'ausente'}
                                onCheckedChange={() => handleStatusChange(est.id, 'ausente')}
                                className="data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                              />
                            </TableCell>
                            <TableCell className="text-center">
                              <Checkbox
                                checked={entry.estado === 'tarde'}
                                onCheckedChange={() => handleStatusChange(est.id, 'tarde')}
                                className="data-[state=checked]:bg-yellow-600 data-[state=checked]:border-yellow-600"
                              />
                            </TableCell>
                            <TableCell className="text-center">
                              <Checkbox
                                checked={entry.estado === 'justificado'}
                                onCheckedChange={() => handleStatusChange(est.id, 'justificado')}
                                className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                              />
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge className={getStatusBadge(entry.estado)}>
                                <span className="flex items-center gap-1">
                                  {getStatusIcon(entry.estado)}
                                  {entry.estado.charAt(0).toUpperCase() + entry.estado.slice(1)}
                                </span>
                              </Badge>
                            </TableCell>
                            <TableCell className="text-center">
                              {entry.estado === 'tarde' ? (
                                <Input
                                  type="number"
                                  min="0"
                                  max="60"
                                  value={entry.minutos_tarde ?? 5}
                                  onChange={(e) => handleMinutosTardeChange(est.id, parseInt(e.target.value) || 0)}
                                  className="w-16 mx-auto text-center"
                                />
                              ) : (
                                <span className="text-muted-foreground">-</span>
                              )}
                            </TableCell>
                          </TableRow>
                        )
                      })
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Leyenda */}
              <div className="mt-4 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>Presente: Asistio normalmente</span>
                </div>
                <div className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-600" />
                  <span>Ausente: No asistio sin justificacion</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-yellow-600" />
                  <span>Tarde: Llego despues de la hora</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-blue-600" />
                  <span>Justificado: Falta con documento valido</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="py-12">
              <div className="text-center text-muted-foreground">
                <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">Seleccione una clase</p>
                <p className="text-sm">Elija una clase del selector superior para comenzar a registrar asistencia</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </LayoutClient>
  )
}
