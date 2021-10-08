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
        
    }, [])

    const clickNotification = async () => {
        const response = await axios.put(`${process.env.REACT_APP_SERVER_HOSTNAME}/tour-guides/${match.params.id}/notification/delete`, { withCredentials: true });
        console.log(response);
    }

    return (
        <div className='bg-cover'>

        {(notifications.length > 0 && loggedInUser._id === guide._id) && 
            notifications.forEach(notification => {
                toast.info(notification.message, {
                    autoClose: false,
                    onClose: clickNotification(),
                    closeOnClick: true,
                })
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
        <h3 className='text-lg'>Based in <span className='font-semibold'>{guide.location}</span></h3>
        <p className='text-base'><span className='font-semibold'>Biography:</span> {guide.bio}</p>
        <p><span className='font-semibold'>Contact:</span> {guide.email}</p>
        <ul>
        <p><span className='font-semibold'>Spoken languages:</span></p>
        {guide.languages && guide.languages.map(lang => {
            return(
                <li>{lang}</li>                
            )
        })}
        </ul>
        <p>Working since <span className='font-semibold'>{guide.startedWorking}</span></p> 
        </div>              
            
        </div>
        </div>
        </div>
    )
}
