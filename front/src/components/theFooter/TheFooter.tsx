import styles from './TheFooter.module.scss'
import Img1 from './icons/footerImg1.png'
import Img2 from './icons/footerImag2.png'
import Img3 from './icons/footerImg3.png'
import Image from "next/image";

const TheFooter = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.contentYslug}>
				<div className={styles.info}>
					<div>
						<Image src={Img1} alt='img'/>
					</div>
					<div>
						<Image src={Img2} alt='img'/>
					</div>
					<div>
						<Image src={Img3} alt='img'/>
					</div>
				</div>
			</div>
		</footer>
	)
}

export { TheFooter }
