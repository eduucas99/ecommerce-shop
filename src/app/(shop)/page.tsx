import { Title } from "@/components";
import { ProductGrid } from '@/components/products/product-grid/ProductGrid';
import { getPaginatedProductsWithImages } from "../actions";
import { redirect } from "next/navigation";
import { Pagination } from '@/components/index';

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function Home({ searchParams }: Props) {
  const page = parseInt((await searchParams).page ?? '1');

  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ page });

  if( products.length === 0 ){
    redirect('/')
  }
  
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

    <Pagination totalPage={totalPages} />
   </>
  );
}
