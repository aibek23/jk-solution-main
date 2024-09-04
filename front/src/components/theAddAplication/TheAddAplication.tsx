'use client'

import React, { useEffect, useState } from 'react';
import {useSession} from "next-auth/react";
import styles from './TheAddAplication.module.scss';

interface Props {
    name: string;
    ProductId: number;
    phone: string;
    email: string;
    paymentMethod: string;
    processed: boolean;
}

interface PropsActive {
    onActive: (value: boolean) => void;
    active: boolean;
    idAplication: number;
}

const TheAddAplication = ({onActive, active, idAplication}: PropsActive) => {
    const { data: session } = useSession();
    console.log(session)
    const [newDirection, setNewDirection] = useState<Props>({
        name: '',
        ProductId: idAplication,
        phone: '',
        email: '',
        paymentMethod: '',
        processed: false,
    });

    useEffect(() => {
        if (session) {
            setNewDirection(prevState => ({
                ...prevState,
                name: session?.user?.name || '',
                email: session?.user?.email || '',
            }));
        }
    }, [session]);

    const handleChange = (e: any) => {
        const {name, value} = e.target;
        setNewDirection(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleChangeActive = () => {
        onActive(!active);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', newDirection.name);
            formData.append('ProductId', idAplication.toString()),
            formData.append('phone', newDirection.phone);
            formData.append('paymentMethod', newDirection.paymentMethod);
            formData.append('email', newDirection.email);
            formData.append('processed', newDirection.processed.toString());

            const response = await fetch('http://localhost:5000/api/application/', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                console.log('добавлен объект');
            } else {
                console.error('Ошибка при добавлении нового направления:', response.statusText);
            }
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    };

    return (
        <div className={styles.componentApplication}>
                <form className={styles.headerInput} onSubmit={handleSubmit}>
                    <h2 className={styles.nameApplication}>Оформите покупку</h2>
                    <div className={styles.inputsAdds}>
                        <div className={styles.inputForm}>
                            <label className={styles.textInput}>ФИО:</label>
                            <input type='text' name='name' value={newDirection.name} className={styles.inputs} disabled
                                   placeholder='Имя' onChange={handleChange}/>
                        </div>
                        <div className={styles.inputForm}>
                            <label className={styles.textInput}>Email:</label>
                            <input type='email' name='email' value={newDirection.email} className={styles.inputs} disabled
                                   placeholder='email' onChange={handleChange}/>
                        </div>
                        <div className={styles.inputForm}>
                            <label className={styles.textInput}>Телефон:</label>
                            <input type='tel' name='phone' value={newDirection.phone} className={styles.inputs}
                                   placeholder='телефон' onChange={handleChange}/>
                        </div>
                        <div className={styles.inputForm}>
                            <label className={styles.textInput}>Оплата:</label>
                            <select className={styles.inputs} name="paymentMethod" value={newDirection.paymentMethod}
                                    onChange={handleChange}>
                                <option className={styles.oprions} value="Банки"></option>
                                <option className={styles.oprions} value="Мбанк">Мбанк</option>
                                <option className={styles.oprions} value="Элкарт">Элкарт</option>
                                <option className={styles.oprions} value="Viza">Viza</option>
                            </select>
                        </div>
                        <div className={styles.checboxInfo}>
                            <div>
                                <input type='checkbox' name='processed' value={'false'} required id='processed'
                                       onChange={handleChange} className={styles.checkbox}/>
                            </div>
                            <label className={styles.textCheckbox} htmlFor='processed'>Подтвердить покупку</label>
                        </div>
                    </div>
                    {
                        session ? <button onClick={handleChangeActive} className={styles.submit}>Отправить</button> :
                            <div className={styles.warning}>Для того что бы купить товар вы должны
                                авторизоваться</div>
                    }
                </form>
            </div>
    )
};

export default TheAddAplication;
