import Link from "next/link";

function Start(props) {
    const handleClick = () => {
      const element = document.querySelector('#firstp');
      element.scrollIntoView({ behavior: 'smooth',  });
    };
  
    // onClick={handleClick}
    return (
      <Link href='/beta/search'><button type="button" className={`text-3xl bg-[#8452B9] hover:bg-[#481B7D] transition-color duration-200 text-white w-[10rem] h-[42px] rounded-full text-center shadow-md ${props.className}`}>START</button></Link>
    );
  }
  
  export default Start;