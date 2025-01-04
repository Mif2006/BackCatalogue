"use client";

import { Product } from "@/lib/types";
import { ProductCard } from "@/components/product-card";

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <ProductCard key={product.id} index={index} product={product} />
      ))}
    </div>
  );
}