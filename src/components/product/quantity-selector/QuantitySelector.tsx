'use client';
import { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
    quantity: number;
    onQuantityChanged: ( value: number ) => void;
}

export const QuantitySelector = ({quantity, onQuantityChanged}: Props) => {

    const onValueChange = (value: number) =>{
        if (quantity + value < 1) return; 
        
        onQuantityChanged(quantity + value);
    }

  return (
    <div className="my-2 flex items-center justify-between gap-2">
        <span className="text-sm font-medium">Cantidad</span>
        <div className="flex bg-gray-300 rounded">
            <button onClick={()=>onValueChange(-1)} className="cursor-pointer">
                <IoRemoveCircleOutline size={20} />
            </button>
            <span className="w-10 mx-3 px-3 text-center font-semibold"> 
                {quantity} 
            </span>
            <button onClick={()=>onValueChange(+1)} className="cursor-pointer">
                <IoAddCircleOutline size={20} />
            </button>
        </div>
    </div>
  )
}
