import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import styles from '../styles/Medialist.module.css';
import MediaDetails from './Mediadetails';

// Zeigt eine Liste von Medieninhalten an.
const MediaList = ({ apiPoint, title, mediaType, mediaDetails }) => {
    // Enthaelt Liste von Medien.
    const [items, setItems] = useState([]);
    // FlippedCard speichert dei ID.
    const [flippedCard, setFlippedCard] = useState(null);
    // Initialisiert den Zustand des Ladeverhaltens.
    const [isLoading, setIsLoading] = useState(true);

    // isMobile erkennt, ob der Bildschirm kleiner oder gleich 1200px ist.
    const isMobile = useMediaQuery({
        query: '(max-width: 1200px)'
    });

    useEffect(() => {
        // Laden der Film- oder Seriendaten.
        const fetchItems = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/${apiPoint}`, {
                    params: {
                        api_key: process.env.REACT_APP_MOVIEDB_API_KEY,
                        language: 'de-DE'
                    }
                });
                setItems(response.data.results);
            } catch (error) {
                console.error('error', error);
            }
            // Aktualisierung des Ladezustandes wenn Daten geladen.
            setIsLoading(false);
        };

        // Sobald Daten geladen, wird die Funktion aufgerufen.
        fetchItems();
    }, [apiPoint]);

    // Waehrend Daten abgerufen werden, wird eine Ladeanzeige dargestellt.
    if (isLoading) {
        return <p>Loading...</p>
    }

    // Sobald die Daten geladen sind, wird auf Mobilgeraeten eine Flipeffekt angezeigt
    // und auf den Desktopgeraeten wird eine Verlinkung zur Detailsseite erstellt.
    return (
        <div className={styles.container}>
            <div className={styles.h1}>
                <h1>{title}</h1>
            </div>
            {items.map((item) => (
                isMobile ?
                    <div key={item.id} className={styles.cardContainer}
                        onClick={() => setFlippedCard(flippedCard === item.id ? null : item.id)}>
                        <div className={`${styles.flipCardInner} ${flippedCard === item.id ? styles.flipped : ''}`}>
                            <div className={styles.flipCardFront}>
                                <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title || item.name} />
                            </div>
                            <div className={styles.flipCardBack}>
                                <MediaDetails id={item.id} type={mediaDetails} />
                            </div>
                        </div>
                    </div>
                    :
                    <div key={item.id} className={styles.cardContainer}>
                        <Link to={`/${mediaType}details/${item.id}`}>
                            <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title || item.name} />
                        </Link>
                    </div>
            ))}
        </div>
    );
};

export default MediaList;