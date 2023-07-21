import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/Trailercard.module.css';
import TrailerModal from './Trailermodal';

//Komponente, die einen Trailer für einen bestimmten Film oder eine Serie anzeigt.
const TrailerCard = ({ id: idProp, type }) => {
    // idParam ist die Film- oder Serien-ID, die aus der URL abgerufen wird.
    const { id: idParam } = useParams();
    // id wird entweder aus den Props oder aus der URL abgerufen.
    const id = idProp || idParam;

    // Schluessel der von der API aberufen wird.
    const [trailerKey, setTrailerKey] = useState(null);
    // Gibt den Zustand des Modals an.
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // useEffect wird verwendet, um die Trailerdetails abzurufen, wenn die ID oder der Typ sich ändert.
    useEffect(() => {
        const fetchTrailer = async () => {
            const response = await axios.get(`https://api.themoviedb.org/3/${type}/${id}/videos`, {
                params: {
                    api_key: process.env.REACT_APP_MOVIEDB_API_KEY,
                    language: 'de-DE'
                }
            });
            setTrailerKey(response.data.results && response.data.results.length > 0 ? response.data.results[0].key : null);

        };

        // Sobald Daten geladen, wird die Funktion aufgerufen.
        fetchTrailer();
    }, [id, type]);

    // oeffnen des Trailer-Modal.
    const openModal = () => {
        setModalIsOpen(true);
    };

    // schliessen des Trailer-Modal.
    const closeModal = () => {
        setModalIsOpen(false);
    };

    // Die TrailerCard zeigt einen Play-Button an, wenn ein Trailer verfügbar ist.
    // Beim Klick auf den Button wird ein Modal mit dem Trailer geöffnet.
    return (
        <div>
            {trailerKey && (
                <div>
                    <div className={styles.playButtonContainer}>
                        <button className={styles.playButton} onClick={openModal}></button>
                    </div>
                    <TrailerModal isOpen={modalIsOpen} closeModal={closeModal} trailerKey={trailerKey} />
                </div>
            )}
        </div>
    );
};

export default TrailerCard;
