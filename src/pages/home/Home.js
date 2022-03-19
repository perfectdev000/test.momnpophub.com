import React, {useContext} from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import UserContext from "../../contexts/userContext";
import defaultImage from "./../../assets/images/man.png";
import dsfImage from "./../../assets/images/customer-view/dsf.svg";
import homeBack from "./../../assets/images/how-work-bg.png";
import networkImage from "./../../assets/images/customer-view/network.svg";
import XMLIDImage from "./../../assets/images/customer-view/XMLID.svg";

import "./Home.css";

const Home = () => {
  const { userData, setUserData } = useContext(UserContext);

  const history = useHistory();

  return (
    <>
      <div className="home-first-block">
        <div className=" col-xl-11 mx-auto">
          <div className="row">
            <div className="col-md-7 d-flex flex-column align-items-center align-items-md-start">
              <h1 className="text-white home-main-block__title text-center text-md-left">
                WE ADVERTISE YOUR SMALL BUSINESS & DEALS FOR FREE
              </h1>
              {!userData.isLogin && (
                <Button
                  variant="btn"
                  className="red-btn"
                  type="button"
                  onClick={() => history.push("/free-business-invitation")}
                >
                  Signup for FREE
                </Button>
              )}
            </div>
            <div className=" col-7 mx-auto col-md-5 home-main-block__img d-none d-md-block">
              <img src={defaultImage} alt="" />
            </div>
          </div>
        </div>
        <div className="col-xl-11 mx-auto">
          <div className="col-lg-6 about">
            <h2 className="about__title">About us</h2>
            <p className="about__description">
              28 million small businesses across the US support 50% of the
              workforce by investing heavily in local their local communities,
              yet these businesses struggle to survive due to rising costs,
              shrinking their customer base, as competition from large
              businesses continues to rise.
            </p>
            <p className="about__description">
              At Mom n’ Pop Hub we highlight small businesses, bringing
              awareness to your products and services. We take pride in being
              the only platform that focuses exclusively on small businesses.
              Using the power of marketing, analytics and technology to help you
              grow, we take the guesswork out of customer acquisition.
            </p>
          </div>
        </div>
      </div>
      <div className="col-xl-11 mx-auto">
        <div className="col-md-8 mx-auto">
          <iframe
            width="100%"
            height="600px"
            src="https://www.youtube.com/embed/dSwYHxV5lLY"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
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

export default Home;
