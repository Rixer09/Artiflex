'use client';

import ProductCard from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { getProducts } from '@/lib/products';
import Link from 'next/link';
import { useUser } from '@/hooks/use-user';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const products = getProducts();
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user.role) {
      router.push('/login');
    }
  }, [user, router]);

  return (
    <div className="container py-8 md:py-12">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-headline text-primary mb-4 animate-fade-in-down">
          Artiflex Marketplace
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-foreground/80 font-body">
          Discover unique creations from a new generation of artists. Each piece
          tells a story, powered by imagination and AI. Welcome, {user.role || 'guest'}!
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </section>

      <section className="text-center mt-16">
          <h2 className="text-3xl font-headline mb-4">Have an Idea?</h2>
          <p className="max-w-xl mx-auto text-foreground/80 mb-6">
              Bring your vision to life. Use our AI-powered tools to create and sell your own unique products.
          </p>
          <Link href="/create">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Start Your Creative Journey
              </Button>
          </Link>
      </section>
    </div>
  );
}
