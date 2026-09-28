import { Title } from "@/components";
import { ProductGrid } from '@/components/products/product-grid/ProductGrid';
import { getPaginatedProductsWithImages } from "../actions";


export default async function Home() {
  const { products } = await getPaginatedProductsWithImages();
  console.log(products)
  return (
   <>
    <Title
      title="Tienda"
      subtitle="Todos los productos"
      className="mb-2"
    />

    <ProductGrid 
      products={products}
    />
   </>
  );
}
