export type Product = {
    id: string;
    brandName: string;
    tagline: string;
    price: number;
    storySnippet: string;
    imageUrl: string;
    dataAiHint?: string;
  };
  
  let products: Product[] = [
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

  export const getProducts = () => products;

  export const addProduct = (product: Product) => {
    products.unshift(product);
  }
  