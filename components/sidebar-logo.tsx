'use client'

import { UserRole } from '@/types/user'

interface SidebarLogoProps {
  collapsed: boolean
  userRole: UserRole
}

const logosConfig = {
  'Padre': {
    initials: 'PA',
    text: 'EduNova',
    gradient: 'from-blue-600 to-blue-700',
    accent: 'text-blue-600'
  },
  'Profesor': {
    initials: 'PR',
    text: 'EduNova',
    gradient: 'from-emerald-600 to-emerald-700',
    accent: 'text-emerald-600'
  },
  'Estudiante': {
    initials: 'ES',
    text: 'EduNova',
    gradient: 'from-purple-600 to-purple-700',
    accent: 'text-purple-600'
  },
  'Administrador': {
    initials: 'AD',
    text: 'EduNova',
    gradient: 'from-slate-700 to-slate-800',
    accent: 'text-slate-700'
  }
}

export function SidebarLogo({ collapsed, userRole }: SidebarLogoProps) {
  const config = logosConfig[userRole]

  return (
    <div className={`flex items-center gap-3 px-2 py-2 transition-all duration-300 ${collapsed ? 'justify-center' : ''}`}>
      <div
        className={`w-9 h-9 rounded-lg bg-gradient-to-br ${config.gradient} text-white flex items-center justify-center font-bold text-xs flex-shrink-0 transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg`}
        title={`Logo de ${userRole}`}
      >
        {config.initials}
      </div>

      {!collapsed && (
        <div className="flex-1 min-w-0 transition-opacity duration-200">
          <h1 className="text-sm font-bold text-sidebar-foreground truncate">{config.text}</h1>
          <p className={`text-xs ${config.accent} font-semibold truncate capitalize opacity-80`}>{userRole}</p>
        </div>
      )}
    </div>
  )
}
