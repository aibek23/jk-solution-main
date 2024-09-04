'use client'

import React, {useEffect, useState} from 'react';
import Layout from "@/components/layout/Layout";
import styles from "../styles/newProgect/styleNewProgect.module.scss";
import StarIcon from "@/components/NewItems/icons/starIcon";
import BasketIcon from "@/components/NewItems/icons/basketIcon";
import classNames from "classnames";
import TheAddAplication from "@/components/theAddAplication/TheAddAplication";

const PageNewProduct = () => {
    const [active, setActive] = useState(false);
    const [data, setData] = useState([]);
    const [idAplication, setIdAplication] = useState<number>(0);
    const [gender, setGender] = useState<any>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | ''>('');

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:5000/api/product/')
            if (!response.ok) {
                throw new Error('Unable to fetch posts!')
            }
            const jsonData = await response.json()
            setData(jsonData.rows)
        }

        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:5000/api/category/');
            if (!response.ok) {
                throw new Error('Unable to fetch posts!');
            }
            const jsonData = await response.json();
            setGender(jsonData.rows);
        };

        fetchData();
    }, []);

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedCategory(value === '' ? '' : Number(value));
    }

    const handleChangeActive = (id: number) => {
        setIdAplication(id);
        setActive(!active);
    }

    return (
        <Layout Header='new'>
            <div className={classNames(styles.shadow, {[styles.shadowNot]: !active})} onClick={() => setActive(!active)}></div>
            <div className={classNames(styles.application, {[styles.applicationNot]: !active})}>
                <TheAddAplication onActive={setActive} active={active} idAplication={idAplication}/>
            </div>
            <div className={styles.blockNewItems}>
                <div className={styles.blockHeader}>
                    <h2 className={styles.nameNewItems}>Скидки</h2>
                    <select onChange={handleCategoryChange}>
                        <option value=''>Все компании</option>
                        {gender.map((elem: any) => (
                            <option value={elem.id} key={elem.id} className={styles.textGendr}>
                                {elem.category}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <div className={styles.blockNew}>
                        {data
                            .filter((elem: any) =>elem.discount && (selectedCategory === '' || elem.CategoryId === selectedCategory))
                            .map((elem: any) => {
                                const sumDisciption = Number(elem.price) - Number(elem.price) * 0.15
                                return (
                                    <div key={elem.id} className={styles.blockProdukt}
                                         onClick={() => handleChangeActive(elem.id)}>
                                        <div className={styles.blockImg}>
                                            <span className={styles.stars}><StarIcon/> 4.95</span>
                                            <img src={`http://localhost:5000/${elem.cover_image}`} alt='tower'
                                                 className={styles.imgesBooks}/>
                                            <div className={styles.discount}>-15%</div>
                                        </div>
                                        <div className={styles.textNewItems}>
                                            <div className={styles.nameCategories}>{elem.title}</div>
                                            <div className={styles.nameProduct}>{elem.description}</div>
                                            <div className={styles.sizeNum}>
                                                {!elem.discount ?
                                                    <div className={styles.sizeNum}>{elem.price} сом</div> :
                                                    <div className={styles.sizeNum}><span
                                                        className={styles.sumNot}>{elem.price}</span>{sumDisciption} сом
                                                    </div>}
                                                <div><BasketIcon/></div>
                                            </div>
                                        </div>
                                    </div>
                                    )
                            })}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default PageNewProduct;
