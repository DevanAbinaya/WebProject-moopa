function Start() {
    const handleClick = () => {
      const element = document.querySelector('#firstp');
      element.scrollIntoView({ behavior: 'smooth',  });
    };
  
    return (
      <button type="button" onClick={handleClick} className='text-3xl bg-[#8589EA] hover:bg-[#6D73F3] text-white w-[165px] h-[42px] rounded-full text-center shadow-md'>START</button>
    );
  }
  
  export default Start;