import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './Moviecard.module.css';
import Rating from './Rating';
import TrailerCard from './Trailercard';

const MovieCard = (props) => {
    const [movie, setMovie] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
                    params: {
                        api_key: '6c2bdf00e3bc480f43673a145dd7985d',
                        language: 'de-DE'
                    }
                });

                const url = response.data.poster_path ? `https://image.tmdb.org/t/p/original${response.data.poster_path}` : null;

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

        fetchMovie();
        window.scrollTo(0, 0);
    }, [id, setMovie]);

    useEffect(() => {
        if (movie && props.onMovieLoaded) {
            props.onMovieLoaded(movie.id);
        }
    }, [movie, props.onMovieLoaded]);

    if (loading) {
        return <p>Loading...</p>;
    }

    const getYear = () => {
        return movie?.release_date?.substring(0, 4);
    };

    const releaseDate = () => {
        if (movie?.release_date) {
            const release = new Date(movie.release_date);
            return release.toLocaleDateString('de-DE');
        } else {
            return null;
        }
    };

    return (
        <div className={styles.container} style={imageUrl ? { backgroundImage: `linear-gradient(90deg, rgba(31.5, 31.5, 31.5, 1), rgba(31.5, 31.5, 31.5, 0.8)), url(${imageUrl})` } : {}}>
            <div className={styles.imageContainer}>
                {movie.poster_path && (
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                )}
            </div>
            <div className={styles.detailsContainer}>
                <div className={styles.firstFloor}>
                    <h1>{movie.title} (<span>{getYear()}</span>)</h1>
                    <div className={styles.details}>
                        <p>{releaseDate()}</p>
                        <p>{movie?.genres?.map(genre => genre.name).join(', ')}</p>
                        <p>Spieldauer: {movie.runtime} Minuten</p>
                    </div>
                </div>
                <div className={styles.media}>
                    <Rating vote_average={movie.vote_average} className={styles.rating} />
                    <p>Benutzerbewertung</p>
                    <TrailerCard type='movie' />
                </div>
                <div className={styles.describe}>
                    <h2>Handlung</h2>
                    <p>{movie.overview}</p>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;