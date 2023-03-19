import Navbar from "./navbar";
import Footer from "./footer";
import { useEffect, useState } from "react";

function Layout(props) {
  const [isAtTop, setIsAtTop] = useState(true);
  const [isScrollingDown, setIsScrollingDown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const bodyHeight = document.body.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollPercent = (scrollY / (bodyHeight - windowHeight)) * 100;

      if (scrollPercent <= 20) {
        setIsAtTop(true);
        setIsScrollingDown(false);
      } else if (scrollY > lastScrollY) {
        setIsAtTop(false);
        setIsScrollingDown(true);
      } else {
        setIsAtTop(false);
        setIsScrollingDown(false);
      }

      lastScrollY = scrollY;
    };

    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <main
        className={`flex h-auto bg-[#121212] text-white flex-col ${props.className}`}
      >
        {/* PC/Tablet */}
        <Navbar
          className={`absolute z-50 hidden w-full duration-500 md:fixed md:top-0 md:block md:transition-all ${
            isAtTop
              ? `px-2 pt-2 transition-all duration-1000 ${props.navTop}`
              : isScrollingDown
              ? "md:h-16 md:translate-y-[-100%] md:shadow-sm md:bg-black "
              : "md:h-16 md:translate-y-0 md:shadow-sm md:bg-black"
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
