import React, { useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

function Employeelist() {
  const [employees, setEmployees] = useState([]);
  let navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch('https://66c66e3c134eb8f434979752.mockapi.io/api/vc/employee');
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
        title: 'Are you sure?',
        text: 'This action will permanently delete the employee!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    })
    .then((result) => {
        if (result.isConfirmed) {
          fetch(`https://66c66e3c134eb8f434979752.mockapi.io/api/vc/employee/${id}`, {
                method: 'DELETE'
            })
            .then(() => {
                Swal.fire(
                  'Deleted!',
                  'The employee has been deleted.',
                  'success'
                );
                fetchData(); // Update UI after deletion
            })
            .catch((error) => {
                Swal.fire(
                  'Error!',
                  'There was an issue deleting the employee.',
                  'error'
                );
                console.error('Error deleting employee:', error);
            });
        }
    });
  };

  return (
    <>
    <div className="container my-4" id="add-div">
        <h2>Employee Management Software</h2>
        <button type="button" className="btn btn-primary text-start p-20" id="add-btn"
          onClick={()=>navigate('/AddUser')}>
           <h5> Add Employee </h5>
        </button>
    </div>
    <div className="container" id="list-table">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Position</th>
            <th scope="col">Department</th>
            <th scope="col">Salary</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee , index) => (
            <tr key={employee.id}>
              <td>{index+1}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.position}</td>
              <td>{employee.department}</td>
              <td>{employee.salary}</td>
              <td>
                <div className="container d-f" role="group" aria-label="Actions">
                  <button
                    type="button"
                    className="btn btn-warning me-1"
                    onClick={() => navigate(`/EditUser/${employee.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger ml-1"
                    onClick={() => handleDelete(employee.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}

export default Employeelist;
