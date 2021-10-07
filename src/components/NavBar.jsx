/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import logo from '../logo.png'


export default function NavBar({loggedInUser, setLoggedInUser}) {

  const navigationLoggedInAgency = [
    { name: 'Create a tour', link: '/tours/add', current: true },
    { name: 'My Tours', link: `/agencies/${loggedInUser._id}/my-tours`, current: false },
    { name: 'Calendar', link: '#', current: false },
  ]
  
  const navigationLoggedInGuide = [
    { name: 'My Tours', link: `/tour-guides/${loggedInUser._id}/my-tours`, current: true },
    { name: 'Agencies', link: '/agencies', current: false },
    { name: 'All of the Tours', link: '/tours', current: false },  
  ]
  
  const navigationLoggedOut = [
    { name: "Login as an agency", link: '/agencies/login', current: false },
    { name: "Login as a tour guide", link: '/tour-guides/login', current: false },
  ]

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const logoutUser = async () => {
    await axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/logout`, null, {
      withCredentials: true,
    })
    setLoggedInUser("");
  }


    if (loggedInUser && loggedInUser.type === 'agency') {
      return (
        
        <Disclosure as="nav" className="bg-gray-800">
       {({ open }) => (
         <>
           <div className="height-nav max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
             <div className="relative flex items-center justify-between h-16">
               <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                 {/* Mobile menu button*/}
                 <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                   <span className="sr-only">Open main menu</span>
                   {open ? (
                     <XIcon className="block h-6 w-6" aria-hidden="true" />
                   ) : (
                     <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                   )}
                 </Disclosure.Button>
               </div>
               <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                 <div className="flex-shrink-0 flex items-center">
                   <img
                     className="block lg:hidden h-8 w-auto"
                     src={logo}
                     alt="Razzed"
                   />
                 </div>
                 <div className="hidden sm:block sm:ml-6">
                   <div className="flex space-x-4">
                     {navigationLoggedInAgency.map((item) => (
                       <NavLink
    
                         exact to={item.link}
                         className={classNames(
                           item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                           'px-3 py-2 rounded-md text-sm font-medium'
                         )}
                         aria-current={item.current ? 'page' : undefined}
                       >
                         {item.name}
                       </NavLink>
                     ))}
                   </div>
                 </div>
               </div>
               <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              
                
                 {/* Profile dropdown */}
                 <Menu as="div" className="ml-3 relative">
                   <div>
                     <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                       <span className="sr-only">Open user menu</span>
                       <img
                         className="h-8 w-8 rounded-full"
                         src={loggedInUser.imageUrl}
                         alt=""
                       />
                     </Menu.Button>
                   </div>
                   <Transition
                    as={Fragment}
                     enter="transition ease-out duration-100"
                     enterFrom="transform opacity-0 scale-95"
                     enterTo="transform opacity-100 scale-100"
                     leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                     leaveTo="transform opacity-0 scale-95"
                   >
                     <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                       <Menu.Item>
                         {({ active }) => (
                          <NavLink exact to={`/agencies/${loggedInUser._id}`}
                             className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                           >
                             My Profile
                           </NavLink>
                         )}
                       </Menu.Item>
                       
                       <Menu.Item>
                         {({ active }) => (
                           <NavLink exact to='/'
                             className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                           >
                              <button onClick={logoutUser}>Logout</button>
                           </NavLink>
                         )}
                       </Menu.Item>
                       
                     </Menu.Items>
                   </Transition>
                 </Menu>
               </div>
             </div>
          </div>

           <Disclosure.Panel className="sm:hidden">
             <div className="px-2 pt-2 pb-3 space-y-1">
               {navigationLoggedInAgency.map((item) => (
                 <NavLink
                   exact to={item.link}
                   className={classNames(
                     item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                     'block px-3 py-2 rounded-md text-base font-medium'
                   )}
                   aria-current={item.current ? 'page' : undefined}
                 >
                   {item.name}
                 </NavLink>
               ))}
             </div>
           </Disclosure.Panel>
         </>
       )}
    </Disclosure>
      
      )
    }

    if (loggedInUser && loggedInUser.type === 'guide') {
      return (
       
        <Disclosure as="nav" className="bg-gray-800">
       {({ open }) => (
         <>
           <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
             <div className="relative flex items-center justify-between h-16">
               <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                 {/* Mobile menu button*/}
                 <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                   <span className="sr-only">Open main menu</span>
                   {open ? (
                     <XIcon className="block h-6 w-6" aria-hidden="true" />
                   ) : (
                     <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                   )}
                 </Disclosure.Button>
               </div>
               <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                 <div className="flex-shrink-0 flex items-center">
                   <img
                     className="block lg:hidden h-8 w-auto"
                     src={logo}
                     alt="Razzed"
                   />
                 </div>
                 <div className="hidden sm:block sm:ml-6">
                   <div className="flex space-x-4">
                     {navigationLoggedInGuide.map((item) => (
                       <NavLink
    
                         exact to={item.link}
                         className={classNames(
                           item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                           'px-3 py-2 rounded-md text-sm font-medium'
                         )}
                         aria-current={item.current ? 'page' : undefined}
                       >
                         {item.name}
                       </NavLink>
                     ))}
                   </div>
                 </div>
               </div>
               <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
               
                 {/* Profile dropdown */}
                 <Menu as="div" className="ml-3 relative">
                   <div>
                     <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                       <span className="sr-only">Open user menu</span>
                       <img
                         className="h-10 w-10 rounded-full"
                         src={loggedInUser.imageUrl}
                         alt=""
                       />
                     </Menu.Button>
                   </div>
                   <Transition
                    as={Fragment}
                     enter="transition ease-out duration-100"
                     enterFrom="transform opacity-0 scale-95"
                     enterTo="transform opacity-100 scale-100"
                     leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                     leaveTo="transform opacity-0 scale-95"
                   >
                     <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                       <Menu.Item>
                         {({ active }) => (
                          <NavLink exact to={`/tour-guides/${loggedInUser._id}`}
                             className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                           >
                             My Profile
                           </NavLink>
                         )}
                       </Menu.Item>
                       
                       <Menu.Item>
                         {({ active }) => (
                           <NavLink exact to='/'
                             className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                           >
                             <button onClick={logoutUser}>Logout</button>
                           </NavLink>
                         )}
                       </Menu.Item>
                     </Menu.Items>
                   </Transition>
                 </Menu>
               </div>
             </div>
          </div>

           <Disclosure.Panel className="sm:hidden">
             <div className="px-2 pt-2 pb-3 space-y-1">
               {navigationLoggedInGuide.map((item) => (
                 <NavLink
                   exact to={item.link}
                   className={classNames(
                     item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                     'block px-3 py-2 rounded-md text-base font-medium'
                   )}
                   aria-current={item.current ? 'page' : undefined}
                 >
                   {item.name}
                 </NavLink>
               ))}
             </div>
           </Disclosure.Panel>
         </>
       )}
    </Disclosure>
      
      )
    }

    else {
    return (
  
      <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="block lg:hidden h-8 w-auto"
                    src={logo}
                    alt="Razzed"
                  />
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigationLoggedOut.map((item) => (
                      <NavLink
   
                        exact to={item.link}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <h2 className='text-white font-bold text-xl'>Razzed</h2>                               
              </div>
            </div>
         </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationLoggedOut.map((item) => (
                <NavLink
                  exact to={item.link}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
   </Disclosure>
      
    )
    }
}