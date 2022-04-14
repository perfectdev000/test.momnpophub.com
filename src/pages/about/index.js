import React, {useEffect, useContext, useState} from "react";
import UserContext from "../../contexts/userContext";
import { useHistory } from "react-router-dom";

import AboutSignup from "./components/about_signup";
import AboutSearch from "./components/about_search";
import Animation1 from "./components/animation_1";
import Animation2 from "./components/animation_2";
import AboutUserf from "./components/about_userf";
import AboutVideo from "./components/about_video";
import AboutContact from "./components/about_contact";

const About = (props) => {
  useEffect(() => {
      props.setWhere('Home');
    }, []);
  let history = useHistory();

  return (
    <>
      <AboutSignup where={props.where}/>
      <AboutSearch setSelectedProfileId={props.setSelectedProfileId} setSelectedDealId={props.setSelectedDealId} history={history}/>
      <Animation1 where={props.where}/>
      <Animation2 where={props.where}/>
      <AboutUserf where={props.where}/>
      <AboutVideo/>
      <AboutContact/>
    </>
  );
};

export default About;
