'use client'

import React, {useEffect, useState} from 'react';
import styles from '../styles/admin/Admin.module.scss'
import Layout from "@/components/layout/Layout";
import Link from "next/link";

interface Direction {
    id: string;
    title: string;
    ean: string;
    description: string;
    characteristics: string;
    price: string;
    isPopular: boolean;
    CompanyId: string;
    image: string;
}

interface Category {
    name: string;
    image: string;
}

const PageAdmin = () => {
    const [data, setData] = useState([]);
    console.log(data)

    const [produck, setProduck] = useState<Direction[]>([]);
    const [gender, setGender] = useState<any>([]);
    const [newProduct, setNewProduct] = useState<Direction>({
        id: '',
        title: '',
        ean: '',
        description: '',
        characteristics: '',
        price: '',
        isPopular: false,
        CompanyId: '',
        image: '',
    });
    console.log(newProduct)

    const [newCategory, setNewCategory] = useState<Category>({
        name: '',
        image: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:5000/api/product/');
            if (!response.ok) {
                throw new Error('Unable to fetch posts!');
            }
            const jsonData = await response.json();
            setProduck(jsonData);
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:5000/api/company/');
            if (!response.ok) {
                throw new Error('Unable to fetch posts!');
            }
            const jsonData = await response.json();
            setGender(jsonData);
        };

        fetchData();
    }, []);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        if (name === 'image') {
            setNewProduct(prevState => ({
                ...prevState,
                [name]: e.target.files[0]
            }));
        } else {
            setNewProduct(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleChangeKatego = (e: any) => {
        const { name, value } = e.target;
        if (name === 'image') {
            setNewCategory(prevState => ({
                ...prevState,
                [name]: e.target.files[0]
            }));
        } else {
            setNewCategory(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:5000/api/product/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setProduck((produck: any) => produck.filter((app: any) => app.id !== id));
                console.log('Объект удален')
            } else {
                console.error('Ошибка при удалении направления:', response.statusText);
            }
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    };

    const handleDeleteCategory = async (index: string) => {
        try {
            const response = await fetch(`http://localhost:5000/api/category/${index.toString()}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setGender((gender: any) => gender.filter((app: any) => app.id !== index));
                console.log('Объект удален')
            } else {
                console.error('Ошибка при удалении направления:', response.statusText);
            }
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('id', newProduct.id);
            formData.append('title', newProduct.title);
            formData.append('isPopular', newProduct.isPopular.toString());
            formData.append('price', newProduct.price.toString());
            formData.append('CompanyId', newProduct.CompanyId);
            formData.append('ean', newProduct.ean.toString());
            formData.append('image', newProduct.image);
            formData.append('description', newProduct.description);
            formData.append('characteristics', newProduct.characteristics);

            const response = await fetch('http://localhost:5000/api/product/', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const res = await fetch('http://localhost:5000/api/product/');
                if (!res.ok) {
                    throw new Error('Unable to fetch directions!');
                }
                const jsonData = await res.json();
                setProduck(jsonData);

                console.log('добавлен объект');
            } else {
                console.error('Ошибка при добавлении нового направления:', response.statusText);
            }
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:5000/api/company/')
            if (!response.ok) {
                throw new Error('Unable to fetch posts!')
            }
            const jsonData = await response.json()
            setData(jsonData)
        }

        fetchData()
    }, [])

    const handleSubmitCategory = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', newCategory.name);
            formData.append('image', newCategory.image);


            const response = await fetch('http://localhost:5000/api/company/', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const res = await fetch('http://localhost:5000/api/company/');
                if (!res.ok) {
                    throw new Error('Unable to fetch directions!');
                }
                const jsonData = await res.json();
                setGender(jsonData);

                console.log('добавлен объект');
            } else {
                console.error('Ошибка при добавлении нового направления:', response.statusText);
            }
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    };

    return (
        <Layout isFooterHidden Header='home'>
            <div className={styles.wrapperAdmin}>
            <div className={styles.addBooks}>
                <div>
                    <h2 className={styles.nameAdmin}>Добавить новый товар</h2>
                    <form className={styles.formAdmin} onSubmit={handleSubmit}>
                <div className={styles.inputForm}>
                    <label>Название:</label>
                    <input className={styles.input} placeholder='Название' type="text" name="title"
                           value={newProduct.title} onChange={handleChange}/>
                </div>
                        <div className={styles.inputForm}>
                            <label>Ean:</label>
                            <input className={styles.input} placeholder='ean' type="number" name="ean"
                                   value={newProduct.ean} onChange={handleChange}/>
                        </div>
                <div className={styles.inputForm}>
                    <label>Цена:</label>
                    <input className={styles.input} placeholder='Цена' type="number" name="price"
                           value={newProduct.price} onChange={handleChange}/>
                </div>
                        <div className={styles.inputForm}>
                                <label >Компания:</label>
                                <select name='CompanyId' value={newProduct.CompanyId} onChange={handleChange} className={styles.inputs}>
                                    <option value='' className={styles.textGendr}>выберите компанию</option>
                                    {data.map((elem: any) => (
                                        <option value={elem.id} key={elem.id} className={styles.textGendr}>
                                            {elem.name}
                                        </option>
                                    ))}
                                </select>
                        </div>
                        <div className={styles.checboxBlock}>
                            <p className={styles.textInput}>
                                Популярный товар
                            </p>
                            <input type='checkbox' name='isPopular' value={'true'}
                                   onChange={handleChange}
                                   className={styles.checkbox}/>
                        </div>
                <div className={styles.inputForm}>
                    <label>Картинка:</label>
                    <div className={styles.blockImages}>
                        <input className={styles.imagesInput} type="file" name="image"
                               accept='/image/*, .png, .jpg, .web'
                               onChange={handleChange}/>
                    </div>
                </div>
                        <div className={styles.inputForm}>
                            <label>Информация:</label>
                            <textarea maxLength={400} className={styles.inputText} placeholder='Текст'
                                      name="description"
                                      value={newProduct.description} onChange={handleChange}/>
                        </div>
                        <div className={styles.inputForm}>
                            <label>Характеристики:</label>
                            <textarea maxLength={400} className={styles.inputText} placeholder='Текст'
                                      name="characteristics"
                                      value={newProduct.characteristics} onChange={handleChange}/>
                        </div>

                <button className={styles.summit} type="submit">Отправить</button>
            </form>
                </div>
                <div className={styles.genders}>
                    <h2 className={styles.nameAdmin}>Компании</h2>
                    <form className={styles.formAdmin} onSubmit={handleSubmitCategory}>
                        <div className={styles.inputForm}>
                            <label>Название:</label>
                            <input className={styles.input} placeholder='Название' type="text" name="name"
                                   value={newCategory.name} onChange={handleChangeKatego}/>
                        </div>
                        <div className={styles.inputForm}>
                            <label>Картинка:</label>
                            <div className={styles.blockImages}>
                                <input className={styles.imagesInput} type="file" name="image"
                                       accept='/image/*, .png, .jpg, .web'
                                       onChange={handleChangeKatego}/>
                            </div>
                        </div>
                        <button className={styles.summit} type="submit">Отправить</button>
                    </form>
                        <select>
                            {gender.map((elem: any) => (
                                <option value={`${elem.genre}`} key={elem.id}
                                        className={styles.textGendr}>{elem.name} - {elem.id}
                                </option>
                            ))}
                        </select>
                    <div className={styles.genderblock}>
                    {gender.map((elem: any) => (
                        <div key={elem.id}
                             className={styles.textGendr}>{elem.name} - {elem.id}
                            <button className={styles.deleteGender}
                                    onClick={() => handleDeleteCategory(elem.id)}>Удалить
                            </button>
                        </div>
                    ))}
                    </div>
                </div>
            </div>

            <h2 className={styles.nameBooksList}>Добавленные Товары</h2>
                <div className={styles.blockNew}>
                    {produck.map((elem: any) => (
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
                                        <Link className={styles.linkPopular} onClick={() => handleDelete(elem.id)}
                                              href='#'>Удалить</Link>
                                    </div>
                                </div>
                                </div>
                            </div>
                    ))}
                </div>
        </div>
        </Layout>
    );
};

export default PageAdmin;
