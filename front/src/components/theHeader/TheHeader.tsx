'use client'

import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import Logo from '../icons/Logo'
import { signOut, useSession } from 'next-auth/react'
import Navigation from "@/components/theHeader/navigation/Navigation";
import BasketIcon from "@/components/theHeader/icons/basketIcon";

import styles from './TheHeader.module.scss'

export const navItems = [
	{ label: 'Главная', href: '/' },
	{ label: 'Все продукты', href: '/newProduct' },
]

const TheHeader = () => {
	const [applications, setApplications] = useState<any>([]);
	const session = useSession()

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch('http://localhost:5000/api/application/');
			if (!res.ok) {
				throw new Error('Unable to fetch posts!');
			}
			const applicationsData = await res.json();
			if (session?.data?.user?.name) {
				const filteredApplications = applicationsData.filter((app: any) => app.name === session?.data?.user?.name);
				setApplications(filteredApplications);
			} else {
				setApplications(applicationsData);
			}
		};

		fetchData();
	}, [session]);

	return (
		<header className={styles.wrapperHeader}>
			<div className={styles.menu}>
				<Link href={'/'} className={styles.logo}><span style={{color: 'red'}}>JK</span> <span style={{color:"#2D68FF"}}>Solution</span></Link>
				<nav className={styles.navText}>
					<Navigation navLinks={navItems} />
				</nav>
			</div>
			<div className={styles.linck}>
				{
					session?.data ?
						<>
						<div>
							{session.data?.user?.name &&  <div className={styles.corzina}><BasketIcon/><span className={styles.num}>{applications.length}</span></div>}
						</div>
						<Link className={styles.textLink} href='#'
									onClick={() => signOut({ callbackUrl: '/' })}>Выйти <BasketIcon/></Link>
						</>
						:
						<>
							<Link className={styles.textLink} href='/signin'>Войти <BasketIcon/></Link>
						</>
				}
			</div>
		</header>
	)
}

export { TheHeader }
