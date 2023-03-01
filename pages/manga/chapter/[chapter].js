import { MANGA } from "@consumet/extensions";
import Head from "next/head";
import { useEffect, useState } from "react";
import Layout from "../../../components/layout";

export default function Test({ id, title }) {
  const [data, setData] = useState([]);
  const [loadedImages, setLoadedImages] = useState([]);

  const provider = new MANGA.MangaDex();
  useEffect(() => {
    provider.fetchChapterPages(id).then((data) => {
      setData(data);
    });
  }, [id]);

  const handleImageLoad = (item) => {
    setLoadedImages((prevLoadedImages) => [...prevLoadedImages, item.img]);
  };

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
          {data.map((item) => (
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
  return {
    props: {
      id,
      title,
    },
  };
}
