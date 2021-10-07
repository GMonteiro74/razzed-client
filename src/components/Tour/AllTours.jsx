import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import {LoggedUserConsumer} from '../../context/loggedInUser';

export default function AllTours() {

    const [tours, setTours] = useState([]);
    const loggedInUser = useContext(LoggedUserConsumer)

    const [languages, setLanguages] = useEffect([]);

    const getLanguages = () => {
        const langs = [];
        loggedInUser.languages.forEach( lang => {
            langs.push(lang);
        })
        setLanguages(langs)
    }
    getLanguages();
    const checkWithAgency = async (description, date, agencyID, id) => {
        const body = {
            message: `${loggedInUser.firstName} ${loggedInUser.lastName} is interested in ${description}, starting at ${date}!`
        }
        await axios.put(`${process.env.REACT_APP_SERVER_HOSTNAME}/agencies/${agencyID}/notification`, body, { withCredentials:true });
        await axios.put(`${process.env.REACT_APP_SERVER_HOSTNAME}/my-tours/${id}/reply`, {sender: loggedInUser}, { withCredentials:true });
        toast.success('Message sent')
    }

    useEffect(() => {
        async function getAllTours() {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/tours`);
            setTours(response.data);
        }
        getAllTours();
        
    }, [])

    
    
    return (
        <div className='bg-cover'> 
        <h1 className='text-4xl text-gray-800 font-semibold main-title'>Tours</h1>
        <div className='feed-container'>

        {tours.map( tour => {

          return (  
              <div className='feed-card bg-gray-800 text-gray-100'>
              <h1 className='text-lg font-semibold'>{tour.type} tour</h1>
              <p>Language: {tour.language}</p>
              <p>Description: {tour.description}</p>
              <p>From {new Date(tour.startDate).toLocaleDateString()} to {new Date(tour.finalDate).toLocaleDateString()}</p>
              <p>{tour.pax} pax</p>
              
              <p>Agency:<NavLink exact to={`/agencies/${tour.agency._id}`}> {tour.agency.name}</NavLink></p>
              
              {tour.available ? (
                 <button className='cta-card' onClick={() => {checkWithAgency(tour.description, new Date(tour.startDate).toLocaleDateString(), tour.agency._id, tour._id)}}>I am interested</button>
              ) : (
                  <p>Already has a tour guide.</p>
              )
              }
                            
              </div>
          )
            
        })}
            
        </div>
        </div>
    )
}
