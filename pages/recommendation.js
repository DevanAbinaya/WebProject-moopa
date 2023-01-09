import Head from "next/head";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import UnderConstruction from "../components/underConst";

export default function Reco() {
    return (
        <>
            <Head>
            <title>Moopa - Recommendation</title>
            <meta name="about" content="About this web" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/c.svg" />
            </Head>

            <main>
                <Navbar className="md:px-5 md:pt-5" />
                <UnderConstruction />
                <Footer />
            </main>
        </>
    )
}