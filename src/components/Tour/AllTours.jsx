import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoggedUserConsumer } from '../../context/loggedInUser';
import { useHistory } from 'react-router';

export default function AllTours() {

    const [tours, setTours] = useState([]);
    const [languages, setLanguages] = useState([]);
    const loggedInUser = useContext(LoggedUserConsumer)
    const history = useHistory();

    const checkWithAgency = async (description, date, agencyID, id) => {
        const body = {
            message: `${loggedInUser.firstName} ${loggedInUser.lastName} is interested in ${description}, starting at ${date}!`
        }
        await axios.put(`${process.env.REACT_APP_SERVER_HOSTNAME}/agencies/${agencyID}/notification`, body, { withCredentials:true });
        await axios.put(`${process.env.REACT_APP_SERVER_HOSTNAME}/my-tours/${id}/reply`, {sender: loggedInUser}, { withCredentials:true });
        
        toast.success('Message sent')
        history.push('/');
    }
 
    useEffect(() => {
        async function getAllTours() {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/tours`);
            setTours(response.data);
            setLanguages(loggedInUser.languages)
            // console.log(response.data);
        }
        getAllTours();
        
    }, [])

    return (
        <div className='bg-cover-horizontal'> 
        <h1 className='text-4xl text-gray-800 font-semibold main-title'>Available Tours</h1>
        <div className='feed-container'>

        {tours.map( tour => { 
            
          return (  
            <>
            {/* {languages.forEach( lang => {
                if(lang === tour.language) { */}

            <div className='feed-card bg-gray-800 text-gray-100'>
            
              <h1 className='text-lg font-semibold'>{tour.type} tour</h1>
              <p><span className='font-semibold'>Language: </span>{tour.language}</p>
              <p><span className='font-semibold'>Description: </span>{tour.description}</p>
              <p>From {new Date(tour.startDate).toLocaleDateString()} to {new Date(tour.finalDate).toLocaleDateString()}</p>
              <p>{tour.pax} pax</p>
              
              <p><span className='font-semibold'>Agency:</span><NavLink exact to={`/agencies/${tour.agency._id}`}> {tour.agency.name}</NavLink></p>
              
              {console.log(tour.reply.sender)}
                {console.log(loggedInUser)}
            
              {(tour.reply === false || tour.reply.sender === null || tour.reply.sender._id !== loggedInUser._id) && 
              
                 <button className='cta-card' onClick={() => {checkWithAgency(tour.description, new Date(tour.startDate).toLocaleDateString(), tour.agency._id, tour._id)}}>I am interested</button>      
              }
              
              </div>
              
            
            </>
          )
            
        })}
        
            
        </div>
        </div>
    )
}
