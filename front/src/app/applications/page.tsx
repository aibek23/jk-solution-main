'use client'

import React, {useEffect, useState} from 'react';
import styles from "@/app/styles/admin/Admin.module.scss";
import Layout from "@/components/layout/Layout";
import StarIcon from "@/components/NewItems/icons/starIcon";

const PageApplications = () => {
    const [applications, setApplications] = useState<any>([]);

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

    const handleCheckboxChange = async (index: string, type: 'processed' | 'approved') => {
        try {
            const updatedApplications = applications.map((app: any) => {
                if (app.id === index) {
                    return { ...app, processed: type === 'processed', approved: type === 'approved' };
                }
                return app;
            });
            setApplications(updatedApplications);

            const formData = new FormData();
            formData.append('processed', (type === 'processed').toString());
            formData.append('approved', (type === 'approved').toString());

            const response = await fetch(`http://localhost:5000/api/application/${index}`, {
                method: 'PUT',
                body: formData,
            });

            if (!response.ok) {
                console.error('Ошибка при добавлении нового направления:', response.statusText);
            }
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    };

    return (
        <Layout isFooterHidden Header='home'>
            <div className={styles.wrapperAdmin}>
                <h1 className={styles.nameAdmin}>Заявки пользователей</h1>
                <ul className={styles.blockList}>
                    {applications.map((elemAp: any) => (
                        <li key={elemAp.id} className={styles.infoList}>
                            <div className={styles.blockInfo}>
                                <h2 className={styles.name}>{elemAp.name}</h2>
                                <div className={styles.checboxInfo}>
                                    <ul>
                                        <div className={styles.blockImg}>
                                            <span className={styles.stars}><StarIcon/> 4.95</span>
                                            <img src={`http://localhost:5000/${elemAp.Product.Company.image}`} alt='tower'
                                                 className={styles.imgesBooks}/>
                                            {!elemAp.Product.discount ? '' : <div className={styles.discount}>-15%</div>}
                                        </div>
                                        <li className={styles.product}>Товар: {elemAp.Product.title}</li>
                                        <li className={styles.product}>Категория: {elemAp.Product.Company.name}</li>
                                        <li className={styles.summa}>Сумма: {elemAp.Product.price} сом</li>
                                        <li className={styles.summa}>Способ оплаты: {elemAp.paymentMethod}</li>
                                        <li className={styles.summa}>тел: {elemAp.phone}</li>
                                    </ul>
                                    <div className={styles.checkboxBlock}>
                                        <button
                                            onClick={() => handleCheckboxChange(elemAp.id, 'processed')}
                                            className={`${styles.delete} ${elemAp.processed ? styles.active : ''}`}
                                        >
                                            Подтверждение заявки
                                        </button>
                                    </div>
                                    <div className={styles.checkboxBlock}>
                                        <button
                                            onClick={() => handleCheckboxChange(elemAp.id, 'approved')}
                                            className={`${styles.delete} ${elemAp.approved ? styles.active : ''}`}
                                        >
                                            Отклонение заявки
                                        </button>
                                    </div>
                                </div>
                                <button className={styles.delete} onClick={() => handleDelete(elemAp.id)}>Удалить</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>
    );
};

export default PageApplications;
