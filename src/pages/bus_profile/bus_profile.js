import React, { useEffect, useState }  from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import "./bus_profile.css";
import percentImg from '../../assets/images/percent.png';
import store_logo from '../../assets/images/store_logo.png';
import online_logo from '../../assets/images/online_logo.png';
import { SettingsInputAntennaTwoTone } from "@material-ui/icons";
const BusProfile = (props) => {
    const [profile, setProfile] = useState({});
    const [deals, setDeals] = useState([]);
    const [distance, setDistance] = useState(false);
    let history = useHistory();
    
    useEffect(() => {
        props.setWhere(false);
        if(props.selectedProfileId){
            getProfileData();
        } else
            history.push('/about-us');
      }, []);

    useEffect(()=> {      
        if(props.selectedDealId) { 
            props.setSelectedProfileId(false);
            history.push('/ddetail');
        }
    }, [props.selectedDealId]);

    useEffect(()=> {      
        if(profile.btype=='offline') { 
            getMyLocation();
        }
    }, [profile]);

    const getProfileData = () => {
        axios
        .post(process.env.REACT_APP_BASEURL + "/getinfo/profile", {id:props.selectedProfileId})
        .then((response) => { console.log(response.data);
            if(response.data == 'fail')
                alert("Opps, such a profile doesn't exist.");
            else {
                setProfile(response.data.profile);
                setDeals(response.data.deals);
                console.log("Profile Page URL : " + process.env.REACT_APP_BASEURL + "/businessinfo/profile/" + response.data.profile._id);
            }
        })
        .catch((err) => { 
            console.log('ERROR : ' + err);
            alert('ERROR : ' + err);
         });         
    }

    const calculateDistance = (position) => {
        var lat1 = profile.lat;
        var lon1 = profile.long;
        var lat2 = position.coords.latitude;
        var lon2 = position.coords.longitude;
        console.log(lat1 + ',' + lon1 + '/' + lat2 + ',' + lon2);
        var R = 6371; // Radius of the earth in km
        var dLat = (lat2-lat1)*(Math.PI/180)
        var dLon = (lon2-lon1)*(Math.PI/180) 
        var a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) * 
            Math.sin(dLon/2) * Math.sin(dLon/2)
            ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        var mile = d / 1.6093;
        mile = mile - mile%1;
        setDistance(mile);
    };
    const getMyLocation = () => {
        window.navigator.geolocation
        .getCurrentPosition(calculateDistance, console.log);
    };  

    const navToDeal = (id) => {
        props.setSelectedDealId(id);
    }
    const openMap = () => {
        var lat = profile.lat;
        var lng = profile.long;
        // If it's an iPhone..
        if ((navigator.platform.indexOf("iPhone") !== -1) || (navigator.platform.indexOf("iPod") !== -1)) {
            function iOSversion() {
            if (/iP(hone|od|ad)/.test(navigator.platform)) {
                // supports iOS 2.0 and later
                var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
                return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
            }
            }
            var ver = iOSversion() || [0];
    
            var protocol = 'http://';
            if (ver[0] >= 6) {
            protocol = 'maps://';
            }
            window.location = protocol + 'maps.apple.com/maps?daddr=' + lat + ',' + lng + '&amp;ll=';
        }
        else {
            window.open('http://maps.google.com?daddr=' + lat + ',' + lng + '&amp;ll=');
        }
    }

    const openApp = () => {
        window.location.href=('https://onelink.to/7f52xq');
    }

    const displayAddress = () => {
        if(profile.btype=='offline')
            return (
                <div className='bus_mid_data3'>
                    <div style={{maxwidth: '365px', height: 'auto', position: 'relative'}}>
                        <div style={{width: '14px', height: '19px', float: 'left'}}>
                            <svg width="14" height="19" viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.04688 17.8984C6.36328 18.3906 7.10156 18.3906 7.41797 17.8984C12.5508 10.5156 
                                13.5 9.74219 13.5 7C13.5 3.27344 10.4766 0.25 6.75 0.25C2.98828 0.25 0 3.27344 0 7C0 9.74219 
                                0.914062 10.5156 6.04688 17.8984ZM6.75 9.8125C5.16797 9.8125 3.9375 8.58203 3.9375 7C3.9375 
                                5.45312 5.16797 4.1875 6.75 4.1875C8.29688 4.1875 9.5625 5.45312 9.5625 7C9.5625 8.58203 
                                8.29688 9.8125 6.75 9.8125Z" fill="#D0D0D0"/>
                            </svg>
                        </div>
                        <div style={{width: '100%', marginLeft: '30px', height: 'auto'}}>
                            <b style={{fontWeight: 'normal', marginTop: distance>0?'0px':'10px'}}>{profile.baddress}</b>
                            <p style={{marginTop: '-10px'}}><a  onClick={openMap} target="_blank"  className='bus_mid_link2'> {distance>0?'Distance:'+distance+' miles away':''} </a> </p>
                        </div>
                    </div>                                   
                </div>
            )
    }

  return (
    <>
        <div className="part_block">
            <div className="row other_container">
                <div className='bus_top'>
                    <div className='bus_top_title'>
                        Please, download mobile app for viewing business details and buying deals at your nearby Mom n Pop Shop
                    </div>
                    <button  onClick={openApp} className="bus_top_btn">Open App</button>
                </div>
                <div className='bus_mid'>
                    <div className='bus_mid_header'>
                        <b className='bus_mid_header_title'>Profile</b>
                        <a href={"mailTo: .?Subject=Please check this Business profile page. "+process.env.REACT_APP_BASEURL + "/businessinfo/profile/" + profile._id} className='bus_mid_header_icon'>
                            <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.5312 5.61719C15.8047 5.34375 15.8047 4.93359 15.5312 4.66016L11.5938 
                                0.941406C11.1836 0.558594 10.5 0.832031 10.5 1.43359V3.40234C6.48047 3.40234 3.28125 
                                4.19531 3.28125 8.13281C3.28125 9.69141 4.23828 11.25 5.30469 12.043C5.63281 12.2891 
                                6.09766 11.9883 5.98828 11.5781C4.86719 7.85938 6.53516 6.90234 10.5 6.90234V8.84375C10.5 
                                9.44531 11.1836 9.71875 11.5938 9.33594L15.5312 5.61719ZM10.5 
                                11.1406V13H1.75V4.25H3.11719C3.19922 4.25 3.30859 4.22266 3.36328 4.16797C3.77344 
                                3.73047 4.23828 3.40234 4.75781 3.12891C5.05859 2.96484 4.94922 2.5 4.62109 
                                2.5H1.3125C0.574219 2.5 0 3.10156 0 3.8125V13.4375C0 14.1758 0.574219 14.75 1.3125 
                                14.75H10.9375C11.6484 14.75 12.25 14.1758 12.25 13.4375V11.0312C12.25 10.7852 12.0039 
                                10.6484 11.7852 10.7031C11.6211 10.7852 11.3203 10.8398 11.1562 10.8398C11.0742 10.8398 
                                10.9375 10.8125 10.8555 10.8125C10.6641 10.7852 10.5 10.9219 10.5 11.1406Z" fill="black"/>
                            </svg>
                        </a>
                    </div>
                    <div className='bus_mid_body'>
                        <div className='bus_mid_item1'>
                            <img src={profile.btype=='online'?online_logo:store_logo} width='84px' height='65px' style={{marginTop: '9px', float: 'left', marginRight: '19px'}}/>
                        </div>                        
                        <div className='bus_mid_item2'>
                            <p style={{marginTop: '0px', marginBottom: '0px'}}>{profile.bname}</p>
                            <div className='row' style={{position: 'relative', padding: '0px 15px'}}>
                                <div className='bus_mid_data1'>
                                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16.4062 0.78125L13.1562 0.03125C12.8125 -0.0625 12.4375 0.125 12.2812 0.46875L10.7812 
                                        3.96875C10.6562 4.28125 10.75 4.625 11 4.84375L12.9062 6.40625C11.7812 8.78125 9.8125 10.7812 
                                        7.375 11.9375L5.8125 10.0312C5.59375 9.78125 5.25 9.6875 4.9375 9.8125L1.4375 11.3125C1.09375 
                                        11.4688 0.9375 11.8438 1 12.1875L1.75 15.4375C1.84375 15.7812 2.125 16 2.5 16C10.5 16 17 9.53125 
                                        17 1.5C17 1.15625 16.75 0.875 16.4062 0.78125Z" fill="#D0D0D0"/>
                                    </svg>
                                    <b style={{marginLeft: '10px', fontWeight: 'normal'}}> {profile.phonenumber} </b>
                                </div>
                                <div className='bus_mid_data2' style={{ display: profile.website?'block':'none'}}>
                                    <div style={{width: '18px', height: '18px', float: 'left'}}>
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11.8125 5.875C11.3203 2.74609 10.0898 0.53125 8.71875 0.53125C7.3125 0.53125 6.11719 2.74609 5.58984 5.875H11.8125ZM5.34375 9.25C5.34375 10.0586 5.37891 10.7969 5.44922 11.5H11.9531C12.0234 10.7969 12.0586 10.0586 12.0586 9.25C12.0586 8.47656 12.0234 7.73828 11.9531 7H5.44922C5.37891 7.73828 5.34375 8.47656 5.34375 9.25ZM16.7344 5.875C15.75 3.51953 13.7109 1.65625 11.1797 0.917969C12.0586 2.11328 12.6211 3.90625 12.9375 5.875H16.7344ZM6.22266 0.917969C3.69141 1.65625 1.65234 3.51953 0.667969 5.875H4.46484C4.78125 3.90625 5.34375 2.11328 6.22266 0.917969ZM17.1211 7H13.0781C13.1484 7.73828 13.2188 8.51172 13.2188 9.25C13.2188 10.0234 13.1484 10.7617 13.0781 11.5H17.1211C17.2969 10.7969 17.4023 10.0586 17.4023 9.25C17.4023 8.47656 17.2969 7.73828 17.1211 7ZM4.21875 9.25C4.21875 8.51172 4.25391 7.73828 4.32422 7H0.28125C0.105469 7.73828 0 8.47656 0 9.25C0 10.0586 0.105469 10.7969 0.28125 11.5H4.32422C4.25391 10.7617 4.21875 10.0234 4.21875 9.25ZM5.58984 12.625C6.11719 15.7891 7.3125 17.9688 8.71875 17.9688C10.0898 17.9688 11.3203 15.7891 11.8125 12.625H5.58984ZM11.1797 17.6172C13.7109 16.8789 15.75 15.0156 16.7344 12.625H12.9375C12.6562 14.6289 12.0586 16.4219 11.1797 17.6172ZM0.667969 12.625C1.65234 15.0156 3.69141 16.8789 6.22266 17.6172C5.34375 16.4219 4.78125 14.6289 4.46484 12.625H0.667969Z" fill="#D0D0D0"/>
                                        </svg>
                                    </div>
                                    <div style={{width: '100%', marginLeft: '30px', height: 'auto'}}>
                                        <a href={'https://' + profile.website} target="_blank" className='bus_mid_link'> {profile.website} </a>
                                    </div>
                                </div>
                                {displayAddress()} 
                            </div>
                        </div>
                    </div>
                    <div className='bus_mid_bottom' style={{ display: profile.description?'block':'none'}}>
                        <div className='bus_mid_bottom_title'> About the business </div>
                        <div className='bus_mid_bottom_content' style={{ wordWrap: 'break-word', textIndent: '10px'}}>
                            {profile.description}
                        </div>
                    </div>
                </div>
                <div className='bus_bottom'>
                    <div className='bus_bottom_header'> {deals.length} deals </div>
                    <div className='bus_bottom_body'>
                        <div className='row'>
                            {
                                deals.map((deal)=> 
                                    <div onClick={()=>navToDeal(deal._id)}  className='col-lg-3 col-md-4 col-sm-6 col-12 bus_detail_item'>
                                        <div className='bus_detail_item_icon'>
                                            <img src={percentImg} width='65px' height='65px'/>
                                        </div>
                                        <div className='bus_detail_item_detail'>
                                            <div className='bus_detail_txt1'> {deal.name} </div>
                                            <div className='bus_detail_txt2'> {deal.description} </div>
                                            <div className='bus_detail_txt3'><b>${deal.originalprice}</b> products for <b>${deal.price} </b></div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>              
            </div>
        </div>
    </>
  );
};

export default BusProfile;
