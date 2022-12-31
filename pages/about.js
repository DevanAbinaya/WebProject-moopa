import { useState } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Head from "next/head";
import Discord from "../components/discord";

export default function About({ dev }) {
    const [copied, setCopied] = useState(false)

  const handleClick = () => {
    navigator.clipboard.writeText(dev.socials.discord)
      .then(() => {
        setCopied(true)
      })
  }
    return (
        <section>
            <Head>
            <title>Moopa - About</title>
            <meta name="about" content="About this web" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/c.svg" />
            </Head>
            <Navbar />
            <div className="h-screen w-screen bg-[#F9F9F9] flex justify-center items-center">
            
            </div>
            <Footer />
        </section>
    )
}