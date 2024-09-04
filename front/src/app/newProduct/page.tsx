'use client'

import React, {useEffect, useState} from 'react';
import Layout from "@/components/layout/Layout";
import StarIcon from "@/components/NewItems/icons/starIcon";
import BasketIcon from "@/components/NewItems/icons/basketIcon";
import TheAddAplication from "@/components/theAddAplication/TheAddAplication";

import classNames from "classnames";
import styles from "../styles/newProgect/styleNewProgect.module.scss";
import Link from "next/link";

const PageNewProduct = () => {
    const [active, setActive] = useState(false);
    const [idAplication, setIdAplication] = useState<number>(0);
    const [genders, setGenders] = useState<string[]>([]);
    const [data, setData] = useState<any[]>([]);
    const [selectedGender, setSelectedGender] = useState<any>();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:5000/api/product/');
            if (!response.ok) {
                throw new Error('Unable to fetch products!');
            }
            const jsonData = await response.json();
            setData(jsonData);
        };

        fetchData();
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:5000/api/company/');
            if (!response.ok) {
                throw new Error('Unable to fetch companies!');
            }
            const jsonData = await response.json();
            const uniqueGenders: any = Array.from(new Set(jsonData.map((elem: any) => elem.name)));
            setGenders(uniqueGenders);
        };

        fetchData();
    }, []);

    const handleGenderClick = (name: string) => {
        setSelectedGender(name === selectedGender ? null : name);
    };

    const handleChangeActive = (id: number) => {
        setIdAplication(id);
        setActive(!active);
    }

    return (
        <Layout Header='home'>
            <div className={classNames(styles.shadow, {[styles.shadowNot]: !active})} onClick={() => setActive(!active)}></div>
            <div className={classNames(styles.application, {[styles.applicationNot]: !active})}>
                <TheAddAplication onActive={setActive} active={active}  idAplication={idAplication}/>
            </div>
            <div className={styles.blockNewItems}>
                <div className={styles.blockHeader}>
                    <h2 className={styles.nameNewItems}>Все продукты</h2>
                    <div className={styles.genderblock}>
                        {genders.map((gender: string, index: number) => (
                            <div
                                key={index}
                                className={`${styles.textGendr} ${selectedGender === gender ? styles.active : ''}`}
                                onClick={() => handleGenderClick(gender)}
                            >
                                {gender}
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <div className={styles.blockNew}>
                        {data
                            .filter((elem: any) => (!selectedGender || elem.Company.name === selectedGender))
                            .map((elem: any) => (
                                <div key={elem.id} className={styles.blockComment}>
                                    <div className={styles.userComments}>
                                        <div className={styles.userBlock}>
                                            <div className={styles.blockImg}>
                                                <img
                                                    src={`http://localhost:5000/${elem.image}`}
                                                    alt='img'
                                                    className={styles.imges}
                                                />
                                            </div>
                                            <div className={styles.infoUser}>
                                                <div className={styles.blockName}>
                                                    <div className={styles.infoName}>{elem.Company.name}</div>
                                                    <div className={styles.infoName}>{elem.ean}</div>
                                                </div>
                                                <h2 className={styles.name}>{elem.title}</h2>
                                                <p className={styles.data}>{elem.description}</p>
                                                <p className={styles.price}>$ {elem.price}</p>
                                                <button className={styles.linkPopular} onClick={() => handleChangeActive(elem.id)}>Добавить в корзину</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default PageNewProduct;
