import React, { useState } from 'react';
import SeriesCard from './Seriescard';
import ActorsCard from './Actorscard';

const SeriesDetails = () => {
    const [serieId, setSerieId] = useState(null);

    const handleSerieLoaded = (id) => {
        setSerieId(id);
    }; 

    return (
        <div>
            <SeriesCard onSerieLoaded={handleSerieLoaded} />
            {serieId && <ActorsCard id={serieId} type='tv' />}
        </div>
    );
};

export default SeriesDetails;