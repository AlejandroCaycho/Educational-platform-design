'use client'

import { useState, useEffect, useRef } from 'react'
import { User } from '@/types/user'
import { X, Mail, Shield, LogOut } from 'lucide-react'
import { UserAvatar } from '@/components/user-avatar'

interface UserProfileModalProps {
  open: boolean
  user: User
  onClose: () => void
  onUpdate: (updates: Partial<User>) => void
}

export function UserProfileModal({ open, user, onClose, onUpdate }: UserProfileModalProps) {
  const [editName, setEditName] = useState(user.name)
  const [editEmail, setEditEmail] = useState(user.email)
  const [isEditing, setIsEditing] = useState(false)
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

  const handleSave = () => {
    onUpdate({
      name: editName,
      email: editEmail
    })
    setIsEditing(false)
  }

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
        aria-labelledby="profile-modal-title"
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md mx-4 bg-card rounded-lg shadow-lg z-50 p-6 animate-in fade-in duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 id="profile-modal-title" className="text-lg font-bold text-foreground">
            Mi Perfil
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

        {/* Avatar Section */}
        <div className="flex flex-col items-center gap-4 mb-6 pb-6 border-b border-border">
          <UserAvatar user={user} size="lg" />
          <div className="text-center">
            <p className="text-sm font-semibold text-foreground">{user.name}</p>
            <p className="text-xs text-muted-foreground mt-1 capitalize">{user.role}</p>
          </div>
        </div>

        {/* Form Section */}
        <div className="space-y-4 mb-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name-field" className="block text-sm font-medium text-foreground mb-2">
              Nombre
            </label>
            <input
              id="name-field"
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              disabled={!isEditing}
              className="w-full px-3 py-2 bg-muted/30 border border-border rounded-lg text-sm transition-colors disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email-field" className="block text-sm font-medium text-foreground mb-2">
              Correo Electrónico
            </label>
            <input
              id="email-field"
              type="email"
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
              disabled={!isEditing}
              className="w-full px-3 py-2 bg-muted/30 border border-border rounded-lg text-sm transition-colors disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Role Info */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Rol
            </label>
            <div className="flex items-center gap-2 px-3 py-2 bg-muted/30 rounded-lg">
              <Shield className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-foreground capitalize">{user.role}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {!isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm transition-colors hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Editar Información
              </button>
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-muted text-foreground rounded-lg font-medium text-sm transition-colors hover:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Cerrar
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="flex-1 px-4 py-2 bg-accent text-accent-foreground rounded-lg font-medium text-sm transition-colors hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Guardar Cambios
              </button>
              <button
                onClick={() => {
                  setEditName(user.name)
                  setEditEmail(user.email)
                  setIsEditing(false)
                }}
                className="flex-1 px-4 py-2 bg-muted text-foreground rounded-lg font-medium text-sm transition-colors hover:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Cancelar
              </button>
            </>
          )}
        </div>

        {/* Logout Button */}
        <button className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 text-destructive border border-destructive/30 rounded-lg font-medium text-sm transition-colors hover:bg-destructive/5 focus:outline-none focus:ring-2 focus:ring-destructive focus:ring-offset-2">
          <LogOut className="w-4 h-4" />
          Cerrar Sesión
        </button>
      </div>
    </>
  )
}
