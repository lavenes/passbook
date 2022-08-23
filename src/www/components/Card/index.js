import React from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

import "./styles.scss";

export const FeatureCard = ({ style, onClick, id, to="#", image }) => {
    return (
        <motion.div className="card--feature" style={ style } onClick={onClick} layoutId={id && `card-container-${id}`}>
            <Link to={to}>
                <motion.div className="card--feature-image" layoutId={id && `card-image-container-${id}`} style={{ backgroundImage: `url(${ image })` }}></motion.div>
            </Link>
        </motion.div>
    )
}

export const SquareCard = ({ style, onClick, id, to="#", title, overlay, image }) => {
    return (
        <motion.div className="card--square" style={ style } onClick={onClick} layoutId={id && `card-container-${id}`}>
            <Link to={to}>
                <motion.div style={{ backgroundImage: `url(${image})` }} className={`card--square-image ${ overlay ? "overlay" : "" }`} layoutId={id && `card-image-container-${id}`}>
                    <motion.span className="card--square__title">{ title }</motion.span>
                </motion.div>
            </Link>
        </motion.div>
    )
}

export const ProductCard = ({ style, onClick, id, to="#", title, owner, price, image }) => {
    return (
        <motion.div className="card--product" style={ style } onClick={onClick} layoutId={id && `card-container-${id}`}>
            <Link to={to}>
                <motion.div className="card--product__image" layoutId={id && `card-image-container-${id}`} style={{ backgroundImage: `url(${image})` }}></motion.div>
                <div className="card--product__content">
                    <motion.span className="card--product__content__owner" layoutId={id && `card-content-owner-${id}`}>{ owner }</motion.span>
                    <motion.span className="card--product__content__title" layoutId={id && `card-content-title-${id}`}>{ title }</motion.span>
                    <motion.span className="card--product__content__price" layoutId={id && `card-content-price-${id}`}>{ price } ICP</motion.span>
                </div>
            </Link>
        </motion.div>
    )
}

export const CollectionCard = ({ style, onClick, id, to="#", title, subtitle, images }) => {
    return (
        <motion.div className="card--collection" style={ style } onClick={onClick} layoutId={id && `card-container-${id}`}>
            <Link to={to}>
                <motion.div className="card--collection__image" layoutId={id && `card-image-container-${id}`}>
                    <div className="card--collection__image__front" style={{ backgroundImage: `url(${ images[0] })` }}></div>
                    <div className="card--collection__image__back"  style={{ backgroundImage: `url(${ images[1] })` }}></div>
                    <div className="card--collection__image__back"  style={{ backgroundImage: `url(${ images[2] })` }}></div>
                </motion.div>

                <div className="card--collection__content">
                    <motion.span className="card--collection__content__owner" layoutId={id && `card-content-owner-${id}`}>{ subtitle }</motion.span>
                    <motion.span className="card--collection__content__title" layoutId={id && `card-content-title-${id}`}>{ title }</motion.span>
                </div>
            </Link>
        </motion.div>
    )
}

export const BalanceCard = ({ style, onClick, to="#", balance }) => {
    return (
        <div className="card--balance" style={ style } onClick={onClick}>
            <Link to={to}>
                <div className="card--balance__content">
                    <span className="card--balance__content__title">Total Balance</span>
                    
                    <div className="card--balance__content__balance-container">
                        <span className="card--balance__content__balance-container__balance">{ balance } ICP</span>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export const CreatorCard = ({ style, onClick, to="#", name }) => {
    return (
        <div className="card--creator" style={ style } onClick={onClick}>
            <Link to={to} className="card--creator__container">
                <div className="card--creator__container__avatar"></div>
                <div className="card--creator__container__content">
                    <span className="card--creator__container__content__subtitle">Creator</span>
                    <span className="card--creator__container__content__title">{ name }</span>
                </div>
            </Link>
        </div>
    )
}