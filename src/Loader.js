import React from 'react';
import loader from './loader.svg';

function Loader({ text }) {
    return (
        <div className="loader">
            <img src={loader} alt={text} />
            <p>{text}</p>
        </div>
    );
}

export default Loader;
