import Head from "next/head";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Not Found</title>
        <meta name="about" content="About this web" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/c.svg" />
      </Head>
      <Navbar className="dark:bg-black" />
      <div className="w-screen h-[800px] bg-slate-50 dark:bg-[#121212] flex items-center justify-center text-2xl gap-10">
        <div className="flex gap-8 items-center font-karla font-semibold">
          <h1>404</h1>
          <div className="h-[45px] w-[2px] dark:bg-white bg-black" />
          <h1>Nothing to see here.</h1>
        </div>
      </div>
      <Footer />
    </>
  );
}
