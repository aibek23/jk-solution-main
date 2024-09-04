'use client'

import React from 'react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'

import styles from './HeaderTWO.module.scss'

import LogoTwo from "@/components/icons/LogoTwo";
import NavigationTwo from "@/components/HeaderTwo/navigation/NavigationTwo";
import BasketIcon from "@/components/HeaderTwo/icons/basketIcon";

export const navItems = [
	{ label: 'Главная', href: '/' },
	{ label: 'Скидки', href: '/discountsProduct' },
	{ label: 'Новинки', href: '/newProduct' },
	{ label: 'Отзывы', href: '/#reviews' },
]

const HeaderTwo = () => {
	const session = useSession()

	return (
		<header className={styles.wrapperHeader}>
			<div className={styles.menu}>
				{/*<Link href={'/'} className={styles.logo}><LogoTwo /></Link>*/}
				<nav className={styles.navText}>
					<NavigationTwo navLinks={navItems} />
				</nav>
			</div>
			<div className={styles.linck}>
				{
					session?.data ?
						<Link className={styles.textLink} href='#'
									onClick={() => signOut({ callbackUrl: '/' })}>Выйти <BasketIcon/></Link>
						:
						<>
							<Link className={styles.textLink} href='/signin'>Войти <BasketIcon/></Link>
						</>
				}
			</div>
		</header>
	)
}

export { HeaderTwo }
