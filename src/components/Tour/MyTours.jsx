import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoggedUserConsumer } from '../../context/loggedInUser';
import { useHistory } from 'react-router';

export default function MyTours() {

    const [tours, setTours] = useState([]);
    const loggedInUser = useContext(LoggedUserConsumer);
    const history = useHistory();

    useEffect(() => {
        async function getAllTours() {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/my-tours`, {withCredentials: true});
        
            setTours(response.data)
        }
        getAllTours();
    }, [])

    const handleAccept = async (tourID, guideID) => {
        try {

            const body = {
                message: `You were accepted by ${loggedInUser.name} to do the tour. Check the my tours page for more details`
            }

            await axios.put(`${process.env.REACT_APP_SERVER_HOSTNAME}/tour-guides/${guideID}/notification/${tourID}`, body, { withCredentials:true });
            await axios.put(`${process.env.REACT_APP_SERVER_HOSTNAME}/my-tours/${tourID}/reply`);
            await axios.put(`${process.env.REACT_APP_SERVER_HOSTNAME}/my-tours/${tourID}/${guideID}`)
            toast.success('Guide Accepted')
            history.push(`/agencies/${loggedInUser._id}`)
        } catch (error) {
            toast.error('Hmm something went wrong')
        }
        
    }

    const handleReject = async (tourID, guideID) => {
        const body = {
            message: `You were rejected by ${loggedInUser.name} to do the tour.`
        }
        await axios.put(`${process.env.REACT_APP_SERVER_HOSTNAME}/tour-guides/${guideID}/notification/${tourID}`, body, { withCredentials:true });
        await axios.put(`${process.env.REACT_APP_SERVER_HOSTNAME}/my-tours/${tourID}/remove-reply`)
        toast.success('Reply sent')
        history.push(`/agencies/${loggedInUser._id}`)
        
    }

    const handleDeleteTour = async (id) => {
        await axios.delete(`${process.env.REACT_APP_SERVER_HOSTNAME}/my-tours/${id}`, {withCredentials: true});
        history.push(`/`)
        toast.info('Tour deleted');
    }

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
              <p><span className='font-semibold'>Language:</span> {tour.language}</p>
              <p><span className='font-semibold'>Description:</span> {tour.description}</p>
              <p>From {new Date(tour.startDate).toLocaleDateString()} to {new Date(tour.finalDate).toLocaleDateString()}</p>
              {tour.guide && 
              
                <p><span className='font-semibold'>Guide:</span><NavLink exact to={`/tour-guides/${tour.guide._id}`}> {tour.guide.firstName} {tour.guide.lastName}</NavLink></p>
              }
              <p>{tour.pax} pax</p>
              {(tour.reply !== false && tour.reply.sender !== null) && 
                <div className='reply-sect'>
                  
                  <p>{tour.reply.sender.firstName} {tour.reply.sender.lastName} is interested in this tour. Do you want to hire him?</p>
                  <div className='reply-btns'>
                <button className='green-btn' onClick={() => handleAccept(tour._id, tour.reply.sender._id)}>Accept</button>
                <button className='red-btn' onClick={() => handleReject(tour._id, tour.reply.sender._id)}>Not really</button>
                <NavLink exact to={`/tour-guides/${tour.reply.sender._id}`}>
                    <button className='cta-card'>Check profile</button>
                </NavLink>
                </div>
                
                </div>
                
              }
              
              <div className='edit-btns'>
              <NavLink className='text-blue-300' exact to={`/my-tours/${tour._id}/edit`}>Edit</NavLink>
              <button className='text-red-400' onClick={() => handleDeleteTour(tour._id)}>Delete</button>
              </div>
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
