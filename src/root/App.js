import React, { useEffect, useState, useContext, useCallback } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { withRouter } from "react-router";
import AuthenticatedRoute from "./AuthenticatedRoute";
import UnAuthenticatedRoute from './UnAuthenticatedRoute';
import "./App.css";
import BusinessHome from "../pages/bussines-home/Business-home";
import Home from "../pages/home/Home";
import SignupSuccess from "../pages/signup-success";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import DealDetails from "../pages/deal-details/Deal-details";
import CustomerBusinessApp from "../pages/customer-business-app";
import SignUp from "../pages/sign-up";
import RecoverPassword from "../pages/recover-password";
import LoginPage from "../pages/login";
import UserContext from "../contexts/userContext";
import ResetPassword from "../pages/reset-password";
import MobileResetPassword from "../pages/mobile-reset-page";
import DealContext from "../contexts/dealContext";
import Unsubscribe from "../pages/unsubscribe/unsubscribe";
import { callApi } from "../api/API";
import Term from '../pages/term/term';
import Privacy from '../pages/privacy/privacy';
import About from '../pages/about';
import Business from '../pages/business';
import BusProfile from '../pages/bus_profile/bus_profile';
import Ddetail from '../pages/d_detail/d_detail';
import Logout from '../pages/logout';
import Temp from '../pages/temp';

/*/---------- Adding Google Analytics ---------------
import ReactGA from 'react-ga';
import RouteChangeTracker from './RouteChangeTracker';


const TRACKING_ID = "UA-12341234-1"; // YOUR_OWN_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

ReactGA.exception({
  description: 'An error ocurred',
  fatal: true
});
//--------------------------------------------------*/


const App = ({ match, location, history }) => {
  const [userData, setUserData] = useState({
    token: sessionStorage.getItem("authtoken"),
    id: sessionStorage.getItem("id"),
    uname: "",
    isLogin: false,
    type: undefined,
    btype: undefined,
  });
  const [demo, setDemo] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState(false);
  const [selectedDealId, setSelectedDealId] = useState(false);
  const [dealData, setDealData] = useState({});
  const[where, setWhere] = useState('Home');
  function setNewWhere (val) {
    setWhere(val);
  }


  const getIntData = useCallback(
    async () => {
      const token = sessionStorage.getItem("authtoken");
      const uname  = sessionStorage.getItem("uname")|| "";
      console.log("token=" + token);
      if (!token){
        try {
          const checktoken = await callApi("/users/checktoken","POST", {
            token: token,
          }, "Bearer " + userData.token);
          if(checktoken && checktoken.token) {
            const {token,udata} = checktoken;
            const {email,id,btype} = udata;
            setUserData({
              ...userData,
              isLogin: true,
              token: token,
              uname: email,
              id: id,
              btype: btype,
            });
            sessionStorage.setItem("authtoken",token);
            sessionStorage.setItem("uname", email);

          }
          else{
            console.log(checktoken);
            setUserData({
              ...userData,
              isLogin: false,
              token: null,
              uname: null
            });
            history.push(location.pathname);
          }
    
        } catch (err) {
          setUserData({
            ...userData,
            isLogin: false,
            token: null
          });
          sessionStorage.removeItem("authtoken");
          sessionStorage.removeItem("uname");
          history.push(location.pathname);
        }
      } else {
        // user is may have token but doesn't have uname 
        if(uname === ""){
          setUserData({
            ...userData,
            isLogin: false,
            token: null
          });
          sessionStorage.removeItem("authtoken");
          sessionStorage.removeItem("uname");
          history.push(location.pathname);
        }
        else{
          setUserData({
            ...userData,
            isLogin: true,
            token: token,
            uname: uname
          });
        }
      }
    },
    [history, userData],
  );

  useEffect(() => {      
    getIntData();
  }, []);

  const [isLoggedIn, toggleLogin] = useState(false);
  const loginAndRedirect = (loginSuccess) => {
    toggleLogin(loginSuccess);
    if (loginSuccess) {
      history.push("/business-home");
    }else{
      history.push("/login");
    }
  };
  let mainClass = `${
    location.pathname === "/about-us" ? "home-main-block" : "container"
  }`;

  switch (location.pathname) {
    case "/business-home":
      mainClass = "main-container";
      break;
    case "/profile":
      mainClass = "main-container";
      break;
    case "/ddetail":
      mainClass = "main-container";
      break;
    default:
      mainClass = "";
  }

  return (
    <>
   {/* add main-container container class for business pages */}
    <UserContext.Provider value={{ userData, setUserData, demo, setDemo }}>
      <DealContext.Provider value={{ dealData, setDealData }}>
        <main className={`min-vh-100 ${mainClass}`}>
          <Header isLoggedIn={userData.isLogin} logout={loginAndRedirect} where={where}/>
          <Switch>
            <UnAuthenticatedRoute exact path="/login" render={(props) => <LoginPage {...props} setWhere={setNewWhere} />} />
            <UnAuthenticatedRoute exact path="/mobile-reset" component={MobileResetPassword} />
            <UnAuthenticatedRoute exact path="/free-business-invitation" render={(props) => <Business {...props} setWhere={setNewWhere} where={where} setSelectedProfileId={setSelectedProfileId} setSelectedDealId={setSelectedDealId}/>}/>
            <UnAuthenticatedRoute exact path="/recover" component={RecoverPassword} />
            <UnAuthenticatedRoute exact path="/reset-password" component={ResetPassword} />
            <UnAuthenticatedRoute exact path="/unsubscribe" component={Unsubscribe} />
            <UnAuthenticatedRoute exact path="/term" component={Term} />
            <UnAuthenticatedRoute exact path="/privacy" component={Privacy} />
            <UnAuthenticatedRoute exact path="/about" component={Home} />
            <UnAuthenticatedRoute exact path="/business" component={SignUp} />
            <AuthenticatedRoute exact path="/business-home" component={BusinessHome} />
            <AuthenticatedRoute exact path="/signup-success" component={SignupSuccess} />
            <AuthenticatedRoute exact path="/deal-details" component={DealDetails} />            
            <AuthenticatedRoute exact path="/deal-details" component={DealDetails} />
            
            <UnAuthenticatedRoute exact path="/profile" render={(props) => <BusProfile {...props} setWhere={setNewWhere} selectedProfileId={selectedProfileId} selectedDealId={selectedDealId} setSelectedDealId={setSelectedDealId} setSelectedProfileId={setSelectedProfileId}/>}  />
            <UnAuthenticatedRoute exact path="/ddetail" render={(props) => <Ddetail {...props} setWhere={setNewWhere} selectedDealId={selectedDealId} selectedProfileId={selectedProfileId} setSelectedProfileId={setSelectedProfileId} setSelectedDealId={setSelectedDealId}/>} />
            <AuthenticatedRoute exact path="/logout" component={Logout}/>
            <Route
              exact 
              path="/customer-business-app"
              component={CustomerBusinessApp}
            />
            <Route exact path="/about-us" render={(props) => <About {...props} setWhere={setNewWhere}  where={where} setSelectedProfileId={setSelectedProfileId} setSelectedDealId={setSelectedDealId}/>} />
            <AuthenticatedRoute path="/" component={BusinessHome} />

          </Switch>
          {location.pathname !== "/mobile-reset" && <Footer />}
        </main>
      </DealContext.Provider>
    </UserContext.Provider>
    {/*<RouteChangeTracker/>*/}
    </>
  );
};

export default withRouter(App);
