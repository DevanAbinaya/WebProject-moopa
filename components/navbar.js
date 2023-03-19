import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";

function Navbar(props) {
  const [isVisible, setIsVisible] = useState(false);
  const [fade, setFade] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleShowClick = () => {
    setIsVisible(true);
    setFade(true);
  };

  const handleHideClick = () => {
    setIsVisible(false);
    setFade(false);
  };

  const renderThemeChanger = () => {
    if (!mounted) return null;

    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return (
        <button
          onClick={() => setTheme("light")}
          className="md:rounded-md md:p-2 md:ring-[0.5px] md:ring-orange-500 md:hover:bg-orange-500"
        >
          <svg
            width="25"
            height="25"
            viewBox="0 0 24 24"
            className="fill-white"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20.2097 15.32C19.6259 16.7062 18.6872 17.9141 17.488 18.8221C16.2888 19.7301 14.8716 20.3061 13.379 20.492C11.8864 20.678 10.3711 20.4673 8.98581 19.8813C7.60052 19.2953 6.39409 18.3546 5.48804 17.154C4.58198 15.9534 4.00828 14.5352 3.82473 13.0423C3.64117 11.5494 3.85423 10.0345 4.44245 8.65013C5.03067 7.26577 5.97328 6.06086 7.17536 5.15672C8.37743 4.25259 9.79652 3.68116 11.2897 3.49999C11.3933 3.48762 11.4982 3.50796 11.5896 3.55817C11.6811 3.60838 11.7545 3.68594 11.7997 3.77999C11.847 3.8723 11.8637 3.97721 11.8475 4.07964C11.8313 4.18207 11.7831 4.27672 11.7097 4.34999C11.0967 4.95809 10.6119 5.6829 10.2838 6.48158C9.95579 7.28026 9.79117 8.1366 9.79971 8.99999C9.80852 10.1348 10.1111 11.2481 10.6781 12.2312C11.245 13.2143 12.057 14.0338 13.0348 14.6098C14.0127 15.1859 15.123 15.4988 16.2578 15.5181C17.3925 15.5374 18.5128 15.2624 19.5097 14.72C19.6023 14.6722 19.7071 14.6534 19.8105 14.6658C19.9139 14.6783 20.0112 14.7216 20.0897 14.79C20.1566 14.8587 20.2033 14.9445 20.2245 15.0381C20.2456 15.1316 20.2405 15.2292 20.2097 15.32V15.32Z" />
          </svg>
        </button>
      );
    } else {
      return (
        <button
          onClick={() => setTheme("dark")}
          className="md:rounded-md md:p-2 md:hover:bg-orange-500"
        >
          <svg
            width="25"
            height="25"
            className="fill-[#8BA0B2] md:fill-black"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20.2097 15.32C19.6259 16.7062 18.6872 17.9141 17.488 18.8221C16.2888 19.7301 14.8716 20.3061 13.379 20.492C11.8864 20.678 10.3711 20.4673 8.98581 19.8813C7.60052 19.2953 6.39409 18.3546 5.48804 17.154C4.58198 15.9534 4.00828 14.5352 3.82473 13.0423C3.64117 11.5494 3.85423 10.0345 4.44245 8.65013C5.03067 7.26577 5.97328 6.06086 7.17536 5.15672C8.37743 4.25259 9.79652 3.68116 11.2897 3.49999C11.3933 3.48762 11.4982 3.50796 11.5896 3.55817C11.6811 3.60838 11.7545 3.68594 11.7997 3.77999C11.847 3.8723 11.8637 3.97721 11.8475 4.07964C11.8313 4.18207 11.7831 4.27672 11.7097 4.34999C11.0967 4.95809 10.6119 5.6829 10.2838 6.48158C9.95579 7.28026 9.79117 8.1366 9.79971 8.99999C9.80852 10.1348 10.1111 11.2481 10.6781 12.2312C11.245 13.2143 12.057 14.0338 13.0348 14.6098C14.0127 15.1859 15.123 15.4988 16.2578 15.5181C17.3925 15.5374 18.5128 15.2624 19.5097 14.72C19.6023 14.6722 19.7071 14.6534 19.8105 14.6658C19.9139 14.6783 20.0112 14.7216 20.0897 14.79C20.1566 14.8587 20.2033 14.9445 20.2245 15.0381C20.2456 15.1316 20.2405 15.2292 20.2097 15.32V15.32Z" />
          </svg>
        </button>
      );
    }
  };

  return (
    <header className={`${props.className}`}>
      <div className="flex h-16 w-auto items-center justify-between px-5 md:mx-auto md:w-[80%] md:px-0 text-white">
        <div className="pb-2 font-outfit text-4xl font-semibold md:block">
          <Link href="/">moopa</Link>
        </div>

        {/* Mobile Hamburger */}
        {!isVisible && (
          <button
            onClick={handleShowClick}
            className="fixed bottom-[30px] right-[20px] z-[100] flex h-[51px] w-[50px] cursor-pointer items-center justify-center rounded-[8px] bg-[#101925] shadow-menu md:hidden"
            id="bars"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-[42px] w-[61.5px] text-[#8BA0B2] fill-orange-500"
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
        <div
          className={`transition-all duration-500 ${
            fade ? "opacity-100" : "opacity-0"
          } z-50`}
        >
          {isVisible && (
            <div className="fixed bottom-[25px] right-[15px] z-50 flex h-[66px] w-[255px] items-center justify-center gap-8 rounded-[10px] text-[11px] bg-[#101925] shadow-menu md:hidden">
              <div className="flex gap-7">
                <button className="group flex flex-col items-center">
                  <Link href="/" className="">
                    <svg
                      width="28"
                      height="24"
                      viewBox="0 0 28 24"
                      className=" group-hover:fill-cyan-700 fill-white"
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
                      className=" group-hover:fill-cyan-700 fill-white"
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
                <button className="group flex gap-[1.5px] flex-col items-center ">
                  <div>
                    <Link href="/search">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="group-hover:fill-cyan-700 fill-white w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                          clipRule="evenodd"
                        />
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
                  className="fill-orange-500"
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

        <nav className="left-0 top-[-100%] hidden w-auto items-center gap-10 px-5 md:flex">
          <ul className="hidden gap-10 font-roboto text-xl md:flex ">
            <li>
              <Link
                href="/"
                className="p-2 transition-all duration-100 hover:text-orange-600"
              >
                home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="p-2 transition-all duration-100 hover:text-orange-600"
              >
                about
              </Link>
            </li>
            <li>
              <Link
                href="/search"
                className="p-2 transition-all duration-100 hover:text-orange-600"
              >
                search
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
