'use client'
import React from 'react'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import styles from './GoogleButton.module.scss'

const GoogleButton = () => {
	const searchParams = useSearchParams()
	const callbackUrl = searchParams.get('callbackUrl') || '/profile'

	return (
		<button className={styles.gogleBtn} onClick={() => signIn('google', { callbackUrl })}>
			Войти через Google
		</button>
	)
}

export default GoogleButton
