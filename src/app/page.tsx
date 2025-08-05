
import ProductCard from '@/components/product-card';
import { getProducts, getNewlyLaunchedProducts, clearNewlyLaunchedProducts } from '@/lib/products';
import HomeClient from './home-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Rocket } from 'lucide-react';

export default function Home() {
  const allProducts = getProducts();
  const newlyLaunched = getNewlyLaunchedProducts();
  
  // Combine lists, ensuring no duplicates, and place new items at the top.
  const uniqueProductIds = new Set(newlyLaunched.map(p => p.id));
  const products = [
    ...newlyLaunched,
    ...allProducts.filter(p => !uniqueProductIds.has(p.id))
  ];
  
  // This is a temporary mechanism for this in-memory provider.
  // In a real app with a database, you wouldn't need this.
  clearNewlyLaunchedProducts();

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

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </section>
    </HomeClient>
  );
}
