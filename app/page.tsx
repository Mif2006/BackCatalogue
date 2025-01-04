"use client";

import { useEffect, useState } from "react";
import { Product } from "@/lib/types";
import { ProductList } from "@/components/product-list";
import { PageHeader } from "@/components/page-header";
import { LoadingSpinner } from "@/components/loading-spinner";
import { ErrorDisplay } from "@/components/error-display";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbxrwN7i9ppq1ZTwXvc-Fi24O7OuCB9q3-CVsWJOBmhkuMpih7hQJkVZ69j71uD1R1vaaQ/exec"
        );
        if (!response.ok) throw new Error("Failed to fetch products");
        const result = await response.json();
        setProducts(result.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    return <ErrorDisplay message={error} />;
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <PageHeader />
        {loading ? <LoadingSpinner /> : <ProductList products={products} />}
      </div>
    </main>
  );
}