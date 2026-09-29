'use client';
import { generatePaginationNumber } from "@/utils";
import clsx from "clsx";
import Link from "next/link";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

interface Props{
    totalPages: number;
}

export const Pagination = ({totalPages}: Props) => {

    const pathName = usePathname();
    const searchParams = useSearchParams();

    const pageString = searchParams.get('page') ?? 1;
    let currentPage = isNaN(+pageString) ? 1 : +pageString;

    if( currentPage < 1 || isNaN(+pageString) ){
        redirect( pathName );
    }
    
    const allPages = generatePaginationNumber(currentPage, totalPages);
    
    const createPageUrl = ( pageNumber: number | string ) => {
        const params = new URLSearchParams( searchParams );

        if ( pageNumber === '...' ){
            return `${ pathName }?${ params.toString() }`
        }

        if( +pageNumber <= 0 ){
            return `${ pathName }`; // href="/"
        }

        if ( +pageNumber > totalPages ){ // Next >
            return `${ pathName }?${ params.toString() }`;
        }

        params.set('page', pageNumber.toString());

        return `${ pathName }?${ params.toString() }`;
    }

  return (
    <>
     <div className="grid min-h-35 w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible mt-10">
            <nav>
                <ul className="flex">
                    <li>
                        <Link className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-blue-200" href={createPageUrl( currentPage - 1)} aria-label="Previous">
                            <span className="material-icons text-sm"><IoChevronBackOutline size={30}/></span>
                        </Link>
                    </li>
                    {
                        allPages.map ( page => (
                            <li key={page }>
                                <Link className={
                                    clsx(
                                        "mx-1 flex h-9 w-9 items-center justify-center rounded-fullp-0 text-sm text-black shadow-md transition duration-150 ease-in-out",
                                        {
                                            "bg-blue-600 shadow-sm text-white hover:bg-blue-700": currentPage === page,
                                        }
                                    )}
                                    href={createPageUrl( page )}>{page}
                                </Link>
                            </li>
                        ))
                    }                         
                    <li>
                        <Link className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-blue-200" href={createPageUrl( currentPage + 1 )} aria-label="Next">
                            <span className="material-icons text-sm">
                                <IoChevronForwardOutline size={30}/>
                            </span>
                        </Link>
                    </li>
                </ul>
            </nav>
      </div>
    </>
  )
}
