import Link from "next/link";
import Image from "next/image";
import { currencyFormat } from '../../../../utils/currencyFormat';
import { getOrderById } from "@/actions";
import { redirect } from "next/navigation";
import { PayPalButton, Title, OrderStatus } from "@/components";

interface Props {
  params:{
    id: string;
  }
}

export default async function OrdersByIdPage({params}: Props) {
  const {id} = await params;
  const {ok, order} = await getOrderById(id);

  if( !ok ){
    redirect('/');
  }

  const orderAddress = order?.OrderAddress;
  const orderItem = order?.OrderItem;

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-250">
        <Title title={`Orden #${id.split('-').at(-1)}`}/>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <OrderStatus isPaid={ order?.isPaid ?? false } />
            {/* Items */}
            {
              orderItem?.map( order => (
                <div key={order?.product?.slug + "-"+ order?.size} className="flex mb-5">
                  <Image
                    src={`/products/${order?.product?.ProductImage[0].url}`}
                    width={100}
                    height={100}
                    style={{
                      width: '100px',
                      height: '110px',
                    }}
                    alt={order?.product?.title ?? ""}
                    className="mr-5 rounded"
                  />
                  <div className="mt-4">
                    <Link className="font-medium hover:cursor-pointer hover:underline" href={`/product/${order?.product?.slug}` }>{ order?.product?.title }</Link>
                    <p>{ currencyFormat(order?.product?.price ?? 0) } x { order?.quantity }</p>
                    <p className="font-bold">Subtotal: { currencyFormat(Number((order?.product?.price ?? 0) * order?.quantity)) }</p>
                  </div>
                </div>
              ))
            }
          </div>

          {/* Checkout - Resumen de la compra */}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl font-bold mb-2">Dirección de entrega</h2>
            <div className="mb-10">
              <p className="text-xl">{ orderAddress?.firstName } { orderAddress?.lastName }</p>
              <p>{ orderAddress?.address }</p>
              <p>{ orderAddress?.city }</p>
              <p>{ orderAddress?.city } { orderAddress?.countryId }</p>
              <p>CP: { orderAddress?.postalCode }</p>
            </div>

            {/* Divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-5" />
            <h2 className="text-2xl mb-2">Resumen de compra</h2>
            
            <div className="grid grid-cols-2">
              <span>N° Productos</span>
              <span className="text-right">{ order?.itemsInOrder } Artículos</span>
              
              <span>Subtotal</span>
              <span className="text-right">{ currencyFormat(Number(order?.subTotal)) }</span>
              
              <span>Impuestos (%15)</span>
              <span className="text-right">{ currencyFormat(Number(order?.tax)) }</span>
              
              <span className="text-2xl mt-5">Total</span>
              <span className="text-2xl mt-5 text-right">{ currencyFormat(Number(order?.total)) }</span>
            </div>

            <div className="mt-5 mb-2 w-full">
              {
                order?.isPaid
                ? (
                  <OrderStatus isPaid={order?.isPaid ?? false} />
                ) : 
                (
                  <PayPalButton 
                    orderId={ order!.id }
                    amount={ order!.total }
                  />
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}