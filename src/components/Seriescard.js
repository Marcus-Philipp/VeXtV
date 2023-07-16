import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './Seriescard.module.css';
import Rating from './Rating';
import TrailerCard from './Trailercard';

const SeriesCard = (props) => {
    const [serie, setSerie] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const fetchSeries = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}`, {
                    params: {
                        api_key: '6c2bdf00e3bc480f43673a145dd7985d',
                        language: 'de-DE'
                    }
                });

                const url = response.data.poster_path ? `https://image.tmdb.org/t/p/original${response.data.poster_path}` : null;

                if (url) {
                    const img = new Image();
                    img.onload = () => {
                        setSerie(response.data);
                        setImageUrl(url);
                        setLoading(false);
                    };
                    img.onerror = () => {
                        console.error('Error loading image');
                        setLoading(false);
                    }
                    img.src = url;
                } else {
                    setSerie(response.data);
                    setLoading(false);
                }
            } catch (error) {
                console.error('error', error);
                setLoading(false);
            }
        };

        fetchSeries();
        window.scrollTo(0, 0);
    }, [id, setSerie]);

    useEffect(() => {
        if (serie && props.onSerieLoaded) {
            props.onSerieLoaded(serie.id);
        }
    }, [serie, props.onSerieLoaded]);

    if (loading) {
        return <p>Loading...</p>;
    }

    const getYear = () => {
        return serie?.first_air_date?.substring(0, 4);
    };

    const releaseDate = () => {
        if (serie?.first_air_date) {
            const release = new Date(serie.first_air_date);
            return release.toLocaleDateString('de-DE');
        } else {
            return null;
        }
    };


    return (
        <div className={styles.container} style={imageUrl ? { backgroundImage: `linear-gradient(90deg, rgba(31.5, 31.5, 31.5, 1), rgba(31.5, 31.5, 31.5, 0.8)), url(${imageUrl})` } : {}}>
            <div className={styles.imageContainer}>
                {serie.poster_path && (
                    <img src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`} alt={serie.title} />
                )}
            </div>
            <div className={styles.detailsContainer}>
                <div className={styles.firstFloor}>
                    <h1>{serie.name} (<span>{getYear()}</span>)</h1>
                    <div className={styles.details}>
                        <p>{releaseDate()}</p>
                        <p>{serie?.genres?.map(genre => genre.name).join(', ')}</p>
                        <p>Spieldauer: {serie.episode_run_time ? serie.episode_run_time[0] : 'N/A'} Minuten</p>
                    </div>
                </div>
                <div className={styles.media}>
                    <Rating vote_average={serie.vote_average} className={styles.rating} />
                    <p>Benutzerbewertung</p>
                    <TrailerCard type='tv' />
                </div>
                <div className={styles.describe}>
                    <h2>Handlung</h2>
                    <p>{serie.overview}</p>
                </div>
            </div>
        </div>
    );
};

export default SeriesCard;