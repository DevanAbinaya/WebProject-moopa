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
            <UnderConstruction />
            </Layout>
        </>
    )
}