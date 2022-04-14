import React, { useState } from "react";
import { Pagination } from "react-bootstrap";

import "./Pagination-custom.css";

const PaginationCustom = ({
  totalSize = 0,
  currentPage,
  pageSize,
  setCurrentPage,
  ...props
}) => {

  return (
    <>
      {totalSize > pageSize && (
        <Pagination className="d-flex align-items-center mb-0">
          <Pagination.Prev
            onClick={() => {
              if (currentPage > 1) {
                setCurrentPage(currentPage - 1);
              }
            }}
          >
            <i className="icon-angle-left" />
          </Pagination.Prev>
          <p className="pagination-text mb-0">
            <span>
              {(currentPage - 1) * pageSize + 1} -{" "}
              {(currentPage - 1) * pageSize + pageSize}
            </span>{" "}
            of {totalSize}
          </p>
          <Pagination.Next
            onClick={() => {
              if (pageSize * currentPage < totalSize) {
                setCurrentPage(currentPage + 1);
              }
            }}
          >
            <i className="icon-angle-right" />
          </Pagination.Next>
        </Pagination>
      )}
    </>
  );
};

export default PaginationCustom;
