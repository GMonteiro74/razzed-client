import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function GuideList() {

    const [guides, setGuides] = useState([]);

    useEffect(() => {
        async function getAllGuides() {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/tour-guides`, {withCredentials: true});
            console.log(response.data);
            setGuides(response.data)
        }
        getAllGuides();
        
    }, [])
    return (
        <div className='bg-cover-horizontal'>
        <h1 className='text-4xl text-gray-800 font-semibold main-title'>Tour Guides</h1>
        <div className='feed-container'>       

        {guides.map( guide => {
           return (
            <div className='feed-card bg-gray-800 text-gray-100'>
                <h2 className='text-lg font-semibold'>{guide.firstName} {guide.lastName}</h2>
                <img className='agency-img' src={guide.imageUrl} alt={guide.email} />
                <p>Location: {guide.location}</p>
                <p>Working since {guide.startedWorking}</p>
                <NavLink className='cta-card' exact to={`tour-guides/${guide._id}`}>Check Profile</NavLink>
                {/* Previous Tours */}
                                
            </div>
           )
        })}

        </div>            
        </div>
    )
}