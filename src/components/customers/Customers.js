import React, { useState } from "react";
import { Button } from "react-bootstrap";
import PaginationCustom from "../../components/pagination";
import MassInvitation from "../../components/mass-invitation";
import CustomersData from "./customers-data/Customers-data";
import CustomersSettings from "./customers-settings/Customers-settings";
import CustomersEmpty from "./customers-empty";

import "./Customers.css";
import SearchBlock from "../search-block";
import AlertBlock from "../alert-block/Alert-block";

const Customers = ({ query }) => {
  const [tab, changeTab] = useState(query.includes("skip") ? "empty" : "excel");
  const [add, addCustomers] = useState(false);
  const [isInvited, showInvitationMessage] = useState(false);
  const [totalDataLen, setTotalLen] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  return (
    <div className="bg-white secttion-container w-100 h-100 d-flex flex-column justify-content-between">
      <div className="flex-grow-1  d-flex flex-column">
        <header className="d-flex justify-content-between justify-content-center secttion-container__header position-relative">
          <h2 className="title m-0 d-flex align-items-center">Customers</h2>
          <div className="d-flex">
            <Button
              type="button"
              onClick={() => changeTab("settings")}
              className="btn btn-icon border-0 bg-transparent shadow-none p-0 settings-icon"
            >
              <i className="icon-deals d-flex" />
            </Button>
            <Button
              type="button"
              onClick={() => {
                changeTab("excel");
                addCustomers(false);
              }}
              className="btn btn-icon border-0 bg-transparent shadow-none p-0 d-flex align-items-center excel-icon"
            >
              <i className="icon-excel-icon-hover dropdown" />
              <i className="icon-excel-icon" />
            </Button>
            <Button
              type="button"
              onClick={() => {
                addCustomers(!add);
                changeTab("excel");
              }}
              className="btn btn-icon border-0 bg-transparent shadow-none p-0"
            >
              <i className="icon-add-user" />
            </Button>
          </div>
        </header>

        {tab === "settings" && <CustomersSettings />}
        {tab === "excel" && (
          <>
            <CustomersData
              add={add}
              addCustomers={addCustomers}
              isInvited={isInvited}
              showInvitation={showInvitationMessage}
              setTotalLen={setTotalLen}
              currentPage={currentPage}
              pageSize={pageSize}
            />
            <footer className="d-flex flex-wrap justify-content-between align-items-center table-container__footer">
              <MassInvitation
                showInvitation={() => showInvitationMessage(true)}
              />
              <PaginationCustom
                totalSize={totalDataLen}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pageSize={pageSize}
              />
            </footer>
          </>
        )}
        {tab === "empty" && <CustomersEmpty />}
      </div>
    </div>
  );
};

export default Customers;
