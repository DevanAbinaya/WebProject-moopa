// import { MANGA } from "@consumet/extensions";
import { MANGA } from "@consumet/extensions";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
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
        <div className="relative flex min-h-screen w-screen flex-col items-center pt-nav">
          {data.length > 0 &&
            data.map((item, index) => (
              <Image
                key={index}
                src={item.img}
                alt={`Page ${item.page}`}
                width={600}
                height={800}
                loader={({ src }) => {
                  const newUrl = `${src}?referer=https://mangadex.org/`;
                  return newUrl;
                }}
              />
            ))}
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { id, title, provider } = context.query;
  const urls = [
    `https://api.moopa.my.id/meta/anilist-manga/read?chapterId=${id}&provider=${provider}`,
  ];
  const results = await axios.get(urls);
  if (!results.data) {
    const data = await axios.get(
      `https://api.mangadex.org/at-home/server/${id}`
    );
    return {
      props: {
        id,
        title,
        data: data.data,
      },
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
