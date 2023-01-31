import Layout from "../../../../../components/layout";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Head from "next/head";

export default function Chapter(props) {
  // console.log(props);
  const detail = props.manga;
  // console.log(manga)

  const [data, setData] = useState(null);
  const [isloading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFull, setShowFull] = useState(false);
  const synopsisRef = useRef(null);
  const itemsperPage = 10;

  const [clickedChapters, setClickedChapters] = useState([]);

  const handleClick = (endpoint) => {
    setClickedChapters([...clickedChapters, endpoint]);
    localStorage.setItem(
      "clickedChapters",
      JSON.stringify([...clickedChapters, endpoint])
    );
  };

  useEffect(() => {
    const storedChapters = localStorage.getItem("clickedChapters");
    if (storedChapters) {
      setClickedChapters(JSON.parse(storedChapters));
    }
    fetchData();
  }, []);

  const startIndex = (currentPage - 1) * itemsperPage;
  const endIndex = startIndex + itemsperPage;

  async function fetchData() {
    const query = encodeURIComponent(props.detail.title.romaji);
    const res = await fetch(
      `https://manga-api-production-30a1.up.railway.app/api/search/${query}`
    );
    const json = await res.json();
    const manga = json.manga_list;
    const found = manga.find((manga) =>
      manga.title.includes(props.detail.title.romaji)
    );
    if (found) {
      const endpoint = found.endpoint;
      const res = await fetch(
        `https://manga-api-production-30a1.up.railway.app/api/manga/detail/${endpoint}`
      );
      const detail = await res.json();
      const chapter = detail.chapter;
      setData(chapter);
    }
  }

  let banner;

  return (
    <>
      <Head>
        <title>Moopa - Details</title>
        <meta name="Detail" content="Detail information about the Manga" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/c.svg" />
      </Head>
      <Layout>
        <div className="relative flex min-h-screen flex-col pt-[3rem] md:w-[1600px] md:pt-[5.5rem] ">
          <div className="relative mt-4 flex flex-col gap-10 pb-10 md:gap-20">
            <div className="absolute top-[10px] ">
              <a className="font-karla text-xl" href="/gallery">
                {"<"} Back to search page
              </a>
            </div>
            {/* PC/Tablet */}
            <div className="hidden flex-col items-start gap-10 md:flex md:flex-row md:pt-nav">
              <img
                className="h-52 w-52 object-cover md:h-[336px] md:w-[225px]"
                src={props.coverImage}
                alt={props.title}
              />
              <div className="flex flex-col gap-10">
                <h1 className="font-karla font-bold md:text-5xl">
                  {props.title}
                </h1>
                <p dangerouslySetInnerHTML={props.descHTML} />
                {/* <p dangerouslySetInnerHTML={text ? {__html: detail.decription} : undefined}>{!text ? manga.synopsis : null}</p> */}
              </div>
            </div>

            {/* Mobile */}
            <div className="flex flex-col gap-3 md:hidden">
              <div className="relative flex justify-end md:shrink-0 ">
                <img
                  className="absolute top-[2rem] right-[1.5rem] z-10 h-[125px] w-[90px] rounded-lg object-cover shadow-xl md:hidden"
                  src={props.coverImage}
                  alt={props.title}
                />
                <img
                  className="z-0 h-[7rem] w-full object-cover blur-[1px] md:h-[312px] md:w-[224px] md:blur-none"
                  src={banner ? props.bannerImage : props.coverImage}
                  alt={props.title}
                />
              </div>
              <div className="flex flex-col gap-7 px-2">
                <h1 className="w-64 font-outfit text-2xl font-bold">
                  {props.detail.title.romaji}
                </h1>
                <div
                  className="font-robot inline px-4 text-sm font-light"
                  ref={synopsisRef}
                >
                  {props &&
                    props.description &&
                    props.description.substring(0, 150)}{" "}
                  {showFull && <p>{props.description}</p>}{" "}
                  <button
                    className="font-bold "
                    onClick={() => {
                      setShowFull(!showFull);
                    }}
                  >
                    {showFull ? "Read Less" : "Read More..."}
                  </button>
                </div>
                {/* <p className="font-robot font-light text-sm px-4">{data.synopsis}</p> */}
              </div>
            </div>

            <div className="flex flex-col justify-between gap-10 px-3 md:gap-16 md:px-0">
              <div className="flex flex-col gap-5 md:gap-10">
                <h1 className="font-outfit text-2xl font-bold md:text-4xl">
                  Chapters
                </h1>
                <div className="flex flex-col md:text-2xl">
                  {data ? (
                    Array.isArray(data) &&
                    data
                      .slice(startIndex, endIndex)
                      .map(({ chapter_title, chapter_endpoint }) => {
                        return (
                          <div key={chapter_endpoint} className="md:w-[50%]">
                            <div className="h-[1px] bg-black dark:bg-white"></div>
                            <Link
                              onClick={() => handleClick(chapter_endpoint)}
                              href={`/beta/manga/chapter/[chapter]`}
                              as={`/beta/manga/chapter/${chapter_endpoint}`}
                            >
                              <p
                                className={
                                  clickedChapters.includes(chapter_endpoint)
                                    ? "flex h-14 items-center pl-5 text-gray-500 "
                                    : "flex h-14 items-center pl-5 "
                                }
                              >
                                {chapter_title}
                              </p>
                            </Link>
                          </div>
                        );
                      })
                  ) : (
                    <p className="text-xl font-bold">No Chapters</p>
                  )}
                </div>
              </div>
            </div>
            <div className="mx-auto flex gap-16 font-bold md:mx-0">
              {data && currentPage > 1 && (
                <button
                  className="chapter-button"
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Back
                </button>
              )}
              {data && currentPage < Math.ceil(data.length / itemsperPage) && (
                <button
                  className="chapter-button"
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const endpoint = context.query.id;

  const resAnilist = await fetch(`https://graphql.anilist.co`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `
            query ($id: Int) {
                Media(id: $id, type: MANGA) {
                    id
                    title {
                        romaji
                        english
                        native
                    }
                    coverImage {
                        extraLarge
                    }
                    bannerImage
                    description
                    type
                    popularity
                    averageScore
                    chapters
                    volumes
                    status
                    genres
                  }
            }
            `,
      variables: {
        id: endpoint,
      },
    }),
  });
  const anilistData = await resAnilist.json();
  const detail = anilistData.data.Media;
  const coverImage = detail.coverImage.extraLarge;
  const bannerImage = detail.bannerImage;
  const title = detail.title.romaji;
  const descHTML = { __html: detail?.description };

  return {
    props: {
      detail,
      title,
      descHTML,
      coverImage,
      bannerImage,
    },
  };
}

// Chapter.getInitialProps = async () => {
//     const res = await axios.get(`https://manga-api-production-30a1.up.railway.app/api/manga/detail/`)
//     return { mangaDetail: res.data };
// };
