'use client';

import {AuthButton} from '@/components/auth-button';
import {ClassProfileInput} from '@/components/class-profile-input';
import {ThemeToggle} from '@/components/theme-toggle';
import {Toaster} from '@/components/ui/toaster';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {ActivityPlanDisplay} from '@/components/activity-plan-display';
import {useState} from 'react';

export default function Home() {
  const [activityPlan, setActivityPlan] = useState<string | null>(null);

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="bg-background border-b p-4 flex justify-between items-center">
        <span className="font-bold text-lg">Andalucía Activa</span>
        <div className="flex gap-2 items-center">
          <ThemeToggle />
          <AuthButton />
        </div>
      </nav>

      <main className="container mx-auto p-4 flex-grow">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Generador de Plan de Actividades</CardTitle>
            <CardDescription>
              Introduce las características de tu clase para generar un plan de
              actividades personalizado.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ClassProfileInput setActivityPlan={setActivityPlan} />
          </CardContent>
        </Card>

        {activityPlan && (
          <Card className="max-w-3xl mx-auto mt-4">
            <CardHeader>
              <CardTitle>Plan de Actividades Generado</CardTitle>
              <CardDescription>
                Aquí tienes el plan de actividades generado para tu clase.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ActivityPlanDisplay activityPlan={activityPlan} />
            </CardContent>
          </Card>
        )}
      </main>

      <Toaster />
    </div>
  );
}
