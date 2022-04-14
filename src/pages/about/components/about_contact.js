import React from "react";
import InstallButton from "./install_button";
import "./about_contact.css";

const AboutContact = () => {

  return (
    <>
        <div className="part_block">
            <div className="row custom_container">
                <div className='about_contact_title'>
                    Contact Us
                </div>
                <div className='about_contact_text'>
                    Please feel free to send your questions to <a href="mailTo: contact@momnpophub.com.?Subject=I'd like to contact you." className="about_contact_link" style={{color: '#FF7B25'}}>contact@momnpophub.com</a>. We love helping small businesses
                </div>
                <div className='about_contact_bottom'>
                    <InstallButton type='google'/>
                    <InstallButton type='app'/>
                </div>              
            </div>
        </div>
    </>
  );
};

export default AboutContact;
