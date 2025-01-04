export interface Product {
  id: string;
  name: string;
  sizes: string[];
  type: string;
  price: number;
  discount: number;
  newItem: boolean;
  frontImage: string;
  index: number;
}

export interface ProductFormData extends Product {
  isSubmitting?: boolean;
  error?: string;
}

export const PRODUCT_TYPES = [
  'Rings',
  'Earrings',
  'Bracelets',
  'Pendants',
  'Falangue Rings',
  'Mens wear',
] as const;

// Generate size options from 12 to 21
export const SIZE_OPTIONS = Array.from(
  { length: 10 },
  (_, i) => (i + 12).toString()
) as const;