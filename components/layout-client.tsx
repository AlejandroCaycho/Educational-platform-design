'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home, MessageSquare, Calendar, Settings, FileText, Users, Menu, X,
  GraduationCap, Bell
} from 'lucide-react';
import { Toaster } from './ui/toaster';

function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (v: boolean) => void }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { icon: Home, label: 'Inicio', href: '/' },
    { icon: MessageSquare, label: 'Mensajes', href: '/mensajes' },
    { icon: Calendar, label: 'Calendario', href: '/calendario' },
    { icon: FileText, label: 'Reportes', href: '/reportes' },
    { icon: Users, label: 'Usuarios', href: '/usuarios' },
    { icon: Settings, label: 'Configuración', href: '/configuracion' },
  ];

  const handleToggle = () => {
    if (window.innerWidth < 1024) {
      setIsOpen(!isOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 lg:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`fixed lg:static top-0 left-0 h-screen lg:h-full bg-sidebar border-r border-border transition-all duration-300 z-40 flex flex-col lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } ${isCollapsed ? 'lg:w-20' : 'w-64'}`}>
        {/* Header del Sidebar */}
        <div className={`flex flex-col lg:flex-row lg:items-center px-3 py-3 border-b border-border flex-shrink-0 transition-all duration-300 ${isCollapsed ? 'lg:justify-center' : ''}`}>
          <div className={`flex items-center gap-2 flex-1 min-w-0 ${isCollapsed ? 'lg:hidden' : ''}`}>
            <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">
              E
            </div>
            <div className="hidden sm:block min-w-0">
              <h1 className="text-base font-bold text-foreground truncate">EduNova</h1>
              <p className="text-xs text-muted-foreground truncate">Plataforma</p>
            </div>
          </div>
          
          <div className={`flex gap-2 flex-shrink-0 ${isCollapsed ? 'flex-col' : 'flex-row'}`}>
            <button className="p-1.5 hover:bg-muted rounded-lg transition-colors relative flex items-center justify-center" title="Notificaciones">
              <Bell className="w-4 h-4 text-foreground" />
              <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-destructive rounded-full"></span>
            </button>
            <button
              className="p-1.5 hover:bg-muted rounded-lg transition-colors text-foreground flex items-center justify-center"
              onClick={handleToggle}
              title={isCollapsed ? 'Expandir' : 'Colapsar'}
            >
              {isCollapsed && !isOpen ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Menu */}
        <nav className={`p-4 space-y-2 flex-1 overflow-y-auto transition-all duration-300 ${isCollapsed ? 'lg:p-2' : ''}`}>
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-foreground hover:bg-muted'
                } ${isCollapsed ? 'lg:justify-center lg:px-2' : ''}`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Usuario al final */}
        <div className={`px-4 py-4 border-t border-border flex-shrink-0 mt-auto transition-all duration-300 ${isCollapsed ? 'lg:px-2' : ''}`}>
          <button className={`w-full flex items-center gap-3 p-3 bg-muted hover:bg-muted rounded-lg transition-colors text-left ${isCollapsed ? 'lg:justify-center' : ''}`}>
            <div className="w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">Familia García</p>
                <p className="text-xs text-muted-foreground truncate">Padre</p>
              </div>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
      <Toaster />
    </div>
  );
}
