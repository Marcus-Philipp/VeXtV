import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useParams, Link } from 'react-router-dom';
import styles from '../styles/Mediaresults.module.css';
import { useMediaQuery } from 'react-responsive';
import MediaDetails from './Mediadetails';


const MediaResults = ({ mediaType, to }) => {
    // Enthaelt Liste von Medien.
    const [items, setItems] = useState([]);
    // FlippedCard speichert dei ID.
    const [flippedCard, setFlippedCard] = useState(null);
    // Initialisiert den Zustand des Ladeverhaltens.
    const [isLoading, setIsLoading] = useState(true);

    // UseParams uebergibt den aktuellen Suchbegriff aus der Url.
    const { suchbegriff } = useParams();

    // isMobile erkennt, ob der Bildschirm kleiner oder gleich 1200px ist.
    const isMobile = useMediaQuery({
        query: '(max-width: 1200px)'
    });


    useEffect(() => {
        const fetchItems = async () => {
            // Laden der Film- oder Seriendaten.
            setIsLoading(true);
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/search/${mediaType}`, {
                    params: {
                        api_key: process.env.REACT_APP_MOVIEDB_API_KEY,
                        language: 'de-DE',
                        query: suchbegriff
                    }
                });
                setItems(response.data.results);

            } catch (error) {
                console.error('Fehler', error);
            }
            // Aktualisierung des Ladezustandes wenn Daten geladen.
            setIsLoading(false);
        };

        // Sobald Daten geladen, wird die Funktion aufgerufen.
        fetchItems();
        // Scrollt die Seite an den Anfang.
        window.scrollTo(0, 0);
    }, [suchbegriff, mediaType]);

    // Waehrend Daten abgerufen werden, wird eine Ladeanzeige dargestellt.
    if (isLoading) {
        return <p>Loading...</p>
    }

    // Sobald die Daten geladen sind, wird auf Mobilgeraeten eine Flipeffekt angezeigt
    // und auf den Desktopgeraeten wird eine Verlinkung zur Detailsseite erstellt.
    return (
        <div className={styles.container}>
            <div className={styles.h1}>
                <h1>{suchbegriff}</h1>
            </div>
            {items.map(item => (
                isMobile ?
                    <div key={item.id} className={styles.cardContainer}
                        onClick={() => setFlippedCard(flippedCard === item.id ? null : item.id)}>
                        <div className={`${styles.flipCardInner} ${flippedCard === item.id ? styles.flipped : ''}`}>
                            <div className={styles.flipCardFront}>
                                <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title || item.name} />
                            </div>
                            <div className={styles.flipCardBack}>
                                <MediaDetails id={item.id} type={mediaType} />
                            </div>
                        </div>
                    </div>
                    :
                    <div key={item.id} className={styles.cardContainer}>
                        <Link to={`/${to}details/${item.id}`}>
                            <img className={styles.image} src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title || item.name} />
                        </Link>
                    </div>
            ))}
        </div>
    );
};

export default MediaResults;