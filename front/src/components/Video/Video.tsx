'use client'

import React from 'react'
import ReactPlayer from "react-player";
import ImagIcon from './icons/Category Grid - Section.png';

import styles from './Video.module.scss'
import Image from "next/image";

const Video = () => {
	return (
		<>
			<div className={styles.blockSlider}>
				<Image src={ImagIcon} alt='img'/>
			</div>
		</>
	)
}

export default Video
