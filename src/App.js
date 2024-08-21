import React from 'react';
import './App.css';
import Employeelist from './Components/Employees';
import AddEmployee from './Components/Add';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'sweetalert2/dist/sweetalert2.min.css';
import EditEmployee from './Components/Edit';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Employeelist />} />
        <Route path='/AddUser' element={<AddEmployee />} />
        <Route path='/EditUser/:id' element={<EditEmployee />} />
      </Routes>
    </Router>
  );
}

export default App;
