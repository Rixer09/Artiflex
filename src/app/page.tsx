import ProductCard from '@/components/product-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const products = [
  {
    id: '1',
    brandName: 'Cosmic Weavers',
    tagline: 'Threads of the universe, woven for you.',
    price: 35.0,
    storySnippet: 'Inspired by distant galaxies, each shirt is a map of the cosmos...',
    imageUrl: 'https://placehold.co/600x600',
    dataAiHint: 'galaxy t-shirt',
  },
  {
    id: '2',
    brandName: 'GeoMugs',
    tagline: 'Start your day with abstract beauty.',
    price: 18.5,
    storySnippet: 'Geometric patterns that channel the earth\'s raw energy...',
    imageUrl: 'https://placehold.co/600x600',
    dataAiHint: 'geometric mug',
  },
  {
    id: '3',
    brandName: 'Urban Canvas',
    tagline: 'Wear the street. Be the art.',
    price: 42.0,
    storySnippet: 'A tribute to the vibrant graffiti and street art of the city...',
    imageUrl: 'https://placehold.co/600x600',
    dataAiHint: 'graffiti hoodie',
  },
  {
    id: '4',
    brandName: 'Flora & Fauna',
    tagline: 'Nature\'s elegance, redefined.',
    price: 29.99,
    storySnippet: 'Delicate illustrations of botanical wonders on sustainable fabric...',
    imageUrl: 'https://placehold.co/600x600',
    dataAiHint: 'botanical print',
  },
  {
    id: '5',
    brandName: 'Retro Future',
    tagline: 'The future as imagined yesterday.',
    price: 55.0,
    storySnippet: 'Synthwave aesthetics and nostalgic visions of a neon-drenched tomorrow...',
    imageUrl: 'https://placehold.co/600x600',
    dataAiHint: 'retro computer',
  },
  {
    id: '6',
    brandName: 'Minimalist Line',
    tagline: 'Simplicity is the ultimate sophistication.',
    price: 25.0,
    storySnippet: 'One line, one story. A collection that speaks volumes with less...',
    imageUrl: 'https://placehold.co/600x600',
    dataAiHint: 'minimalist art',
  },
];

export default function Home() {
  return (
    <div className="container py-8 md:py-12">
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

      <section className="text-center mt-16">
          <h2 className="text-3xl font-headline mb-4">Have an Idea?</h2>
          <p className="max-w-xl mx-auto text-foreground/80 mb-6">
              Bring your vision to life. Use our AI-powered tools to create and sell your own unique products.
          </p>
          <Link href="/create">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Start Your Creative Journey
              </Button>
          </Link>
      </section>
    </div>
  );
}
