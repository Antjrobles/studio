"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface PasswordStrengthIndicatorProps {
  password: string;
}

export function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  const [strength, setStrength] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!password) {
      setStrength(0);
      setMessage("");
      return;
    }

    // Calculate password strength
    let currentStrength = 0;

    // Length check
    if (password.length >= 8) currentStrength += 1;
    if (password.length >= 12) currentStrength += 1;

    // Character variety checks
    if (/[A-Z]/.test(password)) currentStrength += 1;
    if (/[0-9]/.test(password)) currentStrength += 1;
    if (/[^A-Za-z0-9]/.test(password)) currentStrength += 1;

    // Set final strength score (0-4)
    const normalizedStrength = Math.min(4, currentStrength);
    setStrength(normalizedStrength);

    // Set appropriate message
    switch (normalizedStrength) {
      case 0:
        setMessage("Muy débil");
        break;
      case 1:
        setMessage("Débil");
        break;
      case 2:
        setMessage("Regular");
        break;
      case 3:
        setMessage("Buena");
        break;
      case 4:
        setMessage("Excelente");
        break;
      default:
        setMessage("");
    }
  }, [password]);

  // Determine colors based on strength
  const getColors = () => {
    switch (strength) {
      case 0:
        return "bg-muted";
      case 1:
        return "bg-destructive";
      case 2:
        return "bg-amber-500";
      case 3:
        return "bg-lime-500";
      case 4:
        return "bg-emerald-500";
      default:
        return "bg-muted";
    }
  };

  // Don't show when no password
  if (strength === 0 && !password) {
    return null;
  }

  return (
    <div className="space-y-2 text-sm transition-all">
      <div className="flex h-1.5 w-full rounded-full overflow-hidden bg-muted/30">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-full first:rounded-l-full last:rounded-r-full transition-all duration-300 ease-in-out",
              i < strength ? getColors() : "bg-muted/30",
              i > 0 && "ml-px"
            )}
            style={{ width: "25%" }}
          />
        ))}
      </div>
      <p
        className={cn(
          "text-xs",
          strength <= 1 ? "text-destructive" :
            strength === 2 ? "text-amber-500" :
              strength >= 3 ? "text-emerald-500" : ""
        )}
      >
        {message}
      </p>
    </div>
  );
}