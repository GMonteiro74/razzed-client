import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';

const languagesOptions = [
    {value: 'English', label: 'English'}, 
    {value: 'Portuguese', label: 'Portuguese'},
    {value: 'French', label: 'French'},
    {value: 'Spanish', label: 'Spanish'},
    {value: 'German', label: 'German'},
    {value: 'Mandarin', label: 'Mandarin'},
    {value: 'Japanese', label: 'Japanese'},
    {value: 'Russian', label: 'Russian'},
    {value: 'Italian', label: 'Italian'},
    {value: 'Russian', label: 'Russian'} 
  ];

export default function GuideEdit({ match }) {
    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [startedWorking, setStartedWorking] = useState('');
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState('');
    const [languages, setLanguages] = useState([]);
    const [bio, setBio] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const history = useHistory();

    useEffect(() => {
        async function getGuide() {
            const guide = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/tour-guides/${match.params.id}`, { withCredentials: true });

            setFirstName(guide.data.firstName);
            setLastName(guide.data.lastName);
            setStartedWorking(guide.data.startedWorking);
            setEmail(guide.data.email);
            setLocation(guide.data.location);
            setLanguages(guide.data.languages);
            setImageUrl(guide.data.imageUrl)
            setBio(guide.data.bio);

        };
        getGuide();
        
    }, [])

    const handleSelect = (arr) => {
      const langs = [];
      arr.map(lang => langs.push(lang.value))
      setLanguages(langs)
      console.log(languages);
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const body = {
            firstName,
            lastName,
            startedWorking,
            email,
            location,
            languages,
            bio,
            imageUrl,
            type: 'guide',
        };

        await axios.put(`${process.env.REACT_APP_SERVER_HOSTNAME}/tour-guides/${match.params.id}`, body);
        toast.success('Profile updated! 👌');
        history.push(`/tour-guides/${match.params.id}`);
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
              <h3 className="text-lg font-medium leading-6 text-gray-900">Edit Profile</h3>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
          <form onSubmit={handleFormSubmit} encType='multipart/form-data'>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">

                    <label className="block text-sm font-medium text-gray-700">
                        First name
                    </label>
                    <input type='text' className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={firstName} onChange={e => setFirstName(e.target.value)} />

                    <label className="block text-sm font-medium text-gray-700">
                        Last name
                    </label>
                    <input type='text' className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={lastName} onChange={e => setLastName(e.target.value)} />

                    <label className="block text-sm font-medium text-gray-700">
                        Which year did you start working?
                    </label>
                    <input type='number' className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={startedWorking} onChange={e => setStartedWorking(e.target.value)} />

                    <label className="block text-sm font-medium text-gray-700">E-mail</label>
                <input className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" type='email' value={email} onChange={e => setEmail(e.target.value)} />

                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" type='text' value={location} onChange={e => setLocation(e.target.value)} />

                <label className="block text-sm font-medium text-gray-700">Languages</label>
                <Select className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md basic-multi-select" defaultValue={[languagesOptions[1]]} isMulti name="languages" options={languagesOptions} getOptionValue={opt => opt.value} classNamePrefix="select" onChange={(option) => handleSelect(option)}  />


                <label className="block text-sm font-medium text-gray-700">
                        Tell us a bit about yourself
                    </label>
                    <input type='textarea' className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={bio} onChange={e => setBio(e.target.value)} />

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
