import '../assets/styles/EmployeeTable.css';

export default function EmployeeTable(props) {
    const printEmployee = (emp) => {
    const printWindow = window.open("", "_blank", "width=800,height=600");

    if (!printWindow) {
        alert("Popup blocked! Please allow popups to print.");
        return;
    }

    printWindow.document.write(`
        <html>
        <head>
            <title>Employee Details</title>
            <style>
            body {
                font-family: Arial, sans-serif;
                padding: 20px;
            }
            h2 {
                margin-bottom: 20px;
            }
            p {
                font-size: 14px;
                margin: 6px 0;
            }
            </style>
        </head>
        <body>
            <h2>Employee Details</h2>
            <p><strong>ID:</strong> ${emp.id}</p>
            <img src="${emp.image}" alt="Employee Image" width="100" height="100"/>
            <p><strong>Name:</strong> ${emp.name}</p>
            <p><strong>Gender:</strong> ${emp.gender}</p>
            <p><strong>DOB:</strong> ${emp.dateofbirth}</p>
            <p><strong>State:</strong> ${emp.state}</p>
            <p><strong>Status:</strong> ${emp.status}</p>
        </body>
        </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    };
    const table=props.employees.map((emp)=>{ 
        return(
            <tr key={emp.id}>
                <td>{emp.id}</td>
                <td><img src={emp.image} alt="Employee Image" width="100" height="100"/></td>
                <td>{emp.name}</td>
                <td>{emp.gender}</td> 
                <td>{emp.dateofbirth}</td>
                <td>{emp.state}</td>
                <td>
                    <div className="status-checkbox">
                        <label className="switch">
                            <input type="checkbox" checked={emp.status === "Active"} onChange={(e)=>props.onStatusChange(emp.id, e.target.checked)}/>
                            <span className="slider"></span>
                        </label>
                    </div>
                </td>
                <td>
                    <div className='actions'>
                        <button className='edit' onClick={() => props.onEdit(emp)}>Edit</button>
                        <button className='delete' onClick={() => props.onDelete(emp.id)}>Delete</button>
                        <button className='print' onClick={() => printEmployee(emp)}>Print</button>
                    </div>
                </td>
            </tr>
        )
    })

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Date of Birth</th>
                        <th>State</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                {props.employees.length > 0 ? <tbody>{table}</tbody> : <tbody><tr><td colSpan="8" style={{textAlign:"center"}}>No employees found</td></tr></tbody>    }
            </table>
        </div>
    )
}