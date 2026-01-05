import { useState, useEffect } from "react";
import "../assets/styles/Dashboard.css";
import EmployeeTable from "../components/EmployeeTable.jsx";
import searchIcon from "../assets/images/search-icon.png";
import Swal from "sweetalert2";
import { logout } from "../javascript/authentication"

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);

  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filterGender, setFilterGender] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/Employee")
      .then(res => res.json())
      .then(data => {
        setEmployees(data);
        setFilteredEmployees(data);
      });
  }, []);
  
  const deleteEmployee = (id) => {
    Swal.fire({
        title: "Are you sure?",
        text: `This employee ${id} will be permanently deleted!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel"
    }).then((result) => {
        if (result.isConfirmed) {
        const updatedEmployees = employees.filter(emp => emp.id !== id);
        setEmployees(updatedEmployees);
        setFilteredEmployees(updatedEmployees);

        Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: `Employee ${id} has been deleted.`,
            timer: 1500,
            showConfirmButton: false
        });
        }
    });
  };
  useEffect(() => {
    let result = [...employees];

    if (filterStatus) {
      result = result.filter(emp => emp.status === filterStatus);
    }

    if (filterGender) {
      result = result.filter(emp => emp.gender === filterGender);
    }

    if (search) {
      result = result.filter(emp =>
        emp.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredEmployees(result);
  }, [search, filterGender, filterStatus, employees]);

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(e => e.status === "Active").length;
  const inactiveEmployees = employees.filter(e => e.status === "Inactive").length;


  const resetFilters = () => {
    setFilterGender("");
    setFilterStatus("");
    setSearch("");
    setFilteredEmployees(employees);
    setShowFilter(false);
  };

  function handleLogout() {     
    logout();
    window.location.href = "/";
  }

  function onStatusChange(id, isActive) {
    const updatedEmployees = employees.map(emp => {
      if (emp.id === id) {
        return { ...emp, status: isActive ? "Active" : "Inactive" };
        }
        return emp;
    });
    setEmployees(updatedEmployees);
    setFilteredEmployees(updatedEmployees);
  }

  return (
    <div className="dashboard-main">
      {showFilter && (
        <div className="filter-popup">
          <div className="closeBtn" onClick={() => setShowFilter(false)}>✖</div>
          <h3>Filter by Status</h3>
          <div className="filter-options">
            <label>
                <input
                type="radio"
                name="status"
                value="Active"
                checked={filterStatus === "Active"}
                onChange={e => setFilterStatus(e.target.value)}
                />
                Active
            </label>
            <label>
                <input
                type="radio"
                name="status"
                value="Inactive"
                checked={filterStatus === "Inactive"}
                onChange={e => setFilterStatus(e.target.value)}
                />
                Inactive
            </label>
          </div>

          <h3>Filter by Gender</h3>
            <div className="filter-options">
                <label>
                    <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={filterGender === "Male"}
                    onChange={e => setFilterGender(e.target.value)}
                    />
                    Male
                </label>
                <label>
                    <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={filterGender === "Female"}
                    onChange={e => setFilterGender(e.target.value)}
                    />
                    Female
                </label>
            </div>

          <div className="filter-actions">
            <button className="apply" onClick={() => setShowFilter(false)}>
              Apply
            </button>
            <button className="reset" onClick={resetFilters}>
              Reset
            </button>
          </div>
        </div>
      )}

      <div className="header">
        <h2>Employee Dashboard</h2>
      </div>

      <div className="employee-search">
        <span className="Search">
          <img src={searchIcon} alt="Search" />
        </span>
        <input
          type="text"
          placeholder="Search employees by name"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <span className="Filter">
          <button onClick={() => setShowFilter(!showFilter)}>Filter</button>
        </span>
      </div>

      <div className="count-widgets">
        <div className="count-box">
          <h3>Total Employees</h3>
          <span>{totalEmployees}</span>
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

      <EmployeeTable employees={filteredEmployees} onDelete={deleteEmployee} onStatusChange={onStatusChange} />
    </div>
  );
}
