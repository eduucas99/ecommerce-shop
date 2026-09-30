import { Title } from "@/components";
import Link from "next/link";
import { ProductsInCart } from "./ui/ProductsInCart";

export default function CartPage() {

  // redirect('/empty');
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      
      <div className="flex flex-col w-250">
        <Title title="Carrito"/>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Agregas mas próductos</span>
            <Link href='/' className="underline mb-5 mt-1">
              Continúa comprando
            </Link>
          
            {/* Items */}
            <ProductsInCart />
          </div>
          {/* Checkout - Resumen de la compra */}
          <div className="ml-6 mt-10 bg-white rounded-xl shadow-xl p-7 h-fit">
            <h2 className="text-2xl mb-2">Resumen de compra</h2>
            
            <div className="grid grid-cols-2">
              <span>N° Productos</span>
              <span className="text-right">3 Artículos</span>
              
              <span>Subtotal</span>
              <span className="text-right">$ 100.000</span>
              
              <span>Impuestos (%15)</span>
              <span className="text-right">$ 18.000</span>
              
              <span className="text-2xl mt-5">Total</span>
              <span className="text-2xl mt-5 text-right">$ 118.000</span>
            </div>

            <div className="mt-5 mb-2 w-full">
              <Link
                className="flex btn-primary justify-center" 
                href="/checkout/address">
                Pagar Pedido
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}