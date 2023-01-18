import React from 'react'
import axios from 'axios'
import Layout from '../../components/layout'
import Link from 'next/link';
import { useRouter } from 'next/router';
import Chapter from './manga/detail/[id]';

export default function Manga({ mangaList }) {
    

  return (
    <Layout>
        <div className='grid md:grid-cols-7 grid-cols-3 md:scale-100 pt-nav md:w-[1600px] gap-10'>
            {mangaList.map(manga => {
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
                    <div className=''>
                        <Link href={`/beta/manga/detail/${manga.endpoint}`} onClick={() => handleUpdate(manga)}>
                            {/* <Chapter endPoint={manga.endpoint} /> */}
                            <img src={manga.thumb} alt={manga.title} className="object-cover h-[270px] w-full hover:scale-110 transition-all duration-300" />
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

Manga.getInitialProps = async () => {
    const res = await axios.get('https://manga-api-production-30a1.up.railway.app/api/manga/popular/1');
    return { mangaList: res.data.manga_list };
  };


