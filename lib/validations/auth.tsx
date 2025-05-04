import * as z from "zod";

// Common validation patterns
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordMinLength = 8;

// Login schema
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "El email es obligatorio" })
    .regex(emailPattern, { message: "Por favor, introduce un email válido" }),
  password: z
    .string()
    .min(1, { message: "La contraseña es obligatoria" }),
  rememberMe: z.boolean().optional(),
});

// User registration schema
export const userRegistrationSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "El nombre debe tener al menos 2 caracteres" })
      .max(50, { message: "El nombre no puede exceder los 50 caracteres" }),
    email: z
      .string()
      .min(1, { message: "El email es obligatorio" })
      .regex(emailPattern, { message: "Por favor, introduce un email válido" }),
    password: z
      .string()
      .min(passwordMinLength, {
        message: `La contraseña debe tener al menos ${passwordMinLength} caracteres`,
      })
      .refine(
        (password) => {
          // Check if password contains at least one uppercase letter
          return /[A-Z]/.test(password);
        },
        { message: "La contraseña debe contener al menos una letra mayúscula" }
      )
      .refine(
        (password) => {
          // Check if password contains at least one number
          return /[0-9]/.test(password);
        },
        { message: "La contraseña debe contener al menos un número" }
      ),
    confirmPassword: z.string(),
    institution: z
      .string()
      .min(1, { message: "La institución educativa es obligatoria" }),
    role: z
      .string()
      .min(1, { message: "El rol docente es obligatorio" }),
    subjects: z
      .array(z.string())
      .min(1, { message: "Selecciona al menos una asignatura" }),
    terms: z
      .boolean()
      .refine((val) => val === true, {
        message: "Debes aceptar los términos y condiciones",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

// Password recovery schema
export const passwordRecoverySchema = z.object({
  email: z
    .string()
    .min(1, { message: "El email es obligatorio" })
    .regex(emailPattern, { message: "Por favor, introduce un email válido" }),
});