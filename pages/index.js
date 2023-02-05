import Head from "next/head";
import Image from "next/image";
import Chisato from "../components/media/chisato";
import Start from "../components/start";
import Layout from "../components/layout";

export default function Home() {
  return (
    <>
      <Head>
        <title>Moopa</title>
        <meta charSet="UTF-8"></meta>
        <meta name="description" content="Are you sure about that?" />
        {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
        <link rel="icon" href="/c.svg" />
      </Head>
      {/* <Hamburger className="fixed bottom-0 right-0" /> */}

      <Layout>
        <div className="bg-gradient-to-br from-white via-white to-white pt-nav antialiased dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900">
          {/* <Navbar className="text-black dark:bg-none dark:text-white md:px-5 md:pt-5 px-2 pt-2" /> */}

          <section className="flex h-[100dvh] w-screen items-center justify-center">
            <div className="md:gap-y- flex -translate-y-0 flex-col items-center justify-center gap-y-10 pb-[8.5rem]  md:-translate-y-14 md:pb-0">
              {/* Mobile */}
              <h1 className="duration-500w-[130%] flex cursor-default flex-col font-rama text-[2.5rem] text-slate-700 transition-all dark:text-slate-300 md:hidden md:flex-row">
                <div className="flex gap-3.5">
                  DIVE
                  <a className="">INTO</a>
                </div>
                <div className="">
                  A NEW{" "}
                  <a className="animate-text bg-gradient-to-r from-[#7661FA] to-[#FF8990] bg-clip-text text-transparent">
                    WORLD
                  </a>
                </div>
              </h1>

              {/* Pc/Tablet */}
              <h1 className="hidden cursor-default flex-col gap-3 text-center text-5xl font-semibold text-slate-700 transition-all duration-700 hover:gap-10 dark:text-slate-300 md:flex md:flex-row ">
                <div className="flex flex-col items-start gap-3">
                  <div className="flex gap-3">
                    <div>
                      DIVE INTO A NEW{" "}
                      <a className="animate-text bg-gradient-to-r from-[#7661FA] to-[#FF8990] bg-clip-text text-transparent">
                        WORLD
                      </a>
                    </div>
                  </div>

                  {/* <div className='flex gap-3'>
                      <a>IMAGINATION</a>
                      <a>AND</a>
                      <a></a>
                    </div> */}
                </div>
              </h1>
              <Start className="scale-90 md:scale-100" />
            </div>
          </section>
        </div>

        <section
          id="firstp"
          className="xl:flex xl:h-[54.25rem] xl:items-center"
        >
          <div className="flex flex-col items-center md:mx-10 md:flex-row md:gap-3 xl:gap-52">
            <div className="flex flex-col gap-10 md:gap-0 md:text-2xl ">
              <h1 className="mt-10 pl-10 font-karla text-2xl font-bold md:mb-16 md:mt-0 md:text-4xl xl:mb-20">
                Ini Web Apaan Sih?
              </h1>
              <p className="mx-5 font-roboto md:mx-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                non molestie arcu. Mauris pulvinar risus porta dolor lacinia
                sodales. Ut ut justo non mi aliquam pharetra eget et ligula.
                Vivamus in enim nulla. Pellentesque turpis metus, facilisis ac
                lectus nec, dapibus molestie nulla. Vestibulum volutpat id
                turpis in ultricies.
              </p>
              <div className="hidden text-transparent md:visible">hidden</div>
            </div>
            <Chisato className="hidden scale-90 md:mt-10 md:mb-10 md:block md:scale-100" />
            <div className="pt-16 md:hidden">
              <Image
                src={
                  "https://cdn.discordapp.com/attachments/986579286397964290/1061669610614689902/ynkts.gif"
                }
                height={498}
                width={498}
                alt="ya ndak tau"
              />
            </div>
          </div>
        </section>

        <section className="mt-16 flex items-center justify-center md:mt-0">
          <div className="drop-shadow-2xl">
            <Image
              src="https://cdn.discordapp.com/attachments/986579286397964290/1061674162336305212/yes.png"
              alt="/"
              width={1440}
              height={840}
            />
          </div>
        </section>
      </Layout>
    </>
  );
}
