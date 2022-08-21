import React from 'react';

import './styles.scss';

export const LoadingOverlay = () => {
    return (
        <div className="loading-overlay">
            <div className="loading-overlay__spinner">LOADING ...</div>
        </div>
    )
}