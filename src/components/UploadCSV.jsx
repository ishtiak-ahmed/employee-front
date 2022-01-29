import papaparse from "papaparse";
import React, { useContext } from "react";
import { useState } from "react/cjs/react.development";
import { uploadMany } from "../api";
import { AppContex } from "../state/app.context";

export const UploadCSV = () => {
  const [info, setInfo] = useState(null);
  const { setAllEmployee } = useContext(AppContex);

  const uploadEmploye = async (rows) => {
    const validRows = rows.filter((row) => {
      if (!row["First name"] || !row["Last name"] || !row.Email) {
        return false;
      } else {
        return row;
      }
    });
    try {
      const res = await uploadMany(validRows);
      setAllEmployee((all) => [...all, ...res]);
      setInfo({ valid: validRows.length, invalid: rows.length - validRows.length });
    } catch (error) {
      console.log("uploaded 0 data");
      setInfo({ valid: 0, invalid: rows.length });
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      papaparse.parse(file, {
        complete: function (results) {
          let data = [];
          results.data.forEach((row, i) => {
            if (i > 0) {
              data.push({
                [results.data[0][0]]: row[0],
                [results.data[0][1]]: row[1],
                [results.data[0][2]]: row[2],
                [results.data[0][3]]: row[3],
              });
            }
          });
          data.pop();
          uploadEmploye(data);
        },
      });
    }
  };

  return (
    <section className="upload_csv">
      <h2>Upload Employee data (.csv) </h2>
      <div>
        <span>Drag and Drop file or</span> <br />
        <input type="file" accept=".csv" onChange={handleFileUpload} />
      </div>
      <p className={info ? "info" : null}>
        {info?.valid} employees added{info?.invalid ? `, ${info.invalid} employees failed to add.` : null}
      </p>
    </section>
  );
};
