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
  
  // This is the main array that holds all your product data.
  // To add more images to a product, find the product object by its 'id' or 'brandName'.
  // Inside that product object, you will see an 'images' array.
  // Simply add the new image URL as a string to this 'images' array.

  // HOW TO USE LOCAL IMAGES:
  // 1. Place your image files in the `public/images` directory.
  // 2. In this file, reference them with a path starting with `/images/`.
  //    For example, if you have `public/images/my-mug.png`, you would use the path '/images/my-mug.png'.

  let products: Product[] = [
    {
      id: 'cosmic-weavers-t-shirt',
      brandName: 'Cosmic Weavers',
      tagline: 'Threads of the universe, woven for you.',
      price: 29.99,
      storySnippet: 'A unique t-shirt inspired by the vastness of space and the intricate patterns of the cosmos. Made with 100% organic cotton for ultimate comfort and durability.',
      imageUrl: '/images/T-shirt1.webp',
      images: ['/images/T-shirt2.webp', '/images/cfimages.avif', '/images/cfimages (1).avif', '/images/cfimages (2).avif', '/images/cfimages (3).avif'],
      dataAiHint: 'cosmic weavers',
      creatorId: 'creator-1',
    },
    {
      id: 'galaxy-hoodie',
      brandName: 'Galaxy Gear',
      tagline: 'Wear the stars.',
      price: 59.99,
      storySnippet: 'Stay warm and stylish with this premium hoodie featuring a stunning galaxy print. Perfect for stargazers and sci-fi enthusiasts.',
      imageUrl: '/images/T-shirt2.webp',
      images: [ '/images/cfimages.avif', '/images/cfimages (1).avif', '/images/cfimages (2).avif', '/images/cfimages (3).avif'],
      dataAiHint: 'galaxy gear',
      creatorId: 'creator-1',
    },
    {
      id: 'nebula-mug',
      brandName: 'Stellar Sips',
      tagline: 'Your daily dose of cosmic inspiration.',
      price: 14.99,
      storySnippet: 'Enjoy your favorite beverage in this ceramic mug adorned with a vibrant nebula design. A perfect gift for astronomy lovers.',
      imageUrl: '/images/sage-greene.webp',
      images: ['/images/cfimages.avif', '/images/cfimages (1).avif', '/images/cfimages (2).avif', '/images/cfimages (3).avif'],
      dataAiHint: 'stellar sips',
      creatorId: 'creator-1',
    },
  ];

  const NEWLY_LAUNCHED_KEY = 'newlyLaunchedProductIds';

  // These functions now interact with localStorage if it's available.
  export const getNewlyLaunchedProductIds = (): string[] => {
    if (typeof window === 'undefined') return [];
    const storedIds = localStorage.getItem(NEWLY_LAUNCHED_KEY);
    return storedIds ? JSON.parse(storedIds) : [];
  };

  export const addNewlyLaunchedProductId = (id: string) => {
    if (typeof window === 'undefined') return;
    const currentIds = getNewlyLaunchedProductIds();
    const updatedIds = [id, ...currentIds];
    localStorage.setItem(NEWLY_LAUNCHED_KEY, JSON.stringify(updatedIds));
  };

  export const clearNewlyLaunchedProductIds = () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(NEWLY_LAUNCHED_KEY);
  }
  
  export const getProducts = () => products;

  export const getProductById = (id: string): Product | undefined => {
    return products.find(p => p.id === id);
  };

  export const addProduct = (product: Omit<Product, 'id'>) => {
    const slug = product.brandName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    let newId = slug;
    let counter = 1;
    // Ensure the ID is unique
    while (getProductById(newId)) {
      newId = `${slug}-${counter}`;
      counter++;
    }

    const newProduct: Product = {
        ...product,
        id: newId,
        creatorId: 'creator-1', // Associate with the current creator
        dataAiHint: product.brandName.toLowerCase().split(' ').slice(0,2).join(' '),
    };
    // The product is added to the main list directly.
    products.unshift(newProduct);
    return newProduct;
  }
  
  export const updateProduct = (id: string, updatedProduct: Product) => {
    const productIndex = products.findIndex(p => p.id === id);
    if (productIndex > -1) {
      products[productIndex] = updatedProduct;
    }
  };
