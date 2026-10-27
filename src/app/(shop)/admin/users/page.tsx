export const revalidate = 0;
import { getPaginatedUsers } from '@/actions';
import { Title } from '@/components';

import Link from 'next/link';
import { redirect } from 'next/navigation';
import { IoCardOutline } from 'react-icons/io5';
import { UserTable } from './ui/UserTable';
import { Pagination } from '@/components/ui/pagination/Pagination';

export default async function UserPage() {
  const { ok, users = [] } = await getPaginatedUsers();

  if (!ok) {
    redirect("/auth/login");
  }

  return (
    <>
      <Title title="Mantenimiento de Usuarios" />

      <div className="mb-10">
        <UserTable
          users={users.map(({ id, name, email, role }) => ({
            id,
            name,
            email,
            role,
          }))}
        />

        <Pagination totalPages={ 3 }/>
      </div>
    </>
  );
}