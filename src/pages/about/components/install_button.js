import { render } from "@testing-library/react";
import React from "react";

import "./install_button.css";

class InstallButton extends React.Component {
    constructor(props) {
        super(props);
      }
    render() {
        if(this.props.type === 'google'){
            return (
                <div className='installButton'>
                    <div className='buttonSvg'>                                
                        <svg width="35" height="40" viewBox="0 0 35 40" fill="#FF7B25" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.812001 39.2656L0.699671 39.1551C0.25973 38.6762 0 37.9327 0 36.9699V37.1965V2.80295C0 2.79984 0 2.79751 0 2.79502C0 2.79797 0 2.80046 0 2.80357V3.03078C0 1.98821 0.302817 1.20287 0.810185 0.731968L19.5414 19.9994L0.812001 39.2656ZM0 2.79315C0 2.70747 0.00226763 2.62426 0.00650073 2.54231C0.00226763 2.62364 0 2.70747 0 2.79315ZM0.00650073 2.53858C0.00650073 2.53749 0.00649933 2.53624 0.00695288 2.535C0.00649933 2.53624 0.00650073 2.53749 0.00650073 2.53858ZM0.00695288 2.52769C0.00695288 2.52707 0.00695288 2.52645 0.00695288 2.52583C0.00695288 2.52645 0.00695288 2.52707 0.00695288 2.52769Z" fill="#333333"/>
                            <path d="M25.7828 26.6514L25.9252 26.5682L33.3224 22.2447C34.0277 21.8323 34.4977 21.3323 34.7322 20.8032C34.4983 21.3323 34.0282 21.8329 33.3224 22.2453L25.9252 26.5688L25.7828 26.6514ZM25.7846 26.4235L19.54 19.9989L25.784 13.5754L33.3224 17.9808C34.2797 18.5404 34.8172 19.2615 34.907 19.9983C34.907 19.9989 34.907 20.0002 34.907 20.0013C34.8172 20.7364 34.2797 21.4581 33.3224 22.0175L25.7846 26.4235Z" fill="#333333"/>
                            <path d="M2.14898 39.999C1.62574 39.999 1.16917 39.8241 0.813136 39.4936L0.813743 39.493C1.16978 39.8234 1.62695 39.999 2.15019 39.999C2.19555 39.999 2.24166 39.9978 2.28838 39.9954C2.24106 39.9978 2.19434 39.999 2.14898 39.999ZM2.14959 39.7712C1.62635 39.7718 1.16978 39.5962 0.813743 39.2658V39.2653L19.5431 19.9991L25.7877 26.4237L3.84329 39.2494C3.23614 39.6035 2.66089 39.7712 2.14959 39.7712ZM0.808451 39.4894C0.775342 39.4585 0.742837 39.4256 0.710938 39.3916L0.808451 39.4894Z" fill="#333333"/>
                            <path d="M19.5398 19.999L0.808594 0.731569C1.16463 0.401724 1.62059 0.22677 2.14323 0.22677C2.65589 0.22677 3.23159 0.395037 3.83995 0.749765L25.7838 13.5755L19.5398 19.999ZM25.925 13.4304L3.83995 0.522711C3.23159 0.167828 2.65589 -0.000436783 2.14323 -0.000436783C2.14081 -0.000436783 2.13915 -0.000436783 2.13673 -0.000436783C2.13976 -0.000436783 2.14202 -0.000436783 2.14565 -0.000436783C2.6571 -0.000436783 3.2322 0.167206 3.83995 0.522089L25.925 13.4304Z" fill="#333333"/>
                            <line x1="0.792735" y1="0.87771" x2="25.5418" y2="26.4283" stroke="white"/>
                            <path d="M25.4375 13.4873L0.665858 38.968" stroke="white"/>
                        </svg>
                    </div>
                    <a href="https://play.google.com/store/apps/details?id=com.momnpophub" style={{color: '#333333'}} className='buttonTip'> Avaliable on Google Play</a>
                </ div>
            );
        } else if ( this.props.type === 'app') {
            return (
                <div className='installButton'>
                    <div className='buttonSvg'>                                
                        <svg width="35" height="40" viewBox="0 0 35 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M28.0797 21.489C28.1001 19.94 28.5208 18.4213 29.3027 17.0741C30.0846 15.7268 31.2022 14.5949 32.5516 13.7836C31.6943 12.5863 30.5635 11.601 29.2487 10.9059C27.934 10.2108 26.4717 9.82508 24.9779 9.77937C21.7913 9.45227 18.7021 11.6441 17.0782 11.6441C15.423 11.6441 12.9229 9.81185 10.2307 9.86602C8.48927 9.92104 6.79214 10.4163 5.30464 11.3035C3.81714 12.1906 2.58999 13.4395 1.74276 14.9284C-1.92724 21.1424 0.810251 30.2749 4.3258 35.2978C6.08471 37.7574 8.14037 40.5048 10.8302 40.4074C13.4623 40.3006 14.4453 38.766 17.6225 38.766C20.7702 38.766 21.6925 40.4074 24.4369 40.3455C27.2612 40.3006 29.0407 37.8749 30.7379 35.3921C32.0017 33.6395 32.9742 31.7026 33.6193 29.653C31.9784 28.9743 30.5781 27.8382 29.593 26.3864C28.6079 24.9346 28.0816 23.2314 28.0797 21.489Z" fill="#333333"/>
                            <path d="M22.898 6.4779C24.438 4.66996 25.1967 2.34616 25.013 0C22.6602 0.241663 20.487 1.34133 18.9262 3.07991C18.1631 3.92924 17.5786 4.91734 17.2062 5.98771C16.8338 7.05808 16.6808 8.18973 16.7559 9.31798C17.9327 9.32983 19.0969 9.08038 20.1608 8.58843C21.2247 8.09648 22.1606 7.37485 22.898 6.4779Z" fill="#333333"/>
                        </svg>
                    </div>
                    <a href="https://apps.apple.com/us/app/mom-n-pop-hub/id1494101666" style={{color: '#333333'}} className='buttonTip'>Avaliable on App Store</a>
                </div>
            );
        }
    }
};

export default InstallButton;