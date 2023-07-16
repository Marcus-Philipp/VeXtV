import React, { useState } from 'react';
import MovieCard from './Moviecard';
import ActorsCard from './Actorscard';

const MovieDetails = () => {
    const [movieId, setMovieId] = useState(null);

    const handleMovieLoaded = (id) => {
        setMovieId(id);
    };

    return (
        <div>
            <MovieCard onMovieLoaded={handleMovieLoaded} />
            {movieId && <ActorsCard id={movieId} type='movie' />}
        </div>
    );
};


export default MovieDetails;
