import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { Snackbar } from '@mui/material';
import axios from "axios";
import { useUserContext } from './../UserContext';

function Payments({
  isSignedIn,
  username,
}) {
  const [snackBarStatus, setSnackBarStatus] = React.useState(false);
  const [cancelSub, setCancelSub] = React.useState(false);
  const [snackBarText, setSnackBarText] = React.useState('');
  const navigate = useNavigate();
  const { userPlan, setUserPlan } = useUserContext();

  const handleCancel = () => {
    setCancelSub(!cancelSub);
  };

  const handleSubmit = async (route) => {
    const params = new URLSearchParams();
    params.append('username', username);
    const resp = await axios.post(`http://localhost:4242${route}`, params);
    
    await updatePlan();
    return resp;
  };

  const updatePlan = async () => {
    const params = new URLSearchParams();
    params.append('username', username);
    const resp = await axios.post(`http://localhost:4242/plan`, params);
    console.log(resp);
    setUserPlan(resp);
  };


  const Plans = () => (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">

            {/* Page header */}
            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            {isSignedIn ? (
                <h1 className="h1">Welcome to the {userPlan === 'free' ? 'Free Plan' : 'Premium Plan'}</h1>
            ) : (
                <div className="justify-center">
                    <h1 className="h1">Sign in to view <p></p>payment plans</h1>
                    <Link to="/" className="border p-8 rounded-lg bg-[#277EFF] text-white flex-1">
                        Home 🏠
                    </Link>
                </div>
            )}
            </div>

            {/* Payment options */}
            <div className="mx-auto flex justify-center space-x-32">
                {/* Display plan details */}
                {isSignedIn && userPlan === 'free' && (
                    <>
                        <div className="p-8 rounded-lg bg-gray-800 text-gray-300 flex-1">
                            <h2 className="text-lg font-semibold">Current Plan: Free</h2>
                            <p>You are on the free plan with limited messaging options and basic features.</p>
                            <div className="mt-4 text-gray-400">
                                <div>• Only 10 messages per day. 😥</div>
                                <div>• No customer support. 😔</div>
                                <div>• Throttled heavily. 😭</div>
                            </div>
                            <form onSubmit={() => handleSubmit('/checkout')}>
                                <button type="submit">
                                    <br />
                                    <br />
                                    <span className="p-2 bg-gray-300 rounded-lg text-gray-700 font-bold">Upgrade</span>
                                </button>
                            </form>
                        </div>
                        <div className="w-1/2 p-8 rounded-lg bg-[#277EFF] text-white flex-1">
                            <h2 className="text-lg font-semibold">Other Plans: Premium</h2>
                            <p>Enjoy unlimited messaging options, higher rates, faster message responses, and no throttling.</p>
                            <div className="mt-4 text-white">
                                <div>• Unlimited messages per day. 💯</div>
                                <div>• Custom input messages <span className="text-xs">(like ChatGPT, but on-demand)</span>. 😮</div>
                                <div>• Priority customer support. 🗿</div>
                                <div>• No throttling or downtime! 🚀</div>
                            </div>
                            <form onSubmit={() => handleSubmit('/checkout')}>
                                <button type="submit">
                                        <br />
                                        <span className="p-2 bg-gray-200 text-[#277EFF] rounded-lg font-bold">Join for $5/month</span>
                                </button>
                            </form>
                        </div>
                    </>
                )}
            </div>

            {isSignedIn && userPlan === 'premium' && (
                <div className="space-y-8">
                    <div className="border p-8 rounded-lg bg-[#277EFF] text-white flex-1">
                        <h2 className="text-lg font-semibold">Current Plan: Premium ⭐</h2>
                        <p>Enjoy unlimited messaging options, higher rates, faster message responses, and no throttling.</p>
                        <div className="mt-4 text-white">
                            <div>• Unlimited messages per day. 💯</div>
                            <div>• Custom input messages (like ChatGPT, but on-demand). 😮</div>
                            <div>• Priority customer support @ intellichat@gmail.com. 🗿</div>
                            <div>• No throttling or downtime! 🚀</div>
                        </div>
                    </div>
                    <div className="text-center space-x-6">
                        <form onSubmit={() => handleSubmit('/cancel')}>
                            <button type="button" onClick={handleCancel} className="p-2 bg-gray-300 rounded-lg text-gray-600 font-bold">Cancel Subscription </button>
                            {cancelSub && (
                                <>
                                    <button type="submit" className="p-2 bg-gray-300 rounded-lg text-gray-600 font-bold ml-6">
                                        Actually? 😭
                                    </button>
                                </>
                            )}
                        </form>
                    </div>
                </div>
            )}
        </div>
    </div>
  );

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    
    

    if (isSignedIn) {
      if (query.get("success") && userPlan == 'premium') {
        setSnackBarText("Subscription complete! You will receive an email confirmation.");
        setSnackBarStatus(true);
      }
      
      if (query.get("canceled")) {
        setSnackBarText("Order canceled -- continue to checkout when you're ready.");
        setSnackBarStatus(true);
      }
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {isSignedIn && (<Snackbar
        open={snackBarStatus}
        autoHideDuration={6000}
        onClose={() => {setSnackBarStatus(false)}}
        message={snackBarText}
      />)}
      <main className="grow">
        <section className="relative">
            <Plans />
        </section>
      </main>
    </div>
  );
}

export default Payments;
