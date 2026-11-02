'use client';

import { useCartStore } from "@/store";
import { LoadingOverlay, QuantitySelector } from "@/components";
import { useEffect, useState } from "react";
import Link from "next/link";
import { IoTrashOutline } from "react-icons/io5";
import { currencyFormat } from '@/utils/currencyFormat';
import { redirect } from "next/navigation";
import { ProductImage } from "@/components";

export const ProductsInCart = () => {
    const updateProductQuantity = useCartStore( state => state.updateProductQuantity );
    const removeProduct = useCartStore( state => state.removeProduct );
    const [loaded, setLoaded] = useState(false);
    const productsInCart = useCartStore( state => state.cart );
    
    useEffect(() => {
        setLoaded(true);
    }, []);
    
    if(!loaded){
        return <LoadingOverlay />
    }

    if (productsInCart.length === 0){
        redirect("/empty");
    }

    return (
        <>
            {
                productsInCart.map(product => (
                    <div key={`${product.slug} - ${ product.size }`} className="mb-5 flex max-[961px]:items-center max-[961px]:justify-center">
                        <ProductImage
                            src={product.image}
                            alt={product.title} 
                            width={100}
                            height={100}
                            style={{
                            width: '100px',
                            height: '110px',
                            }}
                            className="mr-5 rounded"
                        />
                        <div>
                            <Link
                                className="font-semibold text-gray-900 hover:underline cursor-pointer" 
                                href={`/product/${product.slug}`}>
                                <p>{product.title}</p>
                            </Link>
                            <p className="mt-1">Talle:
                                <span className="font-bold text-gray-700 ml-1">
                                    {product.size}
                                </span>
                            </p>
                            <p className="mt-1">
                                <span className="font-bold">
                                    {currencyFormat(product.price)}
                                </span>
                            </p>
                            <div className="flex gap-2">
                                <QuantitySelector quantity={product.quantity} onQuantityChanged={ quantity => updateProductQuantity(product, quantity) }/>
                                
                                <button 
                                    onClick={() => removeProduct(product)}
                                    className="hover:bg-red-200 rounded-md cursor-pointer px-2">
                                    <IoTrashOutline size={20}/>
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    )
}
