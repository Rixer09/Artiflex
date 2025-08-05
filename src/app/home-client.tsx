
'use client';

import { useUser } from '@/hooks/use-user';
import { useEffect, useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getProductById, type Product } from '@/lib/products';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Rocket } from 'lucide-react';
import ProductCard from '@/components/product-card';
import { getNewlyLaunchedProductIds, clearNewlyLaunchedProductIds } from '@/lib/products';

export default function HomeClient({ children }: { children: ReactNode }) {
  const { user } = useUser();
  const router = useRouter();
  const [newlyLaunched, setNewlyLaunched] = useState<Product[]>([]);

  useEffect(() => {
    if (!user.role) {
      router.push('/login');
    }
  }, [user, router]);

  useEffect(() => {
    const ids = getNewlyLaunchedProductIds();
    if (ids.length > 0) {
      const products = ids.map(id => getProductById(id)).filter((p): p is Product => p !== undefined);
      setNewlyLaunched(products);
      clearNewlyLaunchedProductIds();
    }
  }, []);

  return (
    <div className="container py-8 md:py-12">
      
      {newlyLaunched.length > 0 && (
          <section className="mb-12">
               <Card className="bg-primary/5">
                <CardHeader>
                    <CardTitle className="flex items-center text-2xl font-headline">
                        <Rocket className="mr-3 text-primary" />
                        Newly Launched
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {newlyLaunched.map((product) => (
                            <ProductCard key={`new-${product.id}`} {...product} />
                        ))}
                    </div>
                </CardContent>
            </Card>
          </section>
      )}

      {children}
      {user.role === 'creator' && (
        <section className="text-center mt-16">
          <h2 className="text-3xl font-headline mb-4">Have an Idea?</h2>
          <p className="max-w-xl mx-auto text-foreground/80 mb-6">
            Bring your vision to life. Use our AI-powered tools to create and
            sell your own unique products.
          </p>
          <Link href="/create">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Start Your Creative Journey
            </Button>
          </Link>
        </section>
      )}
    </div>
  );
}
