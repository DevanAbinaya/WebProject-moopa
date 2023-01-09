import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Head from "next/head";
import UnderConstruction from "../components/underConst";

export default function About() {    
    return (
        <section>
            <Head>
            <title>Moopa - About</title>
            <meta name="about" content="About this web" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/c.svg" />
            </Head>
            <Navbar className="md:px-5 md:pt-5" />
            <UnderConstruction />
            <Footer />
        </section>
    )
}