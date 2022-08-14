import React from 'react';
import { Link } from 'react-router-dom';

import "./styles.scss";

export const Button = ({ children, to="#", onClick }) => {
    return (
        <button className="button--primary" onClick={onClick}>
            <Link className="button--primary__link" to={to}>
                {children}
            </Link>
        </button>
    )
}