import React from 'react';
import styles from '../styles/Navbar.module.css';
import { Link } from 'react-router-dom';
import logo from '../Logo_VeXtV.png';
import Search from './Search';

const NavBar = () => {
    return (
        <nav className={styles.container}>
            <Link to='./VeXtV' className={styles.logoLink}>
                <img src={logo} alt='Logo' className={styles.icon} />
            </Link>
            <Link to='/movielist' className={styles.button}>Top Filme</Link>
            <Link to='/serieslist' className={styles.button}>Top Serien</Link>
            <Search className={styles.search} />
        </nav>
    );
}

export default NavBar;
