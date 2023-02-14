import Link from "next/link";
import React from "react";
import Image from "next/image";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

export default function Content({ ids, section, data }) {
  const slideLeft = () => {
    var slider = document.getElementById(ids);
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider = document.getElementById(ids);
    slider.scrollLeft = slider.scrollLeft + 500;
  };
  //   const data = props.data;

  //   console.log(data);

  return (
    <div>
      <h1 className="font-outfit text-[27px] font-extrabold">{section}</h1>
      <div className="py-10">
        <div className="relative flex items-center gap-2">
          <MdChevronLeft
            onClick={slideLeft}
            size={40}
            className="mb-5 cursor-pointer opacity-50 hover:opacity-100"
          />
          <div
            id={ids}
            className="scroll flex h-full w-full items-center gap-5 overflow-y-hidden overflow-x-scroll scroll-smooth whitespace-nowrap scrollbar-hide"
          >
            {data.map((anime) => {
              // max length desc

              const url = encodeURIComponent(
                anime.title.english || anime.title.romaji
              );

              //   console.log();

              return (
                <div
                  key={anime.id}
                  className="flex shrink-0 cursor-pointer items-center"
                >
                  <Link href={`/himitsu?title=${url}&id=${anime.id}`}>
                    <Image
                      src={anime.coverImage.extraLarge}
                      alt={anime.title.romaji || anime.title.english}
                      width={209}
                      height={300}
                      className="z-20 h-[290px] w-[209px] object-cover p-2 duration-300 ease-in-out hover:scale-105"
                    />
                  </Link>
                </div>
              );
            })}
          </div>
          <MdChevronRight
            onClick={slideRight}
            size={40}
            className="mb-5 cursor-pointer opacity-50 hover:opacity-100"
          />
        </div>
      </div>
    </div>
  );
}
