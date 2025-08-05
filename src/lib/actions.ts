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

export async function publishProduct(product: Omit<Product, 'id'>): Promise<{ success: boolean; product?: Product; error?: string }> {
  try {
    // This server action now returns the newly created product.
    const newProduct = addProduct(product);
    // Revalidation is still good practice for other scenarios.
    revalidatePath('/'); 
    return { success: true, product: newProduct };
  } catch(e) {
    console.error(e);
    return { success: false, error: "Failed to publish product." };
  }
}
