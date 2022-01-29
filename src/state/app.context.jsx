/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useEffect, useState } from "react";
import { getEmployees } from "../api";
export const AppContex = createContext();
const rowPerPage = 5;
export const AppContextProvider = ({ children }) => {
  const [allEmployees, setAllEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [selected, setSelected] = useState([]);

  const getAllEmployees = async () => {
    const employees = await getEmployees();
    setAllEmployees(employees);
  };

  const updateTotalPage = () => {
    const total = Math.ceil(allEmployees.length / rowPerPage);
    setTotalPage(total);
  };

  useEffect(() => {
    updateTotalPage();
  }, [allEmployees]);

  const context = {
    allEmployees,
    setAllEmployees,
    currentPage,
    setCurrentPage,
    totalPage,
    setTotalPage,
    selected,
    setSelected,
    rowPerPage,
    getAllEmployees,
  };
  return <AppContex.Provider value={context}>{children}</AppContex.Provider>;
};
