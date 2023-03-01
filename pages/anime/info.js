import React, { useEffect, useState } from "react";
import { META } from "@consumet/extensions";
import Link from "next/link";
import Layout from "../../components/layout";
import Head from "next/head";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Content from "../../components/hero/content";
import Image from "next/image";

export default function Himitsu({
  info,
  slicedDesc,
  color,
  episodeList,
  episode1,
}) {
  const [isLoading, setIsloading] = useState(false);
  const [showText, setShowtext] = useState(false);
  const [load, setLoad] = useState(true);
  const episode = episodeList;
  const epi1 = episode1;

  useEffect(() => {
    function getBrightness(color) {
      const rgb = color.match(/\d+/g);
      return (299 * rgb[0] + 587 * rgb[1] + 114 * rgb[2]) / 1000;
    }

    // set the text color based on the background color
    function setTextColor(element) {
      const backgroundColor = getComputedStyle(element).backgroundColor;
      const brightness = getBrightness(backgroundColor);
      if (brightness < 128) {
        element.style.color = "#fff"; // white
      } else {
        element.style.color = "#000"; // black
      }
    }

    const elements = document.querySelectorAll(".dynamic-text");
    elements.forEach((element) => {
      setTextColor(element);
    });
  }, [color]);

  const handleStore = (props) => {
    let existingData = JSON.parse(localStorage.getItem("recentWatch"));
    if (!Array.isArray(existingData)) {
      existingData = [];
    }
    const index = existingData.findIndex((item) => item.title === props.title);
    if (index !== -1) {
      existingData.splice(index, 1);
    }
    const updatedData = [props, ...existingData];
    localStorage.setItem("recentWatch", JSON.stringify(updatedData));
  };

  if (!info) {
    return;
  }

  // console.log(info);

  function handleLoad() {
    setLoad(false);
  }
  return (
    <>
      <Head>
        <title>{info.title?.english || info.title.romaji}</title>
        <meta name="detail" content="Detail about the Anime" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/c.svg" />
      </Head>

      <Layout navTop="text-white bg-[#121212] md:pt-0 md:px-0 bg-slate bg-opacity-40">
        <div className="text static flex w-screen flex-col justify-center pt-nav pb-10">
          <div className="pointer-events-none absolute top-0 left-0">
            <div className=" bg-gradient-to-t from-white to-transparent brightness-90 dark:bg-gradient-to-t dark:from-[#121212] dark:to-transparent">
              <img
                src={info.cover || info.image}
                className="blur- h-[400px] w-screen object-cover mix-blend-overlay dark:mix-blend-darken"
              />
            </div>
            <div className="z-10 h-full bg-[#fffbfb] drop-shadow-2xl dark:bg-[#121212]" />
          </div>
          {isLoading ? (
            <p>Loading cuy sabar...</p>
          ) : info ? (
            <div className="flex flex-col items-center gap-10">
              <div className="flex w-screen flex-col gap-10 md:w-[70%]">
                <div className="z-40 flex flex-col gap-10 px-5 pt-[8rem] md:flex-row lg:mt-[5rem] lg:px-0">
                  <div className="flex gap-10 md:h-[250px] md:w-52">
                    <div className="flex h-[200px] w-52 bg-[#dadada50] md:h-[250px] md:w-full">
                      {info.image && (
                        <img
                          src={info.image}
                          className="h-[200px] w-full shrink-0 object-cover md:h-[250px]"
                        />
                      )}
                    </div>

                    {/* MOBILE */}
                    <div className="flex w-full flex-col gap-5 lg:hidden ">
                      <h1 className="text-2xl font-semibold">
                        {info.title?.english ||
                          info.title.romaji ||
                          info.title.native}
                      </h1>
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
                      <div className="flex">
                        {epi1 && epi1[0] ? (
                          <Link
                            href={`/anime/watch?title=${encodeURIComponent(
                              info.title?.english ||
                                info.title.romaji ||
                                info.title.native
                            )}&id=${epi1[0].id || null}&idInt=${info.id}&epi=${
                              epi1[0].number || null
                            }&epiTitle=${encodeURIComponent(
                              epi1[0].title || null
                            )}`}
                            onClick={() =>
                              handleStore({
                                title:
                                  info.title?.english ||
                                  info.title.romaji ||
                                  info.title.native,
                                description: info.description,
                                image: info.image,
                                id: info.id,
                              })
                            }
                          >
                            <h1 className="flex cursor-pointer items-center gap-2 rounded-[20px] bg-[#ff9537] px-4 py-2 font-bold text-[#ffffff]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="13"
                                height="12"
                                fill="none"
                                viewBox="0 0 250 289"
                              >
                                <path
                                  fill="#fff"
                                  d="M249.734 144.5l-249 143.761V.741l249 143.759z"
                                ></path>
                              </svg>{" "}
                              WATCH
                            </h1>
                          </Link>
                        ) : (
                          <h1 className="pointer-events-none flex items-center gap-2 rounded-[20px] bg-[#ff94378f] px-4 py-2 font-bold text-[#ffffffa5]">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="13"
                              height="12"
                              className="fill-[#ffffff8d]"
                              viewBox="0 0 250 289"
                            >
                              <path d="M249.734 144.5l-249 143.761V.741l249 143.759z"></path>
                            </svg>{" "}
                            WATCH
                          </h1>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* PC */}
                  <div className="w-full flex-col gap-5 md:flex">
                    <div className="hidden flex-col gap-5 lg:flex">
                      <h1 className="text-4xl font-bold">
                        {info.title?.english ||
                          info.title.romaji ||
                          info.title.native}
                      </h1>
                      <div className="flex gap-6">
                        <div
                          className={`dynamic-text rounded-md px-2 font-karla font-bold`}
                          style={color}
                        >
                          {episode && episode.length} Episodes
                        </div>
                        <div
                          className={`dynamic-text rounded-md px-2 font-karla font-bold`}
                          style={color}
                        >
                          {info.releaseDate}
                        </div>
                        <div
                          className={`dynamic-text rounded-md px-2 font-karla font-bold`}
                          style={color}
                        >
                          {info.rating}%
                        </div>
                        <div
                          className={`dynamic-text rounded-md px-2 font-karla font-bold`}
                          style={color}
                        >
                          {info.type}
                        </div>
                        <div
                          className={`dynamic-text rounded-md px-2 font-karla font-bold`}
                          style={color}
                        >
                          {info.status}
                        </div>
                      </div>
                    </div>
                    <p
                      dangerouslySetInnerHTML={{ __html: info.description }}
                      className="hidden lg:block"
                    />
                    <div className="lg:hidden">
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
                </div>

                <div className="p-3 lg:p-0">
                  <h1 className="items-start py-5 text-2xl font-bold">
                    Relations
                  </h1>
                  <div
                    className={`grid grid-cols-1 justify-items-center py-5 px-5 lg:grid-cols-3 ${
                      load ? "h-[290px] overflow-y-clip" : ""
                    }`}
                  >
                    {info.relations &&
                      info.relations.map((relation, index) => {
                        return (
                          <div key={index} className="w-full gap-6 p-5 ">
                            <Link
                              href={
                                relation.type === "TV" ||
                                relation.type === "OVA" ||
                                relation.type === "MOVIE" ||
                                relation.type === "SPECIAL" ||
                                relation.type === "ONA"
                                  ? `/anime/info?title=${encodeURIComponent(
                                      info.title?.english ||
                                        info.title.romaji ||
                                        info.title.native
                                    )}&id=${relation.id}`
                                  : ""
                              }
                              className={`flex w-full justify-between rounded-md bg-[#282828] p-2 shadow-lg duration-300 ease-out hover:scale-105 ${
                                relation.type === "TV" ||
                                relation.type === "OVA" ||
                                relation.type === "MOVIE" ||
                                relation.type === "SPECIAL"
                                  ? ``
                                  : "pointer-events-none"
                              }`}
                            >
                              <div className="flex flex-col justify-between">
                                <div className="font-bold text-[#FF7F57]">
                                  {relation.relationType}
                                </div>
                                <div className="text-lg font-bold text-white">
                                  {relation.title.userPreferred}
                                </div>
                                <div className="flex">
                                  <p
                                    className="dynamic-text rounded-lg p-1 font-outfit text-sm font-semibold "
                                    style={color}
                                  >
                                    {relation.type}
                                  </p>
                                </div>
                              </div>
                              <div className="relative h-[200px] w-[140px] shrink-0">
                                <Image
                                  fill
                                  src={relation.image}
                                  alt={`Cover Image for ${relation.title}`}
                                  className=" bg-slate-400 object-cover"
                                />
                              </div>
                            </Link>
                          </div>
                        );
                      })}
                  </div>
                  {info && info.relations && info.relations.length > 3 && (
                    <button
                      type="button"
                      className="w-full"
                      onClick={handleLoad}
                    >
                      {load ? "Load More" : ""}
                    </button>
                  )}
                </div>

                <div className="z-20 flex flex-col gap-10 p-3 lg:p-0">
                  <h1 className="text-3xl font-bold">Episodes</h1>
                  <div className="flex h-[640px] flex-col gap-5 overflow-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-slate-800 scrollbar-thumb-rounded-full hover:scrollbar-thumb-slate-600">
                    {episode.map((episode, index) => {
                      return (
                        <div key={index} className="flex flex-col gap-3">
                          {/* <div className="relative h-52 w-full">
                            <Image
                              fill
                              src={episode.image}
                              alt="thumbnail"
                              className="object-cover"
                            />
                          </div> */}
                          <Link
                            onClick={() =>
                              handleStore({
                                title:
                                  info.title?.english ||
                                  info.title.romaji ||
                                  info.title.native,
                                description: info.description,
                                image: info.image,
                                id: info.id,
                              })
                            }
                            href={`/anime/watch?title=${encodeURIComponent(
                              info.title?.english ||
                                info.title.romaji ||
                                info.title.native
                            )}&id=${episode.id}&idInt=${info.id}&epi=${
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
              <div className="w-screen md:w-[80%]">
                <Content
                  ids="recommendAnime"
                  section="Recommendations"
                  data={info.recommendations}
                />
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

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    context.res.setHeader("Cache-Control", "public, max-age=3600");
    const { id } = context.query;

    const provider = new META.Anilist();

    const [info, episodes] = await Promise.all([
      provider.fetchAnilistInfoById(id),
      provider.fetchEpisodesListById(id),
    ]);

    const desc = info.description.slice(0, 150) + "...";
    const color = { backgroundColor: `${info.color}` };
    const epi1 = episodes.filter((epi) => epi.number === 1);
    const title = info.title?.userPreferred || "No Title";

    return {
      props: {
        info: {
          ...info,
          title: {
            ...info.title,
            userPreferred: title,
          },
        },
        slicedDesc: desc,
        color,
        episodeList: episodes,
        episode1: epi1,
      },
    };
  },
});
