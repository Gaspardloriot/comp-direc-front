import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Employees = props => {
  const [state, setState] = useState({
    modal: false,
    employee_on_modal: [{ id: 0, firstName: 'placeholder', lastName: '', email: 'placeholder' }, 'placeholder', 'To be defined'],
    name: false,
    department: false,
    location: false,
    email: false,
    newFirstName: '',
    newLastName: '',
    newDepartment: '',
    newLocation: '',
    newEmail: '',
    table: '',
    field: '',
    changeTo: '',
  });

  const url='https://company-directory-backend.herokuapp.com'

  const departmentFind = (department) => {
    if (department === 'Human Resources') return 1
    if (department === 'Sales') return 2
    if (department === 'Marketing') return 3
    if (department === 'Legal') return 4
    if (department === 'Services') return 5
    if (department === 'R&D') return 6
    if (department === 'Product Management') return 7
    if (department === 'Training') return 8
    if (department === 'Support') return 9
    if (department === 'Engineering') return 10
    if (department === 'Accounting') return 11
    if (department === 'Business Development') return 12
    else return null;
  }



  const filteredArray = props.filteredArray;
  const modalEmployee = state.employee_on_modal;
  const modalEmployee_main = modalEmployee[0];

  const changeLastName = (e) => {
    const newName = e.target.value;
    if (modalEmployee_main.id !== 0) {
      setState(prevState => { return { ...prevState, newLastName: newName, table: 'PERSONNEL', field: 'lastName', changeTo: newName } })
    } else {
      setState(prevState => { return { ...prevState, newLastName: newName, table: 'PERSONNEL', field: 'lastName' } })
    }
  }

  const changeFirstName = (e) => {
    const newName = e.target.value;
    if (modalEmployee_main.id !== 0) {
      setState(prevState => { return { ...prevState, newFirstName: newName, table: 'PERSONNEL', field: 'firstName', changeTo: newName } })
    } else {
      setState(prevState => { return { ...prevState, newFirstName: newName, table: 'PERSONNEL', field: 'firstName' } })
    }
  }

  const changeDepartment = (e) => {
    const newDepartment = e.target.value;
    setState(prevState => { return { ...prevState, newDepartment: newDepartment, table: 'PERSONNEL', field: 'departmentID', changeTo: departmentFind(newDepartment) } })
    console.log(newDepartment)
  }

  const changeEmail = (e) => {
    const newEmail = e.target.value;
    if (modalEmployee_main.id !== 0) {
      setState(prevState => { return { ...prevState, newEmail: newEmail, table: 'PERSONNEL', field: 'email', changeTo: newEmail } })
    } else {
      setState(prevState => { return { ...prevState, newEmail: newEmail, table: 'PERSONNEL', field: 'email' } })
    }
    console.log(newEmail)
  }

  //Update employee data:
  //Updating the table information to be filled

  let upData = {
    'table': state.table,
    'field': state.field,
    'id': modalEmployee_main.id,
    'changeTo': state.changeTo
  }

  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(upData)
  }


  const update = async () => {
    if (state.changeTo) {
      let response = await fetch(`${url}/update`, options);
      let data = await response.json();
      props.refetch()
      console.log(data)
      alert('contents will update as card is closed')
    } else {
      alert('please select a valid department...')
    }
  }

  //Deleting posts


  const deleteEmp = async (id) => {
    let response = await fetch(`${url}/delete/${id}`);
    let data = await response.json();
    props.refetch()
    console.log(data)
    alert('contents will update as card is closed')
  }


  const addingData = {
    id: '',
    firstName: state.newFirstName,
    lastName: state.newLastName,
    jobTitle: '',
    email: state.newEmail,
    departmentID: state.changeTo
  }
  const addOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(addingData)
  };

  const addEmployee = async () => {
    if (state.changeTo) {
      let response = await fetch(`${url}/add_employee`, addOptions);
      let data = await response.json();
      console.log(data)
      props.refetch()
      alert('contents will update as card is closed')
    } else {
      alert('please select a valid department...')
    }
  };

  const resetState = () => {
    setState(prevState => {
      return {
        ...prevState,
        employee_on_modal: [{ id: 0, firstName: 'placeholder', lastName: '', email: 'placeholder' }, 'placeholder', 'To be defined'],
        newFirstName: '',
        newLastName: '',
        newDepartment: '',
        newLocation: '',
        newEmail: '',
        name: false,
        department: false,
        location: false,
        email: false,
      }
    })
  }


  return (
    <div id="employees">
      <div id='container'>
        <span id='employees-title'>
          <h1>Employee Data</h1>
          <button id='employee-adder' onClick={() => setState(prevState => { return { ...prevState, modal: true, name: true, department: true, email: true } })}>Add Employee</button>
          <h3>Employees:{(filteredArray.length > 0) ? filteredArray.length : '  No result corresponding to criteria...'}</h3>
        </span>
        <section className="card-list" style={{ overflowX: (filteredArray.length > 2) ? 'scroll' : 'hidden' }}>
          {[...filteredArray].map(employee => (
            <article className="card" key={uuidv4()}>
              <header className="card-header">
                <button onClick={() => setState(prevState => { return { ...prevState, modal: true, employee_on_modal: employee } })}>Empl. details...</button>
                <p>__________</p>
                <h2>{employee[0].email}</h2>
              </header>
              <div className="card-author">
                <a className="author-avatar" href="#">
                  <img src="./card-avatar.png" />
                </a>
                <svg className="half-circle" viewBox="0 0 106 57">
                  <path d="M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4"></path>
                </svg>
                <div className="author-name">
                  <div className="author-name-prefix">id: {employee[0].id}</div>
                  {`${employee[0].firstName} ${employee[0].lastName}`}
                </div>
              </div>
              <div className="tags">
                <a>{employee[2]}</a>
                <a>{employee[1]}</a>
              </div>
            </article>
          ))}
        </section>
        <div className="modal-parent" id='modal-parent' style={{ display: (state.modal === true) ? 'block' : 'none' }}>
          <div className="modal">
            <div>
              <div id='modal_content'>
                <div id='modal-content'>
                  <span id='modal-title'><h3>Employee Card</h3><h3>{`___id:  ${modalEmployee_main.id}`}</h3></span>
                  <h5>Employee id: {modalEmployee_main.id}</h5>
                  <span className='change-info'>
                    <button
                      className='change-button'
                      onClick={() => { setState(prevState => { return { ...prevState, name: (state.name) ? false : true } }) }}
                      style={{ display: (modalEmployee_main.id !== 0) ? '' : 'none' }}>
                      <img src='./edit-icon.png' className='edit-icon'></img>
                    </button>
                    <h3 style={{ display: (state.name) ? 'none' : 'block' }} className='names'>
                      {`Name : ____${modalEmployee_main.firstName}  ${modalEmployee_main.lastName}`}
                    </h3>
                    <span id='inputs' style={{ display: (state.name) ? 'block' : 'none' }}>
                      <input onChange={(e) => changeFirstName(e)}
                        className='disappear-element' value={state.newFirstName}
                        placeholder='Type in first Name...'
                        type='text' />
                      <button onClick={() => update()} style={{ display: (modalEmployee_main.id !== 0) ? '' : 'none' }}>Submit</button><br />
                      <input onChange={(e) => changeLastName(e)}
                        className='disappear-element' value={state.newLastName}
                        placeholder='Type in last Name...'
                        type='text' />
                      <button onClick={() => update()} style={{ display: (modalEmployee_main.id !== 0) ? '' : 'none' }}>Submit</button>
                    </span>
                  </span>
                  <span className='change-info'>
                    <button
                      className='change-button'
                      onClick={() => { setState(prevState => { return { ...prevState, department: (state.department) ? false : true } }) }}
                      style={{ display: (modalEmployee_main.id !== 0) ? '' : 'none' }}>
                      <img src='./edit-icon.png' className='edit-icon'></img>
                    </button>
                    <h4 style={{ display: (state.department) ? 'none' : 'block' }} className='appear-element'>Department : {modalEmployee[1]}</h4>
                    <span style={{ display: (state.department) ? 'block' : 'none' }}>
                      <input onChange={(e) => changeDepartment(e)} className='disappear-element' value={state.newDepartment} placeholder='Add Department...' type='text' />
                      <button onClick={() => update()} style={{ display: (modalEmployee_main.id !== 0) ? '' : 'none' }}>Submit</button>
                    </span>
                  </span>
                  <span className='change-info'>
                    <h4 className='location' style={{ marginTop: (state.department) ? '18px' : '' }}>Location : __{modalEmployee[2]}</h4>
                  </span>
                  <span className='change-info'>
                    <button className='change-button'
                      onClick={() => { setState(prevState => { return { ...prevState, email: (state.email) ? false : true } }) }}
                      style={{ display: (modalEmployee_main.id !== 0) ? '' : 'none' }}>
                      <img src='./edit-icon.png' className='edit-icon'></img>
                    </button>
                    <h5 style={{ display: (state.email) ? 'none' : 'block' }} className='appear-element'>email : ________{modalEmployee_main.email}</h5>
                    <span style={{ display: (state.email) ? 'block' : 'none' }}>
                      <input onChange={(e) => changeEmail(e)} className='disappear-element' value={state.newEmail} placeholder='Type in new email...' type='email' />
                      <button onClick={() => update()} style={{ display: (modalEmployee_main.id !== 0) ? '' : 'none' }}>Submit</button>
                    </span>
                  </span>
                  <img src={`avatar_${(modalEmployee_main.id % 2) ? 2 : 1}.png`} id='avatar'></img>
                </div>
              </div>
            </div>
            <span className='X' id='X' draggable='true' onClick={() => { setState(prevState => { return { ...prevState, modal: false } }); resetState() }}>&times;</span>
            <button id='delete-button' onClick={() => deleteEmp(modalEmployee_main.id)} style={{ display: (modalEmployee_main.id !== 0) ? 'block' : 'none' }}>
              <img src='./delete.png' id='delete'></img>
              <p>delete</p>
            </button>
            <button id='add-button' onClick={() => addEmployee()} style={{ display: (modalEmployee_main.id !== 0) ? 'none' : 'block' }}>
              <img src='./add-employee.png' id='add'></img>
              <p>Add...</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Employees;