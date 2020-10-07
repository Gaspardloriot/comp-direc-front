import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const Department = props => {

    const departments = props.departments;

    let filterDep = props.filterDep;

    return (
        <div id="department">
            <div id='container'>
                <h3>Departments : {props.filterDep}</h3>
                <section className="small-card-list" >
                    {[...departments].map(department => (
                        <article className="small-card" key={uuidv4()}
                            style={{ backgroundColor: (department.department === filterDep) || (department.department === filterDep[0]) ? '#8B0000' : '', }}>
                            <header className="card-header">
                                <p style={{ color: (department.department === filterDep) || (department.department === filterDep[0]) ? 'white' : '', }}
                                >{department.department.substring(0, 12)}</p>
                                <button
                                    type='text'
                                    placeholder='update'
                                    onClick={() => { props.division([department.department]) }}
                                    style={{ display: (department.department === filterDep) || (department.department === filterDep[0]) ? 'none' : '', }}
                                >Filter department</button>
                            </header>
                        </article>
                    ))}
                </section>
            </div>
        </div>
    )
}

export default Department;