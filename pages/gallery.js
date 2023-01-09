import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
import { ApolloProvider } from '@apollo/client';
import Anime from '../components/anime';
import client from '../lib/apolloClient';


export default function Gallery() {

  const [query, setQuery] = useState(null);

  function checkSetQuery(e) {
        e.target.value == "" || e.target.value == null?
            setQuery(null): (setQuery(e.target.value))
    }

  useEffect(() => {
    const nav = document.querySelector(".nav");
      let lastScrollY = window.scrollY
    
      window.addEventListener("scroll", () => {
        if (lastScrollY < window.scrollY) {
          nav.classList.add("md:translate-y-[-100%]");
        } else {
          nav.classList.remove("md:translate-y-[-100%]");
        }
    
        lastScrollY = window.scrollY
      });
  }, [])

  return (
        <>
          <Head>
            <title>Moopa - Gallery</title>
            <meta name="gallery" content="Search your Anime or Manga" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/c.svg" />
          </Head>
              <div>
                <Navbar className="nav transition-all duration-500 dark:bg-black bg-white bg-opacity-90 dark:bg-opacity-100 md:fixed md:top-0 z-50 w-screen h-16" />
      
                    <div className='flex justify-center transition-colors duration-500 md:pt-16 bg-[#F9F9F9] dark:bg-[#121212] md:justify-start pl-0 md:pl-32'>
                      <input className='m-10 text-center dark:bg-[#121212] dark:ring-white ring-gray-300 ring-[0.6px] rounded-md' placeholder='Search here...' onChange={checkSetQuery} />
                    </div>
                  <main className='bg-[#F9F9F9] dark:bg-[#121212] transition-all duration-500 min-h-screen w-screen flex items-center justify-center'>
      
                    <ApolloProvider client={client}>
                      <Anime searchQuery={query} />
                    </ApolloProvider>
                  </main>
               
      
                <Footer />
              </div>
        </>
  )
}
