import { initialData } from "@/seed/seed";
import notFound from "./not-found";
import { titleFont } from "@/config/fonts";

interface Props {
  params: {
    slug: string;
  }
}

export default async function({params}: Props) {
  const { slug } = await params;
  
  const product = initialData.products.find( p => p.slug === slug);

  if(!product){
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* Slideshow */}
      <div className="col-span-1 md:col-span-2">
        <h1>Hola mundo</h1>
      </div>
      {/* Detalles */}
      <div className="col-span-1 px-5">
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}> 
          { product?.title }
        </h1>

        <p className="text-lg mb-5">${product?.price.toFixed(2)}</p>

        {/* selector de Tallas */}

        {/* Selector de Cantidad */}

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