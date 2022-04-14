import React, { useState, useContext, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import DateFnsUtils from "@date-io/date-fns";
import { useHistory } from "react-router-dom";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { useForm } from "react-hook-form";
import imageProfile from "../../assets/images/profil_image.png";
import axios from "axios";
import UserContext from "../../contexts/userContext";
import "./Form-component.css";
import moment from "moment";
import { callApi } from "../../api/API";


const EditDeal = ({ edit,dealbought, data, setData }) => {
  console.log("edit data ", data);
  // let checkboxDisabled = !page
  //     ? "d-none"
  //     : "d-flex justify-content-between align-items-center",
  //   image = !data.servicePicture ? (
  //     <img
  //       src={imageProfile}
  //       className="w-100 h-100 file-upload-container__image"
  //       alt=""
  //     />
  //   ) : (
  //     <i className="icon-image d-block align-self-center" />
  //   ),
  //   fileUploadClasses = !data.servicePicture
  //     ? "position-relative file-upload-container bg-white d-flex align-content-center justify-content-center overflow-hidden"
  //     : "position-relative file-upload-container bg-white d-flex align-content-center justify-content-center overflow-hidden p-0";
  // let editpageenable = page
  //   ? "d-none"
  //   : "d-flex justify-content-between align-items-center";
  const { register, handleSubmit, errors, watch, ...formHook } = useForm();
  const [dateErr, setDateErr] = useState(false);
  const { userData, setUserData } = useContext(UserContext);
  const [startdate, setStartdate] = useState(new Date());
  const [enddate, setEnddate] = useState(new Date());
  const [expirydate, setExpiredate] = useState(new Date());
  const [description, setDescription] = useState();
  const [publishdate, setPublishdate] = useState(new Date());
  const [editData, setEditData] = useState(null);

  const [id, setId] = useState();
  const history = useHistory();
  var da = new Date("2020-03-24");
  const handleSubmitForm = async (payload) => {
    if (dateErr) {
      return;
    }
    payload["startdate"] = moment(startdate).toISOString();
    payload["enddate"] = moment(enddate).toISOString();
    payload["publishdate"] = moment(publishdate).toISOString();
    payload["expirydate"] = moment(expirydate).toISOString();
    payload["codetype"] = editData.codetype;
    
    const result = await callApi(`/coupons/update/${data._id}`, "PUT", payload,  "Bearer " + userData.token);
    history.push("/business-home");

  };

  useEffect(() => {
    if (data) {
      setStartdate(new Date(data.startdate));
      setEnddate(new Date(data.enddate));
      setPublishdate(new Date(data.publishdate));
      setExpiredate(new Date(data.expirydate));
      setEditData(data);
    }
  }, [data]);

  return (
    <>
      {data && (
        <Form
          autoComplete="off"
          className="create-details-form-container"
          onSubmit={handleSubmit(handleSubmitForm)}
        >
          <div className="row">
            <div className="col-sm-8">
              <Form.Group controlId="formBasicEmail">
                <Form.Label className="label">Deal Name</Form.Label>
                <Form.Control
                  autoComplete="off"
                  name="name"
                  value={data.name}
                  ref={register({ required: true })}
                  type="text"
                  className="input shadow-none"
                  placeholder="Deal Name"
                  onChange={(val) =>
                    setData({ ...data, ["name"]: val.target.value })
                  }
                  // disabled={edit ? "" : "disabled"}
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
                      <div>
                        {/* {image} */}
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
                      value={data.originalprice}
                      type="number"
                      className="input shadow-none"
                      onChange={(change) => {
                        setData({
                          ...data,
                          ["originalprice"]: parseFloat(change.target.value),
                        });
                      }}
                      placeholder="$0.00"

                      // disabled={edit ? "" : "disabled"}
                    />
                    {errors.originalprice &&
                      errors.originalprice.type === "required" && (
                        <p style={{ color: "red" }}>
                          Original price is required
                        </p>
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
                      value={data.price}
                      ref={register({
                        required: true,
                        validate: (val) =>
                          parseFloat(val) < parseFloat(watch("originalprice")),
                      })}
                      onChange={(change) => {
                        formHook.trigger("price");
                        setData({
                          ...data,
                          ["price"]: parseFloat(change.target.value),
                        });
                      }}
                      type="number"
                      className="input shadow-none"
                      placeholder="$0.00"
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
                  onChange={(change) => setStartdate(change)}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
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
                  onChange={(change) => setEnddate(change)}
                  minDate={startdate}
                  minDateMessage="End Date should not be before start date"
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
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
                  onChange={(change) => setPublishdate(change)}
                  minDate={startdate}
                  minDateMessage="Publish date should not be before start date"
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  name="expirydate"
                  ref={register({ required: true })}
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Expire date"
                  onError={(dateErr) => setDateErr(dateErr ? true : false)}
                  value={expirydate}
                  onChange={(change) => setExpiredate(change)}
                  minDate={startdate}
                  minDateMessage="Expire date should not be before start date"
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
          </div>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label className="label">Deal Description</Form.Label>
            <Form.Control
              name="description"
              ref={register}
              value={data.description}
              as="textarea"
              rows="4"
              className="shadow-none textarea"
              placeholder="Deal Description"
              onChange={(e) =>
                setData({ ...data, ["description"]: e.target.value })
              }
              // disabled={edit ? "" : "disabled"}
            />
          </Form.Group>
          <div>
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
              disabled = {dealbought}
            >
              Update deal
            </Button>
          </div>
          <div></div>
        </Form>
      )}
    </>
  );
};

export default EditDeal;
