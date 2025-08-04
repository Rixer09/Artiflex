'use server';

import {
  generateProductDescription,
  type GenerateProductDescriptionInput,
} from '@/ai/flows/generate-product-description';
import { addProduct, type Product } from '@/lib/products';
import { revalidatePath } from 'next/cache';

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

export async function publishProduct(product: Omit<Product, 'id' | 'imageUrl' | 'dataAiHint'>): Promise<{ success: boolean, error?: string }> {
  try {
    addProduct({
      ...product,
      id: Date.now().toString(),
      imageUrl: 'https://placehold.co/600x600',
      dataAiHint: product.brandName.toLowerCase().split(' ').slice(0,2).join(' '),
    });
    revalidatePath('/');
    return { success: true };
  } catch(e) {
    console.error(e);
    return { success: false, error: "Failed to publish product." };
  }
}
