import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';
import Anime from '../components/anime';
import client from '../lib/apolloClient';
import Layout from '../components/layout';

const MediaTypeSelector = ({selectedType, onChange}) => (
  <select value={selectedType} onChange={onChange} className="w-40 h-10 ring-gray-300 dark:ring-1 subpixel-antialiased ring-0 rounded-md text-center text-gray-800 dark:text-white transition-all duration-300 dark:bg-[#121212] dark:ring-white bg-slate-50 shadow-button">
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
              <div className='flex justify-between items-center pt-nav transition-colors duration-500 bg-[#F9F9F9] dark:bg-[#121212] md:justify-start pl-0 '>
                <div className='flex justify-between w-screen my-5 md:my-10 mx-auto md:px-44 px-8 '>
                  <input className='w-auto md:w-[270px] text-center dark:bg-[#121212] dark:ring-white ring-gray-300 ring-[0.6px] rounded-md' placeholder='Search here...' onChange={checkSetQuery} />

                  <div className='flex items-center gap-10'><h1 className='font-bold font-outfit hidden md:block'>BROWSE</h1><MediaTypeSelector selectedType={selectedType} onChange={handleTypeChange}/></div>
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
