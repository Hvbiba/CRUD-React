import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditEmployee() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        email: '',
        position: '',
        department: '',
        salary: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/employees/${id}`)
            .then(response => response.json())
            .then(data => {
                setFormData(data);
            })
            .catch(error => {
                console.error('Error fetching employee data:', error);
            });
    }, [id]);

    const handleChange = (event) => {
         // take copy of form data
        let myUser = {...formData}
        myUser[event.target.name] = event.target.value;
        setFormData(myUser)
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`http://localhost:5000/employees/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            navigate('/'); // go to home page 
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <div className="container bg-light p-4 mt-4" id="edit-form">
            <h2 className='my-3'>Edit An Employee</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="ID"
                        name="id"
                        value={formData.id}
                        readOnly
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
                    />
                </div>
                <button type="submit" className="btn btn-primary pt-1 pb-1 pl-2 pm-2 m-2 text-start">
                    <h5>Submit</h5>
                </button>
            </form>
        </div>
    );
}

export default EditEmployee;
