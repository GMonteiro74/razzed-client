import axios from 'axios';
import React, { useState } from 'react'
import { useHistory } from 'react-router';
import Select from 'react-select';
import { toast } from 'react-toastify';
import Calendar from 'react-calendar';

// import { LoggedUserConsumer } from '../../context/loggedInUser';

const typesOfTours = [
    {value: 'FD', label: 'FD'}, 
    {value: 'HD', label: 'HD'},
    {value: 'Circuit', label: 'Circuit'},
  ];

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
  ];

export default function CreateTour() {

    // const loggedInUser = useContext(LoggedUserConsumer);
    const history = useHistory();

    const [type, setType] = useState('');
    const [language, setLanguage] = useState('');
    const [rate, setRate] = useState('');
    const [pax, setPax] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [finalDate, setFinalDate] = useState('');

    const [calDate, setCalDate] = useState(new Date());

    function onChangeDate (calDate) {
      setCalDate(calDate)
      if (calDate.length < 2) {
        setStartDate(calDate[0]);
        setFinalDate(calDate[0]);
      } else {
        setStartDate(calDate[0]);
        setFinalDate(calDate[1]);
      }
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const body = {
            type,
            language,
            rate,
            description,
            pax,
            startDate,
            finalDate,
        }

        await axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/tours`, body, { withCredentials: true });
        toast.success('Tour created 🏰');
        history.push('/');
        
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
              <h3 className="text-lg font-medium leading-6 text-gray-900">Add a Tour</h3>
              <p className="mt-1 text-sm text-gray-600">Create a new tour and check who is available to do it!</p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
          <form onSubmit={handleFormSubmit} encType='multipart/form-data'>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">

                    <label className="block text-sm font-medium text-gray-700">What kind of tour is it?</label>
                    <Select className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md basic-single" name="type-tour" options={typesOfTours} getOptionValue={opt => opt.value} classNamePrefix="select" onChange={e => setType(e.value)}  />

                    <label className="block text-sm font-medium text-gray-700">Language</label>
                    <Select className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md basic-single" name="languages" options={languagesOptions} getOptionValue={opt => opt.value} classNamePrefix="select" onChange={e => setLanguage(e.value)}  />

                    <label className="block text-sm font-medium text-gray-700">
                        Daily rate(FD)
                    </label>
                    <input type='number' className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={rate} onChange={e => setRate(e.target.value)} />

                    <label className="block text-sm font-medium text-gray-700">
                        Number of persons in the group
                    </label>
                    <input type='number' className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={pax} onChange={e => setPax(e.target.value)} />

                    <label className="block text-sm font-medium text-gray-700">
                        Description of the tour
                    </label>
                    <input type='textarea' className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" variant="filled" value={description} onChange={e => setDescription(e.target.value)} />

                    <Calendar className={["w-full mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"]} onChange={onChangeDate} selectRange='true' value={calDate} />

                </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Add Tour
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
