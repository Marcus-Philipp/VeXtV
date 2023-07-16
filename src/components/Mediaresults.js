import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useParams, Link } from 'react-router-dom';
import styles from './Mediaresults.module.css';

const MediaResults = (props) => {
    const [items, setItems] = useState([]);
    const { suchbegriff } = useParams();

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/search/${props.mediaType}`, {
                    params: {
                        api_key: '6c2bdf00e3bc480f43673a145dd7985d',
                        language: 'de-DE',
                        query: suchbegriff
                    }
                });
                setItems(response.data.results);
         
            } catch (error) {
                console.error('Fehler', error);
            }
        };

        fetchItems();
        window.scrollTo(0, 0);
    }, [suchbegriff, props.mediaType]);

    return (
        <div className={styles.container}>
            <div className={styles.h1}>
                <h1>{suchbegriff}</h1>
            </div>
            {items.map(item => (
                <div key={item.id} className={styles.cardContainer}>
                    <Link to={`/${props.mediaType}details/${item.id}`}>
                        <img className={styles.image} src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title || item.name} />
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default MediaResults;