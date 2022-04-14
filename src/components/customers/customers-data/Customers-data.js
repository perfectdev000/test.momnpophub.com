import React, { useEffect, useContext, useState } from "react";
import { Button, DropdownButton, Form, Modal, Table } from "react-bootstrap";
import UserContext from "../../../contexts/userContext";
import axios from "axios";
import Loader from "react-loader-spinner";
import "./Customers-data.css";
import { useForm } from "react-hook-form";
import SearchBlock from "../../search-block";
import AlertBlock from "../../alert-block/Alert-block";
import { callApi } from "../../../api/API";
import { _empty } from "../../../utils/utils";

const CustomersData = ({
  add,
  addCustomers,
  isInvited,
  showInvitation,
  setTotalLen,
  currentPage,
  pageSize,
}) => {
  const [customerData, setCustomerdata] = useState([]);
  const { userData, setUserData } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [apiCall, setApiCall] = useState({
    didCall: false,
    success: false,
    error: false,
    message: "",
  });

  const [inviteModal, setInviteModal] = useState({
    inviting: false,
    email: "",
  });

  const [noCustomers, setNoCustomers] = useState(false);

  const [selectedItem, setSelectedItem] = useState({
    fname: "",
    lname: "",
    email: "",
    phonenumber: "",
  });

  const { register, handleSubmit, errors } = useForm();

  const editCustomer = async () => {
    const customerUpdate = await callApi(`/customers/update/${selectedItem._id}`, "PUT",selectedItem, "Bearer " + userData.token);
    if(customerUpdate){
      fetchApi();
          setShowModal(false);
    }
    else{
      // todo: show error message
    }
  };

  const inviteViaEmail = (user) => {
    const newUser = { fname: user.fname, lname: user.lname, email: user.email };
    setInviteModal({
      inviting: true,
      email: user.email,
    });
    const massInvite = callApi("/customers/sendmassinvite/", "POST", {
      users: [newUser],
    },  "Bearer " + userData.token);
    if( _empty(massInvite)){
          setInviteModal({ inviting: false, email: "" });
          showInvitation(true);
    }
    else {
      showInvitation(false);
    }
  }

  const fetchApi = async () => {
    setApiCall({
      didCall: true,
      success: false,
      error: false,
      message: "",
    });
    const result = await callApi(`/customers/findbycreater/${userData.id}`, "GET", null, "Bearer " + userData.token);
    console.log('Result->', result);
    if(!_empty(result) && Array.isArray(result)){
      setApiCall({
        didCall: false,
        success: true,
        error: false,
        message: "",
      });
      console.log('the result', result)
      setCustomerdata(result);
      setTotalLen(result.length);
      setUserData({ ...userData, customers: result });
    }
    else if (result?.status === 404){
      setNoCustomers(true);
      setApiCall({ didCall: false, success: false, error: false });
    }else{
      setApiCall({
        didCall: false,
        success: true,
        error: true,
      });
    }
  }
  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <React.Fragment>
      <header className="d-flex justify-content-between justify-content-between secttion-container__header position-relative p-0">
        {add && <SearchBlock fetchApi={fetchApi} addCustomer={addCustomers} setNoCustomers={setNoCustomers} />}
      </header>
      {noCustomers && (
        <div className="text-center" style={{ padding: "5%" }}>
          <p>You have not add any customer yet</p>
          <Button onClick={() => addCustomers(!add)}>Add customers</Button>
        </div>
      )}
      {apiCall.didCall && (
        <div className="text-center">
          <Loader type="Bars" color="#FF992E" />
          <p>Loading customers...</p>
        </div>
      )}

      {apiCall.success && (
        <div className="table-container flex-grow-1 position-relative">
          <table
            className="business-table border-0 m-0"
            style={{ width: "100%" }}
          >
            <thead></thead>
            <tbody>
              {customerData && customerData
                .slice((currentPage - 1) * pageSize, pageSize * currentPage)
                .map((row, index) => (
                  <tr>
                    <td className="align-middle text-center">
                      <a
                        href=""
                        className="d-flex align-items-center user text-decoration-none text-truncate bold-text"
                      >
                        <figure className="rounded-circle overflow-hidden m-0 user__image flex-shrink-0 d-flex align-items-center justify-content-center">
                          {/*<img className="thumbnail-image img-fluid w-100 h-100"*/}
                          {/*alt="user pic"*/}
                          {/*/>*/}
                          <i className="icon-user" />
                        </figure>
                        <span className="user__name">
                          {row.fname + " " + row.lname}
                        </span>
                      </a>
                    </td>
                    <td className="align-middle text-center  table-email">
                      {row.email}
                    </td>
                    <td className="align-middle  text-center text-black">
                      {row.phone}
                    </td>
                    <td className="align-middle text-center dropdown-container position-relative">
                      <DropdownButton
                        id="dropdown-basic-button"
                        className="btn  border-0 bg-transparent shadow-none p-0 table-icon-btn"
                        title={<i className="icon-add-user" />}
                      >
                        <Button
                          type="button"
                          onClick={() => {
                            inviteViaEmail(row);
                          }}
                          className="btn bg-transparent border-left-0 border-right-0 border-top-0 shadow-none d-block w-100 rounded-0"
                        >
                          Invite via Email
                        </Button>
                      </DropdownButton>
                    </td>
                    <td className="align-middle text-center">
                      <button
                        onClick={() => {
                          setShowModal(true);
                          setSelectedItem(row);
                        }}
                        type="button"
                        className="btn table-icon-btn  border-left-0 border-right-0 border-bottom-0 bg-transparent shadow-none p-0"
                      >
                        <i className="icon-pen" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {isInvited && <AlertBlock onClose={() => showInvitation(false)} />}
        </div>
      )}
      {apiCall.error && (
        <div className="text-center" style={{ padding: "5%" }}>
          <p style={{ color: "red" }}>Problem loading customers</p>
          <Button onClick={() => fetchApi()}>Try again</Button>
        </div>
      )}
      <Modal
        size="lg"
        centered
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <Modal.Header closeButton>
          <h5>Edit customer</h5>
        </Modal.Header>
        <Modal.Body>
          <Form autoComplete="off" className="search-block">
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                autoComplete="off"
                name="fname"
                value={selectedItem.fname}
                ref={register({ required: true })}
                type="text"
                className={`input ${
                  errors.fname ? "is-invalid" : ""
                } shadow-none`}
                onChange={(e) =>
                  setSelectedItem({
                    ...selectedItem,
                    ["fname"]: e.target.value,
                  })
                }
                placeholder="First name"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                autoComplete="off"
                name="lname"
                value={selectedItem.lname}
                ref={register({ required: true })}
                type="text"
                className={`input ${
                  errors.lname ? "is-invalid" : ""
                } shadow-none`}
                onChange={(e) =>
                  setSelectedItem({
                    ...selectedItem,
                    ["lname"]: e.target.value,
                  })
                }
                placeholder="Last name"
              />
              {errors.lname && (
                <p style={{ color: "red" }}>Last name is required</p>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                autoComplete="off"
                name="email"
                value={selectedItem.email}
                ref={register({ required: true, pattern: /\S+@\S+\.\S+/ })}
                type="email"
                className={`input ${
                  errors.email ? "is-invalid" : ""
                } shadow-none`}
                onChange={(e) =>
                  setSelectedItem({
                    ...selectedItem,
                    ["email"]: e.target.value,
                  })
                }
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
              <Form.Label>Bussines Phone</Form.Label>
              <Form.Control
                autoComplete="off"
                name="phone"
                value={selectedItem.phone}
                ref={register}
                type="tel"
                className={`input ${
                  errors.phone ? "is-invalid" : ""
                } shadow-none`}
                onChange={(e) =>
                  setSelectedItem({
                    ...selectedItem,
                    ["phone"]: e.target.value,
                  })
                }
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
              <br />
              <Button onClick={() => editCustomer()} variant="info">
                Update
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal centered show={inviteModal.inviting}>
        <Modal.Body>
          <div className="text-center">
            <Loader type="Bars" color="#FF992E" />
            <p>inviting {inviteModal.email}...</p>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default CustomersData;
