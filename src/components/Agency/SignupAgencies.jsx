import React, { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

export default function SignupAgencies() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState('');
    const [established, setEstablished] = useState('');
    const [image, setImage] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const uploadData = new FormData();
        uploadData.append('file', image);

        const response = await axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/upload`, uploadData);

        const body = {
            name,
            email,
            location,
            established,
            imageUrl: response.data.fileUrl,
            password,
            type: "agency"
        };

        await axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/agencies/signup`, body);
        toast.success('Signup successful 👌');
        history.push('/agencies/login');
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
              <h3 className="text-lg font-medium leading-6 text-gray-900">Signup</h3>
              <p className="mt-1 text-sm text-gray-600">Sign up and start to connect with tour guides right away</p>
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

                <label className="block text-sm font-medium text-gray-700">Image</label>
                <input className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" type='file' onChange={e => setImage(e.target.files[0])} />

                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" type='password' value={password} onChange={e => setPassword(e.target.value)} />

                </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Join us!
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
