'use client'

import { User, UserRole } from '@/types/user'
import { Zap } from 'lucide-react'

interface SidebarLogoProps {
  collapsed: boolean
  userRole: UserRole
}

const logosConfig = {
  'Padre': {
    icon: '👨‍👩‍👧‍👦',
    text: 'EduNova',
    shortText: 'EN',
    color: 'from-blue-500 to-blue-600'
  },
  'Profesor': {
    icon: '📚',
    text: 'EduNova',
    shortText: 'ED',
    color: 'from-green-500 to-green-600'
  },
  'Estudiante': {
    icon: '🎓',
    text: 'EduNova',
    shortText: 'ES',
    color: 'from-purple-500 to-purple-600'
  },
  'Administrador': {
    icon: '⚙️',
    text: 'EduNova',
    shortText: 'AD',
    color: 'from-red-500 to-red-600'
  }
}

export function SidebarLogo({ collapsed, userRole }: SidebarLogoProps) {
  const config = logosConfig[userRole]

  return (
    <div className={`flex items-center gap-2 px-3 py-2 transition-all duration-300 ${collapsed ? 'justify-center' : ''}`}>
      <div
        className={`w-8 h-8 rounded-lg bg-gradient-to-br ${config.color} text-white flex items-center justify-center font-bold text-sm flex-shrink-0 transition-transform duration-300 hover:scale-110`}
        title={`Logo de ${userRole}`}
      >
        <span className="text-base">{config.icon}</span>
      </div>

      {!collapsed && (
        <div className="flex-1 min-w-0 transition-opacity duration-200">
          <h1 className="text-sm font-bold text-foreground truncate">{config.text}</h1>
          <p className="text-xs text-muted-foreground truncate capitalize">{userRole}</p>
        </div>
      )}
    </div>
  )
}
