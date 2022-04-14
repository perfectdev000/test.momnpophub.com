import React from 'react';

import './Payment-settings.css';
import {Button} from "react-bootstrap";
import stripeImg from "../../assets/images/stripe.png";
import achImg from "../../assets/images/ach.png";
import achDescImg from "../../assets/images/ach-desc.png";

const PaymentSettings = () => {
    return (
        <div className=" col-xl-11 mx-auto">
            <div className="row">
                <div className="col-xl-12  mb-4">
                    <div className="bg-white section-container w-100 h-100 d-flex flex-column justify-content-between">
                        <div className="flex-grow-1  d-flex flex-column">
                            <header
                                className="d-flex justify-content-between justify-content-center section-container__header">
                                <h2 className="title m-0  d-flex align-items-center">Payment Settings</h2>
                            </header>
                        </div>

                        <div className="flex-grow-1 d-flex flex-row flex-wrap">
                            <div className="col-12 col-xl-6 p-0 block sub-container">
                                <div
                                    className="d-flex justify-content-between justify-content-center section-container__header sub-container__header">
                                    <h2 className="sub-container__title m-0  d-flex align-items-center">Payment Options</h2>
                                    <div className="d-flex">
                                        <Button type="button"
                                                className="btn border-0 bg-transparent shadow-none p-0">
                                            <i className="icon-pen sub-container__orange-btn edit-btn"/>
                                            <span className="sub-container__orange-btn">Edit payment options</span>
                                        </Button>
                                    </div>
                                </div>

                                <div className="mt-2 d-flex flex-column">
                                    <div className="col-12 d-flex">
                                        <figure
                                            className="brand-image col-3 orange-border d-flex align-content-center justify-content-center flex-column">
                                            <img src={achImg} className="img-fluid" alt=""/>
                                            <img src={achDescImg} className="mt-1 img-fluid cl-house" alt=""/>
                                        </figure>
                                        <figure
                                            className="brand-image col-3 d-flex align-content-center justify-content-center flex-column ml-4">
                                            <img src={stripeImg} className="img-fluid" alt=""/>
                                        </figure>
                                    </div>

                                    <div className="col-12">
                                        <ul className="list-unstyled information-list">
                                            <li> Business Account Name</li>
                                            <li>
                                                Joe Flowers
                                            </li>
                                            <li>
                                                LLC Business ABA/Routing Number
                                            </li>
                                            <li>
                                                067014822
                                            </li>
                                            <li> Business Account Numbe</li>
                                            <li>
                                                UA213223130000026007233566001
                                            </li>
                                            <li>
                                                Business Address associated with the account
                                            </li>
                                            <li>
                                                7820 Poplar Ave, Germantown, TN 38138, USA
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-xl-6 p-0 sub-container">
                                <div
                                    className="d-flex justify-content-between justify-content-center section-container__header sub-container__header">
                                    <h2 className="sub-container__title m-0  d-flex align-items-center">Get Paid</h2>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
};

export default PaymentSettings;