import React, { useContext, useState } from "react";
import { addEmployee } from "../api";
import { AppContex } from "../state/app.context";

export const AddEmploye = () => {
  const [employee, setEmployee] = useState({ firstName: "", lastName: "", eamil: "" });
  const { setAllEmployees } = useContext(AppContex);

  const handleInput = (e) => {
    const newData = { ...employee, [e.target.name]: e.target.value };
    setEmployee(newData);
  };

  const validateData = () => {
    const errorsData = [];
    if (!employee.firstName.length) errorsData.push("First name is empty");
    if (!employee?.lastName?.length) errorsData.push("Last name is empty");
    const validEmail = String(employee.email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    if (!validEmail) errorsData.push("Email is not valid");
    return errorsData;
  };

  const handleAdd = async () => {
    console.log("adding employee");
    const validation = validateData();
    console.log(validation);
    if (validation.length) {
      const error = validation.join(", ");
      alert(error);
    } else {
      const res = await addEmployee(employee);
      if (res) {
        console.log(res);
        setAllEmployees((all) => [...all, res]);
        setEmployee({ firstName: "", lastName: "", email: "" });
      }
      console.log(res);
    }
  };

  return (
    <section className="add_employee">
      <div>
        <p>First name: </p>
        <input
          type="text"
          name="firstName"
          value={employee?.firstName}
          onChange={handleInput}
          placeholder="enter first name"
        />
      </div>
      <div>
        <p>Last name: </p>
        <input
          type="text"
          name="lastName"
          value={employee?.lastName}
          onChange={handleInput}
          placeholder="enter last name"
        />
      </div>
      <div>
        <p>Email: </p>
        <input type="text" name="email" value={employee?.email} onChange={handleInput} placeholder="enter email." />
      </div>
      <div>
        <button onClick={handleAdd}>Add Employe</button>
      </div>
    </section>
  );
};
