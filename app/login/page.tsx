'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GraduationCap } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simular autenticación
    setTimeout(() => {
      // Guardar en sessionStorage para mantener la sesión
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('userEmail', email);
      
      // Redirigir al dashboard
      router.push('/');
      setIsLoading(false);
    }, 800);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: 'url(/images/education-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        filter: 'brightness(0.95) contrast(1.05)'
      }}
    >
      {/* Overlay translúcido para mejorar legibilidad */}
      <div className="absolute inset-0 bg-white/40"></div>
      
      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shadow-lg">
            <GraduationCap className="w-8 h-8" />
          </div>
        </div>

        {/* Contenedor del formulario */}
        <div className="bg-white rounded-lg shadow-2xl p-8 border border-gray-400">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 text-center">EduNova</h1>
            <p className="text-sm text-gray-600 text-center mt-2">
              Plataforma de Educación
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-2">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 mt-6"
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>
          </form>

          <p className="text-xs text-gray-600 text-center mt-6">
            Ingresa cualquier correo y contraseña para acceder
          </p>
        </div>
      </div>
    </div>
  );
}
