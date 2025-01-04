export interface Product {
  id: string;
  name: string;
  sizes: string[];
  type: string;
  price: number;
  discount: number;
  newItem: boolean;
  frontImage: string;
}

export interface ProductFormData extends Product {
  isSubmitting?: boolean;
  error?: string;
}

export const PRODUCT_TYPES = [
  'Clothing',
  'Accessories',
  'Footwear',
  'Electronics',
  'Home & Living',
] as const;

// Generate size options from 12 to 21
export const SIZE_OPTIONS = Array.from(
  { length: 10 },
  (_, i) => (i + 12).toString()
) as const;