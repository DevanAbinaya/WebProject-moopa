// import { MANGA } from "@consumet/extensions";
import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import Layout from "../../../components/layout";

export default function Test({ title, id, data }) {
  const [loadedImages, setLoadedImages] = useState([]);

  const handleImageLoad = (item) => {
    setLoadedImages((prevLoadedImages) => [...prevLoadedImages, item.img]);
  };
  // console.log(data);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="info" content="More detailed info about the Manga" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/c.svg" />
      </Head>
      <Layout>
        <div className="flex min-h-screen flex-col items-center pt-nav">
          {data.length > 0 &&
            data.map((item) => (
              <img
                key={item.page}
                src={item.img}
                alt={`Page ${item.page}`}
                onLoad={() => handleImageLoad(item)}
                referrerPolicy="origin"
              />
            ))}
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { id, title } = context.query;
  const urls = [
    `https://cors.delusionz.xyz/https://api.consumet.org/meta/anilist-manga/read?chapterId=${id}&provider=mangadex`,
  ];
  const results = await axios.get(urls);
  if (!results.data) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      id,
      title,
      data: results.data,
    },
  };
}
