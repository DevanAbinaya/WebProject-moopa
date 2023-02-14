import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { aniListData } from "../lib/AniList";
import { ApolloProvider } from "@apollo/client";
import React, { useState, useEffect } from "react";
import client from "../lib/apolloClient";
import Head from "next/head";
import Link from "next/link";
import Footer from "../components/footer";
import Trending from "../components/hero/trending";
import Image from "next/image";
import Content from "../components/hero/content";

export default function Home({ detail, populars, genre }) {
  const [isVisible, setIsVisible] = useState(false);
  const [recently, setRecently] = useState(null);
  const [query, setQuery] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [popular, setPopular] = useState(populars.data);
  const data = detail.data[0];
  // const popular = populars.data;

  // console.log(genre);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    function fetchData() {
      const recent = JSON.parse(localStorage.getItem("recentWatch"));
      if (recent) {
        setRecently(recent);
      }
    }
    fetchData();
  }, []);

  function handleRemove() {
    localStorage.removeItem("recentWatch");
    setRecently(null);
  }

  const slideLeft = () => {
    var slider = document.getElementById("recentslider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider = document.getElementById("recentslider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  // console.log(popular);
  // console.log(data.coverImage);
  return (
    <>
      <Head>
        <title>Moopa</title>
        <meta charSet="UTF-8"></meta>
        <meta name="description" content="Are you sure about that?" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css"
          integrity="sha512-1PKOgIY59xJ8Co8+NE6FZ+LOAZKjy+KY8iq0G4B3CyeY6wYHN3yt9PW0XpSriVlkMXe40PTKnXrLnZ9+fkDaog=="
          crossorigin="anonymous"
        />
        <link rel="icon" href="/c.svg" />
      </Head>
      <main className="h-auto w-screen bg-[#141519]">
        <div className="flex items-center justify-center">
          <div className="mx-[94px] flex w-full items-center justify-between">
            <div className="flex items-center gap-16 pt-7">
              <h1 className="font-outfit text-[40px] font-bold text-[#FF7F57]">
                moopa
              </h1>
              <ul className="flex gap-10 pt-2 font-outfit text-[14px]">
                <Link href="/search">
                  <li>AniList Index</li>
                </Link>
                <li>Manga</li>
                <li>Anime</li>
              </ul>
            </div>
            <div className="relative flex items-center bg-slate-400">
              <div className="search-box ">
                <input
                  className="search-text"
                  type="text"
                  placeholder="Search Anime"
                />
                <a href="#" className="search-btn">
                  <i className="fas fa-search"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 flex justify-center">
          <div className="flex h-[760px] w-[80%] items-center justify-between">
            <div className="flex h-full w-[55%] flex-col justify-center gap-7">
              <h1 className="w-[85%] font-outfit text-[45px] font-extrabold">
                {data.title.english}
              </h1>
              <p
                className="font-roboto text-[24px] font-light"
                dangerouslySetInnerHTML={{
                  __html: data.description.slice(0, 350) + "...",
                }}
              />

              <div className="pt-5">
                <Link
                  href={`/himitsu?title=${
                    data.title.english || data.title.romaji
                  }&id=${data.id}`}
                  legacyBehavior
                  className="flex"
                >
                  <a className="rounded-sm p-3 font-karla font-light ring-1 ring-[#FF7F57]">
                    START WATCHING
                  </a>
                </Link>
              </div>
            </div>
            <div className="">
              <div className="relative h-[662px] w-[460px]">
                <div className="absolute h-[662px] w-[460px] bg-gradient-to-t from-[#141519] to-transparent" />
                <Image
                  src={data.coverImage.extraLarge}
                  alt={data.title.english || data.title.romaji}
                  width={460}
                  height={662}
                  priority
                  className="h-[662px] w-[460px] rounded-tl-xl rounded-tr-xl object-cover bg-blend-overlay "
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex  flex-col items-center">
          <div className="w-[87%] flex-none">
            {recently && (
              <div>
                <div className="flex items-center gap-10">
                  <h1 className="font-outfit text-[27px] font-extrabold">
                    Recently Watched
                  </h1>
                  <div
                    className="cursor-pointer font-outfit font-light text-[#8f8f8f]"
                    onClick={() => handleRemove()}
                  >
                    Clear all
                  </div>
                </div>
                <div className="relative flex items-center gap-2 py-10">
                  <MdChevronLeft
                    onClick={slideLeft}
                    size={40}
                    className="mb-5 cursor-pointer opacity-50 hover:opacity-100"
                  />
                  <div
                    id="recentslider"
                    className="scroll flex h-full w-full items-center gap-5 overflow-x-scroll scroll-smooth whitespace-nowrap overflow-y-hidden scrollbar-hide"
                  >
                    {recently.map((anime, index) => {
                      const url = encodeURIComponent(anime.title);

                      return (
                        <Link
                          href={`/himitsu?title=${url}&id=${anime.id}`}
                          key={index}
                          className="shrink-0 "
                        >
                          <Image
                            src={anime.image}
                            alt={anime.title}
                            width={209}
                            height={300}
                            skeleton={
                              <div
                                style={{
                                  backgroundColor: "lightgray",
                                  width: 209,
                                  height: 300,
                                }}
                              />
                            }
                            className="z-20 h-[290px] w-[209px] object-cover p-2 duration-300 ease-in-out hover:scale-105"
                          />
                        </Link>
                      );
                    })}
                  </div>
                  <MdChevronRight
                    onClick={slideRight}
                    size={40}
                    className="mb-5 cursor-pointer opacity-50 hover:opacity-100"
                  />
                </div>
              </div>
            )}
            {/* {popular && (
              <div>
                {popular.map((pops, index) => {
                  console.log(pops.title);
                  return <div key={index}></div>;
                })}
              </div>
            )} */}
            <h1 className="font-outfit text-[27px] font-extrabold">
              Trending Now
            </h1>
            <div className="py-10">
              <ApolloProvider client={client}>
                <Trending />
              </ApolloProvider>
            </div>
            {popular && (
              <Content
                ids="popularAnime"
                section="Popular Anime"
                data={popular}
              />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  const trendingDetail = await aniListData({ req, res }, "TRENDING_DESC");
  const popularDetail = await aniListData({ req, res }, "POPULARITY_DESC");
  const genreDetail = await aniListData({ req, res }, "TYPE");

  return {
    props: {
      genre: genreDetail.props,
      detail: trendingDetail.props,
      populars: popularDetail.props,
    },
  };
}
