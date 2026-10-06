'use client';

import { useCartStore } from "@/store";
import { useEffect, useState } from "react";
import Image from "next/image";
import { currencyFormat } from '@/utils/currencyFormat';
import { redirect } from "next/navigation";
import { LoadingOverlay } from "@/components";


export const ProductsInCart = () => {
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
                        <Image
                            src={`/products/${product.image}`}
                            width={100}
                            height={100}
                            style={{
                            width: '100px',
                            height: '110px',
                            }}
                            alt={product.title}
                            className="mr-5 rounded"
                        />
                        <div>
                            <span>
                                <p>{product.title}</p>
                            </span>
                            <p className="mt-1">Talle:
                                <span className="font-bold text-gray-700 ml-1">
                                    {product.size} - {product.quantity}
                                </span>
                            </p>
                            <p className="mt-1">
                                <span className="font-bold">
                                    {currencyFormat(product.price * product.quantity)}
                                </span>
                            </p>
                        </div>
                    </div>
                ))
            }
        </>
    )
}
