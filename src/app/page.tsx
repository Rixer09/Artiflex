import ProductCard from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { getProducts } from '@/lib/products';
import Link from 'next/link';
import HomeClient from './home-client';

export default function Home() {
  const products = getProducts();
  
  return (
    <HomeClient>
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-headline text-primary mb-4 animate-fade-in-down">
          Artiflex Marketplace
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-foreground/80 font-body">
          Discover unique creations from a new generation of artists. Each piece
          tells a story, powered by imagination and AI.
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </section>
    </HomeClient>
  );
}
