import { useState, useEffect } from 'react';
import '../assets/styles/Dashboard.css';
import EmployeeTable from '../components/EmployeeTable.jsx';
import searchIcon from '../assets/images/search-icon.png';

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/Employee")
      .then(res => res.json())
      .then(data => setEmployees(data));
  }, []);


  const Employees=employees.length
  const activeEmployees = employees.filter(emp=>emp.status==="Active").length;
  const  inactiveEmployees = employees.filter(emp=>emp.status==="Inactive").length;
  
  return (
    <div className="dashboard-main">
        <div className="header">
            <h2>Employee Dashboard</h2>
        </div>
        <div className="count-widgets">
            <div className="count-box">
                <h3>Total Employees</h3>
                <span>{Employees}</span>
            </div>
            <div className="count-box">
                <h3>Active Employees</h3>
                <span>{activeEmployees}</span>
            </div>
            <div className="count-box">
                <h3>Inactive Employees</h3>
                <span>{inactiveEmployees}</span>
            </div>
        </div>
        <EmployeeTable employees={employees} />
    </div>
  )
}