import { ANIME } from "@consumet/extensions";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Layout from "../components/layout";
import { weirdToNormalChars } from "weird-to-normal-chars";

export default function Himitsu(props) {
  const [isLoading, setIsloading] = useState(false);
  const info = props.animeInfo;

  console.log(info);
  // console.log(props.firstAnime);
  console.log(props.judul);
  return (
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
            <div className="flex w-[70%] flex-col gap-10 ">
              <div className="z-40 flex gap-10 pt-[10rem]">
                <div className="h-[250px] w-52 bg-[#dadada50]">
                  <img
                    src={info.image}
                    className="h-[250px] w-full object-cover"
                  />
                </div>
                <div className="flex w-full flex-col gap-10">
                  <h1 className="text-2xl font-semibold">{info.title}</h1>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: info.description,
                    }}
                  />
                </div>
              </div>
              <div className="z-20 flex flex-col gap-10">
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
                          }`}
                          className="text-start text-xl"
                        >
                          <p>{episode.title}</p>
                          <p className="text-[14px]">
                            Episode {episode.number}
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
            <h1 className="scale-150 font-roboto text-6xl text-red-400">404</h1>
            <p className="text-4xl font-semibold">{`> Woops.. I think we don't have that Anime :(`}</p>
            <Link className="pt-10 text-2xl" href="/search">
              Return to search
            </Link>
          </div>
        )}
      </div>
    </Layout>
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
