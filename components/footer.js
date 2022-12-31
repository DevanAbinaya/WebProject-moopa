import Twitter from '../components/twitter';
import Instagram from '../components/instagram';
import Link from 'next/link';
import Image from 'next/image';

function Footer() {
    return (
        <section className='bg-[#11161D] md:h-[14rem] text-white md:flex md:items-center md:justify-between dark:bg-black'>
          <div className='flex md:flex-row flex-col md:space-y-0 space-y-10 md:py-0 py-10 md:items-center md:justify-between w-[78%] mx-auto'>
            
            <div className='md:flex md:flex-col md:gap-y-[3.88rem]'>
              <h1 className='text-[2.56rem] font-outfit'>moopa</h1>
              <p className='text-[0.81rem] font-karla text-[#CCCCCC] flex items-center gap-1'>&copy; {new Date().getFullYear()}  eucrypt.my.id    |    Website Made by Factiven</p>
            </div>
            <div className=''>
              <Image src='http://i1210.photobucket.com/albums/cc417/kusanagiblog/NarutoVSSasuke.gif' alt='gambar' title='request nya rapip yulistian' width={210} height={85} />
            </div>
            
            <div className='flex md:flex-row flex-col gap-10 md:gap-[9.06rem] md:items-end '>
              <div className='flex md:flex-row flex-col gap-10 md:gap-[5.94rem] font-karla font-bold'>
                <ul className='flex flex-col gap-y-[0.7rem]'>
                  <li className='cursor-pointer hover:text-cyan-500'><a href='https://github.com/AniList/ApiV2-GraphQL-Docs'>API</a></li>
                  <li className='cursor-pointer hover:text-cyan-500'><Link href='/staff'>Staff</Link></li>
                  <li className='cursor-pointer hover:text-cyan-500'>Recommendations</li>
                  <li className='cursor-pointer hover:text-cyan-500'>Contact</li>
                </ul>
                <ul className='flex flex-col gap-y-[0.7rem]'>
                  <li className='cursor-pointer hover:text-cyan-500'>
                    <a href='https://discord.gg/v5fjSdKwr2'>Discord</a>
                  </li>
                  <li className='cursor-pointer hover:text-cyan-500'>
                    <a href='https://www.instagram.com/dvnabny/'>Instagram</a>
                  </li>
                  <li className='cursor-pointer hover:text-cyan-500'>
                    <a href='https://twitter.com/Factivens'>Twitter</a>
                  </li>
                  <li className='cursor-pointer hover:text-cyan-500'>
                    <a href='https://github.com/DevanAbinaya'>Github</a>
                  </li>
                </ul>
              </div>
              <div className='flex gap-[0.69rem]'>
                <div>
                  <a href='https://twitter.com/Factivens'><Twitter className="fill-[#4CFFFF]"/></a>
                </div>
                <div>
                  <a href='https://www.instagram.com/dvnabny/'><Instagram className="fill-white"/></a>
                </div>
              </div>
            </div>

          </div>
        </section>
    );
}

export default Footer;