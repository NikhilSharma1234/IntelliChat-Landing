import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { Snackbar } from '@mui/material';
import axios from "axios";

function Documentation({
  
}) {
  const location = useLocation();
  const [snackBarStatus, setSnackBarStatus] = React.useState(false);
  const [snackBarText, setSnackBarText] = React.useState('');

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Snackbar
        open={snackBarStatus}
        autoHideDuration={6000}
        onClose={() => {setSnackBarStatus(false)}}
        message={snackBarText}
      />
      <main className="grow">
        <section className="relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                    <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                        <h1 className="h1" data-aos="fade-up" data-aos-delay="400">Documentation</h1>
                    </div>
                    <div className='bg-gray-800 rounded-lg p-6 space-y-10' data-aos="fade-up" data-aos-delay="600">
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold">Summarize 📕</h2>
                            <p className="text-white">
                            Have the extension summarize the blocks of highlighted material you choose.
                            </p>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold">Define 🤓</h2>
                            <p className="text-white">
                            Have the extension teach you what a specific word or phrase is.
                            </p>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold">Learn More 🧐</h2>
                            <p className="text-white">
                            Retrieve links and further information regarding the highlighted material.
                            </p>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold">Shortcuts ✂️</h2>
                            <p className="text-white">
                            Use the shortcut <span className="font-semibold underline">Ctrl + Shift + X</span> to activate the extension.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold">Right-Click 🖱️</h2>
                            <p className="text-white">
                            <span className='underline font-semibold'>Right-click</span> on highlighted text to activate the extension.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      </main>
    </div>
  );
}

export default Documentation;
