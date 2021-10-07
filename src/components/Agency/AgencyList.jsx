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
        <div>

        <h1 className='text-4xl text-gray-800 font-semibold main-title'>Agencies</h1>

        {agencies.map( agency => {
           return (
            <>
                <h2>{agency.name}</h2>
                <img src={agency.imageUrl} alt={agency.name} />
                <p>Est: {agency.established}</p>
                <p>Location: {agency.location}</p>
                {/* Previous Tours */}
                                
            </>
           )
        })}
            
        </div>
    )
}
