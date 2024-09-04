'use client'

import React, {useEffect, useState} from 'react';
import styles from './ApProfile.module.scss'
import {useSession} from "next-auth/react";
import BasketIcon from "@/components/NewItems/icons/basketIcon";
import StarIcon from "@/components/NewItems/icons/starIcon";


const ApProfile = () => {
    const [applications, setApplications] = useState<any>([]);
    const [totalSum, setTotalSum] = useState<number>(0);
    const session = useSession();


    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:5000/api/application/');
            if (!res.ok) {
                throw new Error('Unable to fetch posts!');
            }
            const applicationsData = await res.json();
            setApplications(applicationsData);
        };

        fetchData();
    }, []);

    const handleDelete = async (index: string) => {
        try {
            const response = await fetch(`http://localhost:5000/api/application/${index}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setApplications((prevApplications: any) => prevApplications.filter((app: any) => app.id !== index));
                console.log('Объект удален');
            } else {
                console.error('Ошибка при удалении направления:', response.statusText);
            }
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    };

    useEffect(() => {
        if (session.data?.user?.name) {
            const userApplications = applications.filter((app: any) => app.name === session?.data?.user?.name);
            const sum = userApplications.reduce((acc: number, app: any) => {
            const sumDisciption = Number(app.Product.price) - Number(app.Product.price) * 0.15;
                if (app.processed) {
                    const priceWithDiscount = app.Product.discount ?  sumDisciption : app.Product.price;
                    return acc + Number(priceWithDiscount);
                }
                return acc;
            }, 0);
            setTotalSum(sum);
        }
    }, [applications, session]);


    return (
        <div>
            {session.data?.user?.name &&
                <div className={styles.hello}>
                    <ul className={styles.user}>
                        <li>Здравствуйте {session.data?.user?.name} у вас</li>
                        <li className={styles.wait}>В обработке
                            = {applications.filter((elem: any) => elem.name === session.data?.user?.name && !elem.approved && !elem.processed).length}</li>
                        <li className={styles.ok}>Принятые
                            = {applications.filter((elem: any) => elem.name === session.data?.user?.name && elem.processed).length}</li>
                        <li className={styles.not}>Отказанные
                            = {applications.filter((elem: any) => elem.name === session.data?.user?.name && elem.approved).length}</li>
                        <li>Общая сумма = {totalSum} сом</li>
                    </ul>
                {
                applications
                    .filter((elem: any) => session.data?.user?.name === elem.name)
                    .map((elem: any, index: number) => {
                        const sumDisciption = Number(elem.Product.price) - Number(elem.Product.price) * 0.15
                        return (
                            <ul key={elem.id} className={styles.list}>
                                {session.data?.user?.name === elem.name && (
                                    elem.processed === true && elem.approved === false ? (
                                        <li className={styles.ok}>Ваша заявка принята</li>
                                    ) : elem.approved === true && elem.processed === false ? (
                                        <li className={styles.not}>Ваша заявка отклонена</li>
                                    ) : (
                                        <li className={styles.wait}>Ваша заявка в обработке</li>
                                    )
                                )}
                                <div className={styles.blockProdukt}>
                                    <div className={styles.blockImg}>
                                        <img src={`http://localhost:5000/${elem.Product.Company.image}`} alt='tower'
                                             className={styles.imgesBooks}/>
                                    </div>
                                    <li className={styles.nameCategories}>{elem.Product.title}</li>
                                    <div className={styles.nameProduct}>{elem.Product.description}</div>
                                    <div className={styles.sizeNum}>
                                        {!elem.Product.discount ?
                                            <div className={styles.sizeNum}>{elem.Product.price} сом</div> :
                                            <div className={styles.sizeNum}><span
                                                className={styles.sumNot}>{elem.Product.price}</span>{sumDisciption} сом
                                            </div>
                                        }
                                    </div>
                                    <button className={styles.link} onClick={() => handleDelete(elem.id)}>Удалить
                                    </button>
                                </div>
                            </ul>
                        );
                    })
            }</div>
        }
    </div>
    );
};

export default ApProfile;