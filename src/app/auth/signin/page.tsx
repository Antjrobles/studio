"use client";

import { useRouter } from "next/navigation";
import { UserRegistrationForm } from "@/components/auth/user-registration-form";
import { EducationHero } from "@/components/auth/education-hero";
import { EducationQuotes } from "@/components/auth/education-quotes";
import { Home } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();

  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/"
        className="absolute right-4 top-4 md:right-8 md:top-8 flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
      >
        <Home className="mr-2 h-4 w-4" />
        Ir a inicio
      </Link>
      <EducationHero />
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] md:w-[450px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Crear cuenta</h1>
            <p className="text-sm text-muted-foreground">
              Registra tus datos para comenzar a crear tareas educativas con IA
            </p>
          </div>
          <EducationQuotes />
          <UserRegistrationForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            ¿Ya tienes una cuenta?{" "}
            <a
              href="/auth/login"
              className="underline underline-offset-4 hover:text-primary"
            >
              Iniciar sesión
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}