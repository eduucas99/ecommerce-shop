'use client';
import { useEffect, useState } from "react";

import { titleFont } from "@/config/fonts"
import { getStockBySlug } from "@/actions";
interface Props {
    slug: string;
}
export const StockLabel = ({slug}: Props) => {
    const [stock, setStock] = useState(0);
    const [loading, setIsLoading] = useState(true);

    useEffect(() => {
        getStock(slug);
    }, [])
    
    const getStock = async(slug: string) => {
        const inStock = await getStockBySlug(slug);
        setStock(inStock);
    }

    return (
        <h1 className={`${titleFont.className} antialiased font-bold text-lg`}> 
            Stock: { stock }
        </h1>
    )
}
