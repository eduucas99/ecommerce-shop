import { Title } from "@/components";
import { ProductGrid } from '@/components/products/product-grid/ProductGrid';
import { getPaginatedProductsWithImages } from "../actions";

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function Home({ searchParams }: Props) {
  const { page: pageParam } = await searchParams;
  
  const page = pageParam ? parseInt(pageParam) : 1;

  const { products } = await getPaginatedProductsWithImages({ page });
  
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
