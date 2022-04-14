import React from 'react';
import {Button} from 'react-bootstrap'
import './Customers-empty.css';
import customersImage from './../../../assets/images/illustration.svg'
import AlertBlock from '../../alert-block'

const CustomersEmpty = () => {
    return (
        <div className="customers-details-border mb-0 flex-grow-1">
            <div className="customers-details-container position-relative overflow-hidden">
                <div className="position-relative customers-details">
                    <div className="customers-item bg-white align-items-center">
                        <div className="customers-item__number">1.</div>
                        <div className="customers-item__icon-orange">
                            <i className="icon-user rounded-circle overflow-hidden d-flex align-items-center justify-content-center"/>
                        </div>
                        <div className="customers-item__name text-truncate">Mom&Pop</div>
                        <div className="customers-item__price text-truncate">contact@momnpophub.com</div>
                        <div>
                            <Button variant='link' className='customers-item__edit text-decoration-none shadow-none'>
                                <i className="icon-pen"/>
                            </Button>
                        </div>
                    </div>
                    <div className="customers-item bg-white align-items-center">
                        <div className="customers-item__number">1.</div>
                        <div className="customers-item__icon-green">
                            <i className="icon-user rounded-circle overflow-hidden d-flex align-items-center justify-content-center"/>
                        </div>
                        <div className="customers-item__name text-truncate">John Doe</div>
                        <div className="customers-item__price text-truncate">john@example.com</div>
                        <div>
                            <Button variant='link' className='customers-item__edit text-decoration-none shadow-none'>
                                <i className="icon-pen"/>
                            </Button>
                        </div>
                    </div>
                    <div className="customers-item bg-white align-items-center">
                        <div className="customers-item__number">1.</div>
                        <div className="customers-item__icon-purple">
                            <i className="icon-user rounded-circle overflow-hidden d-flex align-items-center justify-content-center"/>
                        </div>
                        <div className="customers-item__name text-truncate">Elizabeth</div>
                        <div className="customers-item__price text-truncate">lizzy@customer.com</div>
                        <div>
                            <Button variant='link' className='customers-item__edit text-decoration-none shadow-none'>
                                <i className="icon-pen"/>
                            </Button>
                        </div>
                    </div>
                    <figure className="d-flex justify-content-center customers-details__image">
                        <img src={customersImage} className="w-50" alt=""/>
                    </figure>
                </div>
                {/*<AlertBlock/>*/}
            </div>
            <div className="position-absolute arrow-line d-flex flex-column align-items-end">
                <svg width="181" height="386" viewBox="0 0 181 386" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0.974977 9.86086C1.13349 7.43293 1.45526 1.2429 1.19678 0.155151C1.41721 1.40516 2.543 0.984415 8.90149 4.52978L0.974977 9.86086Z"
                        stroke="#888888"/>
                    <path
                        d="M62.1119 5.25358C60.7241 4.34607 54.899 1.86082 54.4121 1.27472C55.003 1.90651 53.4616 6.9996 53.0604 8.66373L62.1119 5.25358Z"
                        stroke="#888888"/>
                    <path
                        d="M164.5 385C177.009 351.452 189.745 230.632 169.5 159.5C151 94.5 110.002 52.285 63.0438 20.7869M57 6.5C61.0438 12.1825 64 9.84127 63.0438 20.7869M63.0438 20.7869C46.6986 17.4086 15 20.7869 5 6.5"
                        stroke="black" stroke-opacity="0.42" stroke-dasharray="8 8"/>
                </svg>
            </div>
            <p className="customers-details__description text-center">
                When someone purchases your deal, you’ll see the customer added here.
                Meanwhile, you can import your customer data from <a href="" className="orange-link">Excel</a> or <a
                href="" className="orange-link">HubSpot
            </a></p>
        </div>)
}

export default CustomersEmpty