import React, { useState } from 'react';
import MovieCard from './Moviecard';
import ActorsCard from './Actorscard';
import styles from './Moviedetails.module.css';

const MovieDetails = () => {
    const [movieId, setMovieId] = useState(null);

    const handleMovieLoaded = (id) => {
        setMovieId(id);
    };

    return (
        <div className={styles.detailsContainer}>
            <MovieCard onMovieLoaded={handleMovieLoaded} />
            {movieId && <ActorsCard id={movieId} type='movie' />}
        </div>
    );
};


export default MovieDetails;
