import React, { useState } from 'react';
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

  return (
        <>
          <Head>
            <title>Moopa - Gallery</title>
            <meta name="gallery" content="Search your Anime or Manga" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/c.svg" />
          </Head>
          <Navbar className="dark:bg-black" />

              <div className='flex justify-center bg-[#F9F9F9] dark:bg-[#121212] md:justify-start pl-0 md:pl-32'>
                <input className='m-10 text-center dark:bg-[#121212] dark:ring-white ring-gray-300 ring-[0.6px] rounded-md' placeholder='Search here...' onChange={checkSetQuery} />
              </div>
            <main className='bg-[#F9F9F9] dark:bg-[#121212] min-h-screen w-screen flex items-center justify-center'>

              <ApolloProvider client={client}>
                <Anime searchQuery={query} />
              </ApolloProvider>
            </main>
         

          <Footer />
        </>
  )
}
