import React from 'react';
import {Button, Form} from 'react-bootstrap';
import Logo from '../../../assets/images/logo/momnpophub-logo.svg';
import hubspotLogo from '../../../assets/images/logo/hubspot-logo.svg';
import './Customers-settings.css';

const CustomersSettings = () => {
    return (
        <div className="flex-grow-1 table-container  ">
            <div className="settings-container justify-content-between d-flex flex-wrap">
                <div className="d-flex align-items-center item">
                    <Button variant="link"
                            className="rounded-circle flex-shrink-0 text-decoration-none orange-circle-btn d-flex align-items-center justify-content-center shadow-none">
                        <i className="icon-user-plus"/>
                    </Button>
                    <p className="settings-text mb-0">
                        You are ready to invite your customers
                        to Mom n Pop Hub mobile app.
                    </p>
                </div>
                <div className="d-flex position-relative item align-items-center">
                    <img src={Logo} className="link-logo position-absolute" alt=""/>
                    <Form.Group controlId="" className="settings-input flex-grow-1">
                        <Form.Control value="hub.com/joinURL?jFHDhs" className="shadow-none" disabled={true}/>
                    </Form.Group>
                    <Button variant="link"
                            className="text-decoration-none add-link d-flex align-items-center justify-content-center shadow-none flex-shrink-0">
                        <i className="icon-link"/>
                    </Button>
                </div>
                <div className="d-flex align-items-center item">
                    <Button variant="link"
                            className="rounded-circle text-decoration-none orange-circle-btn d-flex align-items-center justify-content-center shadow-none">
                        <i className="icon-link"/>
                    </Button>
                    <p className="settings-text mb-0">
                        You’ve successfully connected your HubSpot account.
                    </p>
                </div>
                <div className="d-flex position-relative item align-items-center">
                    <div className="settings-input__div d-flex align-items-center flex-grow-1">
                        <i className="icon-check-circle checked-settings d-flex"/>
                        Connected <img src={hubspotLogo}  alt=""/>
                    </div>
                    <Button variant="link"
                            className="text-decoration-none flex-shrink-0 d-flex align-items-center justify-content-center shadow-none sync-btn">
                        <i className="icon-sync"/>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CustomersSettings;