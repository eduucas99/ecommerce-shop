'use client';
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { CreateOrderData, CreateOrderActions, OnApproveData, OnApproveActions } from "@paypal/paypal-js"
import { setTransactionId, paypalCheckPayment } from "@/actions";

interface Props {
    orderId: string;
    amount: number;
}

export const PayPalButton = ({ orderId, amount }: Props) => {
    const [{ isPending }] = usePayPalScriptReducer();

    const rounderdAmount = ( Math.round(amount * 100) / 100 )

    if ( isPending ) {
        return (
        <div className="animate-pulse mb-11">
            <div className="h-11 rounded bg-gray-300" />
            <div className="h-11 rounded bg-gray-300 mt-3" />
        </div>
        );
    }

    const createOrder = async(data: CreateOrderData, actions: CreateOrderActions):Promise<string> =>{
        const transactionId = await actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [
                {
                    amount: {
                        currency_code: 'USD',
                        value: `${ rounderdAmount }`,
                    }
                }
            ]
        });

        const { ok } = await setTransactionId(orderId, transactionId);
        
        if ( !ok ){
            throw new Error("Error al actualizar la orden")
        }

        return transactionId
    }

    const onApprove = async(data: OnApproveData, actions: OnApproveActions) => {
        const details = await actions.order?.capture();

        if( !details ) return;

        await paypalCheckPayment( details?.id )
    }

    return(
        <>
            <PayPalButtons 
                createOrder={createOrder}
                onApprove={ onApprove }
            />;
        </>
    )
}
