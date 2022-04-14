import React from "react";

import "./bus_contact.css";

const BusContact = () => {

  return (
    <>
        <div className="part_block">
            <div className="row custom_container">
                <div className='col-12'>
                    <div className='bus_contact_title'>
                        Contact Us
                    </div>
                    <div className='bus_contact_text'>
                        Please feel free to send your questions to <a href="mailTo: contact@momnpophub.com.?Subject=I'd like to contact you." className="bus_contact_link" style={{color: '#FF7B25'}}>contact@momnpophub.com</a>. We love helping small businesses
                    </div>
                </div>                
            </div>
        </div>
    </>
  );
};

export default BusContact;
