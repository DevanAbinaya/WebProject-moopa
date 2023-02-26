import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../../../components/layout";
import Head from "next/head";

export default function Chapter({ data }) {
  console.log(data);
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
              {data.map(({ page, img }) => {
                return (
                  <div
                    key={page}
                    className="flex flex-col justify-center object-contain"
                  >
                    <img src={img} alt={page} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { id, provider } = context.query;
  const res = await fetch(
    `https://api.eucrypt.my.id/meta/anilist-manga/read?chapterId=${id}&provider=${provider}`
  );
  const data = await res.json();
  return { props: { data } };
}
