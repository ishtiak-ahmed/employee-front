import React, { useContext, useState } from "react";
import { AppContex } from "../state/app.context";
import { SendEmail } from "./SendEmail";
import { TableRow } from "./TableRow";

const rowPerPage = 5;

export const EmployeeTable = () => {
  const { allEmployees, currentPage, selected, setCurrentPage, totalPage } = useContext(AppContex);
  const [openMail, setOpenMail] = useState(false);

  const handleMail = () => setOpenMail(!openMail);

  const gotoFirst = () => setCurrentPage(1);
  const gotoPrev = () => setCurrentPage((p) => p - 1);
  const gotoNext = () => setCurrentPage((p) => p + 1);
  const gotoLast = () => setCurrentPage(totalPage);

  const handleDownload = () => alert("Not implemented yet");

  return (
    <section className="employee_table">
      <div className="summary">
        <h3>Total Employees {allEmployees.length}</h3>
        <button className="primary" onClick={handleDownload}>
          Download Data
        </button>
      </div>
      <div className="table">
        <div className="table_action">
          <span>Selected Employee {selected.length}</span>
          <button disabled={selected <= 0} onClick={handleMail} className="primary">
            Send Mail
          </button>
        </div>
        <div className="table_header">
          <p></p>
          <p>First Name</p>
          <p>Last Name</p>
          <p>Email</p>
        </div>
        <div className="table_body">
          {allEmployees.slice(rowPerPage * (currentPage - 1), 5 * currentPage).map((data) => (
            <TableRow key={data.id} data={data} />
          ))}
        </div>
        <div className="table_pagination">
          <button disabled={currentPage === 1} onClick={gotoFirst}>
            First
          </button>
          <button disabled={currentPage === 1} onClick={gotoPrev}>
            Prev
          </button>
          <p>
            Page {currentPage} of {totalPage}
          </p>
          <button disabled={currentPage === totalPage} onClick={gotoNext}>
            Next
          </button>
          <button disabled={currentPage === totalPage} onClick={gotoLast}>
            Last
          </button>
        </div>
      </div>
      {openMail && <SendEmail onClose={() => setOpenMail(false)} />}
    </section>
  );
};
