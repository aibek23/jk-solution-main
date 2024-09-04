'use client'

import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import styles from './NavigationTwo.module.scss'

type NavLink = {
    label: string;
    href: string;
}

type Props = {
    navLinks: NavLink[];
}

const NavigationTwo = ({ navLinks }: Props) => {
    const session = useSession()

    return (
        <>
            {navLinks.map((link) => {
                return (
                    <Link key={link.label} href={link.href}
                          className={styles.textLink}>
                        {link.label}
                    </Link>
                )
            })}
            {
                session.data && (
                    session.data?.user?.name === 'admin' ? (
                        <>
                            <Link className={styles.textLink}
                                  href='/admin'>Профиль</Link>
                            <Link className={styles.textLink}
                                  href='/applications'>Заявки</Link>
                        </>
                    ) : <Link className={styles.textLink}
                              href='/profile'>Профиль</Link>
                )
            }
        </>
    )
}

export default NavigationTwo