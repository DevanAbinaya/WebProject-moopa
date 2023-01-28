import Head from "next/head";
import Layout from "../components/layout";
import UnderConstruction from "../components/underConst";

export default function About() {    
    const clientId = process.env.ANILIST_CLIENT_ID;

    return (
        <>
        <Head>
            <title>Moopa - About</title>
            <meta name="about" content="About this web" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/c.svg" />
        </Head>
        <Layout>
            {/* <UnderConstruction /> */}
           <div className="h-screen pt-nav">
            <a href={`https://anilist.co/api/v2/oauth/authorize?client_id=${clientId}&response_type=token`}>Login with AniList</a>
            </div>
        </Layout>
        </>
    )
}