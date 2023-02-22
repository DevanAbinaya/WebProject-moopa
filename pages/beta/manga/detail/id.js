import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Layout from "../../../../components/layout";

export default function MangaDetail({ data }) {
  // console.log(data);
  return (
    <div className="w-screen">
      <Layout>
        <div className="flex w-screen justify-center pt-[10rem] ">
          {data ? (
            <div className="flex w-[85%] flex-col gap-10 ">
              <div className="flex gap-10">
                <div className="relative h-[358px] w-[230px]">
                  <Image
                    src={data.image}
                    alt="CoverImage"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex w-[77%] flex-col gap-10">
                  <h1 className="font-karla text-3xl font-bold">
                    {data.title?.english}
                  </h1>
                  <p>{data.description}</p>
                </div>
              </div>
              <div className="flex flex-col gap-10">
                <h1 className="text-3xl font-bold">Chapters</h1>
                <div className="flex h-[540px] flex-col gap-5 overflow-y-scroll">
                  {data.chapters?.map((chapter, index) => {
                    const str = chapter.id;
                    const num = str.match(/\d+(\.\d+)?/)[0];
                    return (
                      <div key={num}>
                        <Link
                          href={`/beta/manga/chapter/[chapter]`}
                          as={`/beta/manga/chapter/${chapter.id}`}
                        >
                          Episode {num}
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <p>Oops no data found :(</p>
          )}
        </div>
      </Layout>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    const { aniId } = context.query;
    const res = await axios.get(
      `https://cors.consumet.stream/https://api.consumet.org/meta/anilist-manga/info/${aniId}?provider=mangasee123`
    );
    const data = res.data;
    return {
      props: { data },
    };
  },
});
