'use client'

import { useState, useRef, useEffect } from 'react'
import { User } from '@/types/user'
import { UserAvatar } from '@/components/user-avatar'
import { Settings, LogOut, User as UserIcon, ChevronUp } from 'lucide-react'

interface SidebarUserSectionProps {
  collapsed: boolean
  user: User
  onProfileClick: () => void
  onSettingsClick: () => void
}

export function SidebarUserSection({
  collapsed,
  user,
  onProfileClick,
  onSettingsClick
}: SidebarUserSectionProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [menuOpen])

  const handleProfileClick = () => {
    onProfileClick()
    setMenuOpen(false)
  }

  const handleSettingsClick = () => {
    onSettingsClick()
    setMenuOpen(false)
  }

  return (
    <div
      className={`relative px-3 py-4 border-t border-border flex-shrink-0 transition-all duration-300 ${
        collapsed ? 'flex items-center justify-center' : ''
      }`}
      ref={menuRef}
    >
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className={`w-full flex items-center gap-3 p-2 hover:bg-muted rounded-lg transition-all duration-200 group ${
          menuOpen ? 'bg-muted' : ''
        } ${collapsed ? 'justify-center' : ''}`}
        aria-expanded={menuOpen}
        aria-label="Menú de usuario"
      >
        <UserAvatar user={user} size="md" />

        {!collapsed && (
          <>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-sm font-semibold text-foreground truncate">
                {user.name}
              </p>
              <p className="text-xs text-muted-foreground truncate capitalize">
                {user.role}
              </p>
            </div>
            <ChevronUp
              className={`w-4 h-4 text-muted-foreground transition-transform duration-200 flex-shrink-0 ${
                menuOpen ? 'rotate-180' : ''
              }`}
            />
          </>
        )}
      </button>

      {/* User Menu Dropdown */}
      {menuOpen && !collapsed && (
        <div
          className="absolute bottom-full left-3 right-3 mb-2 bg-card border border-border rounded-lg shadow-lg z-50 p-2 animate-in fade-in slide-in-from-bottom-2 duration-200"
          role="menu"
          aria-label="Menú de usuario"
        >
          {/* Profile Option */}
          <button
            onClick={handleProfileClick}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-card"
            role="menuitem"
          >
            <UserIcon className="w-4 h-4 text-muted-foreground" />
            <span>Ver Perfil</span>
          </button>

          {/* Settings Option */}
          <button
            onClick={handleSettingsClick}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-card"
            role="menuitem"
          >
            <Settings className="w-4 h-4 text-muted-foreground" />
            <span>Configuración</span>
          </button>

          {/* Separator */}
          <div className="h-px bg-border my-2" />

          {/* Logout Option */}
          <button
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-md transition-colors text-left focus:outline-none focus:ring-2 focus:ring-destructive focus:ring-offset-2 focus:ring-offset-card"
            role="menuitem"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      )}
    </div>
  )
}
