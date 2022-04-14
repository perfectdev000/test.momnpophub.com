import React from "react";
import { useHistory } from "react-router-dom";

import "./animation_2.css";

import blackLine from '../../../assets/images/blackLine.png';
import img_a_1 from '../../../assets/images/a2-a1.png';
import img_a_2 from '../../../assets/images/a2-a2.png';
import img_a_3 from '../../../assets/images/a2-a3.png';
import img_a_4 from '../../../assets/images/a2-a4.png';
import img_d_1 from '../../../assets/images/a2-d-1.png';
import img_d_2 from '../../../assets/images/a2-d-2.png';
import img_d_3 from '../../../assets/images/a2-d-3.png';
import img_d_4 from '../../../assets/images/a2-d-4.png';

const Animation2 = (props) => {

    const history = useHistory();

    const isInView2 = ($el) => { 
        var blackTop = window.$('#blackLine2').offset().top;
        var elemTop = $el.offset().top; 
        var elemBot = elemTop + $el.height(); 
        return (blackTop >= elemTop && blackTop <= elemBot); 
    }

    const toFreeSignUp = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        if(props.where != 'Bus')
            history.push("/free-business-invitation");
    }
    
    window.$(window).on('scroll', function () {
        window.$('.why2-krisp-item').each(function (i) {
            if (isInView2(window.$('.why2-krisp-item[data-item2=' + i + ']'))) {
                window.$('div[data-img2=' + i + ']').addClass('show').siblings().removeClass('show'); 
            } 
        }) 
    });

  return (
    <>
        <div className="part_block">
            <div className="row custom_container">
                <div className=" container why2-krisp-container">
                    <div className="why2-krisp-inner">
                        <div className="why2-krisp-items-wrapper">
                            <div className='a2_title'>How it works</div>
                            <div className='a2_text'>
                            Understanding new products can be hard. We have captured some of our key features below. 
                            </div>
                            <button onClick={toFreeSignUp} className='a2_btn'> Free Signup </button>
                            <div className="why2-krisp-img-wrapper">
                                <img src={img_a_1} width='100%' height='auto' className='a2-a-img'/>
                            </div>
                            <div className="why2-krisp-item" data-item2="0">                                
                                <div className='a2_sub1_title'>Signup for Free</div>
                                <div className='a2_sub1_text'>
                                Our <a className='link' onClick={toFreeSignUp}>simple signup</a> allows you to signup on our platform and get a FREE profile page for your small business on our website and mobile app. We have a separate section for online and brick and mortar small businesses. A profile page will automatically help your business get more visibility on platforms like Google, Facebook and any other listing service.
                                </div>
                            </div>
                            <div className="why2-krisp-img-wrapper">
                                <img src={img_a_2} width='100%' height='auto' className='a2-a-img'/>
                            </div>
                            <div className="why2-krisp-item" data-item2="1">
                                <div className='a2_sub2_title'>Invite your customers</div>
                                <div className='a2_sub2_text'>
                                Once you have the FREE profile page on our platform. You can invite 500 customers for FREE on your businesses’s profile page on Mom n Pop Hub mobile app. These customers get a free invitation email and your business is automatically favorited for them when they complete the signup with the same email address as the invitation.
                                </div>
                            </div>
                            <div className="why2-krisp-img-wrapper">
                                <img src={img_a_3} width='100%' height='auto' className='a2-a-img'/>
                            </div>
                            <div className="why2-krisp-item" data-item2="2">
                                <div className='a2_sub3_title'>Advertise your deals</div>
                                <div className='a2_sub3_text'>
                                Post a deal for a weekly special or a hot one time sale for these customers. After connecting your business with our payment processor - Stripe, you can post this deal within minutes and it goes live your invited customers and wider community within minutes. Your customers get a email letting them know of a deal you have posted.
                                </div>
                            </div>
                            <div className="why2-krisp-img-wrapper">
                                <img src={img_a_4} width='100%' height='auto' className='a2-a-img'/>
                            </div>
                            <div className="why2-krisp-item" data-item2="3">
                                <div className='a2_sub4_title'>See the transaction in your bank accounts automatically</div>
                                <div className='a2_sub4_text'>
                                Customers purchase and save the purchased deal on the mobile app as well as their email. Stripe processes payment directly to your business’s connected bank account after deducting their per transaction fees. <a href="https://stripe.com/pricing"  target="_blank" style={{color: '#FF7B25'}}>stripe.com/pricing</a> For a limited time, we take <b>zero</b> commission/fees for Mom n Pop Hub platform.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="why2-krisp-image-scroller">
                        <div className="scroller-image-wrapper">
                            <img id='blackLine2' src={blackLine} class='a2_black'/>
                            <div data-img2="0" data-anim="scroller_hd" className="show">
                                <img src={img_d_1} width='571px' height='auto' className='a2-d-img'/>
                            </div>
                            <div data-img2="1" data-anim="scroller_speaker" className="">
                                <img src={img_d_2} width='571px' height='auto' className='a2-d-img'/>
                            </div>
                            <div data-img2="2" data-anim="scroller_parrot" className="">
                                <img src={img_d_3} width='571px' height='auto' className='a2-d-img'/>
                            </div>
                            <div data-img2="3" data-anim="scroller_parrot" className="">
                                <img src={img_d_4} width='571px' height='auto' className='a2-d-img'/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>            
        </div>
    </>
  );
};

export default Animation2;
