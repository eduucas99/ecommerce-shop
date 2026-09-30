'use client';
import { useState } from "react";
import { SizeSelector, QuantitySelector } from "@/components"
import { CartProduct, Product, Size } from "@/interfaces"
import { useCartStore } from "@/store";

interface Props {
    product: Product;
}

export const AddToCart = ({product}: Props) => {
    const addProductToCart = useCartStore( state => state.addProductToCart );
    const [size, setSize] = useState<Size|undefined>();
    const [quantity, setQuantity] = useState<number>(1);
    const [posted, setPosted] = useState<boolean>(false);

    const addToCart = () => {
        setPosted(true)
        if (!size) return;
        
        const cartProduct: CartProduct = {
            id: product.id,
            slug: product.slug,
            title: product.title,
            price: product.price,
            quantity: quantity,
            size: size,
            image: product.images[0]
        }

        addProductToCart(cartProduct);

        setPosted(false);
        setQuantity(1);
        setSize(undefined);
    }

    return (
        <>
            {
                posted && !size && (
                    <span className="mt-2 text-red-600 font-semibold fade-in">Debe seleccionar una talla</span>
                )
            }

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
