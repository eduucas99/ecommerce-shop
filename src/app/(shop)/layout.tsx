import { Sidebar, TopMenu, Footer } from "@/components";
import { auth } from "@/auth.config";

export default async function ShopLayout({
 children
}: {
 children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <main className="min-h-screen">
      <TopMenu />
      <Sidebar isAuthenticated={!!session?.user} />
      
      <div className="px-4 sm:px-10">
        {children}
      </div>
      <Footer />
    </main>
  );
}