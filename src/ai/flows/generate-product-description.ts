'use server';

/**
 * @fileOverview A product description generator AI agent.
 *
 * - generateProductDescription - A function that handles the product description generation process.
 * - GenerateProductDescriptionInput - The input type for the generateProductDescription function.
 * - GenerateProductDescriptionOutput - The return type for the generateProductDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProductDescriptionInputSchema = z.object({
  productName: z.string().describe('The name of the product.'),
  productCategory: z.string().describe('The category of the product.'),
  productFeatures: z.string().describe('A list of key features of the product.'),
  brandIdentity: z.string().describe('The brand identity and values.'),
  targetAudience: z.string().describe('Description of the target audience.'),
  keywords: z.string().describe('Relevant keywords to include in the description.'),
});
export type GenerateProductDescriptionInput = z.infer<typeof GenerateProductDescriptionInputSchema>;

const GenerateProductDescriptionOutputSchema = z.object({
  productDescription: z.string().describe('A compelling and unique product description.'),
});
export type GenerateProductDescriptionOutput = z.infer<typeof GenerateProductDescriptionOutputSchema>;

export async function generateProductDescription(input: GenerateProductDescriptionInput): Promise<GenerateProductDescriptionOutput> {
  return generateProductDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProductDescriptionPrompt',
  input: {schema: GenerateProductDescriptionInputSchema},
  output: {schema: GenerateProductDescriptionOutputSchema},
  prompt: `You are an expert marketing copywriter specializing in writing compelling product descriptions.

  Given the following information, generate a unique and engaging product description that will attract customers.

  Product Name: {{{productName}}}
  Product Category: {{{productCategory}}}
  Product Features: {{{productFeatures}}}
  Brand Identity: {{{brandIdentity}}}
  Target Audience: {{{targetAudience}}}
  Keywords: {{{keywords}}}

  Write a product description that is both informative and persuasive, highlighting the key benefits of the product and appealing to the target audience. Make sure to include the specified keywords to improve search engine optimization.
  `,
});

const generateProductDescriptionFlow = ai.defineFlow(
  {
    name: 'generateProductDescriptionFlow',
    inputSchema: GenerateProductDescriptionInputSchema,
    outputSchema: GenerateProductDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
