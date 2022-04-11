import React, { useEffect, useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import DateFnsUtils from "@date-io/date-fns";
import { useHistory } from "react-router-dom";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { useForm } from "react-hook-form";
import imageProfile from "../../assets/images/profil_image.png";
import CheckboxContainer from "./../checkbox-container";
import axios from "axios";
import UserContext from "../../contexts/userContext";
import DealContext from "../../contexts/dealContext";
import "./Form-component.css";
import Moment from "react-moment";
import moment from "moment";
import { callApi } from "../../api/API";
import { _empty } from "../../utils/utils";

const FormComponent = ({
  edit,
  formclickedhandle,
  formclicked,
  data,
  page,
  publish,
}) => {
  let checkboxDisabled = !page
      ? "d-none"
      : "d-flex justify-content-between align-items-center",
    image = !data?.servicePicture ? (
      <img
        src={imageProfile}
        className="w-100 h-100 file-upload-container__image"
        alt=""
      />
    ) : (
      <i className="icon-image d-block align-self-center" />
    ),
    fileUploadClasses = !data.servicePicture
      ? "position-relative file-upload-container bg-white d-flex align-content-center justify-content-center overflow-hidden"
      : "position-relative file-upload-container bg-white d-flex align-content-center justify-content-center overflow-hidden p-0";
  let editpageenable = page
    ? "d-none"
    : "d-flex justify-content-between align-items-center";
  const { register, handleSubmit, errors, watch, ...formHook } = useForm();
  const [dateErr, setDateErr] = useState(false);
  const { userData, setUserData } = useContext(UserContext);
  const { dealData, setDealData } = useContext(DealContext);
  const [name, setName] = useState();
  const [startdate, setStartdate] = useState(new Date());
  const [enddate, setEnddate] = useState(new Date());
  const [publishDate, setPublishDate] = useState(new Date());
  const [expireDate, setExpiredate] = useState(new Date());
  const [price, setPrice] = useState();
  const [originalprice, setOriginalprice] = useState();
  const [description, setDescription] = useState();
  const [showError, setShowError] = useState(false)
  const [dateFieldsClicked, setDateFieldsClicked] = useState({
    startDate: false,
    endDate: false,
    publishDate: false,
    expiryDate: false,
  });
  const [publishdate, setPublishdate] = useState(new Date());
  const [id, setId] = useState();
  const history = useHistory();
  var da = new Date("2020-03-24");
 
  const location = useLocation();
 
  const handleSubmitForm = async(payload) => {
    for (var key in dateFieldsClicked) {
      if (!dateFieldsClicked[key]) {
        return setDateFieldsClicked({
          ...dateFieldsClicked,
          [key + "msg"]: key + "is required",
        });
      }
    }
    if (dateErr) {
      return;
    }
    payload["startdate"] = moment(startdate).toISOString();
    payload["enddate"] = moment(enddate).toISOString();
    payload["publishdate"] = moment(publishdate).toISOString();
    payload["expirydate"] = moment(expireDate).toISOString();
    payload["codetype"] = userData.btype;
    payload["btype"] = userData.btype;
    if (page) {
      payload["userid"] = userData.id;
      const create = await callApi("/coupons/create","POST", payload,  "Bearer " + userData.token,);
      if(!_empty(create)){
        publish("list");
      }else{
        setShowError(true)
        history.push("/business-home");
      }
    } else {
      const update = callApi(`/coupons/update/${id}`,"PUT", payload, "Bearer " + userData.token);
      if(update){
            formclickedhandle(false);
            history.push("/business-home");
      }
    }
  };
  console.log(edit);

   useEffect(() => {
    if (location.search.includes("edit")) {
      setName(location.state.detail.name);
      setStartdate(location.state.detail.startdate);
      setEnddate(location.state.detail.enddate);
      setPrice(location.state.detail.price);
      setOriginalprice(location.state.detail.originalprice);
      setDescription(location.state.detail.description);
      setPublishdate(location.state.detail.publishdate);
      setId(location.state.detail._id);
      console.log(location.state.detail); // result: 'some_value'
    }
  }, [location]);

  const updateCouponData = async () => {};
  if (formclicked) {
    //updateCouponData();
  }
  return (
    <Form
      autoComplete="off"
      className="create-details-form-container"
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <div className="row">
        <div className="col-sm-8">
        {showError ? (
            <p style={{ color: "red" }}>Please Try Again</p>
          ) : null}
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="label">Deal Name</Form.Label>
            <Form.Control
              autoComplete="off"
              name="name"
              ref={register({ required: true })}
              type="text"
              className="input shadow-none"
              placeholder="Deal Name"
              disabled={edit ? "" : "disabled"}
            />
            {errors.name && (
              <p style={{ color: "red" }}>Deal name is required</p>
            )}
          </Form.Group>
          <div className="d-flex flex-wrap">
            <div className="col-sm-5 p-0">
              <Form>
                <Form.Group>
                  <Form.Label className="label">
                    {" "}
                    Deal & Service Picture
                  </Form.Label>
                  <div className={fileUploadClasses}>
                    {image}
                    <input
                      type="file"
                      className="position-absolute file-upload-container__input w-100 h-100"
                      disabled={edit ? "" : "disabled"}
                    />
                  </div>
                </Form.Group>
              </Form>
            </div>
            <div className="col-sm-5 p-0 offset-sm-2">
              <Form.Group controlId="formBasicPassword">
                <Form.Label className="label">Original Price</Form.Label>
                <Form.Control
                  autoComplete="chrome-off"
                  name="originalprice"
                  ref={register({
                    required: true,
                  })}
                  type="number"
                  className="input shadow-none"
                  onChange={(change) => formHook.trigger("price")}
                  placeholder="$0.00"
                  disabled={edit ? "" : "disabled"}
                />
                {errors.originalprice &&
                  errors.originalprice.type === "required" && (
                    <p style={{ color: "red" }}>Original price is required</p>
                  )}
                {errors.originalprice &&
                  errors.originalprice.type === "validate" && (
                    <p style={{ color: "red" }}>
                      Original price must be greater than discount price
                    </p>
                  )}
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label className="label">Discounted Price</Form.Label>
                <Form.Control
                  autoComplete="chrome-off"
                  name="price"
                  ref={register({
                    required: true,
                    validate: (val) =>
                      parseFloat(val) < parseFloat(watch("originalprice")),
                  })}
                  onChange={(change) => formHook.trigger("price")}
                  type="number"
                  className="input shadow-none"
                  placeholder="$0.00"
                  disabled={edit ? "" : "disabled"}
                />
                {errors.price && errors.price.type === "required" && (
                  <p style={{ color: "red" }}>Dicount price is required</p>
                )}
                {errors.price && errors.price.type === "validate" && (
                  <p style={{ color: "red" }}>
                    Dicount price must be less than original price
                  </p>
                )}
              </Form.Group>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              name="startDate"
              ref={register({ required: true })}
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Start Date"
              value={startdate}
              onChange={(change) => {
                setStartdate(change);
                setDateFieldsClicked({ ...dateFieldsClicked, startDate: true });
              }}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            {!dateFieldsClicked.startDate &&
              dateFieldsClicked?.startDatemsg && (
                <p style={{ color: "red" }}>Start date is required</p>
              )}
          </MuiPickersUtilsProvider>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              name="enddate"
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="End Date"
              onError={(dateErr) => setDateErr(dateErr ? true : false)}
              value={enddate}
              onChange={(change) => {
                setEnddate(change);
                setDateFieldsClicked({ ...dateFieldsClicked, endDate: true });
              }}
              minDate={startdate}
              minDateMessage="End Date should not be before start date"
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            {!dateFieldsClicked.endDate && dateFieldsClicked?.endDatemsg && (
              <p style={{ color: "red" }}>End date is required</p>
            )}
          </MuiPickersUtilsProvider>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              name="publishdate"
              ref={register({ required: true })}
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Publish date"
              onError={(dateErr) => setDateErr(dateErr ? true : false)}
              value={publishdate}
              onChange={(change) => {
                setPublishdate(change);
                setDateFieldsClicked({
                  ...dateFieldsClicked,
                  publishDate: true,
                });
              }}
              minDate={startdate}
              minDateMessage="Publish date should not be before start date"
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            {!dateFieldsClicked.publishDate &&
              dateFieldsClicked?.publishDatemsg && (
                <p style={{ color: "red" }}>End date is required</p>
              )}
          </MuiPickersUtilsProvider>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              name="publishdate"
              ref={register({ required: true })}
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Expire date"
              onError={(dateErr) => setDateErr(dateErr ? true : false)}
              value={expireDate}
              onChange={(change) => {
                setExpiredate(change);
                setDateFieldsClicked({
                  ...dateFieldsClicked,
                  expiryDate: true,
                });
              }}
              minDate={startdate}
              minDateMessage="Expire date should not be before start date"
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            {!dateFieldsClicked.expiryDate &&
              dateFieldsClicked?.expiryDatemsg && (
                <p style={{ color: "red" }}>End date is required</p>
              )}
          </MuiPickersUtilsProvider>
        </div>
      </div>

      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label className="label">Deal Description</Form.Label>
        <Form.Control
          name="description"
          ref={register}
          as="textarea"
          rows="4"
          className="shadow-none textarea"
          placeholder="Deal Description"
          onChange={(e) => setDescription(e.target.value)}
          disabled={edit ? "" : "disabled"}
        />
      </Form.Group>
      <div className={checkboxDisabled}>
        <Form.Group>
          <p style={{ fontSize: "0.9em" }}>
            Your customers will be notified about this deal via email on the
            publish date
          </p>
        </Form.Group>
        <Button
          variant="link"
          className="text-decoration-none shadow-none green-btn"
          type="submit"
        >
          Publish deal
        </Button>
      </div>
      <div className={editpageenable}>
        <Button
          variant="link"
          className="text-decoration-none shadow-none green-btn"
          type="submit"
        >
          Save Changes
        </Button>
      </div>
    </Form>
  );
};

export default FormComponent;
