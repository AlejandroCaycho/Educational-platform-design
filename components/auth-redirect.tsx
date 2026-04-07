'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AuthRedirect({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

    // Si está en login y está autenticado, ir a dashboard
    if (pathname === '/login' && isLoggedIn) {
      router.push('/');
    }

    // Si está en dashboard y NO está autenticado, ir a login
    if (pathname === '/' && !isLoggedIn) {
      router.push('/login');
    }

    setIsChecked(true);
  }, [pathname, router]);

  if (!isChecked) {
    return null; // No renderizar nada mientras se verifica
  }

  return <>{children}</>;
}
