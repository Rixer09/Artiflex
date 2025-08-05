
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Star } from 'lucide-react';
import { getProductById, getProducts, Product } from '@/lib/products';
import ProductActions from './product-actions'; // New client component for actions

export async function generateStaticParams() {
  const products = getProducts();
  return products.map((product) => ({
    id: product.id,
  }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto py-12">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Left Column: Image Gallery */}
        <div className="sticky top-24">
          <Carousel className="w-full">
            <CarouselContent>
              {[product.imageUrl, ...(product.images || [])].map((src, index) => (
                <CarouselItem key={index}>
                  <Card className="overflow-hidden">
                    <Image
                      src={src}
                      alt={`${product.brandName} view ${index + 1}`}
                      width={800}
                      height={800}
                      className="aspect-square object-cover"
                      data-ai-hint="product image"
                    />
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            { (product.images?.length || 0) > 0 &&
              <>
                <CarouselPrevious className="ml-16" />
                <CarouselNext className="mr-16" />
              </>
            }
          </Carousel>
        </div>

        {/* Right Column: Product Details */}
        <div>
          <h1 className="text-4xl lg:text-5xl font-headline text-primary mb-2">{product.brandName}</h1>
          <h2 className="text-xl text-muted-foreground mb-4">by A ✨GenAI✨ Creator</h2>
          
          <div className="flex items-center space-x-2 mb-6">
            <Star className="text-yellow-400 fill-yellow-400" />
            <Star className="text-yellow-400 fill-yellow-400" />
            <Star className="text-yellow-400 fill-yellow-400" />
            <Star className="text-yellow-400 fill-yellow-400" />
            <Star className="text-yellow-400" />
            <span className="text-sm text-muted-foreground">(128 reviews)</span>
          </div>

          <p className="font-body text-lg leading-relaxed mb-6">{product.storySnippet}</p>
          
          <div className="flex items-center justify-between mb-8">
            <p className="text-4xl font-bold font-headline">${product.price.toFixed(2)}</p>
            <ProductActions product={product} /> {/* Use the new client component */}
          </div>
          
          <Separator className="my-8" />

          {/* Creator Bio */}
          <div className="flex items-start space-x-4">
            <Avatar className="w-16 h-16 border-2 border-primary">
              <AvatarImage src={'https://firebasestorage.googleapis.com/v0/b/artiflex-37b58.appspot.com/o/alex-stellar.png?alt=media&token=16a342a3-5c73-41c6-991c-7a72ce243734'} alt={'Alex Stellar'} data-ai-hint="artist portrait"/>
              <AvatarFallback>AS</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold font-headline">About the Creator</h3>
              <p className="text-muted-foreground text-sm mb-2">{'Alex Stellar'}</p>
              <p className="font-body text-sm">{'Astronomer by day, artist by night. Alex translates the wonders of the universe into tangible art, believing that everyone should have a piece of the cosmos to call their own.'}</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
