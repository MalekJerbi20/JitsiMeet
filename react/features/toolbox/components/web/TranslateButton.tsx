import React from 'react';
import { useDispatch } from 'react-redux';

const TranslateButton = () => {
    const dispatch = useDispatch();

    const handleClick = () => {
        alert('Translate clicked 🚀');
    };

    return (
        <button
            className="toolbox-button"
            onClick={handleClick}
            title="Translate">
            🌍
        </button>
    );
};

export default TranslateButton;