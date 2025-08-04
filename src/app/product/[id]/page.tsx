import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Star, MessageCircle, Share2, Heart } from 'lucide-react';

const mockProduct = {
  id: '1',
  brandName: 'Cosmic Weavers',
  productName: 'Orion Nebula T-Shirt',
  price: 35.0,
  images: [
    'https://placehold.co/800x800',
    'https://placehold.co/800x800',
    'https://placehold.co/800x800',
    'https://placehold.co/800x800',
  ],
  description: "Crafted from the stardust of imagination, the Orion Nebula T-Shirt is more than just apparel; it's a wearable piece of the cosmos. Each shirt features a hyper-realistic print of the Orion Nebula, captured in breathtaking detail. The 100% organic cotton provides a soft, breathable fit, perfect for earthly adventures or cosmic voyages. With special glow-in-the-dark ink, the nebula comes alive at night, a secret wonder for you and those you let close. It's designed for the dreamers, the stargazers, and the pioneers of inner space.",
  creator: {
    name: 'Alex Stellar',
    bio: 'Astronomer by day, artist by night. Alex translates the wonders of the universe into tangible art, believing that everyone should have a piece of the cosmos to call their own.',
    avatarUrl: 'https://placehold.co/100x100',
  },
  originStory: "The idea for Cosmic Weavers was born during a late-night stargazing session. Overwhelmed by the beauty of the Orion Nebula through a telescope, I felt a deep urge to share that sense of awe. I wanted to create something that could carry that feeling into everyday life. After months of experimenting with printing techniques and sustainable fabrics, the Orion Nebula T-Shirt was born—the first in a series of wearable wonders.",
  emotionalTags: ['Awe-Inspiring', 'Creative', 'Unique', 'Handcrafted Feel'],
  visualStory: [
    {
      title: 'The Spark',
      text: 'A sketch in a notebook under a starry sky.',
      imageUrl: 'https://placehold.co/600x400',
      dataAiHint: 'sketchbook night',
    },
    {
      title: 'The Craft',
      text: 'Mixing eco-friendly, glow-in-the-dark inks.',
      imageUrl: 'https://placehold.co/600x400',
      dataAiHint: 'mixing paint',
    },
    {
      title: 'The Final Piece',
      text: 'The first shirt, glowing with cosmic energy.',
      imageUrl: 'https://placehold.co/600x400',
      dataAiHint: 'glowing t-shirt',
    },
  ],
};

type ProductPageParams = {
  params: {
    id: string;
  };
};

export default function ProductPage({ params }: ProductPageParams) {
  if (params.id !== mockProduct.id) {
    notFound();
  }

  const product = mockProduct;

  return (
    <div className="container mx-auto py-12">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Left Column: Image Gallery */}
        <div className="sticky top-24">
          <Carousel className="w-full">
            <CarouselContent>
              {product.images.map((src, index) => (
                <CarouselItem key={index}>
                  <Card className="overflow-hidden">
                    <Image
                      src={src}
                      alt={`${product.productName} view ${index + 1}`}
                      width={800}
                      height={800}
                      className="aspect-square object-cover"
                      data-ai-hint="galaxy t-shirt"
                    />
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="ml-16" />
            <CarouselNext className="mr-16" />
          </Carousel>
           <div className="text-center mt-2 text-sm text-muted-foreground">
            360° View Coming Soon
           </div>
        </div>

        {/* Right Column: Product Details */}
        <div>
          <h1 className="text-4xl lg:text-5xl font-headline text-primary mb-2">{product.productName}</h1>
          <h2 className="text-xl text-muted-foreground mb-4">by {product.brandName}</h2>
          
          <div className="flex items-center space-x-2 mb-6">
            <Star className="text-yellow-400 fill-yellow-400" />
            <Star className="text-yellow-400 fill-yellow-400" />
            <Star className="text-yellow-400 fill-yellow-400" />
            <Star className="text-yellow-400 fill-yellow-400" />
            <Star className="text-yellow-400" />
            <span className="text-sm text-muted-foreground">(128 reviews)</span>
          </div>

          <p className="font-body text-lg leading-relaxed mb-6">{product.description}</p>
          
          <div className="flex items-center justify-between mb-8">
            <p className="text-4xl font-bold font-headline">${product.price.toFixed(2)}</p>
            <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon"><Heart/></Button>
                <Button variant="outline" size="icon"><Share2/></Button>
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">Add to Cart</Button>
            </div>
          </div>
          
          <Separator className="my-8" />

          {/* Creator Bio */}
          <div className="flex items-start space-x-4">
            <Avatar className="w-16 h-16 border-2 border-primary">
              <AvatarImage src={product.creator.avatarUrl} alt={product.creator.name} data-ai-hint="artist portrait"/>
              <AvatarFallback>{product.creator.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold font-headline">About the Creator</h3>
              <p className="text-muted-foreground text-sm mb-2">{product.creator.name}</p>
              <p className="font-body text-sm">{product.creator.bio}</p>
            </div>
          </div>
          
        </div>
      </div>

      {/* Full-width sections */}
      <div className="mt-16">
        <Separator className="my-12"/>

        {/* Origin Story */}
        <section className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-headline text-primary mb-4">The Origin Story</h2>
            <p className="font-body text-lg leading-relaxed text-foreground/80">{product.originStory}</p>
            <div className="mt-6 flex justify-center flex-wrap gap-2">
                {product.emotionalTags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-sm px-3 py-1">{tag}</Badge>
                ))}
            </div>
        </section>

        <Separator className="my-12"/>

        {/* Visual Story */}
        <section>
            <h2 className="text-3xl font-headline text-center text-primary mb-8">A Visual Journey</h2>
            <div className="grid md:grid-cols-3 gap-8">
                {product.visualStory.map((item, index) => (
                    <Card key={index} className="overflow-hidden group">
                        <Image src={item.imageUrl} alt={item.title} width={600} height={400} className="w-full object-cover aspect-video transition-transform duration-300 group-hover:scale-105" data-ai-hint={item.dataAiHint}/>
                        <CardContent className="p-4">
                            <h3 className="font-headline text-lg">{item.title}</h3>
                            <p className="font-body text-sm text-muted-foreground">{item.text}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
      </div>
    </div>
  );
}
