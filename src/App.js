import styles from './App.module.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieDetails from './components/Moviedetails';
import SeriesDetails from './components/Seriesdetails';
import NavBar from './components/NAVBAR/Navbar';
import MediaList from './components/Medialist';
import MediaResults from './components/Mediaresults';

function App() {

  return (
    <div className={styles.container}>
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' element={<MediaList apiPoint='movie/now_playing' title='Aktuelle Kinofilme' mediaType='movie' />} />
          <Route path='/movielist' element={<MediaList apiPoint='movie/popular' title='Beliebte Filme' mediaType='movie' />} />
          <Route path='/moviedetails/:id' element={<MovieDetails />} />
          <Route path='/moviesearch/:suchbegriff' element={<MediaResults mediaType='movie'  />} />
          <Route path='/serieslist' element={<MediaList apiPoint='tv/top_rated' title='Beliebte Serien' mediaType='series' />} />
          <Route path='/seriesdetails/:id' element={<SeriesDetails />} />
          <Route path='/seriessearch/:suchbegriff' element={<MediaResults mediaType='tv' />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
