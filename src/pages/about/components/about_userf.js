import React from "react";
import { useHistory } from "react-router-dom";

import "./about_userf.css";

const AboutUserf = (props) => {

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
                <div className='about_userf_left'>
                    <div className='about_userf_title'>
                        User Friendly Website for your Small Business
                    </div>
                    <div className='about_userf_text'>
                        Our simple user friendly web based platform helps you to send deals to customers on the mobile apps within a few clicks. 
                    </div>
                    <button onClick={toFreeSignUp}  className='about_userf_btn'> Free Signup </button>                   
                </div>
                <div className='about_userf_right'>
                    <div className='about_userf_img'></div>
                </div>
            </div>            
        </div>
    </>
  );
};

export default AboutUserf;
