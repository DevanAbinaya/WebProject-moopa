import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/layout";
import Link from "next/link";
import Head from "next/head";
import { MANGA } from "@consumet/extensions";
import { motion as m } from "framer-motion";

export default function Manga(props) {
  const [query, setQuery] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [state, setState] = useState({ mangaList: props.data.manga_list });

  const mangaList = props.data.manga_list;

  // console.log(mangaList);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  // if (isLoading) {
  //     return <div>Loading...</div>
  // }

  function handleSubmit(query) {
    event.preventDefault();
    axios
      .get(
        `https://manga-api-production-30a1.up.railway.app/api/search/${query}`
      )
      .then((res) => {
        setState({ mangaList: res.data.manga_list });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function checkSetQuery(e) {
    setQuery(e.target.value);
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
        <form
          onSubmit={() => handleSubmit(query)}
          className="flex justify-center pt-[8rem] md:justify-start"
        >
          <input
            className="h-7 w-[80%] rounded-md text-center shadow-md dark:bg-[#3b3b3b] md:w-52"
            placeholder="Search here..."
            onChange={checkSetQuery}
          />
        </form>
        <div className="mx-2 grid min-h-screen grid-cols-3 gap-3 pt-nav pb-10 md:mx-0 md:w-[1600px] md:scale-100 md:grid-cols-4 md:gap-10">
          {query
            ? state.mangaList.map((manga) => {
                return (
                  <m.div key={manga.endpoint}>
                    {/* <h2>{manga.title}</h2> */}
                    {/* <img src={manga.thumb} alt={manga.title} /> */}
                    <div className="space-y-5 text-center font-bold">
                      <Link
                        href={`/beta/manga/detail/query/[id]`}
                        as={`/beta/manga/detail/query/${manga.endpoint}`}
                      >
                        {/* <Chapter endPoint={manga.endpoint} /> */}
                        <img
                          src={manga.thumb}
                          alt={manga.title}
                          className="h-[12rem] w-full scale-90 object-cover transition-all duration-300 hover:scale-105 md:h-[10rem] md:scale-100 md:rounded-t-md hover:md:scale-110"
                        />
                      </Link>
                      <h1>{manga.title}</h1>
                    </div>
                  </m.div>
                );
              })
            : mangaList.map((manga) => {
                return (
                  <m.div key={manga.endpoint} className="">
                    {/* <h2>{manga.title}</h2> */}
                    {/* <img src={manga.thumb} alt={manga.title} /> */}
                    <div className="space-y-5 text-center font-bold">
                      <Link
                        href={`/beta/manga/detail/query/[id]`}
                        as={`/beta/manga/detail/query/${manga.endpoint}`}
                      >
                        {/* <Chapter endPoint={manga.endpoint} /> */}
                        <img
                          src={manga.thumb}
                          alt={manga.title}
                          className="h-[12rem] w-full scale-90 object-cover transition-all duration-300 hover:scale-105 md:h-[10rem] md:scale-100 md:rounded-t-md"
                        />
                      </Link>
                      <h1>{manga.title}</h1>
                    </div>
                  </m.div>
                );
              })}
        </div>
      </Layout>
    </>
  );
}

Manga.getInitialProps = async function () {
  const [result, setResults] = useState([]);
  const manga = new MANGA.Mangasee123();

  const res = await fetch(
    "https://manga-api-production-30a1.up.railway.app/api/manga/popular/1"
  );
  const data = await res.json();
  return { data };
};
