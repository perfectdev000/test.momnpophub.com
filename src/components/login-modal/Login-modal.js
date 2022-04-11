import React, { useState, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Router, Link } from "react-router-dom";
import "./Login-modal.css";
import Loader from "react-loader-spinner";
import { useHistory } from "react-router-dom";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import axios from "axios";
import UserContext from "../../contexts/userContext";
import hubspotLogo from "../../assets/images/logo/hubspot-logo.svg";
import Logo from "../../assets/images/logo/momnpophub-logo.svg";
import { callApi } from "../../api/API";


import logo from "./../../assets/images/logo/hubspot-logo.svg";

const LoginModal = ({
  show,
  disabled,
  handleShow,
  handleClose,
  handleLogin,
  setDisabled,
}) => {
  let downloadIcon = disabled ? (
    <i className="icon-check-circle check-circle" />
  ) : null;
  let downloadBtn = disabled ? (
    <Button
      variant="link"
      className="download-btn text-decoration-none shadow-none d-flex align-items-center justify-content-center"
      onClick={handleShow}
    >
      <i className=" icon-check-circle check-circle" />
      <i className="icon-download" />
    </Button>
  ) : null;
  const history = useHistory();
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showLoad, setShowLoad] = useState({ showLoad: false });
  const [showError, setShowError] = useState({ message: false });
  const { userData, setUserData } = useContext(UserContext);
  const handleSubmit = async (e) => {
    console.log("inside");
    e.preventDefault();
    setShowLoad({
      showLoad: true,
    });
    try {
      const login = await callApi('/users/login',"POST", {
        email: email,
        password: password,
      }, "Bearer " + userData.token);
     if(login){
       const {token, udata} = login;
       const {id, type} = udata;
       setUserData({
        ...userData,
        isLogin: true,
        uname: udata.email,
        token: token,
        type: type,
        id: id,
      });
      localStorage.setItem("authtoken", token);
      history.push("/business-home");
     }else{
      setShowError({
        message: login.message,
      })
     }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {/*<div className="d-flex justify-content-between">
                <Button variant="link"
                        disabled={disabled}
                        className="connect-btn text-decoration-none shadow-none d-flex align-items-center justify-content-center"
                        onClick={handleShow}>
                    {downloadIcon}
                    Connect <img src={hubspotLogo} alt=""/>
                </Button>
                {downloadBtn}
            </div>*/}
      <Modal show={show} className="login-modal" onHide={handleClose}>
        <Modal.Header className="p-0 border-0" closeButton></Modal.Header>
        <Modal.Body>
          <Form className="login-form" onSubmit={handleSubmit}>
            {showLoad.showLoad ? (
              <Loader
                type="Bars"
                color="#FF992E"
                height={30}
                width={100}
                timeout={2000} //3 secs
              />
            ) : null}
            {showError.message ? <p>Wrong Username/Password</p> : null}
            {/*<h2 className="text-center modal-title d-flex align-items-center justify-content-center">
                            Authenticate on <img src={logo} alt=""/></h2>*/}
            <Form.Group>
              <Form.Label className="modal-label">Email address</Form.Label>
              <Form.Control
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className="input shadow-none"
                placeholder="Email address"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="modal-label">Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="input shadow-none"
                placeholder="Password"
              />
            </Form.Group>
            {/* <Button variant="btn" className="red-btn w-100" type="button" onClick={() => {handleClose(); handleLogin(); setDisabled(true)}}> */}
            <Button variant="btn" className="red-btn w-100" type="submit">
              Log in
            </Button>
            <br />
            <br />
            <Link to="/recover" onClick={handleClose}>
              Forgot your password?
            </Link>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LoginModal;
