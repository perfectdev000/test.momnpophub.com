import React from 'react';
import {Button} from 'react-bootstrap';
import SuccessMessage from '../success-message';
import './Alert-block.css';

const AlertBlock = ({ onClose }) => {
    const success = {
        title: 'Success!',
        desc: 'Email invitations to your customers has been sent!'
    }
    return (
        <div className="position-absolute  d-flex align-items-center alert-block bg-white mx-auto">
   <SuccessMessage success={success}/>
            <Button variant='link' className='position-absolute alert-block__close shadow-none p-0'
                onClick={() => onClose()}
            >
                <i className="icon-close"/>
            </Button>
        </div>
    )
}

export default AlertBlock