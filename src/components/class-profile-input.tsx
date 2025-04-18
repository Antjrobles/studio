'use client';

import {generateActivityPlan} from '@/ai/flows/generate-activity-plan';
import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {useToast} from '@/hooks/use-toast';
import {z} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useTransition} from 'react';

const formSchema = z.object({
  numberOfStudents: z.number().min(1, {message: 'El número debe ser mayor que 0'}),
  gradeLevel: z.string().min(2, {message: 'Nivel de curso requerido'}),
  subject: z.string().min(2, {message: 'Materia requerida'}),
  province: z.string().min(2, {message: 'Provincia requerida'}),
  studentsWithSpecialNeeds: z.string().optional(),
});

interface ClassProfileInputProps {
  setActivityPlan: (plan: string) => void;
}

export function ClassProfileInput({setActivityPlan}: ClassProfileInputProps) {
  const {toast} = useToast();
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
          render={({field}) => (
            <FormItem>
              <FormLabel>Número de Estudiantes</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Ej. 20"
                  {...field}
                  onChange={(e) =>
                    field.onChange(Number(e.target.value))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gradeLevel"
          render={({field}) => (
            <FormItem>
              <FormLabel>Nivel de Curso</FormLabel>
              <FormControl>
                <Input placeholder="Ej. 6to Primaria" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({field}) => (
            <FormItem>
              <FormLabel>Materia</FormLabel>
              <FormControl>
                <Input placeholder="Ej. Matemáticas" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="province"
          render={({field}) => (
            <FormItem>
              <FormLabel>Provincia</FormLabel>
              <FormControl>
                <Input placeholder="Ej. Sevilla" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="studentsWithSpecialNeeds"
          render={({field}) => (
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
