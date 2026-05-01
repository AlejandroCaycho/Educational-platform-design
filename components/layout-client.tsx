'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home, MessageSquare, Calendar, Settings, FileText, Users, Menu, X,
  Bell, Building2, Shield
} from 'lucide-react'
import { Toaster } from './ui/toaster'
import { SidebarLogo } from '@/components/sidebar-logo'
import { SidebarUserSection } from '@/components/sidebar-user-section'
import { UserProfileModal } from '@/components/modals/user-profile-modal'
import { SidebarSettingsModal } from '@/components/modals/sidebar-settings-modal'
import { useUserModal } from '@/hooks/use-user-modal'

function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (v: boolean) => void }) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { profileOpen, settingsOpen, currentUser, openProfileModal, closeProfileModal, openSettingsModal, closeSettingsModal, updateUser } = useUserModal()

  const menuItems = [
    { icon: Home, label: 'Inicio', href: '/' },
    { icon: MessageSquare, label: 'Mensajes', href: '/mensajes' },
    { icon: Calendar, label: 'Calendario', href: '/calendario' },
    { icon: FileText, label: 'Reportes', href: '/reportes' },
    { icon: Users, label: 'Usuarios', href: '/usuarios' },
    { icon: Settings, label: 'Configuración', href: '/configuracion' },
    { icon: Building2, label: 'Instituciones', href: '/instituciones' },
    { icon: Shield, label: 'Acceso', href: '/acceso' },
  ]

  const handleToggle = () => {
    if (window.innerWidth < 1024) {
      setIsOpen(!isOpen)
    } else {
      setIsCollapsed(!isCollapsed)
    }
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 lg:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static top-0 left-0 h-screen lg:h-full bg-sidebar border-r border-sidebar-border shadow-xl transition-all duration-300 z-40 flex flex-col lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${isCollapsed ? 'lg:w-20' : 'w-64'}`}
      >
        {/* Header con Logo Dinámico */}
        <div 
          className={`flex flex-col lg:flex-row lg:items-center px-3 py-4 border-b border-sidebar-border bg-sidebar flex-shrink-0 transition-all duration-300 ${isCollapsed ? 'lg:justify-center' : ''}`}
        >
          <SidebarLogo collapsed={isCollapsed} userRole={currentUser.role} />

          <div className={`flex gap-2.5 flex-shrink-0 ${isCollapsed ? 'flex-col' : 'flex-row'} mt-2 lg:mt-0`}>
            <button
              className="p-2.5 rounded-lg transition-all duration-200 relative flex items-center justify-center text-sidebar-foreground hover:bg-sidebar-accent group border border-sidebar-border hover:border-sidebar-accent"
              title="Notificaciones"
              aria-label="Notificaciones"
            >
              <Bell className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse shadow-lg"></span>
            </button>
            <button
              className="p-2.5 rounded-lg transition-all duration-200 text-sidebar-foreground hover:bg-sidebar-accent flex items-center justify-center border border-sidebar-border hover:border-sidebar-accent"
              onClick={handleToggle}
              title={isCollapsed ? 'Expandir' : 'Colapsar'}
              aria-label={isCollapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
            >
              {isCollapsed && !isOpen ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Menu de Navegación */}
        <nav className={`px-3 py-4 space-y-1.5 flex-1 overflow-y-auto transition-all duration-300 ${isCollapsed ? 'lg:px-2' : ''}`}>
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 group border ${
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-lg scale-105 border-sidebar-primary'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/30 border-transparent hover:border-sidebar-accent'
                } ${isCollapsed ? 'lg:justify-center lg:px-2.5 lg:py-2.5' : ''}`}
              >
                <item.icon className={`w-5 h-5 flex-shrink-0 transition-all duration-200 ${isActive ? 'scale-115' : 'group-hover:scale-110'}`} />
                {!isCollapsed && <span className="truncate">{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Sección de Usuario Mejorada */}
        <SidebarUserSection
          collapsed={isCollapsed}
          user={currentUser}
          onProfileClick={openProfileModal}
          onSettingsClick={openSettingsModal}
        />
      </aside>

      {/* Modales */}
      <UserProfileModal
        open={profileOpen}
        user={currentUser}
        onClose={closeProfileModal}
        onUpdate={updateUser}
      />
      <SidebarSettingsModal open={settingsOpen} onClose={closeSettingsModal} />
    </>
  )
}

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
      <Toaster />
    </div>
  )
}
