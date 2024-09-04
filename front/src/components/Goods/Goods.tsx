import React from 'react';
import styles from './Goods.module.scss';

const Goods = () => {
	return (
		<div className={styles.goodsShop}>
			<div className={styles.bags}>
				<span className={styles.bagsText}>Сумки</span>
			</div>
			<div className={styles.tops}>
				<span className={styles.topsText}>Топы</span>
			</div>
			<div className={styles.corsets}>
				<span className={styles.corsetsText}>Корсеты</span>
			</div>
		</div>
	)
}

export default Goods
