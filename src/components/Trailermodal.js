import React, { useState } from 'react';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

const TrailerModal = ({ isOpen, closeModal, trailerKey }) => {
    return (
        <Modal open={isOpen} onClose={closeModal} center>
            <iframe
                width="700"
                height="400"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title="YouTube video player"
                style={{ border: 0 }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </Modal>
    );
};

export default TrailerModal;