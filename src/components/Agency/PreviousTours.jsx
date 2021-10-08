import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';


export default function PreviousTours({ match }) {

    const [tours, setTours] = useState([]);
    const [agency, setAgency] = useState({});

    
    useEffect(() => {
        async function getAgencyDetails() {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/agencies/${match.params.id}`, { withCredentials: true })
            console.log(response.data);
            setAgency(response.data);
            setTours(response.data.tours);
          }
          getAgencyDetails();
    }, [])

    return (
        
        <div className='bg-cover'>
         
        <h1 className='text-4xl text-gray-800 font-semibold main-title'>Previous Tours</h1>
        <div className='card-container'>
        <div className='profile-card bg-gray-800 text-gray-100'>    
        <div className='img-card'>
        <img src={agency.imageUrl} alt={agency.email} />
        </div>

        {tours.map( tour => {
            return (
                <div className='tours-card bg-gray-800 text-gray-100'>
        
        <h1 className='text-2xl'>{tour.description}</h1>
        <p>From {new Date(tour.startDate).toLocaleDateString()} to {new Date(tour.finalDate).toLocaleDateString()}</p> 
        <p>{tour.pax} pax</p>
        <p>language: {tour.language}</p>
        
        </div>        
            )
        })}
        
        </div>              
        </div>
        </div>
        
    )
}