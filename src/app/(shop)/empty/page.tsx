import { IoCartOutline } from "react-icons/io5";
import Link from "next/link";

export default function EmptyPage() {
  return (
    <div className="flex justify-center items-center h-100">
      <IoCartOutline size={80} className="mx-5"/>
      <div className="flex flex-col items-center">
        <h1 className="text-xl font-semibold">
          Tu carrito está vacio
        </h1>

        <Link
          className="my-2 inline-flex cursor-pointer items-center justify-center rounded-sm bg-blue-800 px-4 py-3 text-white transition-colors hover:bg-neutral-800"
          href="/"
        >
          Seguir comprando
        </Link>
      </div>
    </div>
  );
}