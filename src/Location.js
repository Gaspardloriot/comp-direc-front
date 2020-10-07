import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const Location = props => {

    const cities = props.cities;
    let filterLoc = props.filterLoc;


    return (
        <div id="location">
            <div id='container'>
                <h3>Locations :  {props.filterLoc}</h3>
                <section className="small-card-list filt_location">
                    {[...cities].map(city => (
                        <article className="small-card" key={uuidv4()}
                            style={{ backgroundColor: (city === filterLoc[0]) || (city === filterLoc) ? '#20B2AA' : ''}}>
                            <header className="card-header">
                                <p style={{ color: (city === filterLoc[0]) || (city === filterLoc) ? 'black' : ''}}>{city}</p>
                                <button 
                                type='text' 
                                placeholder='update' 
                                onClick={() => { props.Location([city]) }}
                                style={{ display: (city === filterLoc[0]) || (city === filterLoc)? 'none' : '', }}
                                >Filter location</button>
                            </header>
                        </article>
                    ))}
                </section>
            </div>
        </div>
    )
}

export default Location;