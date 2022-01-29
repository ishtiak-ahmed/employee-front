import React, { useContext, useState } from "react";
import { addEmployee } from "../api";
import { AppContex } from "../state/app.context";

export const AddEmploye = () => {
  const [employee, setEmployee] = useState({});
  const { setAllEmployees } = useContext(AppContex);

  const handleInput = (e) => {
    const newData = { ...employee, [e.target.name]: e.target.value };
    setEmployee(newData);
  };

  const validateData = () => {
    if (!employee.firstName.length) return { error: true, message: "First name is empty" };
    if (!employee.lastName.length) return { error: true, message: "Last name is empty" };
    if (!employee.email.length) return { error: true, message: "Email is empty" };
    return true;
  };

  const showError = () => {
    console.log("showing error");
  };

  const handleAdd = async () => {
    console.log("adding employee");
    const validation = validateData();
    if (validation.error) {
      showError();
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
