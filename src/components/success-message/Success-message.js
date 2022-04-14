import React from 'react';
import {Button} from 'react-bootstrap'
import image from '../../assets/images/img_allert.svg';
import Logo from '../../assets/images/logo/momnpophub-logo.svg';
import './Success-message.css';

const SuccessMessage = ({success}) => {
    return (
        <>
        <figure className="flex-shrink-0 alert-block__img mb-0">
            <img src={image} className="w-100 h-100" alt=""/>
        </figure>
        <div>
            <h4 className="alert-block__title">{success.title}</h4>
            <p className="alert-block__description m-0">
                {success.desc}
            </p>
        </div>
        </>
    )
}

export default SuccessMessage