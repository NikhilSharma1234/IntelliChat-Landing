import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../images/white_transparent.png'
import {Auth} from 'aws-amplify';
import { useNavigate } from 'react-router-dom';

function Header({
    setIsSignedIn,
    isSignedIn,
}) {

  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const navigate = useNavigate();
  const trigger = useRef(null);
  const mobileNav = useRef(null);

  // close the mobile menu on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!mobileNav.current || !trigger.current) return;
      if (!mobileNavOpen || mobileNav.current.contains(target) || trigger.current.contains(target)) return;
      setMobileNavOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close the mobile menu if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!mobileNavOpen || keyCode !== 27) return;
      setMobileNavOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
  }, [isSignedIn])

  function signOut() {
    Auth.signOut().then(() =>{
      chrome.runtime.sendMessage(process.env.VITE_CHROME_EXTENSION_ID, {jwt: ''}, response => {
        if (response) {
          return response;
        }
      });
      setIsSignedIn(false);
      navigate("/");
    });
  }

  return (
    <header className="absolute w-full z-30">
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="flex items-center justify-between h-20">
        {/* Site branding */}
        <div className="shrink-0 mr-4">
          {/* Logo */}
          <Link to="/" className="block" aria-label="IntelliChat">
            <img src={Logo} width={144} alt="IntelliChat Logo"/>
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex md:grow">
          {/* Desktop sign in links */}
          <ul className="flex grow justify-end flex-wrap items-center">
            {isSignedIn
            ? 
            <li>
              <button onClick={() => signOut()}
                className="font-medium text-[#277EFF] hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"
              >
                Sign Out
              </button>
            </li>
            :
            <>
              <li>
                <Link
                  to="/signin"
                  className="font-medium text-[#277EFF] hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"
                >
                  Sign in
                </Link>
              </li>
              <li>
                <Link to="/signup" className="btn-sm text-white bg-[#277EFF] hover:opacity-90 ml-3">
                  Sign up
                </Link>
              </li>
            </>
            }
          </ul>
        </nav>

      </div>
    </div>
  </header>
  );
}

export default Header;
