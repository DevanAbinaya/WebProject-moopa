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
      <main className={`flex h-auto flex-col ${props.className}`}>
        {/* PC/Tablet */}
        <Navbar
          className={`absolute z-50 hidden w-full duration-300 md:fixed md:top-0 md:block md:transition-all ${
            isAtTop
              ? "px-2 pt-2 md:px-5 md:pt-5"
              : isScrollingDown
              ? "md:h-16 md:translate-y-[-100%] md:bg-white md:shadow-sm md:dark:bg-black "
              : "md:bg-white md:px-0 md:pt-0 md:shadow-sm md:dark:bg-black"
          }`}
        />

        {/* Mobile */}
        <Navbar
          className={`absolute z-50 w-full duration-300 md:fixed md:top-0 md:hidden md:transition-all`}
        />
        <div className="grid items-center justify-center">{props.children}</div>
        <Footer />
      </main>
    </>
  );
}

export default Layout;
