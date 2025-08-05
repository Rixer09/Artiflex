import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

type ProductCardProps = {
  id: string;
  brandName: string;
  tagline: string;
  price: number;
  storySnippet: string;
  imageUrl: string;
  dataAiHint?: string;
};

export default function ProductCard({
  id,
  brandName,
  tagline,
  price,
  storySnippet,
  imageUrl,
  dataAiHint,
}: ProductCardProps) {
  return (
    <Link href={`/product/${id}`} className="group block">
      <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-2">
        <CardHeader className="p-0">
          <div className="aspect-square overflow-hidden">
            <Image
              src={imageUrl}
              alt={brandName}
              width={600}
              height={600}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={dataAiHint}
             />
          </div>
        </CardHeader>
        <CardContent className="p-6 flex-grow">
          <h3 className="text-2xl font-headline text-primary">{brandName}</h3>
          <p className="text-sm text-muted-foreground mb-2 italic">{tagline}</p>
          <p className="text-foreground/80 font-body">{storySnippet}</p>
        </CardContent>
        <CardFooter className="p-6 pt-0 flex justify-between items-center">
          <p className="text-xl font-bold font-headline">${price.toFixed(2)}</p>
          <Button variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
            View
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
