'use client';

import { useState } from "react";
import type {Size} from "@/interfaces";
import clsx from "clsx";

interface Props {
  selectedSize: Size;
  availableSizes: readonly Size[];
}

export const SizeSelector = ({selectedSize, availableSizes}: Props) => {
  const [activeSize, setActiveSize] = useState(selectedSize);

  return (
    <div className="my-6">
      <h3 className="mb-3 text-sm font-semibold">Tallas</h3>
      <div className="flex flex-wrap gap-2">
        {
          availableSizes.map( size => (
            <button
              key={size} 
              type="button"
              aria-pressed={size === activeSize}
              onClick={() => setActiveSize(size)}
              className={clsx(
                "h-11 min-w-12 cursor-pointer rounded-sm border px-4 text-sm font-medium transition-colors hover:border-blue-600",
                {
                  'border-black bg-blue-600 text-white': size === activeSize,
                  'border-neutral-300 bg-white text-black': size !== activeSize
                }
              )}>
              {size}
            </button>
          ))
        }
      </div>
    </div>
  )
}
