'use client';

import { generateActivityPlan } from '@/ai/flows/generate-activity-plan';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'; // Import Select components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';

// Define options for dropdowns
const gradeLevels = [
  'Infantil (3 años)',
  'Infantil (4 años)',
  'Infantil (5 años)',
  '1º Primaria',
  '2º Primaria',
  '3º Primaria',
  '4º Primaria',
  '5º Primaria',
  '6º Primaria', 
  '1º ESO',
  '2º ESO',
  '3º ESO',
  '4º ESO',
  '1º Bachillerato',
  '2º Bachillerato',
];

const subjects = [
  'Lengua Castellana y Literatura',
  'Matemáticas',
  'Ciencias Naturales',
  'Ciencias Sociales',
  'Educación Física',
  'Inglés',
  'Francés',
  'Música',
  'Plástica',
  'Tecnología',
  'Religión/Valores',
];

const provinces = [
  'Almería',
  'Cádiz',
  'Córdoba',
  'Granada',
  'Huelva',
  'Jaén',
  'Málaga',
  'Sevilla',
];

const formSchema = z.object({
  numberOfStudents: z.number().min(1, { message: 'El número debe ser mayor que 0' }),
  gradeLevel: z.string({ required_error: 'Nivel de curso requerido' }),
  subject: z.string({ required_error: 'Materia requerida' }),
  province: z.string({ required_error: 'Provincia requerida' }),
  studentsWithSpecialNeeds: z.string().optional(),
});

interface ClassProfileInputProps {
  setActivityPlan: (plan: string) => void;
}

export function ClassProfileInput({ setActivityPlan }: ClassProfileInputProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      numberOfStudents: 20,
      gradeLevel: '6to Primaria',
      subject: 'Matemáticas',
      province: 'Sevilla',
      studentsWithSpecialNeeds: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        const plan = await generateActivityPlan(values);
        setActivityPlan(plan.activityPlan);
        toast({
          title: 'Plan de actividades generado!',
          description: 'Se ha generado un plan de actividades para tu clase.',
        });
      } catch (error: any) {
        toast({
          variant: 'destructive',
          title: 'Error!',
          description:
            error.message ||
            'Hubo un error al generar el plan de actividades. Inténtalo de nuevo.',
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="numberOfStudents"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número de Estudiantes</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Ej. 20"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gradeLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nivel de Curso</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un nivel" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {gradeLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Materia</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una materia" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="province"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Provincia</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una provincia" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {provinces.map((province) => (
                    <SelectItem key={province} value={province}>
                      {province}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="studentsWithSpecialNeeds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alumnos con Necesidades Especiales (opcional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Ej. Dificultades de aprendizaje, TDAH, etc."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? 'Generando...' : 'Generar Plan de Actividades'}
        </Button>
      </form>
    </Form>
  );
}
