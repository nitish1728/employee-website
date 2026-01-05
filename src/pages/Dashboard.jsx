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

  const [showPage,setshowPage] = useState(false);
  const [showUpdatePage,setshowUpdatePage] = useState(false);

  const [form, setForm] = useState({
    name: "",
    image: "",
    gender: "Male",
    dateofbirth: "",
    state: "",
    status: "Active"
  });

  function onClose(){
    setForm({
        name: "",
        image: "",
        gender: "Male",
        dateofbirth: "",
        state: "",
        status: "Active"
      });
    setshowPage(false);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
        ...prev,
        [name]: value
    }));
 };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm(prev => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        if (form.id) {
        await fetch(`http://localhost:3000/Employee/${form.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        });

        setEmployees(prev =>
            prev.map(emp => (emp.id === form.id ? form : emp))
        );
        setFilteredEmployees(prev =>
            prev.map(emp => (emp.id === form.id ? form : emp))
        );

        Swal.fire({
            icon: "success",
            title: "Employee Updated",
            text: `${form.name} updated successfully`,
            timer: 1500,
            showConfirmButton: false
        });
        }
        else {
        const response = await fetch("http://localhost:3000/Employee", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({...form,id:employees.length>0 ? "EMP"+employees.length +Date.now() : "EMP1"+Date.now })
        });

        const savedEmployee = await response.json();

        setEmployees(prev => [...prev, savedEmployee]);
        setFilteredEmployees(prev => [...prev, savedEmployee]);

        Swal.fire({
            icon: "success",
            title: "Employee Added",
            text: `${savedEmployee.name} added successfully`,
            timer: 1500,
            showConfirmButton: false
        });
        }

        onClose();
    } catch (error) {
        Swal.fire("Error", "Operation failed", "error");
    }
    };


  
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

        fetch(`http://localhost:3000/Employee/${id}`, {
            method: "DELETE"
        });

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
    fetch(`http://localhost:3000/Employee/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            status: isActive ? "Active" : "Inactive"
        })
    });

    setEmployees(updatedEmployees);
    setFilteredEmployees(updatedEmployees);
  }

  function addEmployee(){
    setForm({
        name: "",
        image: "",
        gender: "Male",
        dateofbirth: "",
        state: "",
        status: "Active"
    });
    setshowPage(true);
    }   

    function editEmployee(emp) {
        setForm(emp);
        setshowPage(true);
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
        <div className="header-main">
            <h2>Employee Dashboard</h2>
            <div className="header-button">
                <button onClick={addEmployee}>Add Employee</button>
                <button onClick={handleLogout}>Log Out</button>
            </div>
        </div>
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

      <EmployeeTable employees={filteredEmployees} onDelete={deleteEmployee} onStatusChange={onStatusChange} onEdit={editEmployee} />

      {showPage && <div className="overlay">
        <div className="sidepage">
          <div className="closeBtn" onClick={() => onClose()}>✖</div>
            <h2>{form.id ? "Update Employee" : "Add Employee"}</h2>
            <div className="sidepage-content">
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                    </div>

                <div className="input-group">
                <label>Image</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                />
                {form.image && (
                    <>
                        <label>Preview</label>
                        <img
                        src={form.image}
                        alt="Preview"
                        className="image-preview" width={200} height={200}
                        />
                    </>
                )}
                </div>

                <div className="input-group">
                <label>Gender</label>
                <select name="gender" value={form.gender} onChange={handleChange}>
                    <option>Male</option>
                    <option>Female</option>
                </select>
                </div>

                <div className="input-group">
                <label>Date of Birth</label>
                <input
                    type="date"
                    name="dateofbirth"
                    value={form.dateofbirth}
                    onChange={handleChange}
                    required
                />
                </div>

                <div className="input-group">
                <label>State</label>
                <input
                    type="text"
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    required
                />
                </div>

                <div className="input-group">
                <label>Status</label>
                <select name="status" value={form.status} onChange={handleChange}>
                    <option>Active</option>
                    <option>Inactive</option>
                </select>
                </div>

                <button type="submit">
                    {form.id ? "Update Employee" : "Add Employee"}
                </button>
            </form>
        </div>

        </div>
        
      </div>
      }
    </div>
  );
}
