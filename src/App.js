import styles from './App.module.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MediaDetails from './components/Mediadetails';
import NavBar from './components/Navbar';
import MediaList from './components/Medialist';
import MediaResults from './components/Mediaresults';

function App() {

  return (
    <div className={styles.container}>
      <Router>
        <NavBar />
        <Routes>
          <Route path='/VeXtV' element={<MediaList apiPoint='movie/now_playing' title='Aktuelle Kinofilme' mediaType='movie' mediaDetails='movie' />} />
          <Route path='/movielist' element={<MediaList apiPoint='movie/popular' title='Beliebte Filme' mediaType='movie' mediaDetails='movie' />} />
          <Route path='/moviedetails/:id' element={<MediaDetails type='movie' />} />
          <Route path='/moviesearch/:suchbegriff' element={<MediaResults mediaType='movie' to='movie' />} />
          <Route path='/serieslist' element={<MediaList apiPoint='tv/top_rated' title='Beliebte Serien' mediaType='series' mediaDetails='tv' />} />
          <Route path='/seriesdetails/:id' element={<MediaDetails type='tv' />} />
          <Route path='/seriessearch/:suchbegriff' element={<MediaResults mediaType='tv' to='series' />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
