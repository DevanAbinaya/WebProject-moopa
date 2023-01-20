import Head from "next/head";
import Layout from "../components/layout";
import UnderConstruction from "../components/underConst";
import Spline from '@splinetool/react-spline';

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
                    <div className="snap-center h-52 w-80 bg-green-200 flex items-center justify-center text-xl text-black">Section 1</div>
                    <div className="snap-center h-52 w-80 bg-yellow-200 flex items-center justify-center text-xl text-black">Section 2</div>
                    <div className="snap-center h-52 w-80 bg-blue-200 flex items-center justify-center text-xl text-black">Section 3</div>
                    <div className="snap-center h-52 w-80 bg-blue-200 flex items-center justify-center text-xl text-black">Section 3</div>
                    <div className="snap-center h-52 w-80 bg-blue-200 flex items-center justify-center text-xl text-black">Section 3</div>
                    <div className="snap-center h-52 w-80 bg-blue-200 flex items-center justify-center text-xl text-black">Section 3</div>
                    <div className="snap-center h-52 w-80 bg-blue-200 flex items-center justify-center text-xl text-black">Section 3</div>
                </div>
            </div>
            </Layout>
        </>
    )
}