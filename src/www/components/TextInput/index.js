import React from 'react';

import "./styles.scss";

export const TextInput = ({ icon, placeholder, type="text", onChange, ref }) => {
    return (
        <div className="text-input">
            {
                icon && <div className="text-input__icon">{ icon }</div>
            }

            <input className="text-input__input" type={ type } onChange={ onChange } ref={ ref } placeholder={ placeholder } />
        </div>
    )
}

export const TextArea = ({ placeholder, children, style, onChange, ref }) => {
    return (
        <textarea style={{
            ...style,
            height: 150,
            paddingTop: 12
        }} className="text-input" placeholder={ placeholder } onChange={ onChange } ref={ ref }>{ children }</textarea>
    )
}