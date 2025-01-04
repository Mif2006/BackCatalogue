"use client";

import { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { SizeInput } from "@/components/ui/size-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Product, PRODUCT_TYPES } from "@/lib/types";
import { parseSizes } from "@/lib/utils/size-parser";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [formData, setFormData] = useState<Product>({
    ...product,
    sizes: parseSizes(product.sizes),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch(
        "https://hook.eu2.make.com/cddwc1ld8x77a9j46cbnqfx21r2ogqkm",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error("Failed to submit product");
      toast.success("Product updated successfully!");
    } catch (error) {
      toast.error("Failed to update product");
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  return (
    <Card className="p-6 space-y-4">
      <div className="aspect-square relative overflow-hidden rounded-lg mb-4">
        <img
          src={formData.frontImage || "https://via.placeholder.com/400"}
          alt={formData.name}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor={`name-${formData.id}`}>Name</Label>
          <Input
            id={`name-${formData.id}`}
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`type-${formData.id}`}>Type</Label>
          <Select
            value={formData.type}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, type: value }))
            }
          >
            <SelectTrigger id={`type-${formData.id}`}>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {PRODUCT_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Sizes (12-21)</Label>
          <SizeInput
            value={formData.sizes}
            onChange={(sizes) => setFormData((prev) => ({ ...prev, sizes }))}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor={`price-${formData.id}`}>Price</Label>
            <Input
              id={`price-${formData.id}`}
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  price: parseFloat(e.target.value) || 0,
                }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`discount-${formData.id}`}>Discount</Label>
            <Input
              id={`discount-${formData.id}`}
              type="number"
              value={formData.discount}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  discount: parseFloat(e.target.value) || 0,
                }))
              }
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id={`newItem-${formData.id}`}
            checked={formData.newItem}
            onCheckedChange={(checked) =>
              setFormData((prev) => ({ ...prev, newItem: checked }))
            }
          />
          <Label htmlFor={`newItem-${formData.id}`}>New Item</Label>
        </div>

        <div className="space-y-2">
          <Label htmlFor={`frontImage-${formData.id}`}>Image URL</Label>
          <Input
            id={`frontImage-${formData.id}`}
            value={formData.frontImage}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, frontImage: e.target.value }))
            }
          />
        </div>

        <Button
          className="w-full"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Updating..." : "Update Product"}
        </Button>
      </div>
    </Card>
  );
}