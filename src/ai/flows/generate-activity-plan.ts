// Use strict mode
'use server';

/**
 * @fileOverview Generates a tailored activity plan for teachers in Andalucia based on class characteristics and regional legislation.
 *
 * - generateActivityPlan - A function that generates the activity plan.
 * - GenerateActivityPlanInput - The input type for the generateActivityPlan function.
 * - GenerateActivityPlanOutput - The return type for the generateActivityPlan function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
import {getRelevantLegislation, LegislationSummary} from '@/services/andalucia-legislation';

const GenerateActivityPlanInputSchema = z.object({
  numberOfStudents: z.number().describe('The number of students in the class.'),
  gradeLevel: z.string().describe('The grade level of the class.'),
  subject: z.string().describe('The subject being taught.'),
  province: z.string().describe('The province in Andalucia where the class is located.'),
  studentsWithSpecialNeeds: z
    .string()
    .describe('Any special needs of the students in the class.'),
});

export type GenerateActivityPlanInput = z.infer<typeof GenerateActivityPlanInputSchema>;

const GenerateActivityPlanOutputSchema = z.object({
  activityPlan: z.string().describe('The generated activity plan.'),
});

export type GenerateActivityPlanOutput = z.infer<typeof GenerateActivityPlanOutputSchema>;

export async function generateActivityPlan(
  input: GenerateActivityPlanInput
): Promise<GenerateActivityPlanOutput> {
  return generateActivityPlanFlow(input);
}

const generateActivityPlanPrompt = ai.definePrompt({
  name: 'generateActivityPlanPrompt',
  input: {
    schema: z.object({
      numberOfStudents: z.number().describe('The number of students in the class.'),
      gradeLevel: z.string().describe('The grade level of the class.'),
      subject: z.string().describe('The subject being taught.'),
      province: z.string().describe('The province in Andalucia where the class is located.'),
      studentsWithSpecialNeeds: z
        .string()
        .describe('Any special needs of the students in the class.'),
      relevantLegislation: z
        .array(z.object({
          title: z.string(),
          summary: z.string(),
          url: z.string(),
        }))
        .describe('Relevant sections of Andalusian legislation.'),
    }),
  },
  output: {
    schema: z.object({
      activityPlan: z.string().describe('The generated activity plan.'),
    }),
  },
  prompt: `You are an AI assistant designed to generate tailored activity plans for teachers in Andalucia.

  Consider the following class characteristics:
  - Number of Students: {{{numberOfStudents}}}
  - Grade Level: {{{gradeLevel}}}
  - Subject: {{{subject}}}
  - Province: {{{province}}}
  - Students with Special Needs: {{{studentsWithSpecialNeeds}}}

  In addition, here are some relevant sections of Andalusian legislation:
  {{#each relevantLegislation}}
  - Title: {{{title}}}
    Summary: {{{summary}}}
    URL: {{{url}}}
  {{/each}}

  Generate a detailed and engaging activity plan that aligns with the class characteristics and adheres to the provided Andalusian legislation.  The activity plan should be appropriate for the grade level and subject, and consider the needs of all students.  The activity plan should be ready to be used by the teacher with no additional modification. Make sure to specify the objectives, activities, resources and evaluation methods. Be creative and make the plan innovative. 

  Activity Plan:`,
});

const generateActivityPlanFlow = ai.defineFlow<
  typeof GenerateActivityPlanInputSchema,
  typeof GenerateActivityPlanOutputSchema
>(
  {
    name: 'generateActivityPlanFlow',
    inputSchema: GenerateActivityPlanInputSchema,
    outputSchema: GenerateActivityPlanOutputSchema,
  },
  async input => {
    const relevantLegislation: LegislationSummary[] = await getRelevantLegislation({
      gradeLevel: input.gradeLevel,
      subject: input.subject,
      province: input.province,
    });

    const {output} = await generateActivityPlanPrompt({
      ...input,
      relevantLegislation,
    });
    return output!;
  }
);
