import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { LoggedUserConsumer } from '../../context/loggedInUser';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function GuideProfile({ match }) {

    const [guide, setGuide] = useState({});
    const loggedInUser = useContext(LoggedUserConsumer)
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const getGuideDetails = async () => {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/tour-guides/${match.params.id}`, { withCredentials: true });
            setNotifications(loggedInUser.notifications);
            setGuide(response.data);
            
        }
        getGuideDetails();
        // showNotifications();
        
    }, [])

    // const showNotifications = () => {
    //     notifications.length > 0 && 
    //         notifications.forEach(notification => {
    //             toast.info(notification.message)
    //         })
    // }
    

    return (
        <div className='bg-cover'>

        {(notifications.length > 0 && loggedInUser._id === guide._id) && 
            notifications.forEach(notification => {
                toast.info(notification.message)
            })
         }
        
        <h1 className='text-4xl text-gray-800 font-semibold main-title'>Profile</h1>
        <div className='card-container'>

        <div className='profile-card bg-gray-800 text-gray-100'>
        <div className='img-card'> 
        <img src={guide.imageUrl} alt={guide.email} />
        {loggedInUser._id === guide._id && <NavLink exact to={`/tour-guides/${guide._id}/edit`}>
            <button className='cta-card'>Edit</button>
        </NavLink>}
        </div>
        <div className='text-card'>
        <h1 className='text-2xl'>{guide.firstName} {guide.lastName}</h1>
        <h3 className='text-lg'>Based in {guide.location}</h3>
        <p className='text-base'>Biography: {guide.bio}</p>
        <p>Contact: {guide.email}</p>
        <ul>
        <p>Spoken languages:</p>
        {guide.languages && guide.languages.map(lang => {
            return(
                <li>{lang}</li>                
            )
        })}
        </ul>
        <p>Working since {guide.startedWorking}</p> 
        </div>              
            
        </div>
        </div>
        </div>
    )
}
