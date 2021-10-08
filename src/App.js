import './App.css';
import NavBar from './components/NavBar';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import SignupAgencies from './components/Agency/SignupAgencies';
import SignupGuides from './components/Guide/SignupGuides';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoggedUserProvider } from "./context/loggedInUser";
import { useState } from 'react';
import LoginAgency from './components/Agency/LoginAgency';
import LoginGuide from './components/Guide/LoginGuide';
import CreateTour from './components/Tour/CreateTour';
import AgencyRoute from './components/AgencyRoute';
import AgencyProfile from './components/Agency/AgencyProfile';
import GuideProfile from './components/Guide/GuideProfile';
import AgencyList from './components/Agency/AgencyList';
import GuideRoute from './components/GuideRoute'
import AgencyEdit from './components/Agency/AgencyEdit';
import GuideEdit from './components/Guide/GuideEdit';
import MyTours from './components/Tour/MyTours';
import AllTours from './components/Tour/AllTours';
import EditTour from './components/Tour/EditTour';
import 'react-calendar/dist/Calendar.css';
import GuideMyTours from './components/Guide/GuideMyTours';
import GuideList from './components/Guide/GuideList';
import PreviousTours from './components/Agency/PreviousTours';



function App() {

  const [loggedInUser, setLoggedInUser] = useState('');

  return (
    <div className="App">
    <LoggedUserProvider value={loggedInUser}>

    <NavBar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />

    <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme={'dark'} />

    <Switch>
    
      <GuideRoute exact path='/tours' component={AllTours} />
      <Route exact path='/tours/add' component={CreateTour} />
      <Route exact path='/' component={Home} />
      <GuideRoute exact path='/agencies' component={AgencyList} />
      <AgencyRoute exact path='/tour-guides' component={GuideList} />
      <Route exact path='/agencies/signup' component={SignupAgencies} />
      <Route exact path='/tour-guides/signup' component={SignupGuides} />
      <Route exact path="/agencies/login" render={() => {
              return <LoginAgency setLoggedInUser={setLoggedInUser} />}} />
      <Route exact path="/tour-guides/login" render={() => {
              return <LoginGuide setLoggedInUser={setLoggedInUser} />}} />
      <Route exact path='/agencies/:id' component={AgencyProfile} />
      <Route exact path='/tour-guides/:id' component={GuideProfile} />
      <Route exact path='/agencies/:id/edit' component={AgencyEdit} />
      <Route exact path='/tour-guides/:id/edit' component={GuideEdit} />
      <Route exact path='/agencies/:id/my-tours' component={MyTours} />
      <Route exact path='/tour-guides/:id/my-tours' component={GuideMyTours} />
      <Route exact path='/my-tours/:id/edit' component={EditTour} />
      <GuideRoute exact path='/agencies/:id/booked-tours' component={PreviousTours} />
      
    </Switch>

   </LoggedUserProvider>
    </div>
  );
}

export default App;
