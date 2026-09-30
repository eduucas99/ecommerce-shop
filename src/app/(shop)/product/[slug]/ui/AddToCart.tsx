'use client';
import { useState } from "react";
import { SizeSelector, QuantitySelector } from "@/components"
import { Product, Size } from "@/interfaces"

interface Props {
    product: Product;
}

export const AddToCart = ({product}: Props) => {

    const [size, setSize] = useState<Size|undefined>();
    const [quantity, setQuantity] = useState<number>(1);

    const addToCart = () => {
        if (!size) return;
    }

    return (
        <>
            {/* selector de Tallas */}
            <SizeSelector
                selectedSize={size} 
                availableSizes={product.sizes} 
                onSizeChanged={ setSize }
            />
            {/* Selector de Cantidad */}
            
            <QuantitySelector quantity={quantity} onQuantityChanged={setQuantity} />
            
            {/* Button */}
            <button 
                onClick={addToCart}
                className="my-2 w-full cursor-pointer rounded-sm bg-blue-800 px-4 py-3 text-white transition-colors hover:bg-neutral-800">
                Agregar al carrito
            </button>
        </>
    )
}
