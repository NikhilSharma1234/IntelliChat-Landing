/* global chrome*/
import React from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {Auth} from 'aws-amplify';

import Header from '../partials/Header';
import { Dialog, DialogContent, DialogTitle, Snackbar } from '@mui/material';

function SignUp(
  {
    setIsSignedIn,
    isSignedIn,
  }
) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [userSuccess, setUserSuccess] = React.useState(false);
  const [verificationCode, setVerificationCode] = React.useState(undefined);
  const [snackBarStatus, setSnackBarStatus] = React.useState(false);
  const [snackBarText, setSnackBarText] = React.useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const auth = searchParams.get('auth');

  const navigate = useNavigate();

  React.useEffect(() => {
    async function sendMessageToExtension() {
      await Auth.currentAuthenticatedUser().then((result) => {
        setSnackBarText('User Signed In, redirecting...');
        setSnackBarStatus(true);
        setTimeout(() => {
          chrome.runtime.sendMessage(process.env.VITE_CHROME_EXTENSION_ID, {jwt: result.signInUserSession.idToken.jwtToken}, response => {
            console.log(response)
            if (response) {
              
            }
          });
          setIsSignedIn(true)
          navigate("/")
        }, 2000);
      }).catch((err) => {
        setSnackBarText(`Could not authenticate: ${err}`);
        setSnackBarStatus(true);
      })
    }
    console.log(isSignedIn, auth)
    if (isSignedIn && auth) {
      sendMessageToExtension();
    }
    else if (isSignedIn) {
      //navigate("/");
      return
    }
  }, [auth]);


  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  function register(event) {
    event.preventDefault();
    if (!validateEmail(email)) return false;
    
    Auth.signUp(
        {
          attributes:
          {
            email
          },
          username,
          password
        }
      ).then((result) => {
      setSnackBarText('User Created, please verify your email');
      setSnackBarStatus(true);
      setUserSuccess(true);
     }).catch((err) => {
      setSnackBarText(`Unable to create user: ${err}`);
      setSnackBarStatus(true);
     })
  }
  function verifyCode() {
    if (!verificationCode) return false;
    Auth.confirmSignUp(username, verificationCode).then((result) => {
      setSnackBarText('User verified! Happy Browsing!');
      setSnackBarStatus(true);
      setUserSuccess(false);
      signInUser();
    }).catch((err) => {
      setSnackBarText(`Unable to verify user: ${err}`);
      setSnackBarStatus(true);
    })
  }
  function signInUser() {
    Auth.signIn(username, password).then((result) => {
      chrome.runtime.sendMessage(process.env.VITE_CHROME_EXTENSION_ID, {jwt: result.signInUserSession.idToken.jwtToken}, response => {
        if (response) {
          return response;
        }
      });
      setIsSignedIn(true);
    }).catch((err) => {
    })
  }
  return (
    <div>

    {/* Basic User Notifications*/}
    <Snackbar
      open={snackBarStatus}
      autoHideDuration={6000}
      onClose={() => {setSnackBarStatus(false)}}
      message={snackBarText}
    />

    {/* Dialog for verification code*/}
    <Dialog open={userSuccess} 
      onClose={() => setUserSuccess(false)}
      >
      <DialogTitle className="text-gray-300" style={{backgroundColor: '#25282C'}}>
        Verify Email:
      </DialogTitle>
      <DialogContent style={{backgroundColor: '#25282C'}}>
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full px-3">
            <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="code">Code<span className="text-red-600">*</span></label>
            <input onChange={(e) => setVerificationCode(e.target.value)} id="code" name="code" type="text" className="form-input w-full text-gray-300" placeholder="000000" required />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mt-6">
          <div className="w-full px-3">
            <button onClick={verifyCode} id="submitVerify" type="submitVerify" className="btn text-white bg-purple-600 hover:bg-purple-700 w-full">Verify</button>
          </div>
        </div>
      </DialogContent>
    </Dialog>

    {/* Main Page */}
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">

          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h1">Welcome. We exist to make your browsing easier.</h1>
          </div>

          {/* Form */}
          <div className="max-w-sm mx-auto">
            <div className="flex items-center my-6">
              <div className="border-t border-gray-700 border-dotted grow mr-3" aria-hidden="true"></div>
              <div className="text-gray-400">Register with your email</div>
              <div className="border-t border-gray-700 border-dotted grow ml-3" aria-hidden="true"></div>
            </div>
            <form onSubmit={e => register(e)}>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="username">User Name<span className="text-red-600">*</span></label>
                  <input onChange={(e) => setUsername(e.target.value)} id="username" name="username" type="username" className="form-input w-full text-gray-300" placeholder="johndoe" required />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="email">Email<span className="text-red-600">*</span></label>
                  <input onChange={(e) => setEmail(e.target.value)} id="email" name="email" type="email" className="form-input w-full text-gray-300" placeholder="you@yourcompany.com" required />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="password">Password <span className="text-red-600">*</span></label>
                  <input onChange={(e) => setPassword(e.target.value)} id="password" name="password" type="password" className="form-input w-full text-gray-300" placeholder="Password (at least 10 characters)" required />
                </div>
              </div>
              <div className="text-sm text-gray-500 text-center">
                I agree to be contacted by IntelliChat about this offer as per the IntelliChat <Link href="#" className="underline text-gray-400 hover:text-gray-200 hover:no-underline transition duration-150 ease-in-out">Privacy Policy</Link>.
              </div>
              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                  <button id="submit" type="submit" className="btn text-white bg-purple-600 hover:bg-purple-700 w-full">Sign up</button>
                </div>
              </div>
            </form>
            <div className="text-gray-400 text-center mt-6">
              Already using IntelliChat? <a href="/signin" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">Sign in</a>
            </div>
          </div>

        </div>
      </div>
    </section>
    </div>
  );
}

export default SignUp;