import React, { useContext, useEffect, useState, useCallback } from "react";
import { useTheme } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import MobileStepper from "@material-ui/core/MobileStepper";
import axios from "axios";
import Button from "@material-ui/core/Button";
import queryString from "query-string";
import Loader from "react-loader-spinner";
import UserContext from "../../../contexts/userContext";
import achImg from "../../../assets/images/ach.png";
import achDescImg from "../../../assets/images/ach-desc.png";
import stripeImg from "../../../assets/images/stripe.png";
import { callApi } from "../../../api/API";
import { empty } from "object-path";
import { Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";


import "./Completed-steper.css";
import { STRIPE_KEY } from "../../../config/constants";

const tutorialSteps = [
  {
    label: "first",
  },
  {
    label: "second",
  },
];

const CompletedSteper = ({ verify }) => {
  let history = useHistory();
  const theme = useTheme();
  const { userData, setUserData } = useContext(UserContext);
  const [connecting, setConneting] = useState(false);
  const [accountLinkStatus, setLinkStatus] = useState(null);
  const [activeStep, setActiveStep] = React.useState(1);
  const location = useLocation();

  const [accountInfoApiCall, setAccountInfoApiCall] = useState({
    didCall: false,
    success: false,
    error: false,
  });

  const maxSteps = tutorialSteps.length;
  const connectWithStripe = async () => {
    setConneting(true);
    const account =  await callApi("/payments/createaccount","POST", {
      email: userData.uname,
    },  "Bearer " + userData.token);
    if(!empty(account)){
      setConneting(true)
    }
    else{
      setConneting(false)
    }
    
  };

  const openStripeDashboard = async () => {
    //connectWithStripe();
    //https://connect.stripe.com/oauth/authorize?redirect_uri=https://connect.stripe.com/hosted/oauth&client_id=ca_HIyuGdrBTF1PqXUqlQ7WmayIIeVo48Y3&state=onbrd_JjmZaj8xK9DmJFbKSSiy2wqQZx&response_type=code&scope=read_write&stripe_user[country]=US
    console.log("the env is ", process.env);
    window.location =
      "https://connect.stripe.com/oauth/authorize?response_type=code&client_id=" + STRIPE_KEY +
      "&scope=read_write&stripe_user[country]=US";
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const stepOne = (
      <div>
        <div className="row">
          <div className="col-sm-6 mb-2 mb-0">
            <figure className="brand-image d-flex align-content-center justify-content-center flex-column w-100 h-100 logo-container">
              <img src={stripeImg} className="img-fluid w-100 h-auto" alt="" />
            </figure>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <Button
            className="orange-button text-capitalize"
            onClick={handleNext}
          >
            Setup Payment Method
          </Button>
        </div>
      </div>
    ),
    stepTwo = (
      <Form>
        <Form.Group className="d-flex flex-wrap">
          <Form.Label className="label col-sm-6 align-self-center p-0 pr-sm-2">
            Business Account Name
          </Form.Label>
          <Form.Control
            type="text"
            className="input shadow-none col-sm-6"
            placeholder="Business Account Name"
          />
        </Form.Group>
        <Form.Group className="d-flex flex-wrap">
          <Form.Label className="label col-sm-6 align-self-center p-0 pr-sm-2">
            {" "}
            Business ABA/Routing Number
          </Form.Label>
          <Form.Control
            type="text"
            className="input shadow-none col-sm-6"
            placeholder="Business ABA/Routing Number"
          />
        </Form.Group>
        <Form.Group className="d-flex flex-wrap">
          <Form.Label className="label col-sm-6 align-self-center p-0 pr-sm-2">
            {" "}
            Business Account Number
          </Form.Label>
          <Form.Control
            type="text"
            className="input shadow-none col-sm-6"
            placeholder=" Business Account Number"
          />
        </Form.Group>
        <Form.Group className="d-flex flex-wrap">
          <Form.Label className="label col-sm-6 align-self-center p-0 pr-sm-2">
            Business Address associated with the account
          </Form.Label>
          <Form.Control
            type="text"
            className="input shadow-none col-sm-6"
            value="7820 Poplar Ave, Germantown, TN 38138, USA"
            placeholder="Business Address associated with the account"
          />
        </Form.Group>
        <div className="d-flex justify-content-end">
          <Button
            className="orange-button text-capitalize"
            onClick={() => verify(true)}
          >
            Verify payment method
          </Button>
        </div>
      </Form>
    );

  let steps = activeStep === 1 ? stepOne : stepTwo;

  const getAccountInfo = async () => {
 //    setAccountInfoApiCall({
 //      didCall: true,
 //      success: false,
 //     error: false,
 //    });
 //   const getLinkAccount = await callApi(`/payments/getlinkaccount/${userData.id}`, "GET",null, "Bearer " + userData.token);
    axios.get(process.env.REACT_APP_BASEURL+
      `/payments/getlinkaccount/${userData.id}`,
      {},
      {
        headers: {
          'Authorization': `Basic ${userData.token}` 
        }
      }
    ).then((res)=>{
      console.log(res.status);
      console.log("success is");
      console.log("-----------inside");
      if(res.status === 200){
        setAccountInfoApiCall({
          didCall: false,
          success: true,
          error: false,
        });
        setLinkStatus({ linked: true });
        setUserData({ ...userData, accountLinked: "yes" });
      }else if(res.status === 304){
          setAccountInfoApiCall({
            didCall: false,
            success: true,
            error: false,
          });
          setLinkStatus({ linked: true });
          setUserData({ ...userData, accountLinked: "yes" });
        }
      else if(res.status === 404){
        setLinkStatus({ linked: false });
        setAccountInfoApiCall({
          didCall: false,
          success: true,
          error: false,
        });
        setUserData({ ...userData, accountLinked: "no" });
      }
      
    }).catch((err)=>{
      console.log("---------err-------"+err);
      setLinkStatus({ linked: false });
      setAccountInfoApiCall({
        didCall: false,
        success: true,
        error: false,
      });
      setUserData({ ...userData, accountLinked: "no" });
    });
  //   if(getLinkAccount.length>0){
  //     console(getLinkAccount);
  //     if(getLinkAccount?.status==200){
  //     console.log("-----------inside");

  //     setAccountInfoApiCall({
  //       didCall: false,
  //       success: true,
  //       error: false,
  //     });
  //     setLinkStatus({ linked: true });
  //     setUserData({ ...userData, accountLinked: "yes" });
  //   }else if(getLinkAccount?.status === 304){
  //       console.log("-----------inside new");
  
  //       setAccountInfoApiCall({
  //         didCall: false,
  //         success: true,
  //         error: false,
  //       });
  //       setLinkStatus({ linked: true });
  //       setUserData({ ...userData, accountLinked: "yes" });
      
  //   }else if(getLinkAccount?.status ===  404) {
  //     setLinkStatus({ linked: false });
  //         setAccountInfoApiCall({
  //           didCall: false,
  //           success: true,
  //           error: false,
  //         });
  //         setUserData({ ...userData, accountLinked: "no" });
  //   }
  //  } else{
  //     setLinkStatus({ linked: false });
  //         setAccountInfoApiCall({
  //           didCall: false,
  //           success: false,
  //           error: true,
  //         });
  //   }
  };

  const connetWithAuth = async () => {
      const query = queryString.parse(location.search ? location.search : "");
    //if (accountLinkStatus) {
      if (query?.code ) {
        const connectAuth = await callApi("/payments/connectwithauth", "POST", {
          code: query?.code,
          userid: userData.id,
        }, "Bearer " + userData.token);
        console.log(connectAuth);
        if(connectAuth){
          // const linkedAccountAuth = await callApi("/payments/linkaccount", "POST", {
          //   accountid: connectAuth['accountid'],
          //   refresh_url: "https://momnpophub.com/#/business-home",
          //   return_url: "https://momnpophub.com/#/business-home",
          // }, "Bearer " + userData.token);
            setLinkStatus({ linked: true });
            setUserData({ ...userData, accountLinked: "yes" });
            setAccountInfoApiCall({
              didCall: false,
              success: true,
              error: false,
            });
            history.push("/business-home");


        }else{
          setUserData({ ...userData, accountLinked: "no" });
        }
      }
    //  }
    };

  useEffect(() => {
    connetWithAuth()
}, []);

  useEffect(() => {
    if (userData.isLogin) { console.log("****** IS LOGIN === TRUE ****");
      getAccountInfo();
    } else {  console.log("****** IS LOGIN === FALSE ****");
      setAccountInfoApiCall({
        didCall: true,
        success: false,
        error: false,
      });
    }
  }, [userData.isLogin]);

  console.log('-accountInfoApiCall-',accountInfoApiCall);

  return (
    <>
      {accountInfoApiCall.didCall && (
        <div className="text-center">
          <Loader type="Bars" color="#FF992E" />
          <p>Loading payment information...</p>
        </div>
      )}
      {accountInfoApiCall.success && (
        <div style={{ padding: "5%" }}>
          <div className="row">
            <div className="col-sm-6 mb-2 mb-0">
              <figure className="brand-image d-flex align-content-center justify-content-center flex-column w-100 h-100 logo-container">
                <img
                  src={stripeImg}
                  className="img-fluid w-100 h-auto"
                  alt=""
                />
              </figure>
            </div>
          </div>
          {accountLinkStatus && (
            <div className="d-flex justify-content-end">
              {!accountLinkStatus.linked ? (
                <Button
                  className="orange-button text-capitalize"
                  onClick={openStripeDashboard}
                  disabled={connecting}
                >
                  Connect with stripe
                </Button>
              ) : (
                <Button className="orange-button text-capitalize" disabled>
                  Account Linked
                </Button>
              )}
            </div>
          )}
        </div>
      )}
      {accountInfoApiCall.error && (
        <div className="text-center" style={{ padding: "5%" }}>
          <p style={{ color: "red" }}>Problem loading deals</p>
          <Button className onClick={() => getAccountInfo()}>
            Try again
          </Button>
        </div>
      )}
    </>
  );

  //   <div className="stepper-container">
  //     <p className="stepper-container__title">
  //       To start earning, please setup your preferred payment method
  //     </p>
  //     <div>{steps}</div>
  //     <div className="position-absolute stepper-bullets d-flex flex-row flex-sm-column justify-content-between">
  //       <div className="stepper-bullets__text">
  //         Step {activeStep} of {maxSteps}
  //       </div>
  //       <MobileStepper
  //         className="justify-content-start p-0 bg-white"
  //         steps={maxSteps}
  //         position="static"
  //         variant={null}
  //         activeStep={activeStep}
  //         nextButton={
  //           activeStep !== maxSteps ? (
  //             <Button
  //               className="next rounded-circle p-0"
  //               size="small"
  //               onClick={handleNext}
  //               disabled={activeStep === maxSteps}
  //             ></Button>
  //           ) : null
  //         }
  //         backButton={
  //           activeStep !== maxSteps ? (
  //             <Button
  //               className="back rounded-circle p-0"
  //               size="small"
  //               onClick={handleBack}
  //               disabled={activeStep === 1}
  //             ></Button>
  //           ) : null
  //         }
  //       />
  //     </div>
  //   </div>;
};

export default CompletedSteper;
