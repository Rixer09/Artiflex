'use client';

import { Button } from '@/components/ui/button';
import { ShoppingCart, Edit } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/hooks/use-user';
import Link from 'next/link';
import { Product } from '@/lib/products';

export default function ProductActions({ product }: { product: Product }) {
  const { user } = useUser();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to Cart!",
      description: `${product.brandName} has been added to your cart.`,
    });
  };

  const isCreator = user?.role === 'creator';

  return (
    <div className="flex items-center space-x-2">
      {isCreator ? (
        <Link href={`/product/${product.id}/edit`}>
          <Button size="lg">
            <Edit className="mr-2 h-4 w-4" /> Edit Product
          </Button>
        </Link>
      ) : (
        <Button size="lg" onClick={handleAddToCart}>
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      )}
    </div>
  );
}
