"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SizeInputProps {
  value: string[];
  onChange: (sizes: string[]) => void;
  className?: string;
}

export function SizeInput({ value, onChange, className }: SizeInputProps) {
  const [inputValue, setInputValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const validateSize = (size: string): boolean => {
    const num = parseInt(size);
    return !isNaN(num) && num >= 12 && num <= 21;
  };

  const addSize = (size: string) => {
    const trimmedSize = size.trim();
    if (validateSize(trimmedSize) && !value.includes(trimmedSize)) {
      onChange([...value, trimmedSize]);
    }
  };

  const removeSize = (sizeToRemove: string) => {
    onChange(value.filter(size => size !== sizeToRemove));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    // Check for delimiters (comma or space)
    if (newValue.endsWith(",") || newValue.endsWith(" ")) {
      const size = newValue.slice(0, -1);
      if (validateSize(size)) {
        addSize(size);
        setInputValue("");
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue) {
      e.preventDefault();
      if (validateSize(inputValue)) {
        addSize(inputValue);
        setInputValue("");
      }
    } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
      removeSize(value[value.length - 1]);
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-background">
        {value.map((size) => (
          <Badge key={size} variant="secondary" className="h-7">
            {size}
            <button
              type="button"
              className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              onClick={() => removeSize(size)}
            >
              <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
            </button>
          </Badge>
        ))}
        <Input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-7 min-w-[80px] bg-transparent"
          placeholder="Type a size (12-21)..."
        />
      </div>
      <p className="text-xs text-muted-foreground">
        Enter sizes between 12-21. Press space, comma, or enter to add.
      </p>
    </div>
  );
}