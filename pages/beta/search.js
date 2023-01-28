import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Layout from '../../components/layout'
import Link from 'next/link';
import Head from 'next/head';
import { AnimatePresence, motion as m } from 'framer-motion';

export default function Manga(props) {
    
    const [query, setQuery] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [state, setState] = useState({mangaList: props.data.manga_list});

    const mangaList = props.data.manga_list;

    // console.log(mangaList);

    useEffect(() => {
        setIsLoading(false)
    }, [])

    // if (isLoading) {
    //     return <div>Loading...</div>
    // }

    function handleSubmit(query) {
        event.preventDefault();
        axios.get(`https://manga-api-production-30a1.up.railway.app/api/search/${query}`)
            .then(res => {
                setState({mangaList: res.data.manga_list})
            })
            .catch(err => {
                console.log(err)
            });
    }

    function checkSetQuery(e) {
        setQuery(e.target.value)
    }

  return (
    <>
                <Head>
                    <title>Moopa - Search</title>
                    <meta name="Search" content="Search your Manga" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/c.svg" />
                  </Head>
                    <Layout>
                        <div className='flex flex-col gap-16'>
                            <form onSubmit={() => handleSubmit(query)} className="pt-[8rem] flex justify-center md:justify-start">
                                <input className='shadow-md dark:bg-[#3b3b3b] md:w-52 w-[80%] rounded-md text-center h-7' placeholder='Search here...' onChange={checkSetQuery}/>
                            </form>
                            <div className='grid grid-cols-3 md:grid-cols-4 justify-center mx-auto gap-10'>
                            
                        {query ? state.mangaList.map(manga => {
                                    
                                    return (
                                    <m.div key={manga.endpoint}>
                                        {/* <h2>{manga.title}</h2> */}
                                        {/* <img src={manga.thumb} alt={manga.title} /> */}
                                        <div className='text-center space-y-5 font-bold'>
                                            <Link href={`/beta/manga/detail/query/[id]`} as={`/beta/manga/detail/query/${manga.endpoint}`}>
                                                {/* <Chapter endPoint={manga.endpoint} /> */}
                                                <img src={manga.thumb} alt={manga.title} className="object-cover md:h-[10rem] scale-90 md:scale-100 md:rounded-t-md h-48 w-full hover:scale-105 hover:md:scale-110 transition-all duration-300" />
                                            </Link>
                                            <h1>{manga.title}</h1>
                                        </div>
                                    </m.div>
                                    )
                                }) : mangaList.map(manga => {
                                    return (
                                        <m.div key={manga.endpoint} className="w-32 md:w-[80%]">
                                        {/* <h2>{manga.title}</h2> */}
                                        {/* <img src={manga.thumb} alt={manga.title} /> */}
                                        <div className='space-y-2 md:space-y-5 font-bold'>
                                            <Link href={`/beta/manga/detail/query/[id]`} as={`/beta/manga/detail/query/${manga.endpoint}`}>
                                                {/* <Chapter endPoint={manga.endpoint} /> */}
                                                <img src={manga.thumb} alt={manga.title} className="object-cover md:h-[10rem] md:scale-100 md:rounded-t-md h-52 w-32 md:w-full hover:scale-110 hover:shadow-lg transition-all duration-300" />
                                            </Link>
                                            <h1>{manga.title}</h1>
                                        </div>
                                    </m.div>
                                    )
                                })}
                            </div>
                        </div>
                    </Layout>
    </>
  )
}

Manga.getInitialProps = async function() {
    const res = await fetch('https://manga-api-production-30a1.up.railway.app/api/manga/popular/1')
    const data = await res.json()
    return { data }
}