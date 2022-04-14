import React, { useContext } from "react";
import { Dropdown, Button } from "react-bootstrap";
import axios from "axios";
import UserContext from "../../contexts/userContext";
import { callApi } from "../../api/API";

import "./Mass-invitation.css";

const MassInvitation = ({ showInvitation }) => {
  const { userData, setUserData } = useContext(UserContext);
  console.log("user data in mass invitation ", userData);
  const massInvite = () => {
    if (!userData.customers) {
      console.log("no customer data");
      return;
    }
    const massAccount = userData.customers.map( async (user) => ({
      fname: user.fname,
      lname: user.lname,
      email: user.email,
    }));
    const customers = callApi('/customers/sendmassinvite/', "POST", {
      users: massAccount,
    }, "Bearer " + userData.token);
    if(customers){
      showInvitation();
    }
  };

  return (
    <Dropdown className="dropdown-container">
      <Dropdown.Toggle
        id="dropdown-basic"
        className="mass-invitation bg-transparent border-0 p-0 rounded-0 shadow-none d-flex align-items-center"
      >
        <i className="icon-add-groups" />
        <span>Mass invitation</span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Button
          type="button"
          onClick={() => massInvite()}
          className="btn bg-transparent border-left-0 border-right-0 border-top-0 shadow-none d-block w-100 rounded-0"
        >
          Invite via Email
        </Button>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default MassInvitation;
