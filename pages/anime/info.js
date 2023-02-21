import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Layout from "../../components/layout";
import { weirdToNormalChars } from "weird-to-normal-chars";
import Head from "next/head";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Content from "../../components/hero/content";

export default function Himitsu(props) {
  const [isLoading, setIsloading] = useState(false);
  const [showText, setShowtext] = useState(false);
  const [slicedDesc, setSlicedDesc] = useState("");
  const [epi1, setEpi1] = useState([]);
  const info = props.data;

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

  const color = { backgroundColor: `${info.color}` };

  useEffect(() => {
    // calculate the brightness of the background color
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

    const desc = info.description.slice(0, 150) + "...";
    setSlicedDesc(desc);

    const epi1 = info.episodes.filter((epi) => epi.number === 1);
    setEpi1(epi1);
  }, []);

  // console.log(props.firstAnime);

  // console.log(epi1[0]);
  return (
    <>
      <Head>
        <title>{info.title.english}</title>
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
                      <img
                        src={info.image}
                        className="h-[200px] w-full shrink-0 object-cover md:h-[250px]"
                      />
                    </div>

                    {/* MOBILE */}
                    <div className="flex w-full flex-col gap-5 lg:hidden ">
                      <h1 className="text-2xl font-semibold">
                        {info.title.english || info.title.romaji}
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
                        {epi1[0] ? (
                          <Link
                            href={`anime/watch?title=${encodeURIComponent(
                              info.title.english
                            )}&id=${epi1[0].id || null}&idInt=${
                              props.idInt
                            }&epi=${
                              epi1[0].number || null
                            }&epiTitle=${encodeURIComponent(
                              epi1[0].title || null
                            )}`}
                            onClick={() =>
                              handleStore({
                                title: info.title.english,
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
                        {info.title.english || info.title.romaji}
                      </h1>
                      <div className="flex gap-6 text-black">
                        <div
                          className={`dynamic-text rounded-md px-2 font-karla font-bold`}
                          style={color}
                        >
                          {info.episodes.length} Episodes
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
                          {info.subOrDub || "No Sub/Dub"}
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
                <div className="z-20 flex flex-col gap-10 p-3 lg:p-0">
                  <h1 className="text-3xl font-bold">Episodes</h1>
                  <div className="flex h-[640px] flex-col gap-5 overflow-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-slate-800 scrollbar-thumb-rounded-full hover:scrollbar-thumb-slate-600">
                    {info.episodes.map((episode, index) => {
                      return (
                        <div key={index} className="flex flex-col gap-3">
                          <Link
                            onClick={() =>
                              handleStore({
                                title: info.title.english,
                                description: info.description,
                                image: info.image,
                                id: info.id,
                              })
                            }
                            href={`/anime/watch?title=${encodeURIComponent(
                              info.title.english
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
              <div className="md:w-[80%]">
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
    const { title, id } = context.query;
    const query = decodeURIComponent(title);
    const str = weirdToNormalChars(query);
    const judul = str.replace(/[\W_]+/g, " ");
    const idInt = parseInt(id);
    const results = await axios.get(
      `https://cors.consumet.stream/https://api.consumet.org/meta/anilist/info/${idInt}`
    );
    const data = results.data;

    return {
      props: {
        data,
        idInt,
        judul,
      },
    };
  },
});
// export async function getServerSideProps(context) {
//   const { title, id } = context.query;
//   const query = decodeURIComponent(title);
//   const str = weirdToNormalChars(query);
//   const judul = str.replace(/[\W_]+/g, " ");
//   const idInt = parseInt(id);
//   const results = await axios.get(
//     `https://cors.consumet.stream/https://api.consumet.org/meta/anilist/info/${idInt}`
//   );
//   const data = results.data;

//   return {
//     props: {
//       data,
//       idInt,
//       judul,
//     },
//   };
// }
