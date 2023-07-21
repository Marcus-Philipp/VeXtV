import React, { useState } from 'react';
import MovieCard from './Moviecard';
import SeriesCard from './Seriescard';
import ActorsCard from './Actorscard';
import styles from '../styles/Mediadetails.module.css';
import { useParams } from 'react-router-dom';

// Stellt Details ueber Filme, Serien und Schauspieler dar.
const MediaDetails = ({ id, type }) => {
    // useParams holt den Parameter aus dem Url-Pfad.
    const { id: idFromParams } = useParams();
    // Wenn ID als Prop, sonst ID aus dem Url-Pfad. 
    const actualId = id || idFromParams;

    // Initialisierung des Zustandes fuer die mediaId.
    const [mediaId, setMediaId] = useState(null);

    // Funktion wird ausgefuehrt, wenn die Film- oder Seriendaten geladen sind.
    const handleMediaLoaded = (id) => {
        setMediaId(id);
    };

    // Je nach Type, wird die entsprechende Komponente dargestellt.
    return (
        <div className={styles.container}>
            {type === 'movie' &&
                <MovieCard id={actualId} onMovieLoaded={handleMediaLoaded} />
            }
            {type === 'tv' &&
                <SeriesCard id={actualId} onSerieLoaded={handleMediaLoaded} />
            }
            {mediaId && <ActorsCard id={mediaId} type={type} />}
        </div>
    );
};


export default MediaDetails;
