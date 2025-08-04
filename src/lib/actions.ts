'use server';

import {
  generateProductDescription,
  type GenerateProductDescriptionInput,
} from '@/ai/flows/generate-product-description';

export async function createDescription(
  data: GenerateProductDescriptionInput
): Promise<{ success: boolean; description?: string; error?: string }> {
  try {
    const result = await generateProductDescription(data);
    if (result.productDescription) {
        return { success: true, description: result.productDescription };
    }
    return { success: false, error: 'Failed to generate description.' };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'An unexpected error occurred.' };
  }
}
