export const revalidate = 604800; // 7 días

import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from "next/navigation";
import { titleFont } from "@/config/fonts";
import { ProductSlideShow, QuantitySelector, SizeSelector } from "@/components/index"
import { ProductMobileSlideShow } from "@/components/product/slideshow/ProductMobileSlideShow";
import { getProductBySlug } from "@/actions";
import { StockLabel } from '@/components/product/stock-label/StockLabel';

interface Props {
  params: {
    slug: string;
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).slug
 
  const product = await getProductBySlug(slug);
 
  return {
    title: product?.title ?? 'Producto no encontrado',
    description: product?.description ?? '',
    openGraph:{
      title: product?.title ?? 'Producto no encontrado',
      description: product?.description ?? '',
      // images:[] // https://misitioweb.com/products/image.png
      images:[`/products/${ product?.images[1] }`]
    }
  }
}
 
export default async function ProductPage({params}: Props) {
  const { slug } = await params;
  
  const product = await getProductBySlug(slug);

  if(!product){
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      <div className="col-span-1 md:col-span-2">
        {/* Mobile Slideshow */}
        <ProductMobileSlideShow 
          title={product.title}
          images={product.images}
          className="block md:hidden"
        />

      {/* Desktop Slideshow */}
        <ProductSlideShow 
          title={product.title}
          images={product.images}
          className="hidden md:block"
        />
      </div>
      {/* Detalles */}
      <div className="col-span-1 px-5">
        <StockLabel slug={product.slug} />
        
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}> 
          { product?.title }
        </h1>

        <p className="text-lg mb-5">${product?.price.toFixed(2)}</p>

        {/* selector de Tallas */}
        <SizeSelector
          selectedSize={product.sizes[0]} 
          availableSizes={product.sizes} 
        />
        {/* Selector de Cantidad */}
        <QuantitySelector 
          quantity={2}
        />
        {/* Button */}
        <button className="btn-primary my-5 cursor-pointer">
          Agregar al carrito
        </button>

        <h3 className="font-bold text-sm">Descripción</h3>

        <p className="font-light">
          {product?.description}
        </p>
      </div>
    </div>
  );
}