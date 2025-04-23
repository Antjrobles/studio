import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { ThemeToggle } from '@/components/theme-toggle';
import { Providers } from '@/components/providers';
import { AuthButton } from '@/components/auth-button';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Andalucía Activa',
  description: 'AI-powered activity plan generator for teachers in Andalucía',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* Contenedor para los botones en la esquina superior derecha con Flexbox */}
            <div className="absolute top-4 right-6 flex items-center space-x-2">
              <ThemeToggle />
              <AuthButton />
            </div>
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
