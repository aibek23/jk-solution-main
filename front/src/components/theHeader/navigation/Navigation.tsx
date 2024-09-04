'use client'

import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import {Link as ScrollLink} from 'react-scroll';
import {useSession} from 'next-auth/react'
import styles from './Navigation.module.scss'
import BasketIcon from "@/components/NewItems/icons/basketIcon";

type NavLink = {
    label: string;
    href: string;
}

type Props = {
    navLinks: NavLink[];
}

const Navigation = ({ navLinks }: Props) => {
    const session = useSession();

    return (
        <>
            {navLinks.map((link, index) => {
                    return (
                        <Link href={link.href} key={link.label} className={styles.textLink}>
                            {link.label}
                        </Link>
                    );
            })}
            {
                session.data && (
                    session.data?.user?.email === 'admin@mail.ru' ? (
                        <>
                            <Link className={styles.textLink}
                                  href='/admin'>Профиль</Link>
                            <Link className={styles.textLink}
                                  href='/applications'>Заявки</Link>
                        </>
                    ) :
                        <Link className={styles.textLink} href='/profile'>Профиль</Link>

                )
            }
        </>
    )
}

export default Navigation