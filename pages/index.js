import Head from 'next/head';
import Image from 'next/image';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Chisato from '../components/chisato';
import Start from '../components/start';

export default function Home() {
  return (
    <>
      <Head>
        <title>Moopa</title>
        <meta name="description" content="Are you sure about that?" />
        {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
        <link rel="icon" href="/c.svg" />
      </Head>
      <main className='w-screen'>
        {/* <Hamburger className="fixed bottom-0 right-0" /> */}
        
        <div className='bg-white dark:bg-slate-900'>
        <Navbar className="text-black dark:bg-none dark:text-white" />
  
          <section className='h-[59.06rem] w-screen flex items-center justify-center'>
            <div className='flex flex-col gap-y-20 md:pb-0 pb-32 justify-center items-center'>

            {/* Mobile*/}
            <h1 className='md:hidden text-5xl font-semibold flex gap-3 md:flex-row flex-col text-slate-700 cursor-default transition-all duration-700 hover:gap-10 '>
                <div className='gap-4 flex'>A
                  <a className='bg-gradient-to-r from-[#7661FA] to-[#FF8990] bg-clip-text text-transparent'>PLACE</a>
                </div>
                <a className=''>TO LEARN MORE</a>
            </h1>

            {/* md> */}
              <h1 className='hidden text-5xl font-semibold md:flex gap-3 md:flex-row flex-col text-slate-700 cursor-default transition-all duration-700 hover:gap-10 '>
                <div className='flex md:flex-row flex-col gap-3'>
                  <a>A</a>
                  <a className='bg-gradient-to-r from-[#7661FA] to-[#FF8990] bg-clip-text text-transparent'>PLACE</a>
                  <a>TO</a>
                  <a>LEARN</a>
                  <a>MORE</a>
                </div>
              </h1>
              <a href='https://eucrypt.my.id/capybara'><Start /></a>
            </div>
          </section>
        </div>
        
        <section id='firstp' className='xl:h-[54.25rem] xl:flex xl:items-center'>
          <div className='flex md:flex-row flex-col items-center md:mx-10 md:gap-3 xl:gap-52'>
            <div className='flex flex-col md:gap-0 gap-10 md:text-2xl '>
              <h1 className='xl:mb-20 md:mb-16 md:text-4xl md:mt-0 mt-10 text-2xl pl-10 font-karla font-bold'>Lycoris-Recoil</h1>
              <p className='font-roboto md:mx-0 mx-5'>Donec ut fringilla nunc, id finibus massa. Suspendisse volutpat risus sed rhoncus tincidunt. Suspendisse venenatis ac tellus sed ultricies. Ut ultricies, mauris ut ultrices ullamcorper, diam erat ultrices felis, et placerat dolor orci a ex. Ut ut erat in augue finibus blandit. Nam lobortis consequat gravida. Maecenas suscipit auctor urna, vel maximus ante condimentum eu. Sed finibus gravida sapien id cursus.
              </p>
              <div className='text-transparent md:visible hidden'>hidden</div>
            </div>
            <Chisato className="md:mt-10 md:mb-10 md:scale-100 scale-90 " />
          </div>
        </section>

        <section className='flex items-center justify-center'>
          <div className='drop-shadow-2xl'><Image src='https://cdn.discordapp.com/attachments/995564386540326933/1055495735589748797/another.png' alt='/' width={1440} height={810}/></div>
        </section>
        <Footer />
      </main>
    </>
  )
}
