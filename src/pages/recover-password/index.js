import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

const RecoverPassword = () => {
  const { register, handleSubmit, errors } = useForm();
  const [emailSent, setEmailSent] = useState(false);
  const [callingApi, setCallingApi] = useState(false);
  const [robot, setRobot] = useState({ isRobot: true, showRobotErr: false });

  const validateNotRobot = () => {
    if (robot.isRobot) {
      setRobot({ ...robot, showRobotErr: true });
      return;
    }
  };

  const handleSubmitForm = (payload) => {
    setCallingApi(true);
    axios
      .post(
        process.env.REACT_APP_BASEURL + "/users/forgotpasswordtoken",
        payload
      )
      .then((res) => {
        setCallingApi(false);
        if (res.status === 200) {
          setEmailSent(true);
        }
      })
      .catch((err) => {
        setCallingApi(false);
      });
  };

  return (
    <>
      <div className="col-sm-4 mx-auto text-center form-group">
        <h1 className="general-title">Reset Password</h1>
        {emailSent && (
          <>
            <p>Check your email inbox for the next steps.</p>
            <Link to="/recover" onClick={() => setEmailSent(false)}>
              Try a different email
            </Link>
          </>
        )}
        {!emailSent && (
          <Form
            onSubmit={handleSubmit(handleSubmitForm)}
            className="login-form"
          >
            {!callingApi && <p>We'll send you a link to your email address.</p>}
            {callingApi && (
              <>
                <p>Sending reset link to your email</p>
                <Loader color="#FF992E" />
              </>
            )}
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
                <p style={{ color: "red" }}>Email address is required</p>
              )}
              {errors.email && errors.email.type === "pattern" && (
                <p style={{ color: "red" }}>Invalid email</p>
              )}
            </Form.Group>
            <Form.Group className="text-center">
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
            <Button onClick={() => validateNotRobot()} variant="submit" className="red-btn" type="submit">
              Recover Password
            </Button>
            {/*<br/>
                <br/>
                <Link to="/free-business-invitation">Signup</Link> or <Link to="/login">Login</Link>*/}
          </Form>
        )}
      </div>
    </>
  );
};

export default RecoverPassword;
