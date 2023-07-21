import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/Seriescard.module.css';
import Rating from './Rating';
import TrailerCard from './Trailercard';
import { useMediaQuery } from 'react-responsive';

// Komponente zeigt bestimmte Details einer Serie an.
const SeriesCard = ({ id: idProp, onSerieLoaded }) => {
    // idParam ist die Serien-ID, die aus der URL abgerufen wird.
    const { id: idParam } = useParams();
    // id wird entweder aus den Props oder aus der URL abgerufen.
    const id = idProp || idParam;

    // serie enthält die Daten der Serie.
    const [serie, setSerie] = useState(null);
    // imageUrl enthält die URL des Serienposters.
    const [imageUrl, setImageUrl] = useState(null);
    // Initialisiert den Zustand des Ladeverhaltens.
    const [loading, setLoading] = useState(true);

    // isMobile erkennt, ob der Bildschirm kleiner oder gleich 1200px ist.
    const isMobile = useMediaQuery({
        query: '(max-width: 1200px)'
    });

    // useEffect wird verwendet, um die Seriendaten abzurufen, wenn die Serie-ID sich ändert.
    useEffect(() => {
        // Laden der Seriendaten.
        const fetchSeries = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}`, {
                    params: {
                        api_key: process.env.REACT_APP_MOVIEDB_API_KEY,
                        language: 'de-DE'
                    }
                });

                const url = response.data.poster_path ? `https://image.tmdb.org/t/p/original${response.data.poster_path}` : null;

                // Die Image-URL wird asynchron geladen.
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

        // Wenn eine ID vorhanden ist, wird der Film abgerufen.
        if (id) {
            fetchSeries();
            // Scrollt die Seite an den Anfang.
            window.scrollTo(0, 0);
        }
    }, [id]);

    // Wenn der Serie geladen wurde, wird onSerieLoaded aufgerufen.
    useEffect(() => {
        if (serie && onSerieLoaded) {
            onSerieLoaded(serie.id);
        }
    }, [serie, onSerieLoaded]);

    // Waehrend Daten abgerufen werden, wird eine Ladeanzeige dargestellt.
    if (loading) {
        return <p>Loading...</p>;
    }

    // Hilsfunktion um das nur das Jahr zu Rendern.
    const getYear = () => {
        return serie?.first_air_date?.substring(0, 4);
    };

    // Hilsfunktion um Veroeffentlichungsdatum zu Rendern.
    const releaseDate = () => {
        if (serie?.first_air_date) {
            const release = new Date(serie.first_air_date);
            return release.toLocaleDateString('de-DE');
        } else {
            return null;
        }
    };

    // Sobald die Daten geladen sind, wird auf Mobilgeraeten eine Flipeffekt angezeigt
    // und auf den Desktopgeraeten wird eine Verlinkung zur Detailsseite erstellt.
    return (
        <div className={styles.container}>
            {isMobile ? (
                <div className={styles.detailsContainer}>
                    <div className={styles.firstFloor}>
                        <h1>{serie?.name} (<span>{getYear()}</span>)</h1>
                        <div className={styles.details}>
                            <p>{releaseDate()}</p>
                            <p>{serie?.genres?.map(genre => genre.name).join(', ')}</p>
                            <p>Spieldauer: {serie?.episode_run_time ? serie?.episode_run_time[0] : 'N/A'} Minuten</p>
                        </div>
                    </div>
                    <div className={styles.media}>
                        <Rating vote_average={serie?.vote_average} className={styles.rating} />
                        <p>Benutzerbewertung</p>
                        <TrailerCard id={id} type='tv' />
                    </div>
                    <div className={styles.describe}>
                        <h2>Handlung</h2>
                        <p>{serie?.overview}</p>
                    </div>
                </div>
            ) : (
                <div className={styles.container} style={imageUrl ? { backgroundImage: `linear-gradient(90deg, rgba(31.5, 31.5, 31.5, 1), rgba(31.5, 31.5, 31.5, 0.8)), url(${imageUrl})` } : {}}>
                    <div className={styles.imageContainer}>
                        {serie?.poster_path && (
                            <img src={`https://image.tmdb.org/t/p/w500${serie?.poster_path}`} alt={serie.title} />
                        )}
                    </div>
                    <div className={styles.detailsContainer}>
                        <div className={styles.firstFloor}>
                            <h1>{serie?.name} (<span>{getYear()}</span>)</h1>
                            <div className={styles.details}>
                                <p>{releaseDate()}</p>
                                <p>{serie?.genres?.map(genre => genre.name).join(', ')}</p>
                                <p>Spieldauer: {serie?.episode_run_time ? serie?.episode_run_time[0] : 'N/A'} Minuten</p>
                            </div>
                        </div>
                        <div className={styles.media}>
                            <Rating vote_average={serie?.vote_average} className={styles.rating} />
                            <p>Benutzerbewertung</p>
                            <TrailerCard type='tv' />
                        </div>
                        <div className={styles.describe}>
                            <h2>Handlung</h2>
                            <p>{serie?.overview}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SeriesCard;