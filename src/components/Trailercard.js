import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './Trailercard.module.css';
import TrailerModal from './Trailermodal';

const TrailerCard = (props) => {
    const [trailerKey, setTrailerKey] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const { id } = useParams();
    
    useEffect(() => {
        const fetchTrailer = async () => {
            const response = await axios.get(`https://api.themoviedb.org/3/${props.type}/${id}/videos`, {
                params: {
                    api_key: '6c2bdf00e3bc480f43673a145dd7985d',
                    language: 'de-DE'
                }
            });
            setTrailerKey(response.data.results[0]?.key);
        };

        fetchTrailer();
    }, [id]);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <div>
            {trailerKey && (
                <div>
                    <button className={styles.playButton} onClick={openModal}></button>
                    <TrailerModal isOpen={modalIsOpen} closeModal={closeModal} trailerKey={trailerKey} />
                </div>
            )}
        </div>
    );
};

export default TrailerCard;
