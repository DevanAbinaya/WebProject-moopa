import Head from "next/head";
import Layout from "../components/layout";
import UnderConstruction from "../components/underConst";

export default function About() {
  return (
    <>
      <Head>
        <title>Moopa - About</title>
        <meta name="about" content="About this web" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/c.svg" />
      </Head>
      <Layout>
        <UnderConstruction />
      </Layout>
    </>
  );
}
