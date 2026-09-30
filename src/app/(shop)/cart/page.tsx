import { Title } from "@/components";
import Link from "next/link";
import { ProductsInCart } from "./ui/ProductsInCart";
import { OrderSummary } from "./ui/OrderSummary";

export default function CartPage() {
  return (
    <div className="sm:ml-0 flex justify-center items-center mb-72 px-0">
      <div className="flex flex-col w-250">
        <Title title="Tu carrito"/>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Agregar mas próductos</span>
            <Link href='/' className="underline mb-5 mt-1">
              Continúa comprando
            </Link>
          
            {/* Items */}
            <ProductsInCart />
          </div>
         
          {/* Checkout - Resumen de la compra */}
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}