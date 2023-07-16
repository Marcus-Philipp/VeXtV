import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Search.module.css';
import { useLocation } from 'react-router-dom';

const Search = () => {
    const location = useLocation();
    const [suchbegriff, setSuchbegriff] = useState('');
    const [placeholder, setPlaceholder] = useState('');
    const [path, setPath] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === '/' || location.pathname.includes('movielist') || location.pathname.includes('moviedetails')) {
            setPlaceholder('Suche Filme');
            setPath('moviesearch');
        } else if (location.pathname.includes('serieslist') || location.pathname.includes('seriesdetails')) {
            setPlaceholder('Suche Serien');
            setPath('seriessearch');
        }
    }, [location])

    const handleSearch = () => {

        navigate(`/${path}/${suchbegriff}`);
        setSuchbegriff('');
    };

    const handleKeyDown = (event) => {

        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className={styles.container}>
            <input
                className={styles.input}
                type='text'
                placeholder={placeholder}
                value={suchbegriff}
                onChange={(event) => setSuchbegriff(event.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button
                className={styles.button}
                onClick={handleSearch}
            >
                Suchen</button>
        </div>
    );
};

export default Search;