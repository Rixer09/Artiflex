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
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/artiflex-37b58.appspot.com/o/cosmic-weavers.png?alt=media&token=16a342a3-5c73-41c6-991c-7a72ce243734',
      dataAiHint: 'galaxy t-shirt',
    },
    {
      id: '2',
      brandName: 'GeoMugs',
      tagline: 'Start your day with abstract beauty.',
      price: 18.5,
      storySnippet: 'Geometric patterns that channel the earth\'s raw energy...',
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/artiflex-37b58.appspot.com/o/geomugs.png?alt=media&token=98e9e627-9c98-4c4c-9f89-8d7d3153578c',
      dataAiHint: 'geometric mug',
    },
    {
      id: '3',
      brandName: 'Urban Canvas',
      tagline: 'Wear the street. Be the art.',
      price: 42.0,
      storySnippet: 'A tribute to the vibrant graffiti and street art of the city...',
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/artiflex-37b58.appspot.com/o/urban-canvas.png?alt=media&token=c1e1a5f4-3e9a-4122-83e9-f3b1b59a85c9',
      dataAiHint: 'graffiti hoodie',
    },
    {
      id: '4',
      brandName: 'Flora & Fauna',
      tagline: 'Nature\'s elegance, redefined.',
      price: 29.99,
      storySnippet: 'Delicate illustrations of botanical wonders on sustainable fabric...',
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/artiflex-37b58.appspot.com/o/flora-fauna.png?alt=media&token=8e9b6e3c-2a62-4325-9b83-3c9704052309',
      dataAiHint: 'botanical print',
    },
    {
      id: '5',
      brandName: 'Retro Future',
      tagline: 'The future as imagined yesterday.',
      price: 55.0,
      storySnippet: 'Synthwave aesthetics and nostalgic visions of a neon-drenched tomorrow...',
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/artiflex-37b58.appspot.com/o/retro-future.png?alt=media&token=3b8f6c1e-8e0a-4a2e-9c7a-2e6b21c43452',
      dataAiHint: 'retro computer',
    },
    {
      id: '6',
      brandName: 'Minimalist Line',
      tagline: 'Simplicity is the ultimate sophistication.',
      price: 25.0,
      storySnippet: 'One line, one story. A collection that speaks volumes with less...',
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/artiflex-37b58.appspot.com/o/minimalist-line.png?alt=media&token=42d1f0d3-3c2b-4a7e-8c6e-8e5f5f4b3a21',
      dataAiHint: 'minimalist art',
    },
  ];

  export const getProducts = () => products;

  export const addProduct = (product: Omit<Product, 'id'>) => {
    products.unshift({
        ...product,
        id: (products.length + 1).toString(),
        dataAiHint: product.brandName.toLowerCase().split(' ').slice(0,2).join(' '),
    });
  }
  