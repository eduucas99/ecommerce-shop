import { notFound } from "next/navigation";
import { initialData } from "@/seed/seed";
import { ProductGrid } from "@/components";
import { Title } from "@/components";
import { Category } from "@/interfaces";

const seedProducts = initialData.products;
interface Props {
  params: {
    id: Category;
  },
}

export default async function({params}: Props) {
  const { id } = await params;

  const arrayCategory = ['men', 'women', 'kid', 'unisex'];

  if( !arrayCategory.includes(id) ){
    notFound();
  }

  const products = seedProducts.filter(p => p.gender === id);
  
  const labels: Record<Category, string> = {
    'men': 'para Hombres',
    'women': 'para Mujeres',
    'kid': 'para Niños',
    'unisex': 'para Todos',
  }

  return (
   <>
      <Title
        title={`Artículos ${(labels as any)[id]}`}
        subtitle="Todos los productos"
        className="mb-2"
      />

      <ProductGrid 
        products={products}
      />
    </>
  );
}