import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../../../components/layout";
import Head from "next/head";

export default function ChapterRead(props) {
  const data = props.data;
  const [isloading, setIsLoading] = useState(true);

  return (
    <>
      <Head>
        <title>Moopa - Chapter</title>
        <meta name="Chapter" content="Im reading my Manga" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/c.svg" />
      </Head>
      <Layout>
        <div className="relative flex h-auto min-h-screen w-screen justify-center pt-[5.5rem] md:w-[1600px]">
          {data && (
            <div className="flex flex-col justify-center">
              {data.chapter_image.map(
                ({ chapter_image_link, image_number }, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-col justify-center object-contain"
                    >
                      <img src={chapter_image_link} alt={image_number} />
                    </div>
                  );
                }
              )}
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const endpoint = context.query.chapter;
  const res = await fetch(
    `https://manga-api-production-30a1.up.railway.app/api/chapter/${endpoint}`
  );
  const data = await res.json();
  return { props: { data } };
}
