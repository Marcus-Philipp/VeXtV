import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Actorscard.module.css';
import defaultPicture from '../Standardbild.jpg';

// Informationen ueber die Schauspieler eines Filmes oder Serie. 
const ActorsCard = ({ id, type }) => {
    // Initialisiert den Zustand der Schauspieler und des Ladeverhaltens.
    const [actors, setActors] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Laden der Schauspielerinformationen.
        const fetchActors = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/${type}/${id}/credits`, {
                    params: {
                        api_key: process.env.REACT_APP_MOVIEDB_API_KEY,
                        language: 'de-DE'
                    }
                });

                // Aktualisierung des Ladezustandes wenn Daten geladen.
                setActors(response?.data?.cast);
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setLoading(false);
            }
        };

        // Sobald Daten geladen, wird die Funktion aufgerufen.
        fetchActors();
    }, [id, type]);

    // Waehrend Daten abgerufen werden, wird eine Ladeanzeige dargestellt.
    if (loading) {
        return <p>Loading...</p>;
    }

    // Darstellung der Schauspielerinformationen, sobald diese geladen sind.
    return (
        <div className={styles.container}>
            <div className={styles.h2Container}>
                <h2>Hauptdarsteller</h2>
            </div>
            <div className={styles.scrollContainer}>
                {actors && actors.map((actor) => (
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