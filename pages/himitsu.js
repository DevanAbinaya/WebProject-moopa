import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Layout from "../components/layout";
import { weirdToNormalChars } from "weird-to-normal-chars";
import Head from "next/head";

export default function Himitsu(props) {
  const [isLoading, setIsloading] = useState(false);
  const [showText, setShowtext] = useState(false);
  const info = props.animeInfo;
  const slicedDesc = info.description.slice(0, 150) + "...";

  // console.log(info);
  // console.log(props.firstAnime);
  // console.log(props.judul);
  return (
    <>
      <Head>
        <title>{info.title}</title>
        <meta name="detail" content="Detail about the Anime" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/c.svg" />
      </Head>
      <Layout navTop="text-white bg-[#121212] md:pt-0 md:px-0 bg-slate bg-opacity-40">
        <div className="text static flex w-screen flex-col justify-center pt-nav pb-10">
          <div className="pointer-events-none absolute top-0 left-0">
            <div className=" bg-gradient-to-t from-black to-transparent brightness-90 dark:bg-gradient-to-t dark:from-[#121212] dark:to-transparent">
              <img
                src={info.cover || info.image}
                className="h-[400px] w-screen object-cover mix-blend-darken"
              />
            </div>
            <div className="z-10 h-full bg-[#fffbfb] drop-shadow-2xl dark:bg-[#121212]" />
          </div>
          {isLoading ? (
            <p>Loading cuy sabar...</p>
          ) : info ? (
            <div className="flex flex-col items-center">
              <div className="flex flex-col gap-10 md:w-[70%] ">
                <div className="z-40 flex flex-col gap-10 px-5 pt-[7rem] md:flex-row lg:px-0 lg:pt-[10rem]">
                  <div className="flex gap-10 md:h-[250px] md:w-52">
                    <div className="flex h-[200px] w-48 bg-[#dadada50] md:w-full">
                      <img
                        src={info.image}
                        className="w- h-[200px] shrink-0 object-cover md:h-[250px]"
                      />
                    </div>
                    <div className="flex w-full flex-col gap-5 lg:hidden ">
                      <h1 className="text-2xl font-semibold">{info.title}</h1>
                      <div className="flex w-[90%] flex-col gap-1">
                        <div className="flex gap-2">
                          <h1>Rate:</h1>
                          <p className="font-bold">{info.rating}%</p>
                        </div>

                        <div className="flex w-[200px] gap-2">
                          <h1>Format:</h1>
                          <p>{info.type}</p>
                        </div>

                        <div className="flex gap-2">
                          <h1>Status:</h1>
                          <p>{info.status}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full flex-col gap-10 md:flex">
                    <h1 className="hidden text-2xl font-semibold lg:block">
                      {info.title}
                    </h1>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: showText ? info.description : slicedDesc,
                      }}
                    ></div>
                    <button
                      onClick={() => setShowtext(!showText)}
                      className="font-rama font-bold text-white"
                    >
                      {showText ? " Show Less" : " Show More"}
                    </button>
                  </div>
                </div>
                <div className="z-20 flex flex-col gap-10 p-3 lg:p-0">
                  <h1 className="text-3xl font-bold">Episodes</h1>
                  <div className="flex h-[640px] flex-col gap-5 overflow-scroll overflow-x-hidden">
                    {info.episodes.map((episode, index) => {
                      return (
                        <div key={index} className="flex flex-col gap-3">
                          <Link
                            href={`/beta/anime/watch?title=${encodeURIComponent(
                              info.title
                            )}&id=${episode.id}&idInt=${props.idInt}&epi=${
                              episode.number
                            }&epiTitle=${encodeURIComponent(episode.title)}`}
                            className="text-start text-xl"
                          >
                            <p>Episode {episode.number}</p>
                            <p className="text-[14px] text-[#b1b1b1]">
                              "{episode.title}"
                            </p>
                          </Link>
                          <div className="h-[1px] bg-black dark:bg-white" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-screen flex-col items-center justify-center gap-10 pb-52 ">
              <h1 className="scale-150 font-roboto text-6xl text-red-400">
                404
              </h1>
              <p className="text-4xl font-semibold">{`> Woops.. I think we don't have that Anime :(`}</p>
              <Link className="pt-10 text-2xl" href="/search">
                Return to search
              </Link>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { title, id } = context.query;
  const query = decodeURIComponent(title);
  const str = weirdToNormalChars(query);
  const judul = str.replace(/[\W_]+/g, " ");
  const idInt = parseInt(id);
  const results = await axios.get(
    `https://cors.consumet.stream/https://api.consumet.org/anime/enime/${judul}`
  );
  const data = results.data;
  const firstAnime = data.results.filter(
    (results) => results.anilistId === idInt
  );
  if (!firstAnime) {
    return {
      props: {
        error: "Anime not found",
      },
    };
  } else {
    const animeInfo = await axios.get(
      `https://cors.consumet.stream/https://api.consumet.org/anime/enime/info?id=${firstAnime[0].id}`
    );
    return {
      props: {
        firstAnime,
        idInt,
        judul,
        animeInfo: animeInfo.data,
      },
    };
  }
}
