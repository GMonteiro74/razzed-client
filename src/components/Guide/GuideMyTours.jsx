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
        <div>
        <h1 className='text-4xl text-gray-800 font-semibold'>My Tours</h1>
        <div className='feed-container'>
            
        {tours.length > 0 ? (
            <>
        {tours.map( tour => {
          return (  
              <div className='feed-card text-gray-800 main-title'>
              <h1 className='text-lg font-semibold'>{tour.type} tour</h1>
              <p>Language: {tour.language}</p>
              <p>Description: {tour.description}</p>
              <p>From {new Date(tour.startDate).toLocaleDateString()} to {new Date(tour.finalDate).toLocaleDateString()}</p>
              <p>{tour.pax} pax</p>
              <NavLink exact to={`/agencies/${tour.agency.id}`}>Check agency profile</NavLink>
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
