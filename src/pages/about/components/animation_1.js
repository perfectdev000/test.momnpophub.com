import React from "react";
import { useHistory } from "react-router-dom";

import "./animation_1.css";

import blackLine from '../../../assets/images/blackLine.png';
import img_1 from '../../../assets/images/a1-1.png';
import img_2 from '../../../assets/images/a1-2.png';
import img_3 from '../../../assets/images/a1-3.png';
import img_4 from '../../../assets/images/a1-4.png';

const Animation1 = (props) => {

    const history = useHistory();

    const isInView = ($el) => { 
        var blackTop = window.$('#blackLine').offset().top;
        var elemTop = $el.offset().top; 
        var elemBot = elemTop + $el.height(); 
        return (blackTop >= elemTop && blackTop <= elemBot); 
    }
    
    window.$(window).on('scroll', function () {
        window.$('.why1-krisp-item').each(function (i) {
            if (isInView(window.$('.why1-krisp-item[data-item=' + i + ']'))) {
                window.$('div[data-img=' + i + ']').addClass('show').siblings().removeClass('show'); 
            } 
        }) 
    });
    

    const toFreeSignUp = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        if(props.where != 'Bus')
            history.push("/free-business-invitation");
    }

  return (
    <>
        <div className="part_block">
            <div className="row custom_container">
                <div className=" container why1-krisp-container">
                    <div className="why1-krisp-inner">
                        <div className="why1-krisp-items-wrapper">
                            <div className='a1_title'>Benefits</div>
                            <div className='a1_text'>
                                Here are top reasons for small businesses to signup on Mom n Pop Hub. 
                            </div>
                            <button onClick={toFreeSignUp} className='a1_btn'> Free Signup </button>
                            <div className="why1-krisp-img-wrapper">
                                <img src={img_1} width='100%' height='auto' className='a1-a-img'/>
                            </div>
                            <div className="why1-krisp-item" data-item="0">                                
                                <div className='a1_sub1_title'>Attract and Retain Customers</div>
                                <div className='a1_sub1_text'>
                                    88% of the customers used a coupon or deal for shopping. Majority of these coupons or deals benefited large businesses who used this well known marketing tactic to attract new customers or keep them loyal. Attract customers with the same power as large corporations without worrying about the technology or marketing behind it.
                                </div>
                            </div>
                            <div className="why1-krisp-img-wrapper">
                                <img src={img_2} width='100%' height='auto' className='a1-a-img'/>
                            </div>
                            <div className="why1-krisp-item" data-item="1">
                                <div className='a1_sub2_title'>Mobile first for small businesses</div>
                                <div className='a1_sub2_text'>
                                    Mobile apps have been known to have a 100-300% higher conversion than desktop or mobile websites. We are here to help you achieve the power of mobile apps without the cost of technology or marketing behind running a mobile app.
                                </div>
                            </div>
                            <div className="why1-krisp-img-wrapper">
                                <img src={img_3} width='100%' height='auto' className='a1-a-img'/>
                            </div>
                            <div className="why1-krisp-item" data-item="2">
                                <div className='a1_sub3_title'>Only platform exclusive to small businesses</div>
                                <div className='a1_sub3_text'>
                                    The only platform designed exclusively for small businesses. We don’t allow any large business to compete with you here and having a stamp of Mom n Pop hub helps your business gets the validation in the community of being a small business.
                                </div>
                            </div>
                            <div className="why1-krisp-img-wrapper">
                                <img src={img_4} width='100%' height='auto' className='a1-a-img'/>
                            </div>
                            <div className="why1-krisp-item" data-item="3">
                                <div className='a1_sub4_title'>Free CRM — 500 Customers</div>
                                <div className='a1_sub4_text'>
                                    We know it’s hard running a small business and we want to help you by providing a light weight CRM for 500 customers. The CRM primarily helps you engage customers on Mom n Pop Hub mobile app but more features are down the lane.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="why1-krisp-image-scroller">
                        <div className="scroller-image-wrapper">
                            <img id='blackLine' src={blackLine} class='a1_black'/>
                            <div data-img="0" data-anim="scroller_hd" className="show">
                                <img src={img_1} width='571px' height='auto' className='a1-d-img'/>
                            </div>
                            <div data-img="1" data-anim="scroller_speaker" className="">
                                <img src={img_2} width='571px' height='auto' className='a1-d-img'/>
                            </div>
                            <div data-img="2" data-anim="scroller_parrot" className="">
                                <img src={img_3} width='571px' height='auto' className='a1-d-img'/>
                            </div>
                            <div data-img="3" data-anim="scroller_parrot" className="">
                                <img src={img_4} width='571px' height='auto' className='a1-d-img'/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>            
        </div>
    </>
  );
};

export default Animation1;
