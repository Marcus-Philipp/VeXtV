import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './Blockbuster.module.css';

const BlockBuster = () => {
    const [blockBuster, setBlockBuster] = useState([]);

    useEffect(() => {
        const fetchBlockBuster = async () => {
            try {
                const response = await axios.get('https://api.themoviedb.org/3/movie/now_playing', {
                    params: {
                        api_key: '6c2bdf00e3bc480f43673a145dd7985d',
                        language: 'de-DE'
                    }
                });
                setBlockBuster(response.data.results);
            } catch (error) {
                console.error('error', error);
            }
        };

        fetchBlockBuster();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.h1}>
                <h1>Aktuelle Kinofilme</h1>
            </div>
            {blockBuster.map((movie) => (
                <div key={movie.id} className={styles.cardContainer}>
                    <Link to={`/moviedetails/${movie.id}`}>
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default BlockBuster;