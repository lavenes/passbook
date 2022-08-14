import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoChevronBack } from 'react-icons/io5';

import "./styles.scss";

export const AppBar = ({ title, actions, leading, fixed }) => {
    const navigate = useNavigate();
    
    return (
        <header className={`appbar ${fixed && "fixed"}`}>
            <div className="appbar__leading">
                { leading }
            </div>
            <div className="appbar__title" onClick={() => navigate(-1)}>
                <span className="title">{ title }</span>
            </div>
            <div className="appbar__actions">
                { actions }
            </div>
        </header>
    )
}

export const ActionButton = ({ icon, onClick }) => {
    return (
        <button className="appbar__action-btn" onClick={onClick}>
            { icon }
        </button>
    )
};

export const ActionBack = ({}) => {
    const navigate = useNavigate();

    return <ActionButton icon={<IoChevronBack/>} onClick={() => navigate(-1)}/>
}

export const AvatarImage = () => {
    return (
        <button className="appbar__avatar-image">
        
        </button>
    )
};