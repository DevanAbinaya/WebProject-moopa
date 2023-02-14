import axios from "axios";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { weirdToNormalChars } from "weird-to-normal-chars";
import Navbar from "../../../components/navbar";
import Player from "../../../lib/Artplayer";

export default function Test(props) {
  const title = props.judul;
  const info = props.data;
  const id = props.id;
  const potonganDesc = props.potonganDesc;
  const text = props.text;
  const displayTitle = props.displayTitle;
  const episodeNumber = props.epiInts;

  const [isLoading, setIsloading] = useState(false);
  const [showText, setShowtext] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [log, setLog] = useState([]);

  const [url, setDefUrl] = useState(null);
  const [sources, setSources] = useState(null);
  const [players, setPlayers] = useState(null);
  const [isVpn, setIsVpn] = useState(false);

  useEffect(() => {
    setIsloading(true);
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://cors.consumet.stream/https://api.consumet.org/meta/anilist/watch/${decodeURIComponent(
            id
          )}`
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
      } catch (error) {
        console.log(error);
        setIsVpn(true);
      }
    }
    fetchData();

    setIsloading(false);
  }, []);

  // console.log(potonganDesc);
  // console.log(sources);

  useEffect(() => {
    setIsloading(true);
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
    setIsloading(false);
  }, [url, sources]);

  // console.log();

  return (
    <>
      <Head>
        <title>{props.episode}</title>
        <meta name="watching" content="Watching Anime" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/c.svg" />
      </Head>
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
                <div className="px-3">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: showText ? text : potonganDesc,
                    }}
                  ></div>
                  <button
                    onClick={() => setShowtext(!showText)}
                    className="font-rama font-bold text-white"
                  >
                    {showText ? "Show Less" : "Show More"}
                  </button>
                </div>
                <div className="flex h-[640px] flex-col gap-5 overflow-scroll px-3 pt-5 overflow-x-hidden">
                  {info.episodes.map((episode, index) => {
                    return (
                      <div key={index} className="flex flex-col gap-3">
                        <a
                          href={
                            episode.number === episodeNumber
                              ? "#"
                              : `/beta/anime/watch?title=${
                                  info.title.english
                                }&id=${episode.id}&idInt=${info.id}&epi=${
                                  episode.number
                                }&epiTitle=${encodeURIComponent(episode.title)}`
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
                        <div className="h-[1px] bg-white" />
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
  const { title, id, idInt, epi, epiTitle } = context.query;
  const query = decodeURIComponent(title);
  const episode = decodeURIComponent(epiTitle);
  const str = weirdToNormalChars(query);
  const judul = str.replace(/[\W_]+/g, " ");
  const epiInts = parseInt(epi);
  const results = await axios.get(
    `https://cors.consumet.stream/https://api.consumet.org/meta/anilist/info/${idInt}`
  );
  const data = results.data;
  const text = data.description;

  const potonganDesc = text.slice(0, 150) + "...";
  const displayTitle = title.slice(0, 25) + "...";

  return {
    props: {
      data,
      judul,
      epiInts,
      episode,
      id,
      potonganDesc,
      displayTitle,
      text,
    },
  };
}
