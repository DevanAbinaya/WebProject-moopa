import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';
import Anime from '../components/anime';
import client from '../lib/apolloClient';
import Layout from '../components/layout';

const MediaTypeSelector = ({selectedType, onChange}) => (
  <select value={selectedType} onChange={onChange} className="md:w-40 md:h-10 w-20 h-8 ring-gray-300 antialiased rounded-md text-center text-gray-800 dark:text-white transition-all duration-300 dark:bg-[#121212] ring-transparent bg-slate-50 shadow-sm">
    <option value="ANIME">Anime</option>
    <option value="MANGA">Manga</option>
  </select>
)

export default function Gallery() {

  const [query, setQuery] = useState(null);
  const [selectedType, setSelectedType] = useState("ANIME");

  function checkSetQuery(e) {
        e.target.value == "" || e.target.value == null?
            setQuery(null): (setQuery(e.target.value))
    }
  
  function handleTypeChange(e) {
    setSelectedType(e.target.value);
  }

  return (
        <>
          <Head>
            <title>Moopa - Gallery</title>
            <meta name="gallery" content="Search your Anime or Manga" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/c.svg" />
          </Head>
            <Layout>
              <div className=' pt-[8rem] flex transition-all duration-500 md:justify-center w-screen bg-[#f9f9f9] dark:bg-[#121212]'>
              <div className=' flex flex-col md:flex-row justify-between gap-4 md:mx-0 mx-5 md:w-[80%] w-screen'>
                <input className='h-8 md:w-52 text-center rounded-md md:scale-100' placeholder='Search here...' onChange={checkSetQuery} />
  
                <div className='flex items-center justify-between gap-10 text-sm md:text-lg md:scale-100'><h1 className='font-karla font-bold'>BROWSE</h1><div className='scale-[85%] md:scale-100'><MediaTypeSelector selectedType={selectedType} onChange={handleTypeChange}/></div></div>
              </div>
              </div>

             

            <main className='bg-[#F9F9F9] dark:bg-[#121212] transition-all duration-500 min-h-screen w-screen flex items-center justify-center'>
              <ApolloProvider client={client}>
                <Anime searchQuery={query} selectedType={selectedType} />
              </ApolloProvider>
            </main>
            </Layout>
        </>
  )
}
