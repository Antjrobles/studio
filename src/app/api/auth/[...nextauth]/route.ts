import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import { SupabaseAdapter } from '@auth/supabase-adapter';
import type { Adapter } from 'next-auth/adapters';
import CredentialsProvider from 'next-auth/providers/credentials';
import { createClient } from '@supabase/supabase-js';

// Crear cliente de Supabase para autenticación
const supabase = createClient(
  process.env.SUPABASE_URL ?? '',
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''
);

export const authOptions = {
  providers: [
    // Proveedor de credenciales para autenticación de Supabase
    CredentialsProvider({
      name: 'Supabase',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "ejemplo@email.com" },
        password: { label: "Contraseña", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        
        // Autenticar usando Supabase
        const { data, error } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password,
        });
        
        if (error || !data.user) {
          return null;
        }
        
        return {
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata?.name || data.user.email,
          image: data.user.user_metadata?.avatar_url
        };
      }
    }),
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
  // Callbacks para manejar sesiones y JWT
  callbacks: {
    async session({ session, user }) {
      if (session?.user) {
        session.user.id = user.id;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    }
  },
  // Puedes añadir otras configuraciones de NextAuth aquí (callbacks, pages, etc.)
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/auth/signin', // Personaliza la página de inicio de sesión si es necesario
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };