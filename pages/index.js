import Head from 'next/head';
import Image from 'next/image';
import Chisato from '../components/media/chisato';
import Start from '../components/start';
import Layout from '../components/layout';

export default function Home() {
  return (
    <>
      <Head>
        <title>Moopa</title>
        <meta name="description" content="Are you sure about that?" />
        {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
        <link rel="icon" href="/c.svg" />
      </Head>
        {/* <Hamburger className="fixed bottom-0 right-0" /> */}
        
        <Layout>
          <div className='antialiased pt-nav bg-gradient-to-br from-white via-white to-white dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900'>
          {/* <Navbar className="text-black dark:bg-none dark:text-white md:px-5 md:pt-5 px-2 pt-2" /> */}
    
            <section className='h-[46.5rem] md:h-[59.06rem] w-screen flex items-center justify-center'>
              <div className='flex flex-col md:gap-y-20 gap-y-10 md:pb-0 pb-[8.5rem] md:-translate-y-14 -translate-y-0  justify-center items-center'>
  
              {/* Mobile */}
              <h1 className='md:hidden text-[2.5rem] font-semibold flex md:flex-row flex-col text-slate-700 dark:text-slate-300 cursor-default transition-all duration-500'>
                  <div className='gap-3.5 flex'>A
                    <a className='bg-gradient-to-r from-[#7661FA] to-[#FF8990] bg-clip-text text-transparent'>PLACE</a>
                  </div>
                  <a className=''>TO LEARN MORE</a>
              </h1>
  
              {/* Pc/Tablet */}
                <h1 className='hidden text-5xl font-semibold md:flex gap-3 md:flex-row flex-col text-slate-700 dark:text-slate-300 cursor-default transition-all duration-700 hover:gap-10 '>
                  <div className='flex md:flex-row flex-col gap-3'>
                    <a>A</a>
                    <a className='bg-gradient-to-r from-[#7661FA] to-[#FF8990] bg-clip-text text-transparent'>PLACE</a>
                    <a>TO</a>
                    <a>LEARN</a>
                    <a>MORE</a>
                  </div>
                </h1>
                <Start className="scale-75 md:scale-100"/>
              </div>
            </section>
          </div>
          
          <section id='firstp' className='xl:h-[54.25rem] xl:flex xl:items-center'>
            <div className='flex md:flex-row flex-col items-center md:mx-10 md:gap-3 xl:gap-52'>
              <div className='flex flex-col md:gap-0 gap-10 md:text-2xl '>
                <h1 className='xl:mb-20 md:mb-16 md:text-4xl md:mt-0 mt-10 text-2xl pl-10 font-karla font-bold'>Ini Web Apaan Sih?</h1>
                <p className='font-roboto md:mx-0 mx-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non molestie arcu. Mauris pulvinar risus porta dolor lacinia sodales. Ut ut justo non mi aliquam pharetra eget et ligula. Vivamus in enim nulla. Pellentesque turpis metus, facilisis ac lectus nec, dapibus molestie nulla. Vestibulum volutpat id turpis in ultricies.
                </p>
                <div className='text-transparent md:visible hidden'>hidden</div>
              </div>
              <Chisato className="md:mt-10 md:mb-10 md:scale-100 scale-90 hidden md:block" />
              <div className='md:hidden pt-16'><Image src={'https://cdn.discordapp.com/attachments/986579286397964290/1061669610614689902/ynkts.gif'} height={498} width={498} alt="ya ndak tau"/></div>
            </div>
          </section>
  
          <section className='flex items-center justify-center md:mt-0 mt-16'>
            <div className='drop-shadow-2xl'><Image src='https://cdn.discordapp.com/attachments/986579286397964290/1061674162336305212/yes.png' alt='/' width={1440} height={810}/></div>
          </section>
        </Layout>
    </>
  )
}
