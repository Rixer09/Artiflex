'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter, notFound } from 'next/navigation';
import { getProductById, updateProduct, type Product } from '@/lib/products';
import { Slider } from '@/components/ui/slider';
import Image from 'next/image';

const formSchema = z.object({
  brandName: z.string().min(3, 'Brand name is required'),
  tagline: z.string().min(5, 'Tagline is required'),
  storySnippet: z.string().min(10, 'Story snippet is required'),
  price: z.number(),
});

type FormValues = z.infer<typeof formSchema>;

type EditProductPageParams = {
  params: {
    id: string;
  };
};

export default function EditProductPage({ params }: EditProductPageParams) {
  const id = params.id;
  const [product, setProduct] = useState<Product | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    const existingProduct = getProductById(id);
    if (existingProduct) {
      setProduct(existingProduct);
      setValue('brandName', existingProduct.brandName);
      setValue('tagline', existingProduct.tagline);
      setValue('storySnippet', existingProduct.storySnippet);
      setValue('price', existingProduct.price);
    } else {
      notFound();
    }
  }, [id, setValue]);

  const price = watch('price', product?.price || 0);

  const onSave = async (data: FormValues) => {
    if (!product) return;
    setIsSaving(true);
    
    updateProduct(product.id, { ...product, ...data });

    setIsSaving(false);
    toast({
      title: 'Product Saved!',
      description: 'Your changes have been successfully saved.',
    });
    router.push(`/product/${product.id}`);
  };

  if (!product) {
    return <div className="container py-12 text-center"><Loader2 className="mx-auto h-12 w-12 animate-spin" /></div>;
  }

  return (
    <div className="container py-12">
      <h1 className="text-4xl md:text-5xl font-headline text-center mb-8">Edit Product</h1>
      
      <form onSubmit={handleSubmit(onSave)} className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Editing: {product.brandName}</CardTitle>
            <CardDescription>Make changes to your product details below.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="brandName">Brand Name</Label>
                  <Input id="brandName" {...register('brandName')} />
                  {errors.brandName && <p className="text-red-500 text-sm mt-1">{errors.brandName.message}</p>}
                </div>
                <div>
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input id="tagline" {...register('tagline')} />
                  {errors.tagline && <p className="text-red-500 text-sm mt-1">{errors.tagline.message}</p>}
                </div>
            </div>

            <div>
              <Label htmlFor="storySnippet">Story Snippet</Label>
              <Textarea id="storySnippet" {...register('storySnippet')} rows={5} />
              {errors.storySnippet && <p className="text-red-500 text-sm mt-1">{errors.storySnippet.message}</p>}
            </div>
            
            <div className="grid grid-cols-2 gap-6 items-center">
                <div>
                    <Label>Product Image</Label>
                    <div className="mt-2 w-full h-48 border rounded-md overflow-hidden">
                        <Image src={product.imageUrl} alt={product.brandName} width={400} height={400} className="object-cover h-full w-full"/>
                    </div>
                </div>
                 <div>
                    <Label>Product Price</Label>
                    <div className="flex items-center gap-4 mt-2">
                        <Slider
                            value={[price]}
                            min={3}
                            max={500}
                            step={1}
                            onValueChange={(value) => setValue('price', value[0])}
                        />
                        <span className="font-bold text-lg w-24 text-right">${price?.toFixed(2)}</span>
                    </div>
                </div>
            </div>

          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={isSaving}>
              {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
