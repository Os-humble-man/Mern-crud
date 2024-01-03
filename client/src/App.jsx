
import Modal from './components/Modal';
import Navigation from './components/Navigation';
import Departements from './components/display/Departements'
import Employee from './components/display/Employee'

import { useEffect, useState } from 'react'
import { Route, createBrowserRouter } from 'react-router-dom';

const fechDepartments = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/departments');
    if (!response.ok) {
      throw new Error('Erreur de chargement')
    }
    const data = await response.json();
    return data
  } catch (error) {
    console.error('Erreur Api', error);
    throw error
  }
};

const fechEmployees = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/employees');
    if (!response.ok) {
      throw new Error('Erreur de chargement')
    }
    const data = await response.json()
    return data

  } catch (error) {
    console.error('Erreur Api', error);
    throw error
  }
}


const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Welcome in Apollonia</div>
  },
  {
    path: '/employees',
    element: <Employee />
  }, {
    path: '/departments',
    element: <Departements />
  }
])


function App() {
  const [departments, setDepartments] = useState(null);
  const [employees, setEmployees] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toogleModal, setToggleModal] = useState(false);


  const fetchData = async () => {
    try {
      const departments = await fechDepartments();
      setDepartments(departments);

      const employees = await fechEmployees();
      setEmployees(employees);

      setLoading(!true);
    } catch (error) {
      console.error(error);
    }
  }



  useEffect(() => {
    fetchData();
  }, [])

  console.log(employees);

  return (
    <div>
      <Navigation />

      {toogleModal ? <Modal /> : ""}

      <button onClick={() => setToggleModal(!toogleModal)}>Add employees</button>


    </div>
  )
}

export default App
