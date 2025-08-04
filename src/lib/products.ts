export type Product = {
    id: string;
    brandName: string;
    tagline: string;
    price: number;
    storySnippet: string;
    imageUrl: string;
    dataAiHint?: string;
    images?: string[];
    creatorId?: string;
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
      creatorId: 'creator-1',
      images: [
        'https://firebasestorage.googleapis.com/v0/b/artiflex-37b58.appspot.com/o/cosmic-weavers-2.png?alt=media&token=16a342a3-5c73-41c6-991c-7a72ce243734',
        'https://firebasestorage.googleapis.com/v0/b/artiflex-37b58.appspot.com/o/cosmic-weavers-3.png?alt=media&token=16a342a3-5c73-41c6-991c-7a72ce243734',
        'https://firebasestorage.googleapis.com/v0/b/artiflex-37b58.appspot.com/o/cosmic-weavers-4.png?alt=media&token=16a342a3-5c73-41c6-991c-7a72ce243734',
        'https://firebasestorage.googleapis.com/v0/b/artiflex-37b58.appspot.com/o/cosmic-weavers-5.png?alt=media&token=16a342a3-5c73-41c6-991c-7a72ce243734',
        'https://firebasestorage.googleapis.com/v0/b/artiflex-37b58.appspot.com/o/cosmic-weavers-6.png?alt=media&token=16a342a3-5c73-41c6-991c-7a72ce243734',
        'https://firebasestorage.googleapis.com/v0/b/artiflex-37b58.appspot.com/o/cosmic-weavers-7.png?alt=media&token=16a342a3-5c73-41c6-991c-7a72ce243734',
        'https://firebasestorage.googleapis.com/v0/b/artiflex-37b58.appspot.com/o/cosmic-weavers-8.png?alt=media&token=16a342a3-5c73-41c6-991c-7a72ce243734',
      ],
    },
    {
      id: '2',
      brandName: 'GeoMugs',
      tagline: 'Start your day with abstract beauty.',
      price: 18.5,
      storySnippet: 'Geometric patterns that channel the earth\'s raw energy...',
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/artiflex-37b58.appspot.com/o/geomugs.png?alt=media&token=98e9e627-9c98-4c4c-9f89-8d7d3153578c',
      dataAiHint: 'geometric mug',
      images: [
        'https://firebasestorage.googleapis.com/v0/b/artiflex-37b58.appspot.com/o/geomugs-2.png?alt=media&token=c6c4c520-2e4a-4a2e-b6c8-2b8b901a5e18',
        'https://firebasestorage.googleapis.com/v0/b/artiflex-37b58.appspot.com/o/geomugs-3.png?alt=media&token=3b3b4f3b-6e0e-4b4b-9e4e-0c1c6c5c1c8c',
      ]
    },
    {
      id: '3',
      brandName: 'Urban Canvas',
      tagline: 'Wear the street. Be the art.',
      price: 42.0,
      storySnippet: 'A tribute to the vibrant graffiti and street art of the city...',
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/artiflex-37b58.appspot.com/o/urban-canvas.png?alt=media&token=c1e1a5f4-3e9a-4122-83e9-f3b1b59a85c9',
      dataAiHint: 'graffiti hoodie',
       images: [
        'https://firebasestorage.googleapis.com/v0/b/artiflex-37b58.appspot.com/o/urban-canvas-2.png?alt=media&token=b4b2c1c0-2e5e-4b4b-8e1e-0c1c6c5c1c8c',
        'https://firebasestorage.googleapis.com/v0/b/artiflex-37b58.appspot.com/o/urban-canvas-3.png?alt=media&token=a5a1b0b9-3e8e-4a3a-9e3e-0c1c6c5c1c8c',
      ]
    },
    {
      id: '4',
      brandName: 'Flora & Fauna',
      tagline: 'Nature\'s elegance, redefined.',
      price: 29.99,
      storySnippet: 'Delicate illustrations of botanical wonders on sustainable fabric...',
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/artiflex-37b58.appspot.com/o/flora-fauna.png?alt=media&token=8e9b6e3c-2a62-4325-9b83-3c9704052309',
      dataAiHint: 'botanical print',
       images: [
        'https://firebasestorage.googleapis.com/v0/b/artiflex-37b58.appspot.com/o/flora-fauna-2.png?alt=media&token=d0d1e2e3-4f4f-4b4b-8e1e-0c1c6c5c1c8c',
        'https://firebasestorage.googleapis.com/v0/b/artiflex-37b58.appspot.com/o/flora-fauna-3.png?alt=media&token=e1e2f3f4-5g5g-4c4c-9f9f-0c1c6c5c1c8c',
      ]
    },
    {
      id: '5',
      brandName: 'Retro Future',
      tagline: 'The future as imagined yesterday.',
      price: 55.0,
      storySnippet: 'Synthwave aesthetics and nostalgic visions of a neon-drenched tomorrow...',
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/artiflex-37b58.appspot.com/o/retro-future.png?alt=media&token=3b8f6c1e-8e0a-4a2e-9c7a-2e6b21c43452',
      dataAiHint: 'retro computer',
      images: [
        'https://firebasestorage.googleapis.com/v0/b/artiflex-37b58.appspot.com/o/retro-future-2.png?alt=media&token=f0f1g2g3-6h6h-4d4d-8g8g-0c1c6c5c1c8c',
        'https://firebasestorage.googleapis.com/v0/b/artiflex-37b58.appspot.com/o/retro-future-3.png?alt=media&token=0g1h2i3j-7k7k-4e4e-9h9h-0c1c6c5c1c8c',
      ]
    },
    {
      id: '6',
      brandName: 'Minimalist Line',
      tagline: 'Simplicity is the ultimate sophistication.',
      price: 25.0,
      storySnippet: 'One line, one story. A collection that speaks volumes with less...',
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/artiflex-37b58.appspot.com/o/minimalist-line.png?alt=media&token=42d1f0d3-3c2b-4a7e-8c6e-8e5f5f4b3a21',
      dataAiHint: 'minimalist art',
      images: [
        'https://firebasestorage.googleapis.com/v0/b/artiflex-37b58.appspot.com/o/minimalist-line-2.png?alt=media&token=j0k1l2m3-8n8n-4f4f-8j8j-0c1c6c5c1c8c',
        'https://firebasestorage.googleapis.com/v0/b/artiflex-37b58.appspot.com/o/minimalist-line-3.png?alt=media&token=k1l2m3n4-9o9o-4g4g-9k9k-0c1c6c5c1c8c',
      ]
    },
  ];

  export const getProducts = () => products;
  
  export const getProductById = (id: string): Product | undefined => {
    return products.find(p => p.id === id);
  };

  export const addProduct = (product: Omit<Product, 'id' | 'creatorId'>) => {
    const newProduct: Product = {
        ...product,
        id: (products.length + 1).toString(),
        creatorId: 'creator-1', // Associate with the current creator
        dataAiHint: product.brandName.toLowerCase().split(' ').slice(0,2).join(' '),
    };
    products.unshift(newProduct);
    return newProduct;
  }
  
  export const updateProduct = (id: string, updatedProduct: Product) => {
    const productIndex = products.findIndex(p => p.id === id);
    if (productIndex > -1) {
      products[productIndex] = updatedProduct;
    }
  };
