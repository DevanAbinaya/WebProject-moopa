import axios from "axios";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { weirdToNormalChars } from "weird-to-normal-chars";
import Navbar from "../../components/navbar";
import Player from "../../lib/Artplayer";

export default function Test(props) {
  const sub = props.sub;
  const title = props.judul;
  const info = props.data;
  const seek = props.sek;

  const potonganDesc = props.potonganDesc;
  const text = props.text;
  const displayTitle = props.displayTitle;
  const episodeNumber = props.epiInts;

  const [isLoading, setIsloading] = useState(true);
  const [showText, setShowtext] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [id, setId] = useState(props.id);

  const [url, setDefUrl] = useState(null);
  const [sources, setSources] = useState(null);
  const [players, setPlayers] = useState(null);
  const [isVpn, setIsVpn] = useState(false);

  const [Log, setLog] = useState(null);

  // console.log({ ID: props.id });
  // console.log({ url });

  useEffect(() => {
    if (sub === "en") {
      async function fetchData() {
        try {
          const response = await axios.get(
            `https://api.moopa.my.id/meta/anilist/watch/${decodeURIComponent(
              id
            )}`
          );
          if (response.status === 404) {
            console.log("Resource not found:", response.status);
            return;
          }
          const dataEpi = response.data.sources;
          const referer = response.data.headers.Referer;
          setLog(referer);
          let sumber = dataEpi.find((source) => source.quality === "default");

          const source = response.data.sources
            .map((items) => ({
              html: items.quality,
              url: `https://m3u8proxy.moopa.workers.dev/?url=${encodeURIComponent(
                items.url
              )}&referer=${encodeURIComponent(referer)}`,
            }))
            .sort((a, b) => {
              if (a.html === "default") return -1;
              if (b.html === "default") return 1;
              return 0;
            });
          setSources(source);

          const defUrl = `https://m3u8proxy.moopa.workers.dev/?url=${encodeURIComponent(
            sumber.url
          )}&referer=${encodeURIComponent(referer)}`;
          setDefUrl(defUrl);
          setIsloading(false);
        } catch (error) {
          // console.log(error);
          setIsVpn(true);
        }
      }
      fetchData();
    } else if (sub === "id") {
      async function fetchData() {
        try {
          const video = id.video;
          const defaults = video[0];
          // setLog(video);

          const source = video.map((items) => ({
            html: items.quality,
            url: items.url,
          }));
          setSources(source);

          const defUrl = `${defaults.url}`;
          setDefUrl(defUrl);
          setIsloading(false);
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();
    }

    setIsloading(false);
  }, [sub, id]);

  // console.log(Log);

  useEffect(() => {
    setIsloading(true);
    if (sources) {
      setPlayers(
        <Player
          option={{
            url: `${url}`,
            // url: `
            //   https://liscia.my.id/0:/KOI%20DAGA%20KOTOWARU/SKRPET/23/MP4/Kuramanime-SKRPET_BD-23-720p-Jal.mp4`,
            quality: [sources],
            autoplay: true,
            screenshot: true,
            type: sub === "id" ? "mp4" : "m3u8",
          }}
          style={{ width: "100%", height: "100%", margin: "0 auto 0" }}
          getInstance={(art) => {
            art.on("ready", () => {
              const seekTime = seek;
              const duration = art.duration;
              const percentage = seekTime / duration;

              if (percentage >= 0.9) {
                // use >= instead of >
                art.currentTime = 0;
                console.log("Video restarted from the beginning");
              } else {
                art.currentTime = seek;
              }
            });
            art.on("destroy", () => {
              const lastPlayed = {
                id: id,
                time: art.currentTime,
              };

              const title = info.title.romaji || info.title.english;
              const prevDataStr = localStorage.getItem("lastPlayed") || "[]";
              const prevData = JSON.parse(prevDataStr);
              let titleExists = false;

              prevData.forEach((item) => {
                if (item.title === title) {
                  const foundIndex = item.data.findIndex((e) => e.id === id);
                  if (foundIndex !== -1) {
                    item.data[foundIndex] = lastPlayed;
                  } else {
                    item.data.push(lastPlayed);
                  }
                  titleExists = true;
                }
              });

              if (!titleExists) {
                prevData.push({
                  title: title,
                  data: [lastPlayed],
                });
              }

              localStorage.setItem("lastPlayed", JSON.stringify(prevData));
            });
          }}
        />
      );
    }
    setIsloading(false);
  }, [url, sources, sub]);

  // console.log(sub);

  return (
    <>
      <Head>
        <title>{props.episode || info?.title.romaji}</title>
        <meta name="watching" content="Watching Anime" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/c.svg" />
      </Head>
      <Navbar className="md:bg-black" />
      <div className="flex text-white">
        <div className="flex">
          {isLoading ? (
            <p>sabar ya bang...</p>
          ) : (
            <div className="flex w-screen flex-col items-center gap-5">
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <div className="flex h-[260px] w-screen items-center justify-center text-center md:h-[720px] md:w-[85%]">
                  {isVpn ? (
                    <p>
                      {`> Oops.. It seems like there's an error with the server. :(`}
                    </p>
                  ) : (
                    <div className="h-[260px] w-screen md:h-full">
                      {players}
                    </div>
                  )}
                </div>
              )}

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
                <div className="flex h-[640px] flex-col gap-5 overflow-scroll px-3 pt-5 overflow-x-hidden scrollbar-thin scrollbar-thumb-[#1b1c21] scrollbar-thumb-rounded-md hover:scrollbar-thumb-[#212329]">
                  {sub === "en"
                    ? info.episodes.map((episode, index) => {
                        return (
                          <div key={index} className="flex flex-col gap-3">
                            <a
                              href={
                                episode.number === episodeNumber
                                  ? "#"
                                  : `/anime/watch?title=${encodeURIComponent(
                                      info.title?.english ||
                                        info.title.romaji ||
                                        info.title.native
                                    )}&id=${episode.id}&idInt=${info.id}&epi=${
                                      episode.number
                                    }&epiTitle=${encodeURIComponent(
                                      episode.title
                                    )}&sub=en`
                              }
                              // href="#"
                              // onClick={() => setId(episode.id)}
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
                      })
                    : info.episodes.map((episode, index) => {
                        return (
                          <div key={index} className="flex flex-col gap-3">
                            <a
                              href={
                                episode.number === episodeNumber
                                  ? "#"
                                  : `/anime/watch?title=${encodeURIComponent(
                                      info.title?.romaji || info.title?.english
                                    )}&id=${props.idEpi}&idInt=${info.id}&epi=${
                                      episode.number
                                    }&epiTitle=${encodeURIComponent(
                                      episode.title
                                    )}&te=${props.epIndo}&sub=id`
                              }
                              // href="#"
                              // onClick={() => setId(episode.id)}
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
  const { title, id, idInt, epi, epiTitle, sub, te, seek } = context.query;

  const sek = seek || 0;

  if (sub === "id") {
    const query = decodeURIComponent(title);
    const episode = decodeURIComponent(epiTitle);
    const str = weirdToNormalChars(query);
    const judul = str.replace(/[\W_]+/g, " ");
    const epiInts = parseInt(epi);
    const results = await axios.get(
      `https://api.moopa.my.id/meta/anilist/info/${idInt}`
    );
    const data = results.data;
    const text = data.description;

    const potonganDesc = text.slice(0, 150) + "...";
    const displayTitle = title.slice(0, 25) + "...";
    const res = await fetch(
      `https://ani-api-eight.vercel.app/kuramanime/anime/${id}/${epi}`
    );
    const subIndo = await res.json();
    return {
      props: {
        data,
        judul,
        epiInts,
        episode,
        id: subIndo,
        idEpi: id,
        potonganDesc,
        displayTitle,
        text,
        epIndo: te,
        sub: sub,
        sek,
      },
    };
  }

  const query = decodeURIComponent(title);
  const episode = decodeURIComponent(epiTitle);
  const str = weirdToNormalChars(query);
  const judul = str.replace(/[\W_]+/g, " ");
  const epiInts = parseInt(epi);
  const results = await axios.get(
    `https://api.moopa.my.id/meta/anilist/info/${idInt}`
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
      sub: sub,
      sek,
    },
  };
}
