import React, { useContext } from "react";
import { AppContex } from "../state/app.context";

export const TableRow = ({ data }) => {
  const { setSelected, selected } = useContext(AppContex);
  const handleCheck = (e) => {
    if (e.target.checked) {
      setSelected((emails) => [...emails, data.email]);
    } else {
      const filtered = selected.filter((email) => email !== data.email);
      setSelected(filtered);
    }
  };
  return (
    <div>
      <p>
        <input type="checkbox" checked={selected.includes(data.email)} name="" onChange={handleCheck} id="" />
      </p>
      <p>{data.firstName} </p>
      <p>{data.lastName} </p>
      <p>{data.email} </p>
    </div>
  );
};
