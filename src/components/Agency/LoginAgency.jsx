import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import { LockClosedIcon } from '@heroicons/react/solid';
import { toast } from 'react-toastify';
import axios from 'axios';
import logo from '../../logo.png'


export default function LoginAgency({ setLoggedInUser }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const body = {
            email,
            password
        };
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/agencies/login`, body, { withCredentials: true });
            if(response.data.email) {
                toast.success('Login successful');
                setLoggedInUser(response.data);
                console.log(response.data);
                history.push('/');
            }
            
        } catch (error) {
            toast.error('Invalid login')
        }

    }



    return (
        <>

<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src={logo}
            alt="Razzed"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Company Login</h2>
          
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleFormSubmit} method="POST">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
              </span>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>

            
        </>
    )
}
