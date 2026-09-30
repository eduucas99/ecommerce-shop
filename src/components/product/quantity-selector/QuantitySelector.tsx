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
    <div className="my-6 flex items-center justify-between">
        <span className="text-sm font-medium">Cantidad</span>
        <div className="flex">
            <button onClick={()=>onValueChange(-1)} className="cursor-pointer">
                <IoRemoveCircleOutline />
            </button>
            <span className="w-20 mx-3 px-5 bg-gray-200 text-center rounded"> 
                {quantity} 
            </span>
            <button onClick={()=>onValueChange(+1)} className="cursor-pointer">
                <IoAddCircleOutline />
            </button>
        </div>
    </div>
  )
}
