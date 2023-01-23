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
                        <form onSubmit={() => handleSubmit(query)} className="pt-[8rem] flex justify-center md:justify-start">
                            <input className='shadow-md dark:bg-[#3b3b3b] md:w-52 w-[80%] rounded-md text-center h-7' placeholder='Search here...' onChange={checkSetQuery}/>
                        </form>
                        <div className='grid md:grid-cols-4 grid-cols-3 md:scale-100 md:mx-0 mx-2 pt-nav md:w-[1600px] min-h-screen md:gap-10 gap-3 pb-10'>
                        
                    {query ? state.mangaList.map(manga => {
                                
                                return (
                                <m.div key={manga.endpoint}>
                                    {/* <h2>{manga.title}</h2> */}
                                    {/* <img src={manga.thumb} alt={manga.title} /> */}
                                    <div className='text-center space-y-5 font-bold'>
                                        <Link href={`/beta/manga/detail/[id]`} as={`/beta/manga/detail/${manga.endpoint}`}>
                                            {/* <Chapter endPoint={manga.endpoint} /> */}
                                            <img src={manga.thumb} alt={manga.title} className="object-cover md:h-[10rem] scale-90 md:scale-100 md:rounded-t-md h-[12rem] w-full hover:scale-105 hover:md:scale-110 transition-all duration-300" />
                                        </Link>
                                        <h1>{manga.title}</h1>
                                    </div>
                                </m.div>
                                )
                            }) : mangaList.map(manga => {
                                return (
                                    <m.div key={manga.endpoint} className="">
                                    {/* <h2>{manga.title}</h2> */}
                                    {/* <img src={manga.thumb} alt={manga.title} /> */}
                                    <div className='text-center space-y-5 font-bold'>
                                        <Link href={`/beta/manga/detail/[id]`} as={`/beta/manga/detail/${manga.endpoint}`}>
                                            {/* <Chapter endPoint={manga.endpoint} /> */}
                                            <img src={manga.thumb} alt={manga.title} className="object-cover md:h-[10rem] scale-90 md:scale-100 md:rounded-t-md h-[12rem] w-full hover:scale-105 transition-all duration-300" />
                                        </Link>
                                        <h1>{manga.title}</h1>
                                    </div>
                                </m.div>
                                )
                            })}
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