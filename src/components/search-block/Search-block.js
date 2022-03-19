import React, { useContext, useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "./Search-block.css";
import UserContext from "../../contexts/userContext";
import axios from "axios";
import { callApi } from "../../api/API";

const SearchBlock = ({ fetchApi, addCustomer, setNoCustomers }) => {
  const { register, handleSubmit, errors } = useForm();
  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const { userData, setUserData } = useContext(UserContext);
  const handleSubmitForm = async (payload) => {
    payload.createrid = userData.id;

    const create = await callApi("/customers/create", "POST", payload,  "Bearer " + userData.token);
    if(create){
      addCustomer(false);
      fetchApi();
      setNoCustomers(false);
    }else{
      // TODO: HANLDE ESLSE CONDTION
    }
  };
  const addCustomerForm = async (e) => {
    e.preventDefault();
    //
    const create = await callApi("/customers/create", "POST", {
      fname: fname,
      lname: lname,
      email: email,
      phone: phone,
      userid: userData.id,
    }, "Bearer " + userData.token);
    if(create){
      window.location.reload(false);
    }else{
      // TODO: HANLDE ESLSE CONDTION
    }
  };
  return (
    <Form
      autoComplete="off"
      className="position-absolute w-100 search-block"
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <Form.Group>
        <Form.Control
          autoComplete="off"
          name="fname"
          ref={register({ required: true })}
          type="text"
          className={`input ${errors.fname ? "is-invalid" : ""} shadow-none`}
          placeholder="First name"
        />
        {errors.fname && <p style={{ color: "red" }}>First name is required</p>}
      </Form.Group>
      <Form.Group>
        <Form.Control
          autoComplete="off"
          name="lname"
          ref={register({ required: true })}
          type="text"
          className={`input ${errors.lname ? "is-invalid" : ""} shadow-none`}
          placeholder="Last name"
        />
        {errors.lname && <p style={{ color: "red" }}>Last name is required</p>}
      </Form.Group>
      <Form.Group>
        <Form.Control
          autoComplete="off"
          name="email"
          ref={register({ required: true, pattern: /\S+@\S+\.\S+/ })}
          type="email"
          className={`input ${errors.email ? "is-invalid" : ""} shadow-none`}
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
        <Form.Control
          autoComplete="off"
          name="phone"
          ref={register}
          type="tel"
          className={`input ${errors.phone ? "is-invalid" : ""} shadow-none`}
          placeholder="Business Phone"
        />
        {errors.phone && errors.phone.type === "required" && (
          <p style={{ color: "red" }}>Phone Number is required</p>
        )}
        {errors.phone &&
          (errors.phone.type === "minLength" ||
            errors.phone.type === "maxLength") && (
            <p style={{ color: "red" }}>Phone Number must be 10 digits</p>
          )}
      </Form.Group>
      <Form.Group>
        <Button
          style={{ width: "100%" }}
          variant="link"
          className="text-decoration-none shadow-none settings"
          type="submit"
        >
          Add
        </Button>
      </Form.Group>
    </Form>
  );
};

export default SearchBlock;
