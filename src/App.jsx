import React, { useEffect, useContext } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import 'aos/dist/aos.css';
import './css/style.css';

import AOS from 'aos';
import {Amplify} from 'aws-amplify';
Amplify.configure({
  Auth: {
    userPoolId: process.env.VITE_USER_POOL_ID, //UserPool ID
    region: 'us-east-1',
    userPoolWebClientId: process.env.VITE_POOL_WEB_CLIENT_ID //WebClientId
  }
});
import {Auth} from 'aws-amplify';

import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Payments from './pages/Payments'
import ResetPassword from './pages/ResetPassword';
import Header from './partials/Header';

function App() {
  const [render, setRender] = React.useState(false)
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const location = useLocation();

  useEffect(() => {
    async function checkAuth() {
      try {
        const auth = await Auth.currentAuthenticatedUser();
        if (auth) {
          setIsSignedIn(true)
        }
        else {
          setIsSignedIn(false)
        }
      }
      catch(err) {
      }
    }
    checkAuth()
  }, [])

  useEffect(() => {
    if (isSignedIn) {
      setRender(true);
    }
    setRender(true)
  }, [isSignedIn])

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 600,
      easing: 'ease-out-sine',
    });
  });

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  if (render) {
  return (
    <>
      <Header
        setIsSignedIn={setIsSignedIn}
        isSignedIn={isSignedIn}
      />
      <Routes>
      <Route exact path="/" element={
          <Home
            setIsSignedIn={setIsSignedIn}
            isSignedIn={isSignedIn}
          />
        } />
        <Route path="/signin" element={
          <SignIn 
            setIsSignedIn={setIsSignedIn}
            isSignedIn={isSignedIn}
          />
        } />
        <Route path="/signup" element={
          <SignUp
            setIsSignedIn={setIsSignedIn}
            isSignedIn={isSignedIn}
          />
        } />
        <Route path="/payments" element={
            <Payments
              setIsSignedIn={setIsSignedIn}
              isSignedIn={isSignedIn}
            />
          } />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </>
  );
  }
}

export default App;
