'use client';

import { useState } from "react";
import type {Size} from "@/interfaces";
import clsx from "clsx";

interface Props {
  selectedSize?: Size;
  availableSizes: readonly Size[];

  onSizeChanged: ( size: Size ) => void;
}

export const SizeSelector = ({selectedSize, availableSizes, onSizeChanged}: Props) => {

  return (
    <div className="my-6">
      <h3 className="mb-3 text-sm font-semibold">Tallas</h3>
      <div className="flex flex-wrap gap-2">
        {
          availableSizes.map( size => (
            <button
              key={size}
              onClick={ () => onSizeChanged(size)} 
              type="button"
              aria-pressed={size === selectedSize}
              className={clsx(
                "h-11 min-w-12 cursor-pointer rounded-sm border px-4 text-sm font-medium transition-colors hover:border-blue-600",
                {
                  'border-black bg-blue-600 text-white': size === selectedSize,
                  'border-neutral-300 bg-white text-black': size !== selectedSize
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
