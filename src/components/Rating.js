import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Rating = (props) => {
    const [color, setColor] = useState('green');
    const percentage = Math.round((props.vote_average / 10) * 100);

    useEffect(() => {
        if (percentage < 40) {
            setColor('red');
        } else if (percentage < 70) {
            setColor('orange');
        } else {
            setColor('green');
        }
    }, [percentage]);

    return (
        <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
            pathColor: color,
            textColor: color,
        })}
        className={props.className}
        />
    );
};

export default Rating;