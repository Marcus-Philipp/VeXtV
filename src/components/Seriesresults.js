import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import styles from './Seriesresults.module.css';

const SeriesResults = () => {
    const [series, setSeries] = useState([]);
    const { suchbegriff } = useParams();

    useEffect(() => {
        const fetchSeries = async () => {
            try {
                const response = await axios.get('https://api.themoviedb.org/3/search/tv', {
                    params: {
                        api_key: '6c2bdf00e3bc480f43673a145dd7985d',
                        language: 'de-DE',
                        query: suchbegriff
                    }
                });
                setSeries(response.data.results);

            } catch (error) {
                console.error('error', error);
            }
        };

        fetchSeries();
        window.scrollTo(0, 0);
    }, [suchbegriff]);

    return (
        <div className={styles.container}>
            <div className={styles.h1}>
                <h1>{suchbegriff}</h1>
            </div>
            {series.map(serie => (
                <div key={serie.id} className={styles.cardContainer}>
                    <Link to={`/seriesdetails/${serie.id}`}>
                        <img className={styles.image} src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`} alt={serie.title} />
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default SeriesResults;