import React, { useState, useEffect } from 'react';
import Employees from './Employees'
import Location from './Location'
import Department from './Department'
import './css/card.css';
import './css/small-card.css';
import './css/modal.css';
import './css/App.css';




function App() {
  const [state, setState] = useState({
    filteredArray: '',
    personnelData: '',
    filterLocation: 'World',
    filterDepartment: 'All',
    filterNam_Id: ''
  })

  const url='https://company-directory-backend.herokuapp.com'

  const departmentFind = [

    { 'department': 'All' },

    {
      'department': 'Human Resources',
      'locationId': 1
    },

    {
      'department': 'Sales',
      'locationId': 2
    },

    {
      'department': 'Marketing',
      'locationId': 2
    },

    {
      'department': 'Legal',
      'locationId': 4
    },

    {
      'department': 'Services',
      'locationId': 5
    },

    {
      'department': 'R&D',
      'locationId': 3
    },

    {
      'department': 'Product Management',
      'locationId': 3
    },

    {
      'department': 'Training',
      'locationId': 4
    },

    {
      'department': 'Support',
      'locationId': 4
    },

    {
      'department': 'Engineering',
      'locationId': 5
    },

    {
      'department': 'Accounting',
      'locationId': 5
    },

    {
      'department': 'Business Development',
      'locationId': 3
    }
  ]

  //Location Logic
  const locationFind = [
    "World", "London", 'New York', "Paris", "Munich", "Rome"
  ]

  let personnelData = []
  const personnelData_fetch = async () => {
    personnelData.splice(0, personnelData.length)
    let response = await fetch(`${url}/geteverything`)
    let data = await response.json();
    for (let i = 0; i <= data.length - 1; i++) {
      personnelData.push([data[i]]);
      let departmentID = data[i].departmentID;
      let locationId = departmentFind[departmentID].locationId;
      let department = departmentFind[departmentID].department;
      let location = locationFind[locationId];
      personnelData[i].push(department, location);
    }
    setState(prevState => { return { ...prevState, filteredArray: personnelData, personnelData: personnelData } })
  }

  let filteredArray = personnelData;


  const selectLoc_handler = (e) => {
    const location = e.target.value;
    setState(prevState => { return { ...prevState, filterLocation: location } })
    filter(location, 'filterLoc')
  }

  const selectDep_handler = (e) => {
    const department = e.target.value;
    setState(prevState => { return { ...prevState, filterDepartment: department } })
    filter(department, 'filterDep')
  }

  const inputChange = (e) => {
    const input = e.target.value;
    setState(prevState => { return { ...prevState, filterNam_Id: input } })
    filter(input, 'filterInput')
  }

  const filter = (toFilter, parent) => {
    filteredArray = state.personnelData;
    let departmentFilter = (parent === 'filterDep') ? toFilter : state.filterDepartment;
    let locationFilter = (parent === 'filterLoc') ? toFilter : state.filterLocation;
    let name_Id_Filter = (parent === 'filterInput') ? toFilter : state.filterNam_Id;
    if (typeof name_Id_Filter === 'string') { name_Id_Filter = name_Id_Filter.charAt(0).toUpperCase() + name_Id_Filter.slice(1) };
    if (locationFilter != 'World') {
      filteredArray = filteredArray.filter(employeeArray => employeeArray[2] == locationFilter);
    }
    if (departmentFilter != 'All') {
      filteredArray = filteredArray.filter(employeeArray => employeeArray[1] == departmentFilter);
    }
    if (name_Id_Filter !== '') {
      filteredArray = filteredArray.filter(employeeArray => (name_Id_Filter).includes(employeeArray[0].firstName)
        || (name_Id_Filter).includes(employeeArray[0].lastName)
        || name_Id_Filter == (employeeArray[0].id));
    }
    (filteredArray.length == 0) ? console.log('nothing found') : console.log(filteredArray)
    setState(prevState => { return { ...prevState, filteredArray: filteredArray } })
  };


  useEffect(() => {
    personnelData_fetch()
  }, [])

  return (
    <div id='App'>
      <div id="navBar">
        <h1>____Company Directory____</h1>
      </div>
      <div id="main-container">
        <div id="search_filter">
          <select name="filterLocation" className='select' id="filterLocation" value={state.filterLocation} onChange={(e) => selectLoc_handler(e)}>
            {[...locationFind].map(location => (
              <option key={location}>{location}</option>
            ))}
          </select>
          <select name="Department" className='select' id="filterDepartment" value={state.filterDepartment} onChange={(e) => selectDep_handler(e)}>
            {[...departmentFind].map(department => (
              <option key={department.department}>{department.department}</option>
            ))}
          </select>
          <span><input id="filterName_Id"
            className='select'
            type="text"
            value={state.filterNam_Id}
            placeholder='type in name / id'
            onChange={(e) => inputChange(e)} />
          </span>
          <div id='write-to-search_icon'
               style={{ fontSize:'20px'}} >&#9997;</div>
        </div>
        <Employees
          render={state.test}
          filteredArray={state.filteredArray}
          city={state.city}
          refetch={()=>personnelData_fetch()} />
        <Location
          Location={(value) => { setState(prevState => { return { ...prevState, filterLocation: value } }); filter(value, 'filterLoc') }}
          cities={locationFind}
          filterLoc={state.filterLocation} />
        <Department
          departments={departmentFind}
          division={(value) => { setState(prevState => { return { ...prevState, filterDepartment: value } }); filter(value, 'filterDep') }}
          filterDep={state.filterDepartment} />
      </div>      
    </div>
  );
}

export default App;
