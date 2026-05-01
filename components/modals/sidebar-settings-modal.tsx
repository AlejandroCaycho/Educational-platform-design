'use client'

import { useEffect, useRef } from 'react'
import { X, Moon, Sun, Layout } from 'lucide-react'

interface SidebarSettingsModalProps {
  open: boolean
  onClose: () => void
}

export function SidebarSettingsModal({ open, onClose }: SidebarSettingsModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (open) {
      closeButtonRef.current?.focus()
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose()
      }
    }

    if (open) {
      window.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      window.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'auto'
    }
  }, [open, onClose])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-200"
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-modal-title"
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md mx-4 bg-card rounded-lg shadow-lg z-50 p-6 animate-in fade-in duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 id="settings-modal-title" className="text-lg font-bold text-foreground">
            Configuración del Sidebar
          </h2>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="p-1.5 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Settings Content */}
        <div className="space-y-6">
          {/* Tema */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Tema</h3>
            <div className="grid grid-cols-2 gap-2">
              <button className="flex items-center gap-2 p-3 border-2 border-primary bg-primary/10 rounded-lg transition-all hover:bg-primary/20">
                <Sun className="w-4 h-4 text-foreground" />
                <span className="text-xs font-medium">Claro</span>
              </button>
              <button className="flex items-center gap-2 p-3 border border-border hover:border-primary rounded-lg transition-all hover:bg-muted/50">
                <Moon className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs font-medium text-muted-foreground">Oscuro</span>
              </button>
            </div>
          </div>

          {/* Vista del Sidebar */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Vista por Defecto</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-3 p-3 border border-primary rounded-lg cursor-pointer hover:bg-primary/5 transition-colors">
                <input type="radio" name="sidebar-view" defaultChecked className="w-4 h-4" />
                <span className="text-sm text-foreground">Expandido</span>
              </label>
              <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                <input type="radio" name="sidebar-view" className="w-4 h-4" />
                <span className="text-sm text-foreground">Colapsado</span>
              </label>
            </div>
          </div>

          {/* Animaciones */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Animaciones</h3>
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <label htmlFor="animations" className="text-sm text-foreground cursor-pointer">
                Activar animaciones suaves
              </label>
              <button
                id="animations"
                className="w-11 h-6 bg-primary rounded-full transition-colors flex items-center px-1"
              >
                <div className="w-5 h-5 bg-white rounded-full transition-transform translate-x-5" />
              </button>
            </div>
          </div>

          {/* Notificaciones */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Notificaciones</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <span className="text-sm text-foreground">Sonidos</span>
                <button className="w-11 h-6 bg-primary rounded-full transition-colors flex items-center px-1">
                  <div className="w-5 h-5 bg-white rounded-full transition-transform translate-x-5" />
                </button>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <span className="text-sm text-foreground">Notificaciones Escritorio</span>
                <button className="w-11 h-6 bg-muted rounded-full transition-colors flex items-center px-1">
                  <div className="w-5 h-5 bg-white rounded-full transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex gap-2 mt-8 pt-6 border-t border-border">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-muted text-foreground rounded-lg font-medium text-sm transition-colors hover:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Cerrar
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm transition-colors hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Guardar
          </button>
        </div>
      </div>
    </>
  )
}
