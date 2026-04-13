'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import LayoutClient from './layout-client';

export default function AuthRedirect({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecked, setIsChecked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);

    // Si está en login y está autenticado, ir a dashboard
    if (pathname === '/login' && loggedIn) {
      router.push('/');
      return;
    }

    // Si está en dashboard y NO está autenticado, ir a login
    if (pathname === '/' && !loggedIn) {
      router.push('/login');
      return;
    }

    setIsChecked(true);
  }, [pathname, router]);

  // Mientras se verifica, no renderizar nada
  if (!isChecked) {
    return null;
  }

  // Si está en login, no mostrar sidebar
  if (pathname === '/login') {
    return <>{children}</>;
  }

  // Si está en dashboard, mostrar con sidebar (solo si está autenticado)
  if (isLoggedIn) {
    return <LayoutClient>{children}</LayoutClient>;
  }

  return null; // No renderizar nada si no está autenticado
}
