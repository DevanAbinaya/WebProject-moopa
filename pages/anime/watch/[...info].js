import Layout from "../../../components/layout";
import { data } from "../../../lib/testData";
import { aniData } from "../../../lib/infoData";
import Image from "next/image";
import VideoPlayer from "../../../components/videoPlayer";
import Link from "next/link";

export default function Info({ info }) {
  // console.log(info);
  const title = info.aniData.title.romaji;
  const data = info.aniData;
  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center lg:px-5 justify-center w-screen">
      <div className="bg-secondary w-screen lg:w-[67%] h-[260px] lg:h-[720px]">
        <VideoPlayer
          kagi={info.id}
          data={info.epiData}
          seek={info.seek}
          titles={title}
          id={info.id}
        />
        <div>
          <div>{title}</div>
          <div></div>
        </div>
      </div>
      <div className="flex flex-col w-screen lg:w-[33%] h-[720px]">
        <h1 className="text-xl font-karla pl-4 pb-5 font-semibold">Episodes</h1>
        <div className="grid gap-5 px-5 lg:h-[720px] h-[720px] py-2 overflow-y-scroll scrollbar-thin scrollbar-thumb-[#313131] scrollbar-thumb-rounded-full">
          {data.episodes.map((item) => {
            return (
              <Link
                href={`/anime/watch/${item.id}/${data.id}`}
                key={item.id}
                className={`bg-secondary flex w-full h-[110px] rounded-lg scale-100 transition-all duration-300 ease-out ${
                  item.id == info.id
                    ? "pointer-events-none ring-1 ring-action"
                    : "cursor-pointer hover:scale-[1.02] ring-0 hover:ring-1 hover:shadow-lg ring-white"
                }`}
              >
                <div className="w-[40%] h-full relative shrink-0">
                  <Image
                    src={item.image}
                    alt="image"
                    height={1000}
                    width={1000}
                    className={`object-cover rounded-lg h-[110px] shadow-[4px_0px_5px_0px_rgba(0,0,0,0.3)] ${
                      item.id == info.id ? "brightness-[30%]" : "brightness-50"
                    }`}
                  />
                  <span className="absolute bottom-2 left-2 font-karla font-light text-sm">
                    Episode {item.number}
                  </span>
                  {item.id == info.id && (
                    <div className="absolute top-11 left-[105px] scale-[1.5]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div
                  className={`w-[70%] h-full select-none p-4 flex flex-col gap-2 ${
                    item.id == info.id ? "text-[#7a7a7a]" : ""
                  }`}
                >
                  <h1 className="font-karla font-bold italic line-clamp-1">
                    {item.title}
                  </h1>
                  <p className="line-clamp-2 text-xs italic font-outfit font-extralight">
                    {item.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { info } = context.query;
  if (!info) {
    return {
      notFound: true,
    };
  }

  const id = info[0];
  const aniId = info[1];
  const seek = info[2] || 0;

  const res = await fetch(`https://api.moopa.my.id/meta/anilist/watch/${id}`);
  const epiData = await res.json();

  const res2 = await fetch(
    `https://api.moopa.my.id/meta/anilist/info/${aniId}`
  );
  const aniData = await res2.json();

  return {
    props: {
      info: {
        id,
        seek,
        epiData,
        aniData,
      },
    },
  };
}
