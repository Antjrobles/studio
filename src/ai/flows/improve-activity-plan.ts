'use server';
/**
 * @fileOverview A flow to improve an existing activity plan based on user feedback.
 *
 * - improveActivityPlan - A function that handles the activity plan improvement process.
 * - ImproveActivityPlanInput - The input type for the improveActivityPlan function.
 * - ImproveActivityPlanOutput - The return type for the improveActivityPlan function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const ImproveActivityPlanInputSchema = z.object({
  activityPlan: z.string().describe('The current activity plan.'),
  feedback: z.string().describe('The feedback provided by the teacher.'),
  classCharacteristics: z.string().describe('The characteristics of the class (e.g., grade level, subject, province).'),
});
export type ImproveActivityPlanInput = z.infer<typeof ImproveActivityPlanInputSchema>;

const ImproveActivityPlanOutputSchema = z.object({
  improvedActivityPlan: z.string().describe('The improved activity plan based on the feedback.'),
});
export type ImproveActivityPlanOutput = z.infer<typeof ImproveActivityPlanOutputSchema>;

export async function improveActivityPlan(input: ImproveActivityPlanInput): Promise<ImproveActivityPlanOutput> {
  return improveActivityPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'improveActivityPlanPrompt',
  input: {
    schema: z.object({
      activityPlan: z.string().describe('The current activity plan.'),
      feedback: z.string().describe('The feedback provided by the teacher.'),
      classCharacteristics: z.string().describe('The characteristics of the class (e.g., grade level, subject, province).'),
    }),
  },
  output: {
    schema: z.object({
      improvedActivityPlan: z.string().describe('The improved activity plan based on the feedback.'),
    }),
  },
  prompt: `You are an AI assistant helping a teacher improve an activity plan.

  The teacher has provided the following activity plan:
  {{activityPlan}}

  The teacher has provided the following feedback:
  {{feedback}}

  The class characteristics are:
  {{classCharacteristics}}

  Based on the feedback, revise the activity plan to make it more effective and relevant to the class characteristics. Provide the improved activity plan.
  Make sure to respect the structure and the output format of the original activity plan.
  Improved Activity Plan:
  `,
});

const improveActivityPlanFlow = ai.defineFlow<
  typeof ImproveActivityPlanInputSchema,
  typeof ImproveActivityPlanOutputSchema
>(
  {
    name: 'improveActivityPlanFlow',
    inputSchema: ImproveActivityPlanInputSchema,
    outputSchema: ImproveActivityPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
