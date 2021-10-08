import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function AgencyList() {

    const [agencies, setAgencies] = useState([]);

    useEffect(() => {
        async function getAllAgencies() {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/agencies`, {withCredentials: true});
            console.log(response.data);
            setAgencies(response.data)
        }
        getAllAgencies();
        
    }, [])
    return (
        <div className='bg-cover-horizontal'>
        <h1 className='text-4xl text-gray-800 font-semibold main-title'>Agencies</h1>
        <div className='feed-container'>       

        {agencies.map( agency => {
           return (
            <div className='feed-card bg-gray-800 text-gray-100'>
                <h2 className='text-lg font-semibold'>{agency.name}</h2>
                <img className='agency-img' src={agency.imageUrl} alt={agency.name} />
                <p>Est: {agency.established}</p>
                <p>Location: {agency.location}</p>
                <NavLink className='cta-card' exact to={`agencies/${agency._id}`}>Check Profile</NavLink>
                {/* Previous Tours */}
                                
            </div>
           )
        })}

        </div>            
        </div>
    )
}
