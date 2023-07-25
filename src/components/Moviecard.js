import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/Moviecard.module.css';
import Rating from './Rating';
import TrailerCard from './Trailercard';
import { useMediaQuery } from 'react-responsive';

// Komponente zeigt bestimmte Details eines Filmes an.
const MovieCard = ({ id: idProp, onMovieLoaded }) => {
    // idParam ist die Film-ID, die aus der URL abgerufen wird.
    const { id: idParam } = useParams();
    // id wird entweder aus den Props oder aus der URL abgerufen.
    const id = idProp || idParam;

    // movie enthält die Daten des Films.
    const [movie, setMovie] = useState(null);
    // imageUrl enthält die URL des Filmposters.
    const [imageUrl, setImageUrl] = useState(null);
    // Initialisiert den Zustand des Ladeverhaltens.
    const [loading, setLoading] = useState(true);

    // Ref fuer den .describe - Container.
    const describeRef = useRef(null);

    // isMobile erkennt, ob der Bildschirm kleiner oder gleich 1200px ist.
    const isMobile = useMediaQuery({
        query: '(max-width: 1200px)'
    });

    // useEffect wird verwendet, um die Filmdaten abzurufen, wenn die Film-ID sich ändert
    useEffect(() => {
        // Laden der Filmdaten.
        const fetchMovie = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
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
                        setMovie(response.data);
                        setImageUrl(url);
                        setLoading(false);
                    };
                    img.onerror = () => {
                        console.error('Error loading image');
                        setLoading(false);
                    }
                    img.src = url;
                } else {
                    setMovie(response.data);
                    setLoading(false);
                }
            } catch (error) {
                console.error('error', error);
                setLoading(false);
            }
        };

        // Wenn eine ID vorhanden ist, wird der Film abgerufen.
        if (id) {
            fetchMovie();
            // Scrollt die Seite an den Anfang.
            window.scrollTo(0, 0);
        }

        // Scrollt den .describe -Container an den Anfang.
        if (describeRef.current) {
            describeRef.current.scrollTop = 0;
        }

    }, [id]);

    // Wenn der Film geladen wurde, wird onMovieLoaded aufgerufen.
    useEffect(() => {
        if (movie && onMovieLoaded) {
            onMovieLoaded(movie.id);
        }
    }, [movie, onMovieLoaded]);

    // Waehrend Daten abgerufen werden, wird eine Ladeanzeige dargestellt.
    if (loading) {
        return <p>Loading...</p>;
    }

    // Hilsfunktion um das nur das Jahr zu Rendern.
    const getYear = () => {
        return movie?.release_date?.substring(0, 4);
    };

    // Hilsfunktion um Veroeffentlichungsdatum zu Rendern.
    const releaseDate = () => {
        if (movie?.release_date) {
            const release = new Date(movie?.release_date);
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
                        <h1>{movie?.title} (<span>{getYear()}</span>)</h1>
                        <div className={styles.details}>
                            <p>{releaseDate()}</p>
                            <p>{movie?.genres?.map(genre => genre.name).join(', ')}</p>
                            <p>Spieldauer: {movie?.runtime} Minuten</p>
                        </div>
                    </div>
                    <div className={styles.media}>
                        <Rating vote_average={movie?.vote_average} className={styles.rating} />
                        <p>Benutzerbewertung</p>
                        <TrailerCard id={id} type='movie' />
                    </div>
                    <div className={styles.describe} ref={describeRef}>
                        <h2>Handlung</h2>
                        <p>{movie?.overview}</p>
                    </div>
                </div>
            ) : (
                <div className={styles.container} style={imageUrl ? { backgroundImage: `linear-gradient(90deg, rgba(31.5, 31.5, 31.5, 1), rgba(31.5, 31.5, 31.5, 0.8)), url(${imageUrl})` } : {}}>
                    <div className={styles.imageContainer}>
                        {movie?.poster_path && (
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                        )}
                    </div>
                    <div className={styles.detailsContainer}>
                        <div className={styles.firstFloor}>
                            <h1>{movie?.title} (<span>{getYear()}</span>)</h1>
                            <div className={styles.details}>
                                <p>{releaseDate()}</p>
                                <p>{movie?.genres?.map(genre => genre.name).join(', ')}</p>
                                <p>Spieldauer: {movie?.runtime} Minuten</p>
                            </div>
                        </div>
                        <div className={styles.media}>
                            <Rating vote_average={movie?.vote_average} className={styles.rating} />
                            <p>Benutzerbewertung</p>
                            <TrailerCard id={id} type='movie' />
                        </div>
                        <div className={styles.describe}>
                            <h2>Handlung</h2>
                            <p>{movie?.overview}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MovieCard;