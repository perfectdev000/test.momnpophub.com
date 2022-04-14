import React from 'react';
import stripeImg from '../../../assets/images/stripe.png';
import achImg from '../../../assets/images/ach.png';
import achDescImg from '../../../assets/images/ach-desc.png';

// import 'Completed-steper.css';

const CompletedSetup = () => {
    return (
            <div className="mt-2 d-flex">
                <div className="col-8">
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
                <div className="col-4">
                    <figure className="brand-image d-flex align-content-center justify-content-center flex-column">
                        <img src={stripeImg} className="img-fluid" alt=""/>
                    </figure>
                    <figure className="brand-image orange-border d-flex align-content-center justify-content-center flex-column">
                        <img src={achImg}  className="img-fluid" alt=""/>
                        <img src={achDescImg} className="mt-1 img-fluid cl-house" alt=""/>
                    </figure>
                </div>
            </div>
    )
};

export default CompletedSetup;
