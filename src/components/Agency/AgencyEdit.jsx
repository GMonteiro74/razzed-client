import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';


export default function AgencyEdit({ match }) {
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState('');
    const [established, setEstablished] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const history = useHistory();

    useEffect(() => {
        async function getAgency() {
            const agency = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/agencies/${match.params.id}`, { withCredentials: true });

            setName(agency.data.name);
            setEmail(agency.data.email);
            setLocation(agency.data.location);
            setEstablished(agency.data.established);
            setImgUrl(agency.data.imageUrl)
        };
        getAgency();
        
    }, [])

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const body = {
            name,
            email,
            location,
            established,
            imgUrl,
            type: "agency"
        };

        await axios.put(`${process.env.REACT_APP_SERVER_HOSTNAME}/agencies/${match.params.id}`, body);
        toast.success('Profile updated! 👌');
        history.push(`/agencies/${match.params.id}`);
    }
    

    return (
        <>

        <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
                <div className="border-t border-gray-200" />
            </div>
        </div>

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Edit profile</h3>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
          <form onSubmit={handleFormSubmit} encType='multipart/form-data'>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">

                    <label className="block text-sm font-medium text-gray-700">
                        Company name
                    </label>
                    <input type='text' className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={name} onChange={e => setName(e.target.value)} />

                    <label className="block text-sm font-medium text-gray-700">E-mail</label>
                <input className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" type='email' value={email} onChange={e => setEmail(e.target.value)} />

                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" type='text' value={location} onChange={e => setLocation(e.target.value)} />

                <label className="block text-sm font-medium text-gray-700">Established</label>
                <input className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" type='number' value={established} onChange={e => setEstablished(e.target.value)} />

                </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

               

            
        </>
    )
}
