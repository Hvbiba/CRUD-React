import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddEmployee() {
  const navigate = useNavigate();
  // empty string as start values
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    position: '',
    department: '',
    salary: ''
  });

 
  const handleChange = (event) => {
    // take copy of form data
   let myUser = {...formData}
   myUser[event.target.name] = event.target.value;
   setFormData(myUser)
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('https://66c66e3c134eb8f434979752.mockapi.io/api/vc/employee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      setFormData({
        id: '',
        name: '',
        email: '',
        position: '',
        department: '',
        salary: ''
      });
      // go to home page after submit
      navigate('/')
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="container bg-light p-4 mt-4" id="add-form">
      <h2 className='my-3'>Add A New Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="ID"
            name="id"
            value={formData.id}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary pt-1 pb-1 pl-2 pm-2 m-2 text-start">
          <h5>Submit</h5>
        </button>
      </form>
    </div>
  );
}

export default AddEmployee;
