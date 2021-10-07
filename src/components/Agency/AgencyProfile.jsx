import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { LoggedUserConsumer } from '../../context/loggedInUser';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function AgencyProfile({ match }) {

    const loggedInUser = useContext(LoggedUserConsumer);
    const history = useHistory();
    const [agency, setAgency] = useState({});
    const [notifications, setNotifications] = useState([]);
    

    useEffect(() => {
        async function getAgencyDetails() {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/agencies/${match.params.id}`, { withCredentials: true })
            setAgency(response.data);
            setNotifications(loggedInUser.notifications);
          }
          getAgencyDetails();
    }, [])

    return (
        <div className='bg-cover'>
        {(notifications.length > 0 && loggedInUser._id === agency._id)&& 
            notifications.forEach(notification => {
                toast.info(notification.message)
            })
         }
         
        <h1 className='text-4xl text-gray-800 font-semibold main-title'>Profile</h1>
        <div className='card-container'>

        <div className='profile-card bg-gray-800 text-gray-100'>
        <div className='img-card'>
        <img src={agency.imageUrl} alt={agency.email} />
        </div>
        <div className='text-card'>
        <h1 className='text-2xl'>{agency.name}</h1>
        <h3 className='text-lg'>Based in {agency.location}</h3>
        <p>Contact: {agency.email}</p>
        <p>Est: {agency.established}</p> 
        {loggedInUser._id === agency._id && <NavLink exact to={`/agencies/${agency._id}/edit`}>
            <button className='cta-card'>Edit</button>
        </NavLink>}

        
        </div>              
            
        </div>
        </div>
        </div>
    )
}

