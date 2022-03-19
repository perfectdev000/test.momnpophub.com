import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import InstallButton from "./install_button";

import "./about_signup.css";

const AboutSignup = (props) => {

    const history = useHistory();

    const toFreeSignUp = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        if(props.where != 'Bus')
            history.push("/free-business-invitation");
    }

  return (
    <>
        <div className="part_block">
            <div className="row custom_container">
                <div className='about_signup_left'>
                    <div className='about_signup_title'>
                        The only platform exclusive to small business
                    </div>
                    <div className='about_signup_text'>
                        List your business On Mom n Pop Hub for FREE
                    </div>
                    <button onClick={toFreeSignUp} className='about_signup_btn'> Free Sign Up</button>
                    <div className='about_signup_bottom'>
                        <InstallButton type='google'/>
                        <InstallButton type='app'/>
                    </div>
                </div>
                <div className='about_signup_right'>                   
                        <div className='about_signup_img'></div>                    
                </div>
                <div className='fixedButton'>
                    <div className='btnTxt'><a href='https://onelink.to/7f52xq' target="_blank" style={{color: 'white'}}> Mobile App</a></div>
                </div>
            </div>            
        </div>
    </>
  );
};

export default AboutSignup;
