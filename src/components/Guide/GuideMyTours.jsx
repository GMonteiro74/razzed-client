import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';


export default function GuideMyTours() {

    const [tours, setTours] = useState([]);

    useEffect(() => {
        async function getAllTours() {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/tour-guides/my-tours`, {withCredentials: true});
            console.log(response.data);
            setTours(response.data)
        }
        getAllTours();
    }, [])

    return (
        <div className='bg-cover-horizontal'>
        <h1 className='text-4xl text-gray-800 main-title font-semibold'>My Tours</h1>
        <div className='feed-container'>
            
        {tours.length > 0 ? (
            <>
        {tours.map( tour => {
          return (  
              <div className='feed-card bg-gray-800 text-gray-100'>
              <h1 className='text-lg font-semibold'>{tour.type} tour</h1>
              <p><span className='font-semibold'>Language: </span>{tour.language}</p>
              <p><span className='font-semibold'>Description: </span>{tour.description}</p>
              <p>From {new Date(tour.startDate).toLocaleDateString()} to {new Date(tour.finalDate).toLocaleDateString()}</p>
              <p>{tour.pax} pax</p>
              <NavLink className='cta-card' exact to={`/agencies/${tour.agency}`}>Check agency profile</NavLink>
              </div>

          )
        })}
        </>
        ) : (
            <h1 className='text-lg font-semibold text-gray-800'>So empty...</h1>
        )}
            
        </div>
        </div>
    )
}
