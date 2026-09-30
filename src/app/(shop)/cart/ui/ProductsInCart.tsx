'use client';

import { useCartStore } from "@/store";
import { QuantitySelector } from "@/components";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoTrashOutline } from "react-icons/io5";


export const ProductsInCart = () => {
    const updateProductQuantity = useCartStore( state => state.updateProductQuantity );
    const [loaded, setLoaded] = useState(false);
    const productsInCart = useCartStore( state => state.cart );

    useEffect(() => {
        setLoaded(true);
    }, []);

    if(!loaded){
        return <p>Loading...</p>;
    }
    

  return (
        <>
            {
              productsInCart.map(product => (
                <div key={`${product.slug} - ${ product.size }`} className="flex mb-5">
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
                    <Link
                        className="hover:underline cursor-pointer" 
                        href={`/product/${product.slug}`}>
                        <p>{product.title}</p>
                    </Link>
                    <p className="mt-1">Talla:  
                        <span className="font-bold ml-2">
                            {product.size}
                        </span>
                    </p>
                    <p className="mt-1">$ 
                        <span className="font-bold ml-2">
                            {product.price.toFixed(2)}
                        </span>
                    </p>
                    <div className="flex gap-2">
                        <QuantitySelector quantity={product.quantity} onQuantityChanged={ quantity => updateProductQuantity(product, quantity) }/>
                        
                        <button className="hover:bg-red-200 rounded-md cursor-pointer px-2">
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
