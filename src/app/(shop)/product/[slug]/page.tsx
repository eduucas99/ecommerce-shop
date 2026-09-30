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
    <div className="mx-auto mt-5 mb-20 grid w-full max-w-[1600px] grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.8fr)] lg:gap-12 xl:gap-16">
      <div className="min-w-0">
        {/* Mobile Slideshow */}
        <ProductMobileSlideShow 
          title={product.title}
          images={product.images}
          className="block lg:hidden"
        />

      {/* Desktop Slideshow */}
        <ProductSlideShow 
          title={product.title}
          images={product.images}
          className="hidden lg:block"
        />
      </div>
      {/* Detalles */}
      <div className="min-w-0 px-1 sm:px-5 lg:sticky lg:top-8 lg:self-start lg:px-0">
        <StockLabel slug={product.slug} />
        
        <h1 className={`${titleFont.className} mt-3 text-2xl font-semibold leading-tight antialiased md:text-3xl`}> 
          { product?.title }
        </h1>

        <p className="mb-6 mt-2 text-xl font-medium">${product?.price.toFixed(2)}</p>

        {/* selector de Tallas */}
        <SizeSelector
          selectedSize={product.sizes[0]} 
          availableSizes={product.sizes} 
        />
        {/* Selector de Cantidad */}
        <div className="my-6 flex items-center justify-between">
          <span className="text-sm font-medium">Cantidad</span>
          <QuantitySelector quantity={1} />
        </div>
        {/* Button */}
        <button className="my-2 w-full cursor-pointer rounded-sm bg-blue-800 px-4 py-3 text-white transition-colors hover:bg-neutral-800">
          Agregar al carrito
        </button>

        <div className="mt-8 border-t border-neutral-200 pt-5">
          <h3 className="mb-2 text-sm font-semibold">Descripción</h3>

          <p className="text-sm leading-6 text-neutral-600">
            {product?.description}
          </p>
        </div>
      </div>
    </div>
  );
}