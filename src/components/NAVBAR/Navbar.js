import React from 'react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import logo from '../../Logo_VeXtV.png';
import Search from '../SUCHE/Search';

function NavBar() {
    return (
        <nav className={styles.container}>
            <Link to='./'>
                <img src={logo} alt='Logo' className={`${styles.icon} ${styles.element1}`} />
            </Link>
            <Link to='/movielist' className={styles.button}>Top Filme</Link>
            <Link to='/serieslist' className={styles.button}>Top Serien</Link>
            <Search />
        </nav>
    );
}

export default NavBar;
