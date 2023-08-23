import React from 'react';
import axios from 'axios';
import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';
import HeroHome from '../partials/HeroHome';
import FeaturesBlocks from '../partials/FeaturesBlocks';
import FeaturesZigZag from '../partials/FeaturesZigzag';
import Testimonials from '../partials/Testimonials';
import Banner from '../partials/Banner';
import Footer from '../partials/Footer';
import { useUserContext } from './../UserContext';

function Home({
  setIsSignedIn,
  isSignedIn,
  username
}) {
  const { userPlan, setUserPlan } = useUserContext();

  React.useEffect(() => {
    if (isSignedIn){
      if (userPlan === 'free') {
        const params = new URLSearchParams();
        params.append('username', username);
        axios.post(`http://127.0.0.1:4242/plan`, params)
        .then(response => {
          if (response.data.plan == 'premium')
          setUserPlan('premium'); 
        })
        .catch(error => {
          console.error('Error updating plan:', error);
        });
      }
    }
   }, [location]);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}

      {/*  Page content */}
      <main className="grow">
        {/*  Page illustration */}
        <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
          <PageIllustration />
        </div>

        {/*  Page sections */}
        <HeroHome 
          setIsSignedIn={setIsSignedIn}
          isSignedIn={isSignedIn}
        />
        <FeaturesBlocks />
        <FeaturesZigZag />
        <Testimonials />
      </main>

      <Banner />
    </div>
  );
}

export default Home;