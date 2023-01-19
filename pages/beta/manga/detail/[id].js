import Layout from "../../../../components/layout";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Chapter() {
    
const [data, setData] = useState(null);
const [isloading, setIsLoading] = useState(true);
const [currentPage, setCurrentPage] = useState(1);
const [showFull, setShowFull] = useState(false);
const synopsisRef = useRef(null);
const itemsperPage = 10;

const router = useRouter();
const item = router.query.item ? JSON.parse(router.query.item) : {};

useEffect(() => {
    let isMounted = true;
    const storedData = localStorage.getItem('detail-items');
    if (storedData) {
        setData(JSON.parse(storedData));
        setIsLoading(false);
    } else {
        async function fetchData() {
            if (isMounted) {
                setIsLoading(true);
                const { data } = await axios.get(`https://manga-api-production-30a1.up.railway.app/api/manga/detail/${item.endpoint}`);
                setData(data);
                setIsLoading(false);
                localStorage.setItem('detail-items', JSON.stringify(data));
            }
        }
        fetchData();
    }
    return () => {
        isMounted = false;
        localStorage.removeItem('detail-items');
    }
}, [item.endpoint]);

    const startIndex = (currentPage - 1) * itemsperPage;
    const endIndex = startIndex + itemsperPage;

    return (
        <Layout>
            <div className="pt-[5.5rem] md:w-[1600px] min-h-screen relative flex flex-col">
            {isloading ? <p>Loading...</p> : data && (
                    <div className="flex flex-col md:gap-20 gap-10">

                        {/* PC/Tablet */}
                        <div className="md:flex hidden flex-col md:flex-row gap-10 items-start md:pt-nav"><img className="md:w-[225px] md:h-[336px] w-52 h-52 object-cover" src={data.thumb} alt={data.title} />
                            <div className="flex flex-col gap-10">
                                <h1 className="md:text-5xl font-karla">{data.title}</h1>
                                <p className="">{data.synopsis}</p>
                            </div>
                        </div>

                        {/* Mobile */}
                        <div className="flex flex-col gap-3 md:hidden">
                            <div className='md:shrink-0 flex justify-end relative '>
                                <img className='absolute h-[125px] w-[90px] md:hidden z-10 shadow-xl object-cover rounded-lg top-[2rem] right-[1.5rem]' src={data.thumb} alt={data.title} />
                                <img className='h-[7rem] w-full object-cover md:h-[312px] md:w-[224px] md:blur-none blur-[1px] z-0' src={data.thumb} alt={data.title} />
                            </div>
                            <div className="px-2 flex flex-col gap-7">
                                <h1 className="font-bold font-karla w-64 text-xl">{data.title}</h1>
                                <p className="font-robot font-light text-sm px-4 inline" ref={synopsisRef}>{data && data.synopsis && data.synopsis.substring(0, 150)} {showFull && <p>{data.synopsis}</p>} <button className="font-bold " onClick={() => {setShowFull(!showFull)}}>{showFull ? 'Read Less' : 'Read More...'}</button></p>
                                {/* <p className="font-robot font-light text-sm px-4">{data.synopsis}</p> */}
                            </div>
                        </div>

                        <div className="flex flex-col md:gap-16 gap-10 md:px-0 px-3 justify-between h-[70vh]">
                            <div className="flex flex-col md:gap-16 gap-10">
                                <h1 className="md:text-4xl font-bold font-outfit">CHAPTERS</h1>
                                <div className="flex flex-col gap-5 md:text-2xl">
                                    {data && Array.isArray(data.chapter) &&data.chapter.slice(startIndex, endIndex).map(({ chapter_title, chapter_endpoint }, index) => {
    
                                        const router = useRouter();
                                        const handleUpdate = (chapter) =>{
                                            router.push(
                                                {
                                                    pathname: `/beta/manga/chapter/${chapter_endpoint}`,
                                                    query: { item: JSON.stringify(chapter)}
                                                },
                                                undefined,
                                                { shallow: true }
                                            );
                                        };
                                        return (
                                        <div key={index} className=''>
                                            <Link href={`/beta/manga/chapter/${chapter_endpoint}`} onClick={() => handleUpdate(chapter_endpoint)}>
                                            <p>{chapter_title}</p>
                                            </Link>
                                        </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="flex gap-16 md:text-4xl">
                                {data && data.chapter && currentPage > 1 && (
                                    <button onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
                                )}
                                {data && data.chapter && currentPage < Math.ceil(data.chapter.length / itemsperPage) && (
                                    <button onClick={() => setCurrentPage(currentPage + 1)}>next</button>
                                ) }
                            </div>
                        </div>
                        <a className="" href="/beta/search">return to index</a>
                    </div>
                )}
            </div>
        </Layout>
    )
}

// Chapter.getInitialProps = async () => {
//     const res = await axios.get(`https://manga-api-production-30a1.up.railway.app/api/manga/detail/`)
//     return { mangaDetail: res.data };
// };

