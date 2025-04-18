'use client';

import {Card, CardContent} from '@/components/ui/card';

interface ActivityPlanDisplayProps {
  activityPlan: string;
}

export function ActivityPlanDisplay({
  activityPlan,
}: ActivityPlanDisplayProps) {
  return (
    <Card>
      <CardContent className="prose">
        <div dangerouslySetInnerHTML={{__html: activityPlan}} />
      </CardContent>
    </Card>
  );
}
