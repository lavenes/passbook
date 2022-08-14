import React from 'react';
import * as Icon from 'react-icons/io5';

import "./styles.scss";

export const Ticket = () => {
    return (
        <div className="ticket">
            <div className="ticket__head">
                <div className="ticket__head__logo">
                    <img className="ticket__head__logo__image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png"/>
                </div>
                <div className="ticket__head__badge">
                    <span className="ticket__head__badge__title">Concert</span>
                </div>
                {/* <div className="ticket__head__actions">
                    <button className="ticket__head__actions__button">
                        <Icon.IoShareOutline/>
                    </button>
                </div> */}
            </div>

            <h1 className="ticket__title">Tyler The Creator</h1>
            <p className="ticket__description">Lorem ip sum lorem ipsum lam nb knsjd m 🎻</p>
            
            <div className="ticket__divide--line"></div>

            <div className="ticket__content">
                <div className="ticket__content__row">
                    <div className="ticket__content__row__col">
                        <span className="ticket__content__title">Place</span>
                        <span className="ticket__content__value">New York, Madison Square Garden</span>
                    </div>
                </div>

                <div className="ticket__content__row">
                    <div className="ticket__content__row__col">
                        <span className="ticket__content__title">Date</span>
                        <span className="ticket__content__value">08.09.2022</span>
                    </div>
                    <div className="ticket__content__row__col">
                        <span className="ticket__content__title">Time</span>
                        <span className="ticket__content__value__feature">9:11 AM</span>
                    </div>
                </div>
                
                <div className="ticket__content__row">
                    <div className="ticket__content__row__col">
                        <span className="ticket__content__title">Section</span>
                        <span className="ticket__content__value">101</span>
                    </div>
                    <div className="ticket__content__row__col">
                        <span className="ticket__content__title">Seat</span>
                        <span className="ticket__content__value">31</span>
                    </div>
                </div>
                
                <div className="ticket__content__row">
                    <div className="ticket__content__row__col">
                        <span className="ticket__content__title">Costs</span>
                        <span className="ticket__content__value">$300</span>
                    </div>
                    <div className="ticket__content__row__col">
                        <span className="ticket__content__title">Order</span>
                        <span className="ticket__content__value">12345</span>
                    </div>
                </div>
            </div>

            <div className="ticket__divide"></div>

            <div className="ticket__content">
                <div className="ticket__content__row">
                    <div className="ticket__content__row__col">
                        <span className="ticket__content__title">QR Code</span>
                        <div className="ticket__content__qr-code">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}