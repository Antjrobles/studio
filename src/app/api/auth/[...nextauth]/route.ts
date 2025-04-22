import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import { SupabaseAdapter } from '@auth/supabase-adapter';
import type { Adapter } from 'next-auth/adapters';

export const authOptions = {
  providers: [
    // Por ahora, configuraremos GitHub. Puedes añadir más proveedores (Google, etc.) aquí.
    // GitHubProvider({
    //   clientId: process.env.GITHUB_ID ?? '',
    //   clientSecret: process.env.GITHUB_SECRET ?? '',
    // }),
    // Añade aquí otros proveedores si los necesitas, como Google, Email, etc.
  ],
  adapter: SupabaseAdapter({
    url: process.env.SUPABASE_URL ?? '',
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY ?? '', // Necesitaremos añadir esta variable de entorno
  }) as Adapter,
  // Puedes añadir otras configuraciones de NextAuth aquí (callbacks, pages, etc.)
  secret: process.env.AUTH_SECRET,
  // Asegúrate que las variables de entorno GITHUB_ID y GITHUB_SECRET están configuradas
  // si descomentas GitHubProvider.
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
