import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './Serieslist.module.css';

const SeriesList = () => {
    const [series, setSeries] = useState([]);

    useEffect(() => {
        const fetchSeries = async () => {
            try {
                const response = await axios.get('https://api.themoviedb.org/3/tv/top_rated', {
                    params: {
                        api_key: '6c2bdf00e3bc480f43673a145dd7985d',
                        language: 'de-DE',
                    }
                });
                setSeries(response.data.results);
            } catch (error) {
                console.error('error', error);
            }
        };

        fetchSeries();
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.h1}>
                <h1>Beliebte Serien</h1>
            </div>
            {series.map(serie => (
                <div key={serie.id} className={styles.cardContainer}>
                    <Link to={`/seriesdetails/${serie.id}`}>
                        <img className={styles.image} src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`} alt={serie.name} />
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default SeriesList;