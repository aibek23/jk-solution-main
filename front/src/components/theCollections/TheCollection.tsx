'use client'

import React, {useEffect, useRef, useState,} from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import './TheSlider.scss'
import styles from './TheCollection.module.scss'
import {dataComments} from "@/components/theCollections/dataComments/dataComments";
import Star from "@/components/theCollections/icons/star";
import StarIcon from "@/components/NewItems/icons/starIcon";
import Link from "next/link";

interface Props {
	onActive: (value: boolean) => void;
	active: boolean;
	setIdAplication: (value: number) => void;
}


const TheCollection = ({ onActive, active, setIdAplication }: Props) => {
	const [data, setData] = useState([])
	let sliderRef = useRef<Slider | null>(null)

	const settings = {
		focusOnSelect: true,
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1
	}

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('http://localhost:5000/api/product/')
			if (!response.ok) {
				throw new Error('Unable to fetch posts!')
			}
			const jsonData = await response.json()
			setData(jsonData)
		}

		fetchData()
	}, [])


	const handleChangeActive = (id: number) => {
		setIdAplication(id);
		onActive(!active);
	};

	return (
		<>
			<div className={styles.blockSlider}>
				<h2 className={styles.popukarName}>Популярные продукты</h2>
				<div>
					<div className='sliderReceipts'>
						<Slider
							ref={(slider :any) => {
								sliderRef.current = slider
							}}
							{...settings}>
							{data
								.filter((elem: any) => elem.isPopular)
								.map((elem: any) => (
									<div key={elem.id} className={styles.blockComment}>
										<div className={styles.userComments}>
											<div className={styles.userBlock}>
												<div className={styles.blockImg}>
													<img src={`http://localhost:5000/${elem.image}`} alt='img'
														 className={styles.imges}/>
												</div>
												<div className={styles.infoUser}>
													<div className={styles.blockName}>
														<div className={styles.infoName}>{elem.Company.name}</div>
														<div className={styles.infoName}>{elem.ean}</div>
													</div>
													<h2 className={styles.name}>{elem.title}</h2>
													<p className={styles.data}>{elem.description}</p>
													<p className={styles.price}>$ {elem.price}</p>
													<button className={styles.linkPopular} onClick={() => handleChangeActive(elem.CompanyId)}>Добавить в корзину</button>
												</div>
											</div>
										</div>
									</div>
								))}
						</Slider>
					</div>
				</div>
			</div>
		</>
	)
}

export default TheCollection
