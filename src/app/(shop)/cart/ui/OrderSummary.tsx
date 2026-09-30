"use client";
import { useCartStore } from "@/store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { currencyFormat } from '@/utils/currencyFormat';

export const OrderSummary = () => {

    const [loaded, setLoaded] = useState(false);
    const {subTotal, tax, total, itemsInCart } = useCartStore(useShallow(state => state.getSummaryInformation()));
    
    useEffect(() => {
        setLoaded(true)
    }, [])
    
    if( !loaded ) return <p>Loading...</p>;

  return (
    <div className="h-fit w-full self-start rounded-xl bg-white p-7 shadow-xl max-[961px]:col-span-full">
        <h2 className="text-2xl mb-2">Resumen de compra</h2>
        
        <div className="grid grid-cols-2">
            <span>N° Productos</span>
            <span className="text-right">{ itemsInCart === 1 ? '1 Artículo' : `${ itemsInCart } Artículos` }</span>
            
            <span>Subtotal</span>
            <span className="text-right">{ currencyFormat(subTotal) }</span>
            
            <span>Impuestos (%15)</span>
            <span className="text-right">{ currencyFormat(tax) }</span>
            
            <span>Envío</span>
            <span className="text-right">Gratis</span>
            
            <span className="text-2xl mt-5">Total</span>
            <span className="text-2xl mt-5 text-right">{ currencyFormat(total) }</span>
        </div>

        <div className="mt-5 mb-2 w-full">
            <Link
                className="flex btn-primary justify-center" 
                href="/checkout/address">
                Pagar Pedido
            </Link>
        </div>
    </div>
  )
}
