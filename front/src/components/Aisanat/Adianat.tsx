import React from 'react'
import styles from './Asianat.module.scss'
import Link from "next/link";
import Imgas from './icons/img.png';
import Image from "next/image";
import Img1 from './icons/shopping-bag.png';
import Img2 from './icons/car.png';
import Img3 from './icons/seting.png';

const Adianat = () => {
	return (
		<>
			<div className={styles.adianat}>
				<div className={styles.info}>
					<div className={styles.blockInfo}>
						<h1 className={styles.nameHeader}>Широкий выбор товаров</h1>
						<p className={styles.text}>
							JK Solution известна своими надежными сетевыми решениями как для частных, так и для бизнес-операторов.
						</p>
						<Link href='/newProduct' className={styles.linkInfo}>Посмотреть всю подборку</Link>
						<div className={styles.blockImg}>
							<Image src={Imgas} alt='img' className={styles.img}/>
						</div>
					</div>
					<ul className={styles.blockConteiner}>
						<li className={styles.ListBlcok}>
							<div className={styles.imgs}>
								<Image src={Img1} alt='img'/>
							</div>
							<div>
								<h5 className={styles.headerName}>Огромный ассортимент продукции</h5>
								<p className={styles.item}>
									25.000 товары в нашем базовом ассортименте
									8.000 товары на складе
								</p>
							</div>
						</li>
						<li className={styles.ListBlcok}>
							<div className={styles.imgs}>
								<Image src={Img2} alt='img'/>
							</div>
							<div>
								<h5 className={styles.headerName}>Быстрая доставка</h5>
								<p className={styles.item}>
									Сделайте заказ до 30-06-24 на товары, имеющиеся в наличии, и ожидайте, что ваш заказ будет отправлен сегодня.
								</p>
							</div>
						</li>
						<li className={styles.ListBlcok}>
							<div className={styles.imgs}>
								<Image src={Img3} alt='img'/>
							</div>
							<div>
								<h5 className={styles.headerName}>У нас лучшие клиенты</h5>
								<p className={styles.textList}>
									Удовлетворенность наших клиентов является нашим главным приоритетом. Просто посмотрите на наш рейтинг доверия 4.5.
								</p>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</>
	)
}

export default Adianat
