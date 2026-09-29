
import Link from "next/link";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

interface Props{
    totalPage: number;
}

export const Pagination = ({totalPage}: Props) => {
  return (
    <>
     <div className="grid min-h-35 w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible mt-10">
            <nav>
                <ul className="flex">
                    <li>
                        <Link className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300" href="#" aria-label="Previous">
                            <span className="material-icons text-sm"><IoChevronBackOutline size={30}/></span>
                        </Link>
                    </li>
                    <li>
                        <a className="mx-1 flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 p-0 text-sm text-white shadow-md transition duration-150 ease-in-out" href="#">1</a>
                    </li>
                    <li>
                        <a className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300" href="#">2</a>
                    </li>
                    <li>
                        <a className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300" href="#">3</a>
                    </li>
                    <li>
                        <Link className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300" href="#" aria-label="Next">
                            <span className="material-icons text-sm">
                                <IoChevronForwardOutline />
                            </span>
                        </Link>
                    </li>
                </ul>
            </nav>
      </div>
    </>
  )
}
