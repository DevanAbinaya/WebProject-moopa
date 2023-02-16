import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { aniListData } from "../lib/AniList";
import { ApolloProvider } from "@apollo/client";
import React, { useState, useEffect } from "react";
import ReactHtmlParser from "kt-react-html-parser";
import client from "../lib/apolloClient";
import Head from "next/head";
import Link from "next/link";
import Footer from "../components/footer";
import Trending from "../components/hero/trending";
import Image from "next/image";
import Content from "../components/hero/content";
import { useRouter } from "next/router";

export default function Home({ detail, populars }) {
  const [isVisible, setIsVisible] = useState(false);
  const [recently, setRecently] = useState(null);
  const [popular, setPopular] = useState(populars.data);
  const [topDesc, setTopDesc] = useState("");
  const [inputShow, setInputShow] = useState(false);
  const data = detail.data[0];
  const router = useRouter();

  const handleShowClick = () => {
    setIsVisible(true);
  };

  const handleHideClick = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    function fetchData() {
      const recent = JSON.parse(localStorage.getItem("recentWatch"));
      if (recent) {
        setRecently(recent);
      }
    }
    fetchData();
    const topDesc = data.description.slice(0, 350) + "...";
    setTopDesc(topDesc);
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

  const handleFormSubmission = (inputValue) => {
    router.push(`/search?hasil=${encodeURIComponent(inputValue)}`);
  };

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const inputValue = event.target.value;
      handleFormSubmission(inputValue);
    }
  };

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
      <div className="z-50">
        {!isVisible && (
          <button
            onClick={handleShowClick}
            className="fixed bottom-[30px] right-[20px] z-[100] flex h-[51px] w-[50px] cursor-pointer items-center justify-center rounded-[8px] bg-[#FBFBFB] shadow-light dark:bg-[#101925] dark:shadow-menu md:hidden"
            id="bars"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-[42px] w-[61.5px] text-[#8BA0B2] dark:fill-orange-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}

        {/* Mobile Menu */}
        <div>
          {isVisible && (
            <div className="fixed bottom-[25px] right-[15px] z-50 flex h-[66px] w-[255px] items-center justify-center gap-8 rounded-[10px] bg-[#FBFBFB] text-[11px] shadow-light dark:bg-[#101925] dark:shadow-menu md:hidden">
              <div className="flex gap-7">
                <button className="group flex flex-col items-center">
                  <Link href="/" className="">
                    <svg
                      width="28"
                      height="24"
                      viewBox="0 0 28 24"
                      className="fill-[#8BA0B2] group-hover:fill-cyan-700 dark:fill-white"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_224_286)">
                        <path d="M14.0937 -0.571411C14.0937 -0.571411 5.91783 6.54859 1.34879 10.4046C1.08049 10.6499 0.876953 11.0073 0.876953 11.4286C0.876953 12.1659 1.46774 12.7619 2.19863 12.7619H4.84199V22.0953C4.84199 22.8326 5.43278 23.4286 6.16367 23.4286H10.1287C10.8596 23.4286 11.4504 22.8313 11.4504 22.0953V16.7619H16.7371V22.0953C16.7371 22.8313 17.3279 23.4286 18.0588 23.4286H22.0238C22.7547 23.4286 23.3455 22.8326 23.3455 22.0953V12.7619H25.9888C26.7197 12.7619 27.3105 12.1659 27.3105 11.4286C27.3105 11.0073 27.107 10.6499 26.8043 10.4046C22.267 6.54859 14.0937 -0.571411 14.0937 -0.571411Z" />
                      </g>
                      <defs>
                        <clipPath id="clip0_224_286">
                          <rect
                            width="27"
                            height="24"
                            fill="white"
                            transform="translate(0.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </Link>
                  <Link
                    href="/"
                    className="font-karla font-bold text-[#8BA0B2] group-hover:text-cyan-700"
                  >
                    home
                  </Link>
                </button>
                <button className="group flex flex-col items-center">
                  <Link href="/about">
                    <svg
                      width="27"
                      height="25"
                      viewBox="0 0 27 25"
                      className="fill-[#8BA0B2] group-hover:fill-cyan-700 dark:fill-white"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_224_292)">
                        <path d="M21.3402 0.5H5.65974C4.31427 0.500087 3.02394 0.996857 2.07261 1.88103C1.12127 2.7652 0.586852 3.96435 0.586914 5.21469V19.7853C0.586852 21.0356 1.12127 22.2348 2.07261 23.119C3.02394 24.0031 4.31427 24.4999 5.65974 24.5H21.3402C22.6856 24.4999 23.976 24.0031 24.9273 23.119C25.8786 22.2348 26.4131 21.0356 26.413 19.7853V5.21469C26.4131 3.96435 25.8786 2.7652 24.9273 1.88103C23.976 0.996857 22.6856 0.500087 21.3402 0.5ZM13.5 4.93182C13.8482 4.93182 14.1887 5.02779 14.4782 5.20759C14.7678 5.3874 14.9935 5.64297 15.1268 5.94197C15.2601 6.24098 15.2949 6.57 15.227 6.88742C15.159 7.20484 14.9913 7.49642 14.7451 7.72527C14.4988 7.95412 14.1851 8.10996 13.8435 8.1731C13.5019 8.23624 13.1479 8.20384 12.8261 8.07999C12.5043 7.95613 12.2293 7.7464 12.0358 7.4773C11.8424 7.2082 11.7391 6.89182 11.7391 6.56818C11.7391 6.13419 11.9246 5.71798 12.2548 5.4111C12.5851 5.10422 13.0329 4.93182 13.5 4.93182ZM15.9212 20.1364H11.2255C10.9142 20.1364 10.6156 20.0214 10.3954 19.8168C10.1753 19.6123 10.0516 19.3348 10.0516 19.0455C10.0516 18.7561 10.1753 18.4787 10.3954 18.2741C10.6156 18.0695 10.9142 17.9545 11.2255 17.9545H12.326V11.4091H11.2255C10.9142 11.4091 10.6156 11.2942 10.3954 11.0896C10.1753 10.885 10.0516 10.6075 10.0516 10.3182C10.0516 10.0289 10.1753 9.75138 10.3954 9.54679C10.6156 9.34221 10.9142 9.22727 11.2255 9.22727H14.6739V17.9545H15.9212C16.2325 17.9545 16.5311 18.0695 16.7512 18.2741C16.9714 18.4787 17.0951 18.7561 17.0951 19.0455C17.0951 19.3348 16.9714 19.6123 16.7512 19.8168C16.5311 20.0214 16.2325 20.1364 15.9212 20.1364Z" />
                      </g>
                      <defs>
                        <clipPath id="clip0_224_292">
                          <rect
                            width="27"
                            height="24"
                            fill="white"
                            transform="translate(0 0.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </Link>
                  <Link
                    href="/about"
                    className="font-karla font-bold text-[#8BA0B2] group-hover:text-cyan-700"
                  >
                    about
                  </Link>
                </button>
                <button className="group flex flex-col items-center ">
                  <div>
                    <Link href="/search">
                      <svg
                        width="36"
                        height="25"
                        viewBox="0 0 36 25"
                        className="fill-[#8BA0B2] group-hover:fill-cyan-700 dark:fill-white"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_224_295)">
                          <path d="M29.25 24.5H6.75C5.85489 24.5 4.99645 24.1552 4.36351 23.5414C3.73058 22.9277 3.375 22.0953 3.375 21.2273V3.77273C3.375 2.90475 3.73058 2.07232 4.36351 1.45856C4.99645 0.844804 5.85489 0.5 6.75 0.5H29.25C30.1451 0.5 31.0036 0.844804 31.6365 1.45856C32.2694 2.07232 32.625 2.90475 32.625 3.77273V21.2273C32.625 22.0953 32.2694 22.9277 31.6365 23.5414C31.0036 24.1552 30.1451 24.5 29.25 24.5ZM6.75 2.68182C6.45163 2.68182 6.16548 2.79675 5.95451 3.00134C5.74353 3.20592 5.625 3.4834 5.625 3.77273V21.2273C5.625 21.5166 5.74353 21.7941 5.95451 21.9987C6.16548 22.2032 6.45163 22.3182 6.75 22.3182H29.25C29.5484 22.3182 29.8345 22.2032 30.0455 21.9987C30.2565 21.7941 30.375 21.5166 30.375 21.2273V3.77273C30.375 3.4834 30.2565 3.20592 30.0455 3.00134C29.8345 2.79675 29.5484 2.68182 29.25 2.68182H6.75Z" />
                          <path d="M23.625 11.4091C22.9575 11.4091 22.305 11.2172 21.75 10.8575C21.1949 10.4979 20.7624 9.98681 20.5069 9.38879C20.2515 8.79078 20.1846 8.13275 20.3149 7.4979C20.4451 6.86305 20.7665 6.27991 21.2385 5.82221C21.7105 5.36451 22.3119 5.05281 22.9666 4.92653C23.6213 4.80025 24.2999 4.86507 24.9166 5.11277C25.5333 5.36048 26.0604 5.77995 26.4312 6.31815C26.8021 6.85634 27 7.48909 27 8.13638C27 9.00436 26.6444 9.83679 26.0115 10.4505C25.3786 11.0643 24.5201 11.4091 23.625 11.4091ZM23.625 7.04547C23.4025 7.04547 23.185 7.10945 23 7.22932C22.815 7.34919 22.6708 7.51957 22.5856 7.7189C22.5005 7.91824 22.4782 8.13759 22.5216 8.3492C22.565 8.56082 22.6722 8.7552 22.8295 8.90777C22.9868 9.06033 23.1873 9.16423 23.4055 9.20632C23.6238 9.24842 23.85 9.22681 24.0555 9.14424C24.2611 9.06168 24.4368 8.92185 24.5604 8.74245C24.684 8.56305 24.75 8.35214 24.75 8.13638C24.75 7.84705 24.6315 7.56957 24.4205 7.36499C24.2095 7.1604 23.9234 7.04547 23.625 7.04547Z" />
                          <path d="M29.249 24.5C29.0637 24.4991 28.8815 24.4538 28.7186 24.3682C28.5557 24.2825 28.4172 24.1592 28.3153 24.0091L23.4328 16.9182C23.3299 16.7697 23.1909 16.648 23.028 16.5639C22.8652 16.4798 22.6835 16.4358 22.499 16.4358C22.3145 16.4358 22.1328 16.4798 21.97 16.5639C21.8072 16.648 21.6682 16.7697 21.5653 16.9182L21.1828 17.4637C21.0069 17.6754 20.7559 17.8158 20.4789 17.8574C20.2019 17.899 19.9189 17.8389 19.6852 17.6887C19.4516 17.5386 19.2841 17.3092 19.2157 17.0457C19.1473 16.7821 19.1828 16.5032 19.3153 16.2637L19.6865 15.7073C19.9944 15.2573 20.4123 14.8881 20.903 14.6327C21.3938 14.3773 21.9421 14.2437 22.499 14.2437C23.056 14.2437 23.6042 14.3773 24.095 14.6327C24.5857 14.8881 25.0037 15.2573 25.3115 15.7073L30.1828 22.8091C30.3456 23.0496 30.4038 23.3428 30.3448 23.6247C30.2858 23.9067 30.1144 24.1546 29.8678 24.3146C29.6866 24.4376 29.4702 24.5025 29.249 24.5V24.5Z" />
                          <path d="M6.74978 24.5C6.53422 24.4995 6.32335 24.4389 6.14228 24.3255C5.89198 24.169 5.7159 23.9226 5.65263 23.6404C5.58937 23.3582 5.64408 23.0632 5.80478 22.82L12.8135 12.3255C13.1177 11.8697 13.534 11.4945 14.025 11.2336C14.516 10.9727 15.0662 10.8343 15.626 10.8309V10.8309C16.1828 10.8307 16.731 10.9641 17.2217 11.2192C17.7124 11.4742 18.1304 11.843 18.4385 12.2928L25.661 22.8091C25.7935 23.0486 25.829 23.3275 25.7606 23.5911C25.6922 23.8547 25.5247 24.084 25.2911 24.2342C25.0574 24.3843 24.7744 24.4444 24.4974 24.4028C24.2204 24.3612 23.9694 24.2208 23.7935 24.0091L16.5598 13.5037C16.4579 13.3536 16.3193 13.2303 16.1564 13.1446C15.9935 13.059 15.8113 13.0137 15.626 13.0127C15.4397 13.0149 15.2568 13.0618 15.0939 13.1494C14.9309 13.237 14.7929 13.3625 14.6923 13.5146L7.69478 23.9982C7.59313 24.1518 7.45336 24.2783 7.28826 24.3659C7.12316 24.4536 6.93801 24.4997 6.74978 24.5Z" />
                        </g>
                        <defs>
                          <clipPath id="clip0_224_295">
                            <rect
                              width="36"
                              height="24"
                              fill="white"
                              transform="translate(0 0.5)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </Link>
                  </div>
                  <Link
                    href="/search"
                    className="font-karla font-bold text-[#8BA0B2] group-hover:text-cyan-700"
                  >
                    search
                  </Link>
                </button>
              </div>
              <button onClick={handleHideClick}>
                <svg
                  width="20"
                  height="21"
                  className="fill-[#8BA0B2] dark:fill-orange-500"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="2.44043"
                    y="0.941467"
                    width="23.5842"
                    height="3.45134"
                    rx="1.72567"
                    transform="rotate(45 2.44043 0.941467)"
                  />
                  <rect
                    x="19.1172"
                    y="3.38196"
                    width="23.5842"
                    height="3.45134"
                    rx="1.72567"
                    transform="rotate(135 19.1172 3.38196)"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="h-auto w-screen bg-[#141519]">
        <div className="flex items-center justify-center">
          <div className="flex w-full items-center justify-between px-5 md:mx-[94px]">
            <div className="flex items-center md:gap-16 md:pt-7">
              <h1 className=" font-outfit text-[40px] font-bold text-[#FF7F57]">
                moopa
              </h1>
              <ul className="hidden gap-10 pt-2 font-outfit text-[14px] md:flex">
                <Link href="/search">
                  <li>AniList Index</li>
                </Link>
                <li>Manga</li>
                <li>Anime</li>
              </ul>
            </div>
            <div className="relative flex scale-75 items-center">
              <div className="search-box ">
                <input
                  className="search-text"
                  type="text"
                  placeholder="Search Anime"
                  onKeyDown={handleKeyDown}
                />
                <a href="#" className="search-btn">
                  <i className="fas fa-search"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* PC / TABLET */}
        <div className="mt-10 hidden justify-center lg:flex">
          <div className="relative grid grid-rows-2 items-center md:flex md:h-[760px] md:w-[80%] md:justify-between">
            <div className="row-start-2 flex h-full flex-col gap-7 md:w-[55%] md:justify-center">
              <h1 className="w-[85%] font-outfit font-extrabold md:text-[45px]">
                {data.title.english}
              </h1>
              <div className="font-roboto font-light md:text-[24px]">
                {ReactHtmlParser(topDesc)}
              </div>

              <div className="md:pt-5">
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
            <div className="z-10 row-start-1 flex justify-center ">
              <div className="relative  md:h-[662px] md:w-[460px] md:scale-100">
                <div className="absolute bg-gradient-to-t from-[#141519] to-transparent md:h-[662px] md:w-[460px]" />

                <Image
                  src={data.coverImage.extraLarge}
                  alt={data.title.english || data.title.romaji}
                  width={460}
                  height={662}
                  priority
                  className="rounded-tl-xl  rounded-tr-xl object-cover bg-blend-overlay md:h-[662px] md:w-[460px] "
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile */}

        <div className="mt-16 flex flex-col items-center">
          <div className="w-screen flex-none lg:w-[87%]">
            {recently && (
              <div>
                <div className="flex items-center gap-5 lg:gap-10">
                  <h1 className="px-5 font-outfit text-[20px] font-extrabold lg:text-[27px]">
                    Recently Watched
                  </h1>
                  <div
                    className="cursor-pointer font-outfit font-light text-[#8f8f8f]"
                    onClick={() => handleRemove()}
                  >
                    Clear all
                  </div>
                </div>
                <div className="relative z-10 flex items-center py-10 lg:gap-2">
                  <MdChevronLeft
                    onClick={slideLeft}
                    size={40}
                    className="mb-5 cursor-pointer opacity-50 hover:opacity-100"
                  />
                  <div
                    id="recentslider"
                    className="scroll flex h-full w-full items-center overflow-x-scroll scroll-smooth whitespace-nowrap overflow-y-hidden scrollbar-hide lg:gap-5"
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
                            className="z-20 h-[230px] w-[168px] object-cover p-2 duration-300 ease-in-out hover:scale-105 lg:h-[290px] lg:w-[209px]"
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
            {popular && (
              <div>
                {popular.map((pops, index) => {
                  // console.log(pops.title);
                  return <div key={index}></div>;
                })}
              </div>
            )}
            <div className="">
              <h1 className="px-5 font-outfit text-[20px] font-extrabold lg:text-[27px]">
                Trending Now
              </h1>
              <div className="py-10 ">
                <ApolloProvider client={client}>
                  <Trending />
                </ApolloProvider>
              </div>
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
      </div>
      <Footer />
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=120"
  );
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
