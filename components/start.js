import Link from "next/link";

function Start(props) {
  const handleClick = () => {
    const element = document.querySelector("#firstp");
    element.scrollIntoView({ behavior: "smooth" });
  };

  // onClick={handleClick}
  return (
    <Link rel="preconnect" href="/beta/search">
      <button
        type="button"
        className={`transition-color h-[42px] w-[10rem] rounded-full bg-[#8452B9] text-center text-3xl text-white shadow-md duration-200 hover:bg-[#481B7D] ${props.className}`}
      >
        START
      </button>
    </Link>
  );
}

export default Start;
