import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Layout from '../../components/layout'
import Link from 'next/link';
import { useRouter } from 'next/router';
import Chapter from './manga/detail/[id]';

export default function Manga({ mangaList }) {
    
    const [query, setQuery] = useState(null);
    const [isloading, setIsLoading] = useState(true);
    const [state, setState] = useState({mangaList: []});

    useEffect(() => {
        setIsLoading(true);
        axios.get('https://manga-api-production-30a1.up.railway.app/api/manga/popular/1')
        .then(res => setState({ mangaList: res.data.manga_list }))
        .catch(err => console.log(err))
        setIsLoading(false);
    }, [])

    function checkSetQuery(e) {
        setQuery(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(!query) {
            setIsLoading(true);
            axios.get('https://manga-api-production-30a1.up.railway.app/api/manga/popular/1')
        .then(res => setState({ mangaList: res.data.manga_list }))
        .catch(err => console.log(err))
        setIsLoading(false);
        } else {
            setIsLoading(true);
            axios.get(`https://manga-api-production-30a1.up.railway.app/api/search/${query}`)
            .then(res => setState({ mangaList: res.data.manga_list }))
            .catch(err => console.log(err))
            setIsLoading(false);
        }
        
    }

    // if(!mangaList) {
    //     <div className='text-center space-y-5 font-bold'>
    //                         {/* <Chapter endPoint={manga.endpoint} /> */}
    //                         <img src='https://cdn.discordapp.com/attachments/986579286397964290/1058415946945003611/gray_pfp.png`' alt='loading' className="object-cover h-[10rem] rounded-t-md w-full hover:scale-110 transition-all duration-300" />
    //                     <h1>loading...</h1>
    //                 </div>
    // }

  return (
    <Layout>
        <form onSubmit={handleSubmit} className="pt-[8rem] flex justify-center md:justify-start">
            <input className='shadow-md dark:bg-[#3b3b3b] md:w-52 w-[80%] rounded-md text-center h-7' placeholder='Search here...' onChange={checkSetQuery}/>
        </form>
        <div className='grid md:grid-cols-4 grid-cols-3 md:scale-100 md:mx-0 mx-2 pt-nav md:w-[1600px] min-h-screen md:gap-10 gap-3 pb-10'>
        
    {isloading ? <p>Loading...</p> : state.mangaList.map(manga => {
                const router = useRouter();
                const handleUpdate = (manga) => {
                    router.push(
                        {
                            pathname: `/beta/manga/detail/${manga.endpoint}`,
                            query: { item: JSON.stringify(manga) },
                        },
                        undefined,
                        { shallow: true }
                    );
                };
                return (
                <div key={manga.endpoint} className="">
                    {/* <h2>{manga.title}</h2> */}
                    {/* <img src={manga.thumb} alt={manga.title} /> */}
                    <div className='text-center space-y-5 font-bold'>
                        <Link href={`/beta/manga/detail/${manga.endpoint}`} onClick={() => handleUpdate(manga)}>
                            {/* <Chapter endPoint={manga.endpoint} /> */}
                            <img src={manga.thumb} alt={manga.title} className="object-cover md:h-[10rem] scale-90 md:scale-100 md:rounded-t-md h-[13rem] w-full hover:scale-110 transition-all duration-300" />
                        </Link>
                        <h1>{manga.title}</h1>
                    </div>
                </div>
                )
            })}
        </div>
    </Layout>
  )
}


// Manga.getInitialProps = async (query) => {
//     console.log(query)
//     const res = await axios.get(`https://manga-api-production-30a1.up.railway.app/api/search/${query}`);
//     return { mangaList: res.data.manga_list };
//   };


