// import { MANGA } from "@consumet/extensions";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";

export default function Test({ title, id, data, provider }) {
  const [loadedImages, setLoadedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [datas, setData] = useState(data);
  const [currentChapter, setCurrentChapter] = useState(null);
  const [nextChapter, setNextChapter] = useState(null);
  const [prevChapter, setPrevChapter] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    function storedData() {
      const nowChap = localStorage.getItem("currentChapterId");
      const chapt = localStorage.getItem("chapters");
      const chapters = JSON.parse(chapt);
      const currentChapter = chapters.find((chapter) => chapter.id === nowChap);
      const currentIndex = chapters.findIndex(
        (chapter) => chapter.id === nowChap
      );

      const nextIndex = currentIndex + 1;

      const nextChapter = chapters[nextIndex];
      const prevIndex = currentIndex - 1;

      setNextChapter(nextChapter);
      setCurrentChapter(currentChapter);
      setPrevChapter(chapters[prevIndex]);
      setIsLoading(false);
    }
    storedData();
  }, []);

  // console.log(currentChapter);

  const handleImageLoad = (item) => {
    setLoadedImages((prevLoadedImages) => [...prevLoadedImages, item.img]);
  };
  // console.log(data);
  function getNextChapter() {
    // Get the current id
    setIsLoading(true);
    window.scrollTo(0, 0);
    const currentId = localStorage.getItem("currentChapterId");
    const chapt = localStorage.getItem("chapters");
    const chapters = JSON.parse(chapt);

    const currentIndex = chapters.findIndex(
      (chapter) => chapter.id === currentId
    );

    const nextIndex = currentIndex + 1;

    const nextChapter = chapters[nextIndex];
    const nexttChapter = chapters[nextIndex + 1];
    const prevChapter = chapters[nextIndex - 1];

    setNextChapter(nexttChapter);
    setCurrentChapter(nextChapter);
    setPrevChapter(prevChapter);

    if (!nextChapter) {
      return;
    }

    fetch(
      `https://api.moopa.my.id/meta/anilist-manga/read?chapterId=${nextChapter.id}&provider=${provider}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (provider === "mangakakalot") {
          const datas = data.map((item) => ({
            img: `https://api.consumet.org/utils/image-proxy?url=${item.img}&referer={Referer:'https://mangakakalot.com/'}`,
            page: item.page,
            title: item.title,
          }));
          // console.log(datas);
          setData(datas);
        } else {
          setData(data);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });

    // Update the current chapter id in local storage
    localStorage.setItem("currentChapterId", nextChapter.id);
  }
  // console.log(data);

  function getPrevChapter() {
    // Get the current id
    setIsLoading(true);
    window.scrollTo(0, 0);
    const currentId = localStorage.getItem("currentChapterId");
    const chapt = localStorage.getItem("chapters");
    const chapters = JSON.parse(chapt);

    const currentIndex = chapters.findIndex(
      (chapter) => chapter.id === currentId
    );

    const prevIndex = currentIndex - 1;

    const prevChapter = chapters[prevIndex];
    const nextChapter = chapters[prevIndex + 1];
    const prevvChapter = chapters[prevIndex - 1];
    setCurrentChapter(prevChapter);
    setNextChapter(nextChapter);
    setPrevChapter(prevvChapter);

    fetch(
      `https://api.moopa.my.id/meta/anilist-manga/read?chapterId=${prevChapter.id}&provider=${provider}`
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        if (provider === "mangakakalot") {
          const datas = data.map((item) => ({
            img: `https://api.consumet.org/utils/image-proxy?url=${item.img}&referer={Referer:'https://mangakakalot.com/'}`,
            page: item.page,
            title: item.title,
          }));
          // console.log(datas);
          setData(datas);
        } else {
          setData(data);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });

    // Update the current chapter id in local storage
    localStorage.setItem("currentChapterId", prevChapter.id);
  }
  // console.log({ PREV_CHAPTER: prevChapter });
  // console.log({ CURRENT_CHAPTER: currentChapter });
  // console.log({ NEXT_CHAPTER: nextChapter });

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="info" content="More detailed info about the Manga" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/c.svg" />
      </Head>
      <Navbar />

      <div className="flex h-full min-h-screen w-screen flex-col items-center">
        <div key={refreshKey} className="pt-nav text-3xl font-semibold">
          {isLoading ? (
            <div />
          ) : currentChapter && currentChapter.chapter ? (
            <p>Chapter {currentChapter.chapter}</p>
          ) : (
            <p>{currentChapter.title}</p>
          )}
        </div>

        {isLoading ? (
          <p className="pt-nav">Loading...</p>
        ) : (
          <div className="pointer-events-none z-10 flex min-h-screen w-screen flex-col items-center pt-nav">
            {datas.length > 0 &&
              datas.map((item, index) => (
                <img
                  draggable={false}
                  key={index}
                  src={item.img}
                  alt={`Page ${item.page}`}
                />
              ))}
          </div>
        )}
        {isLoading ? (
          <div />
        ) : (
          <>
            <div className="sticky bottom-9 z-40 my-5 mr-[20rem] flex gap-6 lg:mr-0 lg:gap-10">
              <div
                className={`cursor-pointer rounded-md bg-[#121212] p-2 text-center text-xl hover:bg-[#2d303a] ${
                  prevChapter ? `` : `pointer-events-none`
                }`}
                onClick={getPrevChapter}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke={`${prevChapter ? `currentColor` : `#919191`}`}
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </div>
              <div
                className={`cursor-pointer ${
                  nextChapter ? `` : `pointer-events-none`
                } rounded-md bg-[#121212] p-2 text-center text-xl hover:bg-[#2d303a]`}
                onClick={getNextChapter}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="1.5"
                  stroke={`${nextChapter ? `currentColor` : `#919191`}`}
                  className={`h-6 w-6`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </div>
            </div>

            <div className="z-30 w-screen bg-[#1e2023] px-5 py-[3px] text-xl lg:w-[30%]  lg:bg-transparent lg:text-center">
              {nextChapter ? (
                nextChapter.chapter ? (
                  <p>Next Chapter {nextChapter.chapter}</p>
                ) : (
                  <p>Next Chapter {nextChapter.title}</p>
                )
              ) : (
                <p>End of Chapter</p>
              )}
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  const { id, title, provider } = context.query;
  const urls = [
    `https://api.moopa.my.id/meta/anilist-manga/read?chapterId=${id}&provider=${provider}`,
  ];
  const results = await axios.get(urls);

  if (provider === "mangakakalot") {
    const data = results.data;
    const datas = data.map((item) => ({
      img: `https://api.consumet.org/utils/image-proxy?url=${item.img}&referer={Referer:'https://mangakakalot.com/'}`,
      page: item.page,
      title: item.title,
    }));
    return {
      props: {
        id,
        title,
        data: datas,
        provider,
      },
    };
  }

  if (!results.data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      id,
      title,
      data: results.data,
      provider,
    },
  };
}
