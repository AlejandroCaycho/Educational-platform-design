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
      className={`relative px-3 py-4 border-t border-sidebar-border flex-shrink-0 transition-all duration-300 bg-sidebar-accent/20 ${
        collapsed ? 'flex items-center justify-center' : ''
      }`}
      ref={menuRef}
    >
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className={`w-full flex items-center gap-3 p-2.5 rounded-lg transition-all duration-200 group border text-sidebar-foreground hover:text-sidebar-primary ${
          menuOpen ? 'bg-sidebar-accent/40 border-sidebar-accent' : 'bg-sidebar-accent/20 border-sidebar-border hover:border-sidebar-accent'
        } ${collapsed ? 'justify-center' : ''}`}
        aria-expanded={menuOpen}
        aria-label="Menú de usuario"
      >
        <UserAvatar user={user} size="md" />

        {!collapsed && (
          <>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-sm font-semibold text-sidebar-foreground truncate">
                {user.name}
              </p>
              <p className="text-xs text-sidebar-foreground/70 truncate capitalize">
                {user.role}
              </p>
            </div>
            <ChevronUp
              className={`w-4 h-4 text-sidebar-foreground/60 transition-transform duration-200 flex-shrink-0 ${
                menuOpen ? 'rotate-180' : ''
              }`}
            />
          </>
        )}
      </button>

      {/* User Menu Dropdown */}
      {menuOpen && !collapsed && (
        <div
          className="absolute bottom-full left-2 right-2 mb-3 bg-white dark:bg-slate-900 border border-sidebar-border/50 dark:border-sidebar-border rounded-xl shadow-xl z-50 p-2 animate-in fade-in slide-in-from-bottom-2 duration-150 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95"
          role="menu"
          aria-label="Menú de usuario"
        >
          {/* Profile Option */}
          <button
            onClick={handleProfileClick}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-sidebar-foreground hover:bg-sidebar-accent/50 rounded-lg transition-all duration-150 text-left focus:outline-none focus:ring-2 focus:ring-sidebar-primary/60 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 group"
            role="menuitem"
          >
            <UserIcon className="w-4 h-4 text-sidebar-foreground/60 group-hover:text-sidebar-primary transition-colors" />
            <span className="font-medium">Ver Perfil</span>
          </button>

          {/* Settings Option */}
          <button
            onClick={handleSettingsClick}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-sidebar-foreground hover:bg-sidebar-accent/50 rounded-lg transition-all duration-150 text-left focus:outline-none focus:ring-2 focus:ring-sidebar-primary/60 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 group"
            role="menuitem"
          >
            <Settings className="w-4 h-4 text-sidebar-foreground/60 group-hover:text-sidebar-primary transition-colors" />
            <span className="font-medium">Configuración</span>
          </button>

          {/* Separator */}
          <div className="h-px bg-sidebar-border/30 my-2" />

          {/* Logout Option */}
          <button
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-all duration-150 text-left focus:outline-none focus:ring-2 focus:ring-red-500/60 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 group"
            role="menuitem"
          >
            <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span className="font-medium">Cerrar Sesión</span>
          </button>
        </div>
      )}
    </div>
  )
}
