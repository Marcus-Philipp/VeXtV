import styles from './App.module.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieList from './components/Movielist';
import MovieDetails from './components/Moviedetails';
import MovieResults from './components/Movieresults';
import SeriesList from './components/Serieslist';
import SeriesDetails from './components/Seriesdetails';
import SeriesResults from './components/Seriesresults';
import BlockBuster from './components/Blockbuster';
import NavBar from './components/NAVBAR/Navbar';

function App() {

  return (
    <div className={styles.container}>
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' element={<BlockBuster />} />
          <Route path='/movielist' element={<MovieList />} />
          <Route path='/moviedetails/:id' element={<MovieDetails />} />
          <Route path='/moviesearch/:suchbegriff' element={<MovieResults />} />
          <Route path='/serieslist' element={<SeriesList />} />
          <Route path='/seriesdetails/:id' element={<SeriesDetails />} />
          <Route path='/seriessearch/:suchbegriff' element={<SeriesResults />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
