import Layout from "../../../../components/layout";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Chapter() {
    
const [data, setData] = useState(null);
const [isloading, setIsLoading] = useState(true);
const [currentPage, setCurrentPage] = useState(1);
const itemsperPage = 10;

const router = useRouter();
const item = router.query.item ? JSON.parse(router.query.item) : {};

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const { data } = await axios.get(`https://manga-api-production-30a1.up.railway.app/api/manga/detail/${item.endpoint}`);
            setData(data);
            setIsLoading(false);
        }
        fetchData();
    }, []);

    const startIndex = (currentPage - 1) * itemsperPage;
    const endIndex = startIndex + itemsperPage;

    return (
        <Layout>
            <div className="pt-[5.5rem] w-[1600px] min-h-screen h-[160vh] relative">
            {isloading ? <p>Loading...</p> : data && (
                    <div className="flex flex-col gap-20">
                        <div className="flex gap-10 items-start pt-nav"><img className="w-[225px] h-[336px] object-cover" src={data.thumb} alt={data.title} />
                            <div className="flex flex-col gap-10">
                                <h1 className="text-5xl font-karla">{data.title}</h1>
                                <p>{data.synopsis}</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-16">
                            <h1 className="text-4xl font-bold font-outfit">CHAPTERS</h1>
                            <div className="flex flex-col gap-5 text-2xl">
                                {data.chapter.slice(startIndex, endIndex).map(({ chapter_title, chapter_endpoint }, index) => {

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
                                    <div key={index} className='grid grid-cols-5'>
                                        <Link href={`/beta/manga/chapter/${chapter_endpoint}`} onClick={() => handleUpdate(chapter_endpoint)}>
                                        <p>{chapter_title}</p>
                                        </Link>
                                    </div>
                                    )
                                })}
                            </div>
                            <div className="flex gap-16 text-4xl items-end">
                                {currentPage > 1 && (
                                    <button onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
                                )}
                                {currentPage < Math.ceil(data.chapter.length / itemsperPage) && (
                                    <button onClick={() => setCurrentPage(currentPage + 1)}>next</button>
                                ) }
                            </div>
                        </div>
                        <a className="absolute bottom-10" href="/beta/search">return to manga</a>
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

