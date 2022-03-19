import React, { useState, useEffect, useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import UserContext from "../../contexts/userContext";
import { callApi } from "../../api/API";

const LoginPage = ({ logout, setWhere }) => {

  useEffect(() => {
    setWhere('Log');
  }, []);

  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showLoad, setShowLoad] = useState({ showLoad: false });
  const [showError, setShowError] = useState({ message: false });
  const { userData, setUserData } = useContext(UserContext);
  if (userData.isLogin) {
    history.push("/business-home");
  }
  const handleSubmitForm =  async (payload) => {
    setShowLoad({
      showLoad: true,
    });
    try {
      const login = await callApi("/users/login", "POST", payload);
    if(login){
      
      const {udata, token} = login;
      const {email,id,type,btype,key} = udata;
      setUserData({
        isLogin: true,
        uname: email,
        token: token,
        type: type,
        id: id,
        btype: btype,
        key:key
      });
      sessionStorage.setItem("authtoken",token);
      sessionStorage.setItem("id", id);
      sessionStorage.setItem("uname", email);
      sessionStorage.setItem("key",key)
      history.push("/business-home");
    }
    else{
      setShowError({ message: "User" });
    }
    } catch (error) {
      setShowError({ message: "Something Wrong" });
    }
    
  };

  return (
    <>
      <div className="col-sm-4 mx-auto text-center form-group">
        <Form className="login-form" onSubmit={handleSubmit(handleSubmitForm)}>
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
            <p style={{ color: "red" }}>Wrong Username/Password</p>
          ) : null}
          {/*<h2 className="text-center modal-title d-flex align-items-center justify-content-center">
                            Authenticate on <img src={logo} alt=""/></h2>*/}
          <Form.Group>
            <Form.Label className="modal-label">Email address</Form.Label>
            <Form.Control
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
          <Form.Group>
            <Form.Label className="modal-label">Password</Form.Label>
            <Form.Control
              name="password"
              ref={register({ required: true })}
              type="password"
              className={`input ${
                errors.password ? "is-invalid" : ""
              } shadow-none`}
              placeholder="Password"
            />
            {errors.password && (
              <p style={{ color: "red" }}>Password is required</p>
            )}
          </Form.Group>
          <Button variant="btn" className="red-btn w-100" type="submit">
            Log in
          </Button>
          <br />
          <br />
          <Link to="/recover">Forgot your password?</Link>
        </Form>
      </div>
    </>
  );
};

export default LoginPage;
