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
    // All default products have been removed.
    // You can start creating new products through the app.
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
