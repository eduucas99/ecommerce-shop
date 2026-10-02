'use client';
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import clsx from "clsx";

type FormInputs = {
    name: string;
    email: string;
    password: string;
}

export const RegisterForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({});

    const onSubmit: SubmitHandler<FormInputs> = (data) => {
        const { name, email, password } = data;
        console.log({name, email, password});
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        
        <label htmlFor="email">Nombre completo</label>
        {
            errors.name?.type === 'required' && (
                <span className="text-red-500 text-sm font-semibold mt-2 mb-2">El nombre es requerido</span>
            )
        }
        <input
          className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", errors.name && "border-red-500")}
          type="text" 
          autoFocus
          {...register('name', { required: true })} 
        />
        <label htmlFor="email">Correo electrónico</label>
        {
            errors.email?.type === 'required' && (
                <span className="text-red-500 text-sm font-semibold mt-2 mb-2">El correo electrónico es requerido</span>
            )
        }
        {
            errors.email?.type === 'pattern' && (
                <span className="text-red-500 text-sm font-semibold mt-2 mb-2">El correo electrónico no es válido</span>
            )
        }
        <input
          className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", errors.email && "border-red-500")}
          type="email" 
          {...register('email', { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ })} 
        />

        <label htmlFor="email">Contraseña</label>
        {
            errors.password?.type === 'required' && (
                <span className="text-red-500 text-sm font-semibold mb-2">La contraseña es requerida</span>
            )
        }
        {
            errors.password?.type === 'minLength' && (
                <span className="text-red-500 text-sm font-semibold mb-2">La contraseña debe tener al menos 6 caracteres</span>
            )
        }
        <input
          className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", errors.password && "border-red-500")}
          type="password" 
          {...register('password', { required: true, minLength: 6 })} 
        />

        <button
          className="btn-primary cursor-pointer">
          Crear cuenta
        </button>


        {/* divisor l ine */ }
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link
          href="/auth/login" 
          className="btn-secondary text-center">
          Ingresar 
       </Link>

    </form>
  )
}
