import React, { useState, useEffect, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import UserContext from "../../contexts/userContext";
import LocationAutoComplete from "../../components/location-auto-complete";
import AnalyticsImg from "./../../assets/images/analytics.png";
import DealsImg from "./../../assets/images/deals_list.png";
import scanImg from "./../../assets/images/scan_success.png";
import defaultImage from "./../../assets/images/default.png";
import dsfImage from "./../../assets/images/customer-view/dsf.svg";
import homeBack from "./../../assets/images/how-work-bg.png";
import networkImage from "./../../assets/images/customer-view/network.svg";
import XMLIDImage from "./../../assets/images/customer-view/XMLID.svg";
import favouriteImage from "./../../assets/images/favourite.png";
import mapImage from "./../../assets/images/map.png";
import dealImage from "./../../assets/images/deal.png";
import CheckboxSignupContainer from "./../../components/checkbox-container/checkbox-signup";
import "./Sign-up.css";
import Loader from "react-loader-spinner";
import ReCAPTCHA from "react-google-recaptcha";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const SignUp = () => {
  const { useData, setUserData } = useContext(UserContext);
  const { handleSubmit, register, errors, watch, ...form } = useForm();
  const [check, onCheck] = useState(false);
  const history = useHistory();
  const [robot, setRobot] = useState({ isRobot: true, showRobotErr: false });
  const [coordinates, setCoordinates] = useState({});

  const [showLoad, setShowLoad] = useState({ showLoad: false });
  const [showError, setShowError] = useState({ message: null });
  const [showBaddressError, setBaddressError] = useState(false);

  const handleSubmitForm = (payload) => {
    if (robot.isRobot) {
      setRobot({ ...robot, showRobotErr: true });
      return;
    }
    const { confirmPassword, ...rest } = payload;
    rest["type"] = 1;
    rest["lat"] = coordinates.lat;
    rest["long"] = coordinates.long;
    if (check) {
      rest["btype"] = "online";
    }
    if (!check && !rest.baddress) {
      return setBaddressError(true);
    }
    if (rest.baddress && !check) {
      rest["btype"] = "offline";
    }
    setShowLoad({
      showLoad: true,
    });
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
      .catch((err) => {
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

  return (
    <>
      <div className="logo-container">
        <div className=" col-xl-11 mx-auto">
          <div className="row flex-column flex-md-row">
            <section className="col-md-6">
              <h1 className="general-title">Free Business Signup</h1>
              <p className="description">
                Required form fields are indicated by *
              </p>
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
                <div className="row">
                  <Form.Group className="col-sm-6">
                    <Form.Control
                      autoComplete="chrome-off"
                      name="fname"
                      ref={register({ required: true })}
                      type="text"
                      className={`input ${
                        errors.fname ? "is-invalid" : ""
                      } shadow-none`}
                      placeholder="First Name"
                    />
                    {errors.fname && (
                      <p style={{ color: "red" }}>First name is required</p>
                    )}
                  </Form.Group>
                  <Form.Group className="col-sm-6">
                    <Form.Control
                      autoComplete="chrome-off"
                      name="lname"
                      ref={register({ required: true })}
                      type="text"
                      className={`input ${
                        errors.lname ? "is-invalid" : ""
                      } shadow-none`}
                      placeholder="Last Name"
                    />
                    {errors.lname && (
                      <p style={{ color: "red" }}>Lat name is required</p>
                    )}
                  </Form.Group>
                </div>
                <Form.Group>
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
                <Form.Group>
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

                <Form.Group>
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
                <Form.Group>
                  <LocationAutoComplete
                    name="baddress"
                    form={form}
                    errors={errors}
                    placeholder="Bussiness Address*"
                    getCoordinates={setCoordinates}
                    check={check}
                    disabled={check}
                  />
                  {showBaddressError && (
                    <p style={{ color: "red" }}>Business Address is required</p>
                  )}
                </Form.Group>
                {/* <div className="d-flex align-items-center">
                  <figure className="rounded-circle overflow-hidden upload-image-container flex-shrink-0">
                    <img
                      src={defaultImage}
                      className="img-fluid w-100 h-100"
                      alt=""
                    />
                  </figure>
                  <Form.Group>
                    <Form.Label className="position-relative upload-image">
                      Upload Business logo
                      <Form.Control
                        className="position-absolute upload-image__input"
                        type="file"
                      />
                    </Form.Label>
                    <Form.Text className="upload-image__desc">
                      Business Logo can be added later
                    </Form.Text>
                  </Form.Group>
                </div> */}
                <Form.Group>
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

                <Form.Group>
                  <Form.Control
                    autoComplete="new-password"
                    name="description"
                    ref={register}
                    as="textarea"
                    className="textarea"
                    placeholder="Business Description"
                  />
                </Form.Group>
                <Form.Group>
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

                <Form.Group>
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
                <Form.Group>
                  <ReCAPTCHA
                    onChange={(value) => {
                      setRobot({ isRobot: false, showRobotErr: false });
                    }}
                    onExpired={(expired) => {
                      setRobot({ isRobot: true, showRobotErr: false });
                    }}
                    sitekey="6Lfea-IZAAAAAAygbpzANjWTq2jzMJNNRSdmidaO"
                  />
                  {robot.showRobotErr && (
                    <p style={{ color: "red" }}>Verify you are not robot</p>
                  )}
                </Form.Group>
                <Button
                  onClick={validateNotRobot}
                  variant="btn"
                  className="red-btn"
                  type="submit"
                >
                  Signup for FREE
                </Button>
              </Form>
            </section>
            <section className="col-md-6">
              <h2 className="general-title mt-5 mt-md-0">
                Frequently Asked Questions by Small Business Owners like
                yourself
              </h2>
              <ol className="pl-0 list-unstyled questions-container">
                <li className="question-item">
                  <h3 className="question-item__title">
                    What is the cost of the platform?
                  </h3>
                  <p className="question-item__description">
                    We are a <span>FREE</span> platform currently. Absolutely no
                    hidden fees.
                  </p>
                </li>
                <li className="question-item">
                  <h3 className="question-item__title">
                    How soon does my business and deals go live?
                  </h3>
                  <p className="question-item__description">
                    Our speed and simplicity have been a key goal to help small
                    businesses. We make your business and deals live within
                    minutes (if not seconds :)
                  </p>
                </li>
                <li className="question-item">
                  <h3 className="question-item__title">
                    How soon do I start seeing customers from our platform?
                  </h3>
                  <p className="question-item__description">
                    We are in early days but most of the small businesses should
                    start seeing customers in first 30 days after creating their
                    first coupon.
                  </p>
                </li>
                <li className="question-item">
                  <h3 className="question-item__title">
                    How can I do I add more deals after my first deal & track
                    results of current deals?
                  </h3>
                  <p className="question-item__description">
                    Download our mobile app and login on business login with
                    account details you just created. After logging in, you can
                    create as many deals as you would like and scan any
                    customers walking up to your business with the deals they
                    saw on Mom n Pop Hub.
                  </p>
                </li>
                <li className="question-item">
                  <h3 className="question-item__title">
                    A customer just walked saying they saw a deal on Mom n Pop
                    Hub for my business, how do I redeem this deal for customer?
                  </h3>
                  <p className="question-item__description">
                    Our mobile app has a scanner specific to your business and
                    deals. Please scan the deal from customer's Mom n Pop Hub
                    mobile app and honor the deals. We automatically put your
                    deals in inactive category if a deal expires and no customer
                    can ever see an expired deal on Mom n Pop Hub platform. It
                    is highly advisable to see customer's deal on Mom n Pop Hub
                    app in order to see only live deals.
                  </p>
                </li>
                <li className="question-item">
                  <h3 className="question-item__title">
                    Can my employees get on Mom n Pop Hub app?
                  </h3>
                  <p className="question-item__description">
                    We allow multiple devices to login with the same business
                    credentials so you can provide your employees with login
                    credentials and they can use it on Android, iPhone's. You
                    can also have your employees sign up a separate account and
                    notify us if you wish to integrate multiple accounts for one
                    business. This can be done by requesting us to link multiple
                    accounts at contact@momnpophub.com.
                  </p>
                </li>
              </ol>
            </section>
          </div>
        </div>
      </div>
      <div className=" col-xl-11 mx-auto">
        <section className="col-lg-8 col-md-10 col-sm-6 mx-auto ">
          <h1 className="general-title text-center view-title">
            Business view
          </h1>
          <div className="view-container">
            <div className="view-item text-center">
              <a href="" className="d-block">
                {" "}
                <img src={AnalyticsImg} className="w-100" alt="" />
              </a>
              <a href="" className="view-item__name text-decoration-none">
                Analytics page
              </a>
            </div>
            <div className="view-item text-center">
              <a href="" className="d-block">
                {" "}
                <img src={DealsImg} className="w-100" alt="" />
              </a>
              <a href="" className="view-item__name text-decoration-none">
                Your Deals page
              </a>
            </div>
            <div className="view-item text-center">
              <a href="" className="d-block">
                {" "}
                <img src={scanImg} className="w-100" alt="" />
              </a>
              <a href="" className="view-item__name text-decoration-none">
                Deal Scanning Success page
              </a>
            </div>
          </div>
        </section>
      </div>
      <div className=" col-xl-11 mx-auto">
        <section className="col-lg-8 col-md-10 col-sm-6 mx-auto ">
          <h1 className="general-title text-center view-title">
            Customer view
          </h1>
          <div className="view-container">
            <div className="view-item text-center">
              <a href="" className="d-block">
                {" "}
                <img src={favouriteImage} className="w-100" alt="" />
              </a>
              <a href="" className="view-item__name text-decoration-none">
                Analytics page
              </a>
            </div>
            <div className="view-item text-center">
              <a href="" className="d-block">
                {" "}
                <img src={mapImage} className="w-100" alt="" />
              </a>
              <a href="" className="view-item__name text-decoration-none">
                Your Deals page
              </a>
            </div>
            <div className="view-item text-center">
              <a href="" className="d-block">
                {" "}
                <img src={dealImage} className="w-100" alt="" />
              </a>
              <a href="" className="view-item__name text-decoration-none">
                Deal Scanning Success page
              </a>
            </div>
          </div>
        </section>
      </div>
      <div className=" col-xl-11 mx-auto">
        <section className="col-lg-9 col-md-12 col-sm-7 mx-auto ">
          <h1 className="general-title text-center view-title">
            Benefits for small business owners
          </h1>
          <div className="view-container">
            <figure className="view-item text-center text-center">
              <img
                src={dsfImage}
                className="view-item__image"
                height="110"
                alt=""
              />
              <figcaption className="view-item__name text-decoration-none">
                Simplify customer acquisition through small business promotion
                on a single platform as opposed to multiple marketing platforms.
              </figcaption>
            </figure>
            <figure className="view-item text-center text-center flex-column">
              <img
                src={networkImage}
                className="view-item__image "
                height="110"
                alt=""
              />
              <figcaption className="view-item__name text-decoration-none">
                Simplify customer acquisition Retain and engage customers
                locally and nationally at a cost 90% cheaper than other
                platforms. .
              </figcaption>
            </figure>
            <figure className="view-item text-center text-center flex-column">
              <img
                src={XMLIDImage}
                className="view-item__image"
                height="110"
                alt=""
              />
              <figcaption className="view-item__name text-decoration-none">
                Simplify customer acquisition Use the power of analytics and
                marketing to drive your small business growth, just like larger
                business at a fraction of the cost.
              </figcaption>
            </figure>
          </div>
        </section>
      </div>
      <div className="how-it-work-container position-relative">
        <img
          src={homeBack}
          className="position-absolute how-it-work__bg"
          alt=""
        />
        <div className=" col-xl-11 mx-auto">
          <section className="how-it-work__info mx-auto">
            <h1 className="general-title text-center">How it works</h1>
            <p className="text-center how-work-desc">
              We are the only platform connecting small businesses to millions
              of customers who love supporting you! The 3 steps below show how
              Mom N’ Pop Hub’s platform works.
            </p>
          </section>
          <div className=" col-xl-11 mx-auto">
            <section className="col-lg-6 col-sm-8 mx-auto ">
              <ul className="steps list-unstyled pl-0">
                <li className="steps__item">
                  <div>
                    <h3 className="steps__item__title">
                      Signup and Create your First Deal
                    </h3>
                    <p className="steps__item__desc">
                      Signup your Small Business with our platform and add your
                      existing or new deal on any product or services you offer.
                      All this within a matter of minutes for
                      <span>FREE.</span>
                    </p>
                  </div>
                </li>
                <li className="steps__item">
                  <div>
                    <h3 className="steps__item__title">
                      We Promote Your Business & Deals
                    </h3>
                    <p className="steps__item__desc">
                      We use the power of marketing, data science to advertise
                      your business and deal to customers locally and
                      nationally.
                    </p>
                  </div>
                </li>
                <li className="steps__item mb-0">
                  <div>
                    <h3 className="steps__item__title">
                      Acquire New Customers & Track Growth
                    </h3>
                    <p className="steps__item__desc">
                      Your business starts getting new customers and you can
                      scan the deals using the mobile app. You can track the
                      progress of your coupons and various analytics directly
                      from our small business friendly mobile app.
                    </p>
                  </div>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
      <div className="contact-container">
        <section className="col-lg-6  mx-auto ">
          <h1 className="general-title text-center view-title">Contact us</h1>
          <p className="text-center contact-description">
            Please feel free to send your questions to{" "}
            <a href="mailTo:contact@momnpophub.com.">contact@momnpophub.com.</a>
            <br />
            We love helping small businesses.
          </p>
        </section>
      </div>
    </>
  );
};

export default SignUp;
