import Link from "next/link";

function Start(props) {
    const handleClick = () => {
      const element = document.querySelector('#firstp');
      element.scrollIntoView({ behavior: 'smooth',  });
    };
  
    // onClick={handleClick}
    return (
      <Link href='/beta/search'><button type="button" className={`text-3xl bg-[#8589EA] hover:bg-[#6D73F3] text-white w-[165px] h-[42px] rounded-full text-center shadow-md ${props.className}`}>START</button></Link>
    );
  }
  
  export default Start;