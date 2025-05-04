"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { GraduationCap } from "lucide-react";

export function EducationHero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 to-blue-900/90 z-10" />
      <Image
        src="https://images.pexels.com/photos/5905445/pexels-photo-5905445.jpeg"
        fill
        className={cn(
          "object-cover bg-blue-900/30 transition-opacity duration-500",
          loaded ? "opacity-60" : "opacity-0"
        )}
        alt="Modern classroom with technology"
        onLoad={() => setLoaded(true)}
      />
      <div className="relative z-20 flex flex-col items-center text-lg font-medium">
        <div className="rounded-full bg-white/10 p-4 backdrop-blur-sm">
          <GraduationCap className="h-8 w-8 text-white" />
        </div>
        <div
          className={cn(
            "mt-4 text-center transition-all duration-500 delay-100",
            loaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}
        >
          <span className="font-bold text-xl">Educación Andalucía</span>
        </div>
      </div>
      <div
        className={cn(
          "relative z-20 mt-auto space-y-2 transition-all duration-500 delay-200",
          loaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        )}
      >
        <blockquote className="space-y-6">
          <p className="text-lg">
            "La educación es el arma más poderosa que puedes usar para cambiar el mundo."
          </p>
          <footer className="text-sm">Nelson Mandela</footer>
        </blockquote>
        <div className="h-1 w-20 bg-white/20 rounded mt-6"></div>
        <div className="flex flex-col space-y-1 text-sm">
          <div className="text-white/80">
            Plataforma para la creación de tareas educativas con IA
          </div>
          <div className="font-medium">Junta de Andalucía</div>
        </div>
      </div>
    </div>
  );
}