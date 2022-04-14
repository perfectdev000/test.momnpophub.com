import React from "react";
import { Button } from "react-bootstrap";

import "./Block-header.css";

const BlockHeader = ({
  title,
  formclicked,
  buttonText,
  buttonIcon,
  handler,
  edit,
}) => {
  let icon = buttonIcon ? `${buttonIcon} orange-btn edit-btn` : null;
  let editButton = edit ? (
    <>
      <Button
        type="button"
        className="btn border-0 bg-transparent shadow-none p-0 d-flex align-items-center mr-3"
        onClick={() => handler(false)}
      >
        <i className="icon-times-circle light-gray d-flex" />
        <span className="light-gray"> Cancel</span>
      </Button>
      <Button
        type="button"
        className="btn border-0 bg-transparent shadow-none p-0"
        onClick={() => handler(false)}
      >
        <i className={icon} />
        <span className="orange-btn">{"Save changes"}</span>
      </Button>
    </>
  ) : (
    <Button
      type="button"
      className="btn border-0 bg-transparent shadow-none p-0"
      onClick={() => handler(false)}
    >
      <i className={icon} />
      <span className="orange-btn">{buttonText}</span>
    </Button>
  );

  return (
    <header className="d-flex flex-wrap justify-content-between align-items-center secttion-container__header">
      <h2 className="title m-0  d-flex align-items-center">{title}</h2>
      <div className="d-flex">{editButton}</div>
    </header>
  );
};

export default BlockHeader;
