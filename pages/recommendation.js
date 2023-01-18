import Head from "next/head";
import Layout from "../components/layout";
import UnderConstruction from "../components/underConst";
import Spline from '@splinetool/react-spline';
import Link from "next/link";

export default function Reco() {
    return (
        <>
            <Head>
            <title>Moopa - Recommendation</title>
            <meta name="recommendation" content="Recommendation only for you" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/c.svg" />
            </Head>
            <Layout>
            {/* <UnderConstruction /> */}
            <div className="relative max-w-screen pt-nav overflow-hidden">
                <div className="h-screen relative flex gap-6 justify-center items-center snap-x snap-mandatory overflow-x-auto duration-500">
                <Link href='#'>Let's go to /[mango]/[yes].js</Link>
                </div>
            </div>
            </Layout>
        </>
    )
}