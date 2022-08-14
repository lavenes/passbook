import React from 'react';

import "./styles.scss";

export const TextInput = ({ icon, placeholder, type="text" }) => {
    return (
        <div className="text-input">
            <div className="text-input__icon">
                { icon }
            </div>

            <input className="text-input__input" type={ type } placeholder={ placeholder } />
        </div>
    )
}