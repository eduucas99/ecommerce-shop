'use client';
import Link from "next/link";
import { useEffect, useActionState } from 'react';
import { authenticate } from '@/actions';
import { IoInformationOutline } from "react-icons/io5";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
export const LoginForm = () => {
    const router = useRouter();
    const [state, formAction, isPending] = useActionState(
      authenticate,
      undefined,
    );

    const {update} = useSession();
    useEffect(() => {
      if(state === 'Success') {
        update();
        router.push('/');
      }
    }, [state]);

    

  return (
    <form action={ formAction } className="flex flex-col">
        <label htmlFor="email">Correo electrónico</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="email" 
          name="email"  
        />


        <label htmlFor="password">Contraseña</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="password"
          name="password"
        />
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {state === 'CredentialsSignin' && (
            <div className="mb-2 flex flex-row items-center">
              <IoInformationOutline className="h-5 w-5 text-red-500" />
              <p className="text-sm font-semibold text-red-500">Creedenciales inválidas</p>
            </div>
          )}
        </div>
        <button
          type="submit"
          className={clsx({
            "btn-primary": !isPending,
            "btn-disabled": isPending
          })}
          disabled={isPending}
        >
          Ingresar
        </button>

        
        {isPending && (
          <div className="flex justify-center mt-2">
            <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}


        {/* divisor l ine */ }
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link
          href="/auth/new-account" 
          className="btn-secondary text-center">
          Crear una nueva cuenta
        </Link>

      </form>
  )
}
