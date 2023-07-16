import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Actorscard.module.css';
import defaultPicture from '../Standardbild.jpg';

const ActorsCard = (props) => {
    const [actors, setActors] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActors = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/${props.type}/${props.id}/credits`, {
                    params: {
                        api_key: '6c2bdf00e3bc480f43673a145dd7985d',
                        language: 'de-DE'
                    }
                });

                setActors(response?.data?.cast);
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setLoading(false);
            }
        };

        fetchActors();
    }, [props.id, props.type]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.h2Container}>
                <h2>Hauptdarsteller</h2>
            </div>
            <div className={styles.scrollContainer}>
                {actors && actors.map(actor => (
                    <div className={styles.actorCard} key={actor.id}>
                        <img 
                        src={actor.profile_path ? `https://image.tmdb.org/t/p/w300${actor.profile_path}` : defaultPicture} 
                        alt={actor.name} />
                        <h3>{actor.name}</h3>
                        <p>{actor.character}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActorsCard;