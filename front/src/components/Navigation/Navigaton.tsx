'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { Role } from '@prisma/client';


interface NavLink {
    label:string;
    href:string;
}

interface SessionUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role: Role;
}
interface Props {
    navLinks:NavLink[]
}
const Navigation = ({ navLinks }:Props) => {
  const pathname = usePathname();
  const session = useSession();
  const sessionData = session.data?.user as SessionUser;
  return <>
    {
      navLinks.map(link => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={ link.href }
            href={ link.href }
            className={ isActive ? 'active' : '' }
          > { link.label }</Link>
        );
      })
    }
    {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */}
    {sessionData && sessionData.role === Role.ADMIN && (
      <Link href='/create-user'>Create user</Link>
    )
    }
    {session.data && (
      <Link href='/profile'>Profile</Link>
    )
    }
    {session.data ?
      <Link href='#' onClick={() => signOut({ callbackUrl: '/' })}>Sign Out</Link>
      :
    // <Link href='/api/auth/signin'>Sign In</Link>
      <Link href='/signin'>Sign In</Link>
    }
  </>;
};

export default Navigation;
