import { useContext, useEffect } from 'react';
import './App.scss';
import { AddEmploye } from './components/AddEmploye';
import { EmployeeTable } from './components/EmployeeTable';
import { Header } from './components/Header';
import { UploadCSV } from './components/UploadCSV';
import { AppContex } from './state/app.context';

function App() {
  const { getAllEmployees } = useContext(AppContex)

  // const getAllEmployees = async () => {
  //   const employees = await getEmployees();
  //   setAllEmployees(employees);
  //   const total = Math.ceil(employees.length / rowPerPage)
  //   setTotalPage(total);
  // };

  useEffect(() => {
    getAllEmployees();
  }, []);

  return (
    <>
      <Header />
      <main>
        <AddEmploye />
        <UploadCSV />
        <EmployeeTable />
      </main>
    </>
  );
}

export default App;
