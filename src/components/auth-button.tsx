'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';

export function AuthButton() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    // Muestra un esqueleto mientras se carga la sesión
    return <Skeleton className="h-10 w-24" />;
  }

  if (session) {
    // Usuario conectado: Muestra botón de cerrar sesión
    return (
      <Button variant="ghost" onClick={() => signOut()}>
        Cerrar Sesión
      </Button>
    );
  }

  // Usuario no conectado: Muestra botón de iniciar sesión
  // Por ahora, solo inicia sesión con el primer proveedor configurado (si lo hubiera)
  // O muestra un texto si no hay proveedores habilitados.
  // Cuando añadas proveedores (GitHub, Google, etc.), el signIn() sin argumentos
  // redirigirá a una página de inicio de sesión genérica de NextAuth.
  // Si quieres un proveedor específico harías signIn('github')
  return (
    <Button variant="ghost" onClick={() => signIn()}>
      Iniciar Sesión
    </Button>
  );
}
