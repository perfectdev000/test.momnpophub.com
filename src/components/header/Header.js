import React, { useContext, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import LoginModal from "../login-modal";

import "./Header.css";
import Logo from "../../assets/images/logo/momnpophub-logo.svg";
import DefaultImage from "../../assets/images/default.png";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";
import UserContext from "../../contexts/userContext";

const useStyles = makeStyles({
  list: {
    width: 350,
  },
  fullList: {
    width: "auto",
  },
});



const Header = ({ isLoggedIn, logout, where }) => {

  useEffect(() => {
    if(where === 'Home'){
      setInHome(1);
    } else {
      setInHome(0);
    }
    if(where === 'Bus'){
      setInBus(1);
    } else {
      setInBus(0);
    }
    if(where === 'Log'){
      setInLog(1);
    } else {
      setInLog(0);
    }
  }, [where]);
 
  const history = useHistory();
  const [inHome, setInHome] = React.useState(1);
  const [inBus, setInBus] = React.useState(0);
  const [inLog, setInLog] = React.useState(0);
  const classes = useStyles();
  const [state, setState] = React.useState({ right: false });
  const [open, setOpen] = React.useState(false);
  const [showLogin, setShowLogin] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(false);
  const { userData, setUserData } = useContext(UserContext);
  let location = useLocation().pathname,
    headerClass = location !== "/home" ? "logout-header" : null;

  const handleClick = () => {
    setOpen(!open);
  };
  const authtok  = sessionStorage.getItem('authtoken')
  const uname = sessionStorage.getItem('uname')
  isLoggedIn = location = '/business-home'  && authtok? true: isLoggedIn
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const onLogout = ()=>{
    sessionStorage.removeItem('authtoken');
    sessionStorage.removeItem('uname');
    setState({ right: false });
    logout(false);
    history.push("/login");
    setUserData({ isLogin: false });
    window.location.reload();
  }
  const navigationLinks = [
    {
      title: "About Us",
      path: "about-us",
    },
    {
      title: "Add Your Business & Deals For FREE",
      path: "free-business-invitation",
    },
  ].map((link, index) => {
    return (
    <React.Fragment key={index + link.title}>
      <Divider />
      <ListItem
        button
        className="justify-content-center"
        selected={location === "/" + link.path}
        classes={{ selected: "active" }}
        onClick={() => {
          setState({ right: false });
          history.push(`/${link.path}`);
        }}
      >
        {link.title}
      </ListItem>
    </React.Fragment>
  )});

  const list = () => (
    <div role="presentation">
      {!isLoggedIn && (
        <List className="logout-header__ite    gin-toggle text-decoration-none">
          <ListItem
            className="d-flex justify-content-center align-items-center"
            onClick={() => setShowLogin(true)}
          >
            {" "}
            <i className="icon-user-active mr-2" />
            Business Login
          </ListItem>
          {navigationLinks}
        </List>
      )}
      {isLoggedIn && (
        <List>
          <ListItem
            button
            onClick={handleClick}
            className="justify-content-center"
          >
            <div className="d-flex align-items-center menu-user">
              <span className="menu-user__name text-dark">
                {uname}
              </span>
              <figure className="rounded-circle overflow-hidden m-0 menu-user__image bg-white">
                <img
                  className="thumbnail-image img-fluid w-100 h-100"
                  src={DefaultImage}
                  alt="user pic"
                />
              </figure>
            </div>
          </ListItem>
          <ListItem>
            <Divider />
            <ListItem
              button
              className={classes.nested}
              onClick={onLogout}
            >
              Log Out
            </ListItem>
          </ListItem>
        </List>
      )}
    </div>
  );
  return (
    <div className={headerClass}>
      {
        location !== '/mobile-reset' && <React.Fragment>
        <Navbar
          className="header-menu col-xl-11 mx-auto d-flex align-content-center justify-content-between"
          expand="xl"
        >
          <Navbar.Brand as={Link} to="/">
            <img src={Logo} alt="" />
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="text-white"
            onClick={toggleDrawer("right", true)}
          />
          {!isLoggedIn && (
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto row">
                <div className='col-1'/>
                <Nav.Link
                  className={`header-menu__item d-flex  p-0 ${
                    location === "/about-us" ? "active" : ""
                  } col-2`} style={{marginLeft:'-20px'}}
                  onClick={() => history.push("/about-us")}
                ><img src={'/dot.png'} width='17px' height='17px' style={{marginRight: '8px', opacity: inHome,transition:'opacity .5s ease'}}/>
                  About Us
                </Nav.Link>
                <Nav.Link
                  className={`header-menu__item d-flex  p-0 ${
                    location === "/free-business-invitation" ? "active" : ""
                  } col-5`}  style={{'margin-left': '-60px'}}
                  onClick={() => history.push("/free-business-invitation")}
                ><img src={'/dot.png'} width='17px' height='17px' style={{marginRight: '8px', opacity: inBus,transition:'opacity .5s ease'}}/>
                  Add Your Business & Deals For{" "}
                  <span className="ml-2"> FREE</span>
                </Nav.Link>
                <Nav.Link
                  className={`header-menu__item d-flex  p-0 ${
                    location === "/login" ? "active" : ""
                  } col-3`}
                  onClick={() => history.push("/login")}
                ><img src={'/dot.png'} width='17px' height='17px' style={{marginRight: '8px', opacity: inLog,transition:'opacity .5s ease'}}/>
                  <i className="icon-user-active mr-2" />
                  Business Login
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          )}
          {isLoggedIn && (
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link
                  className={`header-menu__item d-flex align-items-center p-0 ${
                    location === "/business-home" ? "active" : ""
                  }`}
                  onClick={() => history.push("/business-home")}
                >
                  Business Home
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          )}
          {isLoggedIn && (
            <NavDropdown
              id="basic-nav-dropdown"
              className="header-menu__item header-dropdown"
              title={
                <div className="d-flex align-items-center menu-user">
                  <span className="menu-user__name">{uname}</span>
                  <figure className="rounded-circle overflow-hidden m-0 menu-user__image bg-white">
                    <img
                      className="thumbnail-image img-fluid w-100 h-100"
                      src={DefaultImage}
                      alt="user pic"
                    />
                  </figure>
                </div>
              }
            >
              <Link to="/home">
                <NavDropdown.Item
                  href="#action/3.1"
                  onClick={onLogout}
                >
                  Log Out
                </NavDropdown.Item>
              </Link>
            </NavDropdown>
          )}
        </Navbar>
        <Drawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false).bind(this)}
        >
          {list()}
        </Drawer>
        <LoginModal
          show={showLogin}
          disabled={isDisabled}
          handleShow={() => setShowLogin(true)}
          handleClose={() => setShowLogin(false)}
          handleLogin={() => logout(true)}
          setDisabled={(disabled) => setIsDisabled(disabled)}
        />
      </React.Fragment>
   
      }
    </div>
  );
};

export default Header;
