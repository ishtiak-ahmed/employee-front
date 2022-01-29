import React, { useContext, useState } from "react";
import { sendMailToEmpoyee } from "../api";
import { AppContex } from "../state/app.context";

export const SendEmail = ({ onClose }) => {
  const { selected, setSelected } = useContext(AppContex);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const handleSubject = (e) => {
    setSubject(e.target.value);
  };

  const handleBody = (e) => {
    setBody(e.target.value);
  };

  const submitMail = async () => {
    console.log("sending mail");
    if (!selected.length || !subject || !body) {
      alert("Please fill all the field.");
      return;
    }
    try {
      const res = await sendMailToEmpoyee(selected, subject, body);
      alert("mail sent.");
      setSelected([]);
      onClose();
      console.log(res);
    } catch (error) {
      alert("Cant send mail. Something went wrong.");
      console.log(error);
    }
  };
  return (
    <div className="mail_modal">
      <div>
        <div className="header">
          <h3>Send Email to Employees</h3>
          <button className="danger" onClick={onClose}>
            X
          </button>
        </div>
        <div>
          <p>To :</p>
          <input type="text" readOnly value={selected.join(", ")} />
        </div>
        <div>
          <p>Subject :</p>
          <input type="text" onChange={handleSubject} value={subject} />
        </div>
        <div>
          <p>Body :</p>
          <textarea rows={10} onChange={handleBody} value={body} />
        </div>
        <button className="primary" onClick={submitMail}>
          Send
        </button>
      </div>
    </div>
  );
};
