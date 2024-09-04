'use client'

import React, {useState} from 'react'
import Adianat from '@/components/Aisanat/Adianat'
import Goods from '@/components/Goods/Goods'
import NewItems from '@/components/NewItems/NewItems'
import Video from '@/components/Video/Video'
import TheCollection from '@/components/theCollections/TheCollection'
import TheAddAplication from "@/components/theAddAplication/TheAddAplication";


import styles from './styles/Home/Home.module.scss'
import classNames from "classnames";
import Layout from "@/components/layout/Layout";


const Home = () => {
	const [active, setActive] = useState(false);
	const [idAplication, setIdAplication] = useState<number>(0);

	return (
		<Layout Header='home'>
			<div className={classNames(styles.shadow, {[styles.shadowNot]: !active})} onClick={() => setActive(!active)}></div>
			<div className={classNames(styles.application, {[styles.applicationNot]: !active})}>
				<TheAddAplication onActive={setActive} active={active} idAplication={idAplication}/>
			</div>
			<section className={styles.wrapperAdianat}>
				<Adianat />
			</section>
			<section className={styles.wrapperGoods}>
				<TheCollection onActive={setActive} active={active} setIdAplication={setIdAplication}/>
			</section>
			<section className={styles.wrapperNewItems}>
				<NewItems onActive={setActive} active={active} setIdAplication={setIdAplication}/>
			</section>
		</Layout>
	)
}

export default Home
