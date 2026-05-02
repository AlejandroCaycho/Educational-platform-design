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
import { BookOpen, Save, Download, Calculator, AlertTriangle, CheckCircle2, TrendingUp, TrendingDown } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import {
  estudiantes,
  clases,
  periodos,
  grados,
  calificaciones as calificacionesData,
  materias,
  type Calificacion,
  getColorCalificacion,
  getLetraCalificacion,
} from '@/lib/mock-data'

type GradeEntry = {
  estudiante_id: number
  estudiante_nombre: string
  examen: number | null
  practica: number | null
  tarea: number | null
  participacion: number | null
  promedio: number
}

export default function CalificacionesPage() {
  const { toast } = useToast()
  const [selectedClase, setSelectedClase] = useState<string>('')
  const [selectedPeriodo, setSelectedPeriodo] = useState<string>('2')
  const [calificaciones, setCalificaciones] = useState<Calificacion[]>(calificacionesData)
  const [grades, setGrades] = useState<Record<number, GradeEntry>>({})
  const [hasChanges, setHasChanges] = useState(false)

  // Obtener estudiantes de la clase seleccionada
  const estudiantesClase = useMemo(() => {
    if (!selectedClase) return []
    const clase = clases.find(c => c.id.toString() === selectedClase)
    if (!clase) return []
    return estudiantes.filter(e => e.grado_id === clase.grado_id && e.estado_academico === 'activo')
  }, [selectedClase])

  // Inicializar o cargar notas cuando cambia la clase
  useMemo(() => {
    if (estudiantesClase.length === 0) return

    const newGrades: Record<number, GradeEntry> = {}
    estudiantesClase.forEach(est => {
      const calsEstudiante = calificaciones.filter(
        c => c.estudiante_id === est.id && c.periodo_id.toString() === selectedPeriodo
      )
      
      const examen = calsEstudiante.find(c => c.tipo === 'examen')?.calificacion ?? null
      const practica = calsEstudiante.find(c => c.tipo === 'practica')?.calificacion ?? null
      const tarea = calsEstudiante.find(c => c.tipo === 'tarea')?.calificacion ?? null
      const participacion = calsEstudiante.find(c => c.tipo === 'participacion')?.calificacion ?? null

      const notasValidas = [examen, practica, tarea, participacion].filter(n => n !== null) as number[]
      const promedio = notasValidas.length > 0 
        ? Math.round((notasValidas.reduce((a, b) => a + b, 0) / notasValidas.length) * 10) / 10
        : 0

      newGrades[est.id] = {
        estudiante_id: est.id,
        estudiante_nombre: est.nombre_completo,
        examen,
        practica,
        tarea,
        participacion,
        promedio,
      }
    })
    setGrades(newGrades)
  }, [estudiantesClase, calificaciones, selectedPeriodo])

  const handleGradeChange = (estudianteId: number, tipo: 'examen' | 'practica' | 'tarea' | 'participacion', value: string) => {
    const numValue = value === '' ? null : Math.min(20, Math.max(0, parseFloat(value)))
    
    setGrades(prev => {
      const entry = prev[estudianteId]
      if (!entry) return prev

      const updated = { ...entry, [tipo]: numValue }
      
      // Recalcular promedio
      const notasValidas = [updated.examen, updated.practica, updated.tarea, updated.participacion]
        .filter(n => n !== null) as number[]
      updated.promedio = notasValidas.length > 0 
        ? Math.round((notasValidas.reduce((a, b) => a + b, 0) / notasValidas.length) * 10) / 10
        : 0

      return { ...prev, [estudianteId]: updated }
    })
    setHasChanges(true)
  }

  const handleSave = () => {
    // Simular guardado
    const nuevasCalificaciones: Calificacion[] = []
    let id = Math.max(...calificaciones.map(c => c.id), 0)

    Object.values(grades).forEach(entry => {
      const clase = clases.find(c => c.id.toString() === selectedClase)
      const tipos: Array<{ key: 'examen' | 'practica' | 'tarea' | 'participacion', tipo: 'examen' | 'practica' | 'tarea' | 'participacion' }> = [
        { key: 'examen', tipo: 'examen' },
        { key: 'practica', tipo: 'practica' },
        { key: 'tarea', tipo: 'tarea' },
        { key: 'participacion', tipo: 'participacion' },
      ]

      tipos.forEach(({ key, tipo }) => {
        const valor = entry[key]
        if (valor !== null) {
          nuevasCalificaciones.push({
            id: ++id,
            estudiante_id: entry.estudiante_id,
            clase_id: parseInt(selectedClase),
            periodo_id: parseInt(selectedPeriodo),
            tipo,
            calificacion: valor,
            calificacion_letra: getLetraCalificacion(valor),
            peso: tipo === 'examen' ? 30 : 20,
            fecha_registro: new Date().toISOString().split('T')[0],
            registrado_por: 1,
            estudiante_nombre: entry.estudiante_nombre,
            materia_nombre: clase?.materia_nombre || '',
            periodo_nombre: periodos.find(p => p.id.toString() === selectedPeriodo)?.nombre || '',
          })
        }
      })
    })

    setCalificaciones(prev => [
      ...prev.filter(c => !(c.clase_id.toString() === selectedClase && c.periodo_id.toString() === selectedPeriodo)),
      ...nuevasCalificaciones
    ])

    setHasChanges(false)
    toast({
      title: 'Calificaciones guardadas',
      description: `Se han guardado ${nuevasCalificaciones.length} calificaciones exitosamente.`,
    })
  }

  const handleExport = () => {
    toast({
      title: 'Exportando calificaciones',
      description: 'El archivo Excel se esta generando...',
    })
    setTimeout(() => {
      toast({
        title: 'Exportacion completada',
        description: 'El archivo calificaciones.xlsx se ha descargado.',
      })
    }, 1500)
  }

  // Estadisticas
  const stats = useMemo(() => {
    const promedios = Object.values(grades).map(g => g.promedio).filter(p => p > 0)
    if (promedios.length === 0) return { promedio: 0, aprobados: 0, desaprobados: 0, excelentes: 0 }

    const promedio = Math.round((promedios.reduce((a, b) => a + b, 0) / promedios.length) * 10) / 10
    const aprobados = promedios.filter(p => p >= 11).length
    const desaprobados = promedios.filter(p => p < 11).length
    const excelentes = promedios.filter(p => p >= 17).length

    return { promedio, aprobados, desaprobados, excelentes }
  }, [grades])

  const claseSeleccionada = clases.find(c => c.id.toString() === selectedClase)

  return (
    <LayoutClient>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Calificaciones</h1>
            <p className="text-muted-foreground mt-1">
              Registro y gestion de notas por clase y periodo
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExport} disabled={!selectedClase}>
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            <Button onClick={handleSave} disabled={!hasChanges || !selectedClase}>
              <Save className="w-4 h-4 mr-2" />
              Guardar Cambios
            </Button>
          </div>
        </div>

        {/* Selectores */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Seleccionar Clase
            </CardTitle>
            <CardDescription>
              Elija la clase y periodo para registrar calificaciones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
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
                <label className="text-sm font-medium">Periodo</label>
                <Select value={selectedPeriodo} onValueChange={setSelectedPeriodo}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un periodo" />
                  </SelectTrigger>
                  <SelectContent>
                    {periodos.map(periodo => (
                      <SelectItem key={periodo.id} value={periodo.id.toString()}>
                        {periodo.nombre} {periodo.activo && <Badge className="ml-2" variant="outline">Actual</Badge>}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Informacion</label>
                <div className="h-10 flex items-center">
                  {claseSeleccionada ? (
                    <div className="flex gap-2">
                      <Badge style={{ backgroundColor: materias.find(m => m.id === claseSeleccionada.materia_id)?.color }}>
                        {claseSeleccionada.materia_nombre}
                      </Badge>
                      <Badge variant="outline">{claseSeleccionada.grado_nombre}</Badge>
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">Seleccione una clase</span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        {selectedClase && (
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Promedio Clase</CardTitle>
                <Calculator className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${stats.promedio >= 11 ? 'text-green-600' : 'text-red-600'}`}>
                  {stats.promedio > 0 ? stats.promedio.toFixed(1) : '-'}
                </div>
                <p className="text-xs text-muted-foreground">Escala vigesimal (0-20)</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Aprobados</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{stats.aprobados}</div>
                <p className="text-xs text-muted-foreground">Promedio 11 o mas</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Desaprobados</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{stats.desaprobados}</div>
                <p className="text-xs text-muted-foreground">Requieren reforzamiento</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Excelentes</CardTitle>
                <TrendingUp className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{stats.excelentes}</div>
                <p className="text-xs text-muted-foreground">Logro destacado (AD)</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tabla de Calificaciones */}
        {selectedClase ? (
          <Card>
            <CardHeader>
              <CardTitle>Registro de Notas</CardTitle>
              <CardDescription>
                Ingrese las notas de 0 a 20. El promedio se calcula automaticamente.
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
                      <TableHead className="text-center w-[100px]">
                        Examen
                        <span className="block text-xs font-normal text-muted-foreground">(30%)</span>
                      </TableHead>
                      <TableHead className="text-center w-[100px]">
                        Practica
                        <span className="block text-xs font-normal text-muted-foreground">(25%)</span>
                      </TableHead>
                      <TableHead className="text-center w-[100px]">
                        Tarea
                        <span className="block text-xs font-normal text-muted-foreground">(25%)</span>
                      </TableHead>
                      <TableHead className="text-center w-[100px]">
                        Participacion
                        <span className="block text-xs font-normal text-muted-foreground">(20%)</span>
                      </TableHead>
                      <TableHead className="text-center w-[120px]">Promedio</TableHead>
                      <TableHead className="text-center w-[80px]">Nivel</TableHead>
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
                        const entry = grades[est.id]
                        if (!entry) return null
                        
                        return (
                          <TableRow key={est.id} className={entry.promedio > 0 && entry.promedio < 11 ? 'bg-red-50/50' : ''}>
                            <TableCell className="font-mono text-sm text-muted-foreground">
                              {index + 1}
                            </TableCell>
                            <TableCell className="font-medium">
                              {est.nombre_completo}
                              {entry.promedio > 0 && entry.promedio < 11 && (
                                <AlertTriangle className="inline-block w-4 h-4 ml-2 text-red-500" />
                              )}
                            </TableCell>
                            <TableCell className="text-center">
                              <Input
                                type="number"
                                min="0"
                                max="20"
                                step="0.5"
                                value={entry.examen ?? ''}
                                onChange={(e) => handleGradeChange(est.id, 'examen', e.target.value)}
                                className="w-16 mx-auto text-center"
                                placeholder="-"
                              />
                            </TableCell>
                            <TableCell className="text-center">
                              <Input
                                type="number"
                                min="0"
                                max="20"
                                step="0.5"
                                value={entry.practica ?? ''}
                                onChange={(e) => handleGradeChange(est.id, 'practica', e.target.value)}
                                className="w-16 mx-auto text-center"
                                placeholder="-"
                              />
                            </TableCell>
                            <TableCell className="text-center">
                              <Input
                                type="number"
                                min="0"
                                max="20"
                                step="0.5"
                                value={entry.tarea ?? ''}
                                onChange={(e) => handleGradeChange(est.id, 'tarea', e.target.value)}
                                className="w-16 mx-auto text-center"
                                placeholder="-"
                              />
                            </TableCell>
                            <TableCell className="text-center">
                              <Input
                                type="number"
                                min="0"
                                max="20"
                                step="0.5"
                                value={entry.participacion ?? ''}
                                onChange={(e) => handleGradeChange(est.id, 'participacion', e.target.value)}
                                className="w-16 mx-auto text-center"
                                placeholder="-"
                              />
                            </TableCell>
                            <TableCell className="text-center">
                              {entry.promedio > 0 ? (
                                <span className={`px-3 py-1 rounded font-semibold ${getColorCalificacion(entry.promedio)}`}>
                                  {entry.promedio.toFixed(1)}
                                </span>
                              ) : (
                                <span className="text-muted-foreground">-</span>
                              )}
                            </TableCell>
                            <TableCell className="text-center">
                              {entry.promedio > 0 ? (
                                <Badge 
                                  variant="outline"
                                  className={getColorCalificacion(entry.promedio)}
                                >
                                  {getLetraCalificacion(entry.promedio)}
                                </Badge>
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
                  <span className="w-4 h-4 rounded bg-green-100"></span>
                  <span>AD (17-20): Logro destacado</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded bg-blue-100"></span>
                  <span>A (14-16): Logro esperado</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded bg-yellow-100"></span>
                  <span>B (11-13): En proceso</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded bg-red-100"></span>
                  <span>C (0-10): En inicio</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="py-12">
              <div className="text-center text-muted-foreground">
                <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">Seleccione una clase</p>
                <p className="text-sm">Elija una clase del selector superior para comenzar a registrar calificaciones</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </LayoutClient>
  )
}
