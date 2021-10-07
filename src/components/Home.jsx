import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Home() {
    
    return (
        <div className="main-cont bg-cover">
        
        <div>

            <div className='home-title text-gray-800'>
            <h1 className='text-4xl font-semibold w-8/12'>Razzed, the platform connecting Tour Guides and Travel Agencies</h1>
            <h3 className='text-2xl w-10/12'>Select one of the options below to sign up and to start working right away</h3>
            </div>

            <div className='hero-card-btns text-gray-100'>
            <NavLink exact to='/agencies/signup'>
                <button className='bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg hover:bg-gray-900 shadow-lg'>I'm an Agency</button>
            </NavLink>
            <NavLink exact to='/tour-guides/signup'>
                <button className='bg-gradient-to-r from-gray-800 to-gray-700 hover:bg-gray-900 rounded-lg shadow-lg'>I'm a Tour Guide</button>
            </NavLink>
            </div>
        
        </div>
        
        </div>
    )
}
