import { redirect, notFound } from "next/navigation";
import { Pagination, ProductGrid } from "@/components";
import { Title } from "@/components";
import { Category } from "@/interfaces";
import { getPaginatedProductsWithImages } from "@/app/actions";

type Props = {
  params: Promise<{ gender: string }>;
  searchParams: Promise<{ page?: string }>;
};

export default async function GenderPage({  params, searchParams }: Props) {
  
  const arrayCategory = ['men', 'women', 'kid', 'unisex'];
  const { gender } = await params;
  const page = parseInt((await searchParams).page ?? '1');
  
  if( !arrayCategory.includes(gender) ){
    notFound();
  }
  
  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ 
    page, 
    gender: gender as Category
  });
  
  if( products.length === 0 ){
    redirect(`/gender/${ gender }`);
  }

  const labels: Record<string, string> = {
    'men': 'para Hombres',
    'women': 'para Mujeres',
    'kid': 'para Niños',
    'unisex': 'para Todos',
  }

  return (
   <>
      <Title
        title={`Artículos ${(labels as any)[gender]}`}
        subtitle="Todos los productos"
        className="mb-2"
      />

      <ProductGrid 
        products={products}
      />

      <Pagination totalPages={totalPages} />
    </>
  );
}