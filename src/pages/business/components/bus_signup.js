
/*
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "../../../contexts/userContext";
import { Form, Button } from "react-bootstrap";
import LocationAutoComplete from "../../../components/location-auto-complete";
import Loader from "react-loader-spinner";
import CheckboxSignupContainer from "../../../components/checkbox-container/checkbox-signup";
import ReCAPTCHA from "react-google-recaptcha";
import { useHistory } from "react-router-dom";
import upload from '../../../assets/images/upload.png';
import { useForm } from "react-hook-form";

import InstallButton from "../../about/components/install_button";
import "./bus_signup.css";
*/
import React, { useState, useEffect, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import UserContext from "../../../contexts/userContext";
import LocationAutoComplete from "../../../components/location-auto-complete";
import CheckboxSignupContainer from "../../../components/checkbox-container/checkbox-signup";
import Loader from "react-loader-spinner";
import ReCAPTCHA from "react-google-recaptcha";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import InstallButton from "../../about/components/install_button";
import upload from '../../../assets/images/upload.png';
import "./bus_signup.css";

const BusSignup = () => {
    const { useData, setUserData } = useContext(UserContext);
    const { handleSubmit, register, errors, watch, ...form } = useForm();
    const [check, onCheck] = useState(false);
    const history = useHistory();
    const [robot, setRobot] = useState({ isRobot: true, showRobotErr: false });
    const [coordinates, setCoordinates] = useState({});
    
    const [showLoad, setShowLoad] = useState({ showLoad: false });
    const [showError, setShowError] = useState({ message: null });
    const [showBaddressError, setBaddressError] = useState(false);
    const [description, setDescription] = useState('');

    const handleSubmitForm = (payload) => {
/*  //KACKEY--------      
    if (robot.isRobot) {
        setRobot({ ...robot, showRobotErr: true });
        return;
      }*/

        const { confirmPassword, ...rest } = payload;
        rest["type"] = 1;
        rest["lat"] = coordinates.lat;
        rest["long"] = coordinates.long;
        rest['description'] = description;
        if (check) {//KACKEY--------
          rest["btype"] = "online";
        } else {
            rest["btype"] = "offline";
        }
    /*    if (!check && !rest.baddress) {
          return setBaddressError(true);
        }
        if (rest.baddress && !check) {
          rest["btype"] = "offline";
        } */  rest['baddress'] = 'business address';
        setShowLoad({
          showLoad: true,
        });
        //KACKEY--------
        axios
          .post(process.env.REACT_APP_BASEURL + "/users/create", rest)
          .then((response) => {
            setUserData({
              isLogin: true,
              uname: response.data.udata.email,
              token: response.data.token,
              type: response.data.udata.type,
              id: response.data.udata.id,
              btype: response.data.udata.btype
            });
            sessionStorage.setItem("authtoken", response.data.token);
            sessionStorage.setItem("uname", response.data.udata.email)
            sessionStorage.setItem("id", response.data.udata.id);
            sessionStorage.setItem("uname", response.data.udata.email);
            history.push("/business-home");
          })
         .catch((err) => { console.log(err);
             console.log("The err ", err.response.data);
            if (err.response.data) {
              setShowError(err.response.data);
            } else {
              setShowError({ message: "Something went wrong" });
            }
            window.scrollTo({ top: 0, behavior: "smooth" });
          }); 
      };
  
      const validateNotRobot = () => {
        if (!check && !form.getValues("baddress")) {
          setBaddressError(true);
        }
        if (robot.isRobot) {
          setRobot({ ...robot, showRobotErr: true });
          return;
        }
      };
        
    useEffect(
        () => {
        if (check || watch("baddress")) {
            setBaddressError(false);
        }
        },
        [check],
        watch("baddress")
    );
    
    useEffect(() => {
        register({ name: "baddress", required: true });
    }, []);

    const onInputChange = (event) => { 
        setDescription(event.target.value);
    }

    return(
        <>
            <div className="part_block">
                <div className="row custom_container">
                    <div className='bus_sign_left'>
                        <div className='bus_sign_title'>
                            Free Business Signup
                        </div>
                        <div className='bus_sign_text'>
                            Simply fill this form and grow your business with Mom n Pop Hub
                        </div>
                        <div className='bus_signup_bottom'>
                            <InstallButton type='google'/>
                            <InstallButton type='app'/>
                        </div>
                    </div>
                    <div className='bus_sign_right'>                   
                        <div className='bus_sign_formdetail'>
                            Required form fields are indicated by *
                        </div>
                        <Form
                            autoComplete="off"
                            className="login-form"
                            onSubmit={handleSubmit(handleSubmitForm)}
                        >    
                            {showLoad.showLoad ? (
                            <Loader
                                type="Bars"
                                color="#FF992E"
                                height={30}
                                width={100}
                                timeout={2000} //3 secs
                            />
                            ) : null}
                            {showError.message ? (
                            <p style={{ color: "red" }}> {showError.message}</p>
                            ) : null}    
                            <div className='bus_sign_name'>
                                <Form.Group className="bus_sign_firstname bus_sign_inputstyle">
                                    <Form.Control
                                    autoComplete="chrome-off"
                                    name="fname"
                                    ref={register({ required: true })}
                                    type="text"
                                    className={`input ${
                                        errors.fname ? "is-invalid" : ""
                                    } shadow-none`}
                                    placeholder="First Name *"
                                    />
                                    {errors.fname && (
                                    <p style={{ color: "red" }}>First name is required</p>
                                    )}
                                </Form.Group>
                                <Form.Group className="bus_sign_lastname bus_sign_inputstyle">
                                    <Form.Control
                                    autoComplete="chrome-off"
                                    name="lname"
                                    ref={register({ required: true })}
                                    type="text"
                                    className={`input ${
                                        errors.lname ? "is-invalid" : ""
                                    } shadow-none`}
                                    placeholder="Last Name *"
                                    />
                                    {errors.lname && (
                                    <p style={{ color: "red" }}>Last name is required</p>
                                    )}
                                </Form.Group>    
                            </div>
                            <Form.Group className="bus_sign_busname bus_sign_inputstyle">
                                <Form.Control
                                    autoComplete="chrome-off"
                                    name="bname"
                                    ref={register({ required: true })}
                                    type="text"
                                    className={`input ${
                                    errors.bname ? "is-invalid" : ""
                                    } shadow-none`}
                                    placeholder="Business Name *"
                                />
                                {errors.bname && (
                                    <p style={{ color: "red" }}>Business Name is required</p>
                                )}
                            </Form.Group>
                            <Form.Group className='bus_sign_busphone bus_sign_inputstyle'>
                                <Form.Control
                                    autoComplete="chrome-off"
                                    name="phonenumber"
                                    ref={register({
                                    required: true,
                                    minLength: 10,
                                    maxLength: 10,
                                    })}
                                    type="tel"
                                    className={`input ${
                                    errors.phonenumber ? "is-invalid" : ""
                                    } shadow-none`}
                                    placeholder="Business Phone *"
                                />
                                {errors.phonenumber &&
                                    errors.phonenumber.type === "required" && (
                                    <p style={{ color: "red" }}>Phone Number is required</p>
                                    )}
                                {errors.phonenumber &&
                                    (errors.phonenumber.type === "minLength" ||
                                    errors.phonenumber.type === "maxLength") && (
                                    <p style={{ color: "red" }}>
                                        Phone Number must be 10 digits
                                    </p>
                                    )}
                            </Form.Group>       
                            <Form.Group className="bus_sign_email bus_sign_inputstyle">
                                <Form.Control
                                    autoComplete="chrome-off"
                                    name="email"
                                    ref={register({ required: true, pattern: /\S+@\S+\.\S+/ })}
                                    type="email"
                                    className={`input ${
                                    errors.email ? "is-invalid" : ""
                                    } shadow-none`}
                                    placeholder="Email Address *"
                                />
                                {errors.email && errors.email.type === "required" && (
                                    <p style={{ color: "red" }}>Email is required</p>
                                )}
                                {errors.email && errors.email.type === "pattern" && (
                                    <p style={{ color: "red" }}>Invalid email</p>
                                )}
                            </Form.Group>
                            <CheckboxSignupContainer
                            labetText="We are an online business only"
                            change={() => onCheck(!check)}
                            /> 
                            <Form.Group className='bus_sign_busaddress bus_sign_inputstyle'>
                                <LocationAutoComplete
                                    name="baddress"
                                    form={form}
                                    /*errors={errors}*/
                                    placeholder="Business Address*"
                                    getCoordinates={setCoordinates}
                                    check={check}
                                    disabled={check}
                                />
                                {/*showBaddressError && (//KACKEY--------
                                    <p style={{ color: "red" }}>Business Address is required</p>
                                )*/}
                            </Form.Group>       
                            <div className='bus_sign_uploadlogo'>
                                <img src={upload} className='bus_upload_img'/>
                                <a href='#' className='bus_upload_link'>Upload Business logo</a> 
                                <div className="bus_upload_detail">Business Logo can be added later</div>   
                            </div> 
                            <Form.Group className='bus_sign_buswebsite bus_sign_inputstyle'>
                                <Form.Control
                                    autoComplete="chrome-off"
                                    name="website"
                                    ref={register({
                                    required: check,
                                    pattern: /(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,63}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?/,
                                    })}
                                    type="text"
                                    className={`input ${
                                    errors.website ? "is-invalid" : ""
                                    }  shadow-none`}
                                    placeholder={`Business Website ${check ? "*" : ""}`}
                                />
                                {errors.website &&
                                    errors.website.type === "required" &&
                                    check && (
                                    <p style={{ color: "red" }}>
                                        Business Website is required
                                    </p>
                                    )}

                                {errors.website && errors.website.type === "pattern" && (
                                    <p style={{ color: "red" }}>Invalid Website</p>
                                )}
                            </Form.Group>
                            <textarea autocomplete='new-password' name='description' value={description}
                            placeholder='Business Description' onChange={onInputChange} className='bus_sign_busdesc'/>
                            <Form.Group className='bus_sign_psw bus_sign_inputstyle'>
                                <Form.Control
                                     
                                    autoComplete="chrome-off"
                                    name="password"
                                    ref={register({
                                    required: true,
                                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                                    })}
                                    type="password"
                                    className={`input ${
                                    errors.password ? "is-invalid" : ""
                                    } shadow-none`}
                                    placeholder="Enter Password *"
                                />
                                {errors.password && errors.password.type === "required" && (
                                    <p style={{ color: "red" }}>Password is required</p>
                                )}
                                {errors.password && errors.password.type === "pattern" && (
                                    <>
                                    <p style={{ color: "red" }}>
                                        Strong password is required! Password must include
                                        lowercase, uppercase and numeric character and must be 8
                                        or longer charcters
                                    </p>
                                    </>
                                )}
                            </Form.Group>
                            <Form.Group className='bus_sign_repsw bus_sign_inputstyle'>
                                <Form.Control
                                    autoComplete="new-password"
                                    name="confirmPassword"
                                    ref={register({
                                    required: true,
                                    validate: (value) => value === watch("password"),
                                    })}
                                    type="password"
                                    className={`input ${
                                    errors.confirmPassword ? "is-invalid" : ""
                                    } shadow-none`}
                                    placeholder="Confirm Password *"
                                />
                                {errors.confirmPassword &&
                                    errors.confirmPassword.type === "required" && (
                                    <p style={{ color: "red" }}>
                                        Confirm password is required
                                    </p>
                                    )}
                                {errors.confirmPassword &&
                                    errors.confirmPassword.type === "validate" && (
                                    <p style={{ color: "red" }}>Passwords do not match</p>
                                    )}
                            </Form.Group>
                            
                            <Form.Group className='captcha'>
                            {/*<ReCAPTCHA //KACKEY--------
                                onChange={(value) => {
                                setRobot({ isRobot: false, showRobotErr: false });
                                }}
                                onExpired={(expired) => {
                                setRobot({ isRobot: true, showRobotErr: false });
                                }}
                                sitekey="6Lfea-IZAAAAAAygbpzANjWTq2jzMJNNRSdmidaO"
                            />*/}
                            {/*robot.showRobotErr && (
                                <p style={{ color: "red" }}>Verify you are not robot</p>
                            )*/}
                            </Form.Group>        
                            <Button
                                variant="btn"
                                className="bus_sign_btn"
                                type="submit"
                                >
                                Sign Up
                            </Button>
                        </Form> 
                    </div>
                    <div className='fixedButton'>
                        <div className='btnTxt'><a href='https://onelink.to/7f52xq' target="_blank" style={{color: 'white'}}> Mobile App</a></div>
                    </div>                    
                </div>            
            </div>
        </>
    );
};

export default BusSignup;