import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './Movielist.module.css';

const MovieList = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchFilme = async () => {
            try {
                const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
                    params: {
                        api_key: '6c2bdf00e3bc480f43673a145dd7985d',
                        language: 'de-DE'
                    }
                });
                setMovies(response.data.results);
            } catch (error) {
                console.error('Fehler', error);
            }
        };

        fetchFilme();
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.h1}>
                <h1>Beliebte Filme</h1>
            </div>
            {movies.map(movie => (
                <div key={movie.id} className={styles.cardContainer}>
                    <Link to={`/moviedetails/${movie.id}`}>
                        <img className={styles.image} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default MovieList;