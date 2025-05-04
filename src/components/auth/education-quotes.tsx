"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const quotes = [
  {
    quote: "La educación es el arma más poderosa que puedes usar para cambiar el mundo.",
    author: "Nelson Mandela"
  },
  {
    quote: "La educación no es preparación para la vida; la educación es la vida misma.",
    author: "John Dewey"
  },
  {
    quote: "El arte supremo del maestro es despertar el placer de la expresión creativa y el conocimiento.",
    author: "Albert Einstein"
  },
  {
    quote: "La educación es el pasaporte hacia el futuro, el mañana pertenece a aquellos que se preparan para él en el día de hoy.",
    author: "Malcolm X"
  },
  {
    quote: "Dime y lo olvido, enséñame y lo recuerdo, involúcrame y lo aprendo.",
    author: "Benjamin Franklin"
  },
  {
    quote: "La educación es el movimiento de la oscuridad a la luz.",
    author: "Allan Bloom"
  }
];

export function EducationQuotes() {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentQuote((prev) => (prev + 1) % quotes.length);
        setIsVisible(true);
      }, 500);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center mb-6 h-24 flex items-center justify-center">
      <blockquote
        className={cn(
          "transition-all duration-500",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
      >
        <p className="text-lg text-muted-foreground italic">"{quotes[currentQuote].quote}"</p>
        <footer className="text-sm text-primary mt-2">— {quotes[currentQuote].author}</footer>
      </blockquote>
    </div>
  );
}