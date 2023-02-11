import axios from "axios";
import React, { useEffect, useState } from "react";
import { weirdToNormalChars } from "weird-to-normal-chars";
import Navbar from "../../../components/navbar";
import Player from "../../../lib/Artplayer";

export default function Test(props) {
  const title = props.judul;

  const info = props.animeInfo;
  const episodeNumber = props.epiInts;

  const [isLoading, setIsloading] = useState(false);
  const [showText, setShowtext] = useState(false);
  const [showTitle, setShowTitle] = useState(false);

  const text = info.description;
  const truncatedText = text.slice(0, 150) + "...";
  // const rawTitle = info.title;
  const displayTitle = title.slice(0, 25) + "...";

  const [url, setDefUrl] = useState(null);
  const [sources, setSources] = useState(null);
  const [players, setPlayers] = useState(null);
  const [isVpn, setIsVpn] = useState(false);
  // console.log(title);
  // console.log(props.animeInfo);
  useEffect(() => {
    setIsloading(true);
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://api.consumet.org/anime/enime/watch?episodeId=${props.id}`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        if (response.status === 404) {
          console.log("Resource not found:", response.status);
          return;
        }
        const dataEpi = response.data.sources;
        let sumber = dataEpi.find((source) => source.quality === "default");

        const source = response.data.sources
          .map((items) => ({
            html: items.quality,
            url: `https://proxy.vnxservers.com/proxy/m3u8/${encodeURIComponent(
              items.url
            )}/${encodeURIComponent(`{"referer":"https://playgo1.cc"}`)}`,
          }))
          .sort((a, b) => {
            if (a.html === "default") return -1;
            if (b.html === "default") return 1;
            return 0;
          });
        setSources(source);

        const defUrl = `https://proxy.vnxservers.com/proxy/m3u8/${encodeURIComponent(
          sumber.url
        )}/${encodeURIComponent(`{"referer":"https://playgo1.cc"}`)}`;
        setDefUrl(defUrl);
        //
      } catch (error) {
        console.log(error);
        setIsVpn(true);
      }
    }
    fetchData();

    setIsloading(false);
  }, []);

  // console.log(sources);

  useEffect(() => {
    if (sources) {
      setPlayers(
        <Player
          option={{
            url: `${url}`,
            quality: [sources],
          }}
          style={{ width: "100%", height: "100%", margin: "0 auto 0" }}
          getInstance={(art) => console.info(art)}
        />
      );
    }
  }, [url, sources]);

  return (
    <>
      <Navbar className="md:bg-black" />
      <div className="flex">
        <div className="flex">
          {isLoading ? (
            <p>sabar ya bang...</p>
          ) : (
            <div className="flex w-screen flex-col items-center gap-5">
              <div className="flex h-[260px] w-screen items-center justify-center text-center md:h-[720px] md:w-[85%]">
                {isVpn ? (
                  <p>{`> The video isn't showing? Try to use VPN or change your DNS.`}</p>
                ) : (
                  <div className="h-[260px] w-screen md:h-full">{players}</div>
                )}
              </div>

              <div className="flex flex-col gap-5 lg:w-[85%]">
                <div className="flex gap-5 px-4 text-2xl md:mx-0">
                  <div
                    className="font-outfit font-bold"
                    onClick={() => setShowTitle(!showTitle)}
                  >
                    {showTitle && title.length <= 25 ? displayTitle : title}
                  </div>{" "}
                  -{" "}
                  <h1 className="shrink-0 font-outfit italic  text-[#616161]">
                    Episode {episodeNumber}
                  </h1>
                </div>
                <div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: showText ? text : truncatedText,
                    }}
                  ></div>
                  <button
                    onClick={() => setShowtext(!showText)}
                    className="font-rama font-bold text-white"
                  >
                    {showText ? "Show Less" : "Show More"}
                  </button>
                </div>
                <div className="flex h-[640px] flex-col gap-5 overflow-scroll overflow-x-hidden pt-5">
                  {info.episodes.map((episode, index) => {
                    return (
                      <div key={index} className="flex flex-col gap-3">
                        <a
                          href={
                            episode.number === episodeNumber
                              ? "#"
                              : `/beta/anime/watch?title=${info.title}&id=${episode.id}&idInt=${info.anilistId}&epi=${episode.number}`
                          }
                          className="text-start text-xl"
                        >
                          {episode.number === episodeNumber ? (
                            <div className="flex items-center gap-2">
                              Episode {episode.number} -
                              <p className="text-[14px] italic text-[#616161]">
                                (now watching)
                              </p>
                            </div>
                          ) : (
                            <div>Episode {episode.number}</div>
                          )}
                        </a>
                        <div className="h-[1px] bg-black dark:bg-white" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { title, id, idInt, epi } = context.query;
  const query = decodeURIComponent(title);
  const str = weirdToNormalChars(query);
  const judul = str.replace(/[\W_]+/g, " ");
  const idInts = parseInt(idInt);
  const epiInts = parseInt(epi);
  const results = await axios.get(
    `https://cors.consumet.stream/https://api.consumet.org/anime/enime/${judul}`,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  const data = results.data;
  const firstAnime = data.results.filter(
    (results) => results.anilistId === idInts
  );
  const animeInfo = await axios.get(
    `https://cors.consumet.stream/https://api.consumet.org/anime/enime/info?id=${firstAnime[0].id}`,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  // const res = await axios.get(
  //   `https://api.consumet.org/anime/enime/watch?episodeId=cldonlvrdlcvppk01742960i5`
  // );
  //

  return {
    props: {
      // results: results.data,
      // animeInfo: animeInfo.data,
      animeInfo: animeInfo.data,
      judul,
      epiInts,
      // decodeId,
      id,
    },
  };
}
