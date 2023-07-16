import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './Medialist.module.css';

const MediaList = (props) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/${props.apiPoint}`, {
                    params: {
                        api_key: '6c2bdf00e3bc480f43673a145dd7985d',
                        language: 'de-DE'
                    }
                });
                setItems(response.data.results);
            } catch (error) {
                console.error('error', error);
            }
        };

        fetchItems();
    }, [props.apiPoint]);

    return (
        <div className={styles.container}>
            <div className={styles.h1}>
                <h1>{props.title}</h1>
            </div>
            {items.map((item) => (
                <div key={item.id} className={styles.cardContainer}>
                    <Link to={`/${props.mediaType}details/${item.id}`}>
                        <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title || item.name} />
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default MediaList;