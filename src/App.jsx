import React, { useEffect } from 'react';
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
import ResetPassword from './pages/ResetPassword';
import { UserProvider } from './AppContext';

function App() {
  const [render, setRender] = React.useState(false)
  const location = useLocation();

  useEffect(() => {
    async function checkAuth() {
    try {
      if (Auth.currentAuthenticatedUser()) {
        return true
      }
      return false
    }
    catch(err) {
      console.log(err)
    }
    }
    if (checkAuth()) setRender(true)
    setRender(true);
  })

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
    <UserProvider>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
      </UserProvider>
    </>
  );
  }
}

export default App;
