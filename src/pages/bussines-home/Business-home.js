import React, { useEffect } from "react";

import queryString from "query-string";
import Details from "../../components/details";
import BankInformation from "../../components/bank-information";
import BusinessProfile from "../../components/business-profile";
import Customers from "../../components/customers/Customers";
import "./Business-home.css";

const BusinessHome = ({ location }) => {
  return (
    <div className=" col-xl-11 mx-auto main-container container">
      <div className="row">
        <div className="col-xl-6  mb-4">
          <Customers query={location.search} />
        </div>
        <div className="col-xl-6 mb-4">
          <div className="bg-white secttion-container w-100 h-100 d-flex flex-column justify-content-between">
            <Details />
          </div>
        </div>
        <div className="col-xl-6  mb-4">
          <div className="bg-white secttion-container w-100 h-100">
            <BankInformation />
          </div>
        </div>
        <div className="col-xl-6  mb-4">
          <div className="bg-white secttion-container w-100 h-100">
            <BusinessProfile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessHome;
