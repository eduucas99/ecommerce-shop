'use client';

import { useEffect, useState } from "react";
import { useAddressStore } from "@/store";
import { useCartStore } from "@/store";
import { useShallow } from "zustand/react/shallow";
import { LoadingOverlay } from "@/components";
import { currencyFormat, sleep } from "@/utils";
import { placeOrder, getCountries } from '@/actions';
import type { Country } from '@/interfaces';
import clsx from "clsx";

export const PlaceOrder = () => {

    const [loaded, setLoaded] = useState(false);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const {subTotal, tax, total, itemsInCart } = useCartStore(useShallow(state => state.getSummaryInformation()));
    const [countries, setCountries] = useState<Country[]>([]);

    const address = useAddressStore( state => state.address );
    const cart = useCartStore( state => state.cart );

    useEffect(() => {
        const loadCountries = async () => {
            setLoaded(true);
            setCountries(await getCountries());
        };

        void loadCountries();
    }, []);

    const onPlaceOrder = async() => {
        setIsPlacingOrder(true);
        // await sleep(2);

        const productsToOrder = cart.map( p => ({
            productId: p.id,
            quantity: p.quantity,
            size: p.size,
        }))

        const resp = await placeOrder(productsToOrder, address);
        console.log("resp: ",resp)
        setIsPlacingOrder(false);
    }
    
    const countryName =
        countries.find(country => country.id === address.country)?.name
        ?? address.country;

    if (!loaded) return <LoadingOverlay />

  return (
    <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl font-bold mb-2">Dirección de entrega</h2>
            <div className="mb-10">
              <p className="text-xl">{address.firstName} {address.lastName}</p>
              <p>{address.address}</p>
              <p>{address.city}</p> 
              {/* //Todo provincia en un futuro */}
              <p>{address.city}, {countryName}</p>
              <p>CP: {address.postalCode}</p>
            </div>

            {/* Divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-5" />
            <h2 className="text-2xl mb-2">Resumen de orden</h2>
            
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
                <p className="mb-5">
                    {/* Disclaimer */}
                    <span className="text-xs">
                    Al hacer clic en "Colocar orden", aceptas nuestros <a href="#" className="underline">términos y condiciones</a> y <a href="#" className="underline">política de privacidad.</a>
                    </span>
                </p>
              {/* <p className="text-red-500">Error de creación</p> */}
                <button
                    onClick={onPlaceOrder}
                    className={
                        clsx({
                                'btn-primary': !isPlacingOrder,
                                'btn-disabled': isPlacingOrder
                            }
                        )
                    }
                    // href="/orders/123"
                >
                    Colocar Orden
                </button>
            </div>
          </div>
  )
}
