// import { MANGA } from "@consumet/extensions";
import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import Layout from "../../../components/layout";

export default function Test({ title, id }) {
  const [loadedImages, setLoadedImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    async function fetchData() {
      const urls = [
        `https://api.consumet.org/meta/anilist-manga/read?chapterId=${id}&provider=mangadex`,
      ];
      const promises = urls.map((url) => axios.get(url));

      try {
        const results = await Promise.all(promises);
        const data = results.map((result) => result.data);
        setData(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleImageLoad = (item) => {
    setLoadedImages((prevLoadedImages) => [...prevLoadedImages, item.img]);
  };
  // console.log(data);

  if (loading) {
    return <p>Loading...</p>;
  }

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
            data[0].map((item) => (
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
