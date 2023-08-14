import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';
import Banner from '../partials/Banner';
import {Auth} from 'aws-amplify';
import { Snackbar } from '@mui/material';

function SignIn({
  setIsSignedIn,
  isSignedIn,
}) {
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [snackBarStatus, setSnackBarStatus] = React.useState(false);
  const [snackBarText, setSnackBarText] = React.useState('');
  const navigate = useNavigate();

  function signIn(event) {
    event.preventDefault();
    Auth.signIn(
      username,
      password
      ).then((result) => {
      setSnackBarText('User Signed In, redirecting...');
      setSnackBarStatus(true);
      setTimeout(() => {
        chrome.runtime.sendMessage(process.env.VITE_CHROME_EXTENSION_ID, {jwt: result.signInUserSession.idToken.jwtToken}, response => {
          if (response) {
            return response;
          }
        });
        setIsSignedIn(true)
        navigate("/")
      }, 2000);
     }).catch((err) => {
      setSnackBarText(`Unable to sign in: ${err}`);
      setSnackBarStatus(true);
     })
  }
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/* Basic User Notifications*/}
      <Snackbar
        open={snackBarStatus}
        autoHideDuration={6000}
        onClose={() => {setSnackBarStatus(false)}}
        message={snackBarText}
      />

      {/*  Page content */}
      <main className="grow">

        {/*  Page illustration */}
        <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
          <PageIllustration />
        </div>

        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">

              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">Welcome back. We exist to make browsing easier.</h1>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <div className="flex items-center my-6">
                  <div className="border-t border-gray-700 border-dotted grow mr-3" aria-hidden="true"></div>
                  <div className="text-gray-400">Sign in with your email</div>
                  <div className="border-t border-gray-700 border-dotted grow ml-3" aria-hidden="true"></div>
                </div>
                <form onSubmit={e => signIn(e)}>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="username">User Name<span className="text-red-600">*</span></label>
                      <input onChange={(e) => setUsername(e.target.value)} id="username" name="username" type="username" className="form-input w-full text-gray-300" placeholder="johndoe" required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="password">Password</label>
                      <input onChange={(e) => setPassword(e.target.value)} id="password" type="password" className="form-input w-full text-gray-300" placeholder="Password (at least 10 characters)" required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <div className="flex justify-between">
                        <label className="flex items-center">
                          <input type="checkbox" className="form-checkbox" />
                          <span className="text-gray-400 ml-2">Keep me signed in</span>
                        </label>
                        <Link to="/reset-password" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">Forgot Password?</Link>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button className="btn text-white bg-purple-600 hover:bg-purple-700 w-full">Sign in</button>
                    </div>
                  </div>
                </form>
                <div className="text-gray-400 text-center mt-6">
                  Don’t you have an account? <Link to="/signup" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">Sign up</Link>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      <Banner />

    </div>
  );
}

export default SignIn;