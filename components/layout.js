import Navbar from "./navbar";
import Footer from "./footer";
import { useEffect, useState } from "react";

function Layout(props) {
  const [isAtTop, setIsAtTop] = useState(true);
  const [isScrollingDown, setIsScrollingDown] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", () => {
      if (lastScrollY < window.scrollY) {
        setIsScrollingDown(true);
        setIsAtTop(false);
      } else if (window.scrollY === 0) {
        setIsScrollingDown(false);
        setIsAtTop(true);
      } else {
        setIsScrollingDown(false);
      }
      lastScrollY = window.scrollY;
    });
  }, []);

  return (
    <>
      <main className={`flex flex-col h-auto ${props.className}`}>
        {/* PC/Tablet */}
        <Navbar
          className={`md:transition-all hidden md:block absolute duration-300 md:fixed md:top-0 z-50 w-full ${
            isAtTop
              ? "md:px-5 md:pt-5 px-2 pt-2"
              : isScrollingDown
              ? "md:translate-y-[-100%] md:h-16 md:dark:bg-black md:bg-white md:shadow-sm "
              : "md:px-0 md:pt-0 md:dark:bg-black md:bg-white md:shadow-sm"
          }`}
        />

        {/* Mobile */}
        <Navbar
          className={`md:transition-all md:hidden absolute duration-300 md:fixed md:top-0 z-50 w-full`}
        />
        <div className="grid items-center justify-center">{props.children}</div>
        <Footer />
      </main>
    </>
  );
}

export default Layout;
