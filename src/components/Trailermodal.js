import React from 'react';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

// Rendert ein Modal der einen Youtube-Trailer anzeigt.
const TrailerModal = ({ isOpen, closeModal, trailerKey }) => {
    return (
        <Modal open={isOpen} onClose={closeModal} center styles={{
            modal: {
                width: '95%', 
                height: '80%', 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '0 auto',
            }
        }}>
            <iframe
                width="100%"
                height="100%"
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