import React, {useEffect} from "react";
import { useHistory } from "react-router-dom";

import AboutSearch from "../about/components/about_search";
import Animation1 from "../about/components/animation_1";
import Animation2 from "../about/components/animation_2";
import BusContact from "./components/bus_contact.js";
import BusSignup from "./components/bus_signup.js";

const Business = (props) => {
    let history = useHistory();
    useEffect(() => {
        props.setWhere('Bus');
      }, []);

  return (
    <>
      <BusSignup/>
      <AboutSearch history={history} setSelectedProfileId={props.setSelectedProfileId} setSelectedDealId={props.setSelectedDealId}/>
      <Animation1/>
      <Animation2/>
      <BusContact/>
    </>
  );
};

export default Business;
